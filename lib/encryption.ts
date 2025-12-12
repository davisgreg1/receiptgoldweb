
// Algorithms
const AES_ALGORITHM = 'AES-GCM';
const AES_LENGTH = 256;
const RSA_ALGORITHM = 'RSA-OAEP';
const RSA_MODULUS_LENGTH = 2048;
const RSA_HASH = 'SHA-256';

// Interfaces
export interface EncryptedPackage {
    encryptedData: string; // Base64
    encryptedKey: string;  // Base64
    iv: string;           // Base64
}

export interface KeyPair {
    publicKey: CryptoKey;
    privateKey: CryptoKey;
}

// --- Utils ---

// Buffer to Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

// Helper to parsing PEM keys
export const importPemKey = async (pem: string, type: 'public' | 'private'): Promise<CryptoKey> => {
    // Remove header, footer, and newlines
    const lines = pem.split('\n');
    let base64 = '';
    for (const line of lines) {
        if (line.trim() && !line.includes('---')) {
            base64 += line.trim();
        }
    }

    const keyBuffer = base64ToArrayBuffer(base64);

    if (type === 'public') {
        return await crypto.subtle.importKey(
            'spki',
            keyBuffer,
            {
                name: RSA_ALGORITHM,
                hash: RSA_HASH,
            },
            true,
            ['encrypt']
        );
    } else {
        return await crypto.subtle.importKey(
            'pkcs8',
            keyBuffer,
            {
                name: RSA_ALGORITHM,
                hash: RSA_HASH,
            },
            false,
            ['decrypt']
        );
    }
};

// Base64 to Buffer
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
};

// --- Key Management ---

/**
 * Generates an ephemeral RSA Key Pair (Client-side)
 */
export const generateKeyPair = async (): Promise<KeyPair> => {
    return await crypto.subtle.generateKey(
        {
            name: RSA_ALGORITHM,
            modulusLength: RSA_MODULUS_LENGTH,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: RSA_HASH,
        },
        true, // extractable
        ['encrypt', 'decrypt']
    );
};

/**
 * Export Public Key to Base64 (SPKI format) to send to server
 */
export const exportPublicKey = async (key: CryptoKey): Promise<string> => {
    const exported = await crypto.subtle.exportKey('spki', key);
    return arrayBufferToBase64(exported);
};

/**
 * Import Public Key from Base64 (SPKI format) on Server
 */
const importPublicKey = async (base64Key: string): Promise<CryptoKey> => {
    const keyBuffer = base64ToArrayBuffer(base64Key);
    return await crypto.subtle.importKey(
        'spki',
        keyBuffer,
        {
            name: RSA_ALGORITHM,
            hash: RSA_HASH,
        },
        true,
        ['encrypt']
    );
};

// --- Hybrid Encryption Flow ---

/**
 * Encrypts data using a hybrid approach:
 * 1. Generates ephemeral AES key.
 * 2. Encrypts data with AES key.
 * 3. Encrypts AES key with Recipient's Public RSA Key.
 */
export const hybridEncrypt = async <T>(data: T, recipientPublicKeyBase64: string): Promise<EncryptedPackage> => {
    try {
        // 1. Generate Ephemeral AES Key
        const aesKey = await crypto.subtle.generateKey(
            {
                name: AES_ALGORITHM,
                length: AES_LENGTH,
            },
            true,
            ['encrypt']
        );

        // 2. Encrypt Data with AES Key
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encodedData = new TextEncoder().encode(JSON.stringify(data));

        const encryptedContent = await crypto.subtle.encrypt(
            {
                name: AES_ALGORITHM,
                iv: iv,
            },
            aesKey,
            encodedData
        );

        // 3. Encrypt AES Key with RSA Public Key
        const publicKey = await importPublicKey(recipientPublicKeyBase64);
        const rawAesKey = await crypto.subtle.exportKey('raw', aesKey);

        const encryptedAesKey = await crypto.subtle.encrypt(
            {
                name: RSA_ALGORITHM,
            },
            publicKey,
            rawAesKey
        );

        return {
            encryptedData: arrayBufferToBase64(encryptedContent),
            encryptedKey: arrayBufferToBase64(encryptedAesKey),
            iv: arrayBufferToBase64(iv.buffer),
        };
    } catch (error) {
        console.error('Hybrid Encryption Failed:', error);
        throw new Error('Encryption failed');
    }
};

/**
 * Decrypts data using hybrid approach:
 * 1. Decrypts AES key using Private RSA Key.
 * 2. Decrypts data using decrypted AES Key.
 */
export const hybridDecrypt = async <T>(
    pkg: EncryptedPackage,
    privateKey: CryptoKey
): Promise<T> => {
    try {
        // 1. Decrypt AES Key
        const rawAesKey = await crypto.subtle.decrypt(
            {
                name: RSA_ALGORITHM,
            },
            privateKey,
            base64ToArrayBuffer(pkg.encryptedKey)
        );

        const aesKey = await crypto.subtle.importKey(
            'raw',
            rawAesKey,
            {
                name: AES_ALGORITHM,
                length: AES_LENGTH,
            },
            false,
            ['decrypt']
        );

        // 2. Decrypt Data
        const decryptedContent = await crypto.subtle.decrypt(
            {
                name: AES_ALGORITHM,
                iv: base64ToArrayBuffer(pkg.iv),
            },
            aesKey,
            base64ToArrayBuffer(pkg.encryptedData)
        );

        const decodedString = new TextDecoder().decode(decryptedContent);
        return JSON.parse(decodedString);
    } catch (error) {
        console.error('Hybrid Decryption Failed:', error);
        throw new Error('Decryption failed');
    }
};
