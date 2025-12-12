import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue } from 'firebase-admin/firestore';
import { TeamInvitation, TeamMember } from '../../../../types/team';
import { getPermissionsForRole } from '../../../../lib/permissions';
import { EncryptedPackage } from '../../../../lib/encryption';

interface AcceptInvitationRequest {
  token: string;
  password: string;
  displayName?: string;
}

export async function POST(request: NextRequest) {
  try {
    let body: AcceptInvitationRequest & { publicKey?: string } & Partial<EncryptedPackage> = await request.json();

    // Check if body is encrypted
    if (body.encryptedData && body.encryptedKey && body.iv) {
      const { hybridDecrypt, importPemKey } = await import('../../../../lib/encryption');
      const serverPrivateKeyPem = process.env.SERVER_PRIVATE_KEY;

      if (!serverPrivateKeyPem) {
        console.error('SERVER_PRIVATE_KEY not configured');
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      }

      const serverPrivateKey = await importPemKey(serverPrivateKeyPem, 'private');

      try {
        // We know it has the EncryptedPackage properties from the check above
        const encryptedBody: EncryptedPackage = {
          encryptedData: body.encryptedData,
          encryptedKey: body.encryptedKey,
          iv: body.iv
        };
        body = await hybridDecrypt(encryptedBody, serverPrivateKey);
      } catch (e) {
        console.error('Failed to decrypt request body', e);
        return NextResponse.json(
          { error: 'Invalid encrypted request' },
          { status: 400 }
        );
      }
    }

    const { token, password, displayName, publicKey } = body;

    // Validate required fields
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // 1. Find and validate the invitation using Admin SDK
    const invitationsRef = adminDb.collection('teamInvitations');
    const querySnapshot = await invitationsRef
      .where('token', '==', token)
      .where('status', '==', 'pending')
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Invalid or expired invitation' },
        { status: 404 }
      );
    }

    const invitationDoc = querySnapshot.docs[0];
    const invitationData = invitationDoc.data();
    const invitation: TeamInvitation = {
      id: invitationDoc.id,
      accountHolderId: invitationData.accountHolderId,
      accountHolderEmail: invitationData.accountHolderEmail,
      accountHolderName: invitationData.accountHolderName,
      businessId: invitationData.businessId,
      businessName: invitationData.businessName,
      inviteEmail: invitationData.inviteEmail,
      status: invitationData.status,
      token: invitationData.token,
      role: invitationData.role,
      expiresAt: invitationData.expiresAt?.toDate ? invitationData.expiresAt.toDate() : new Date(invitationData.expiresAt),
      createdAt: invitationData.createdAt?.toDate ? invitationData.createdAt.toDate() : new Date(invitationData.createdAt),
    };

    // Check if invitation has expired
    if (new Date() > invitation.expiresAt) {
      return NextResponse.json(
        { error: 'Invitation has expired' },
        { status: 410 }
      );
    }

    // 2. Create Firebase Auth user using Admin SDK
    const adminAuth = getAuth();
    const user = await adminAuth.createUser({
      email: invitation.inviteEmail,
      password: password,
      displayName: displayName || '',
      emailVerified: false,
    });

    // 3. Create team member document
    const teamMember: Omit<TeamMember, 'id'> = {
      accountHolderId: invitation.accountHolderId,
      accountHolderEmail: invitation.accountHolderEmail,
      businessId: invitation.businessId,
      businessName: invitation.businessName,
      userId: user.uid,
      email: invitation.inviteEmail,
      displayName: displayName || user.displayName || '',
      role: invitation.role,
      status: 'active',
      joinedAt: new Date(),
      lastActiveAt: new Date(),
      permissions: getPermissionsForRole(invitation.role)
    };

    const teamMemberDoc = await adminDb.collection('teamMembers').add({
      ...teamMember,
      joinedAt: FieldValue.serverTimestamp(),
      lastActiveAt: FieldValue.serverTimestamp(),
    });

    // 4. Update invitation status
    await adminDb.collection('teamInvitations').doc(invitation.id!).update({
      status: 'accepted',
      acceptedAt: FieldValue.serverTimestamp(),
    });

    // 5. Create user profile (optional)
    await adminDb.collection('users').doc(user.uid).set({
      email: user.email,
      displayName: displayName,
      isTeamMember: true,
      accountHolderId: invitation.accountHolderId,
      businessId: invitation.businessId,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    const successResponse = {
      success: true,
      userId: user.uid,
      teamMember: {
        ...teamMember,
        id: teamMemberDoc.id
      }
    };

    // Encrypt response if publicKey is provided
    if (publicKey) {
      const { hybridEncrypt } = await import('../../../../lib/encryption');
      const encryptedResponse = await hybridEncrypt(successResponse, publicKey);
      return NextResponse.json(encryptedResponse);
    }

    return NextResponse.json(successResponse);

  } catch (error) {
    console.error('Error accepting team invitation:', error);

    // Handle specific Firebase Auth errors
    if (error instanceof Error) {
      if (error.message.includes('email-already-in-use')) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }
      if (error.message.includes('weak-password')) {
        return NextResponse.json(
          { error: 'Password is too weak' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

