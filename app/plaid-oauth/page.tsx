'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PlaidOAuthRedirect() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get all query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Construct the URL to pass back to the app
    const appUrl = `receiptgold://plaid-oauth?${params.toString()}`;

    // Log for debugging
    console.log('Redirecting to app:', appUrl);

    // Attempt to redirect to the app
    // iOS will intercept this and open the app via universal link
    window.location.href = appUrl;

    // If the app doesn't open after 2 seconds, show instructions
    setTimeout(() => {
      const fallbackElement = document.getElementById('fallback');
      if (fallbackElement) {
        fallbackElement.style.display = 'block';
      }
    }, 2000);
  }, [searchParams]);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#000000',
      color: '#ffffff',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#D4AF37'
        }}>
          Redirecting to ReceiptGold...
        </h1>

        <div style={{
          fontSize: '16px',
          color: '#999',
          marginBottom: '32px'
        }}>
          Please wait while we redirect you back to the app.
        </div>

        {/* Loading indicator */}
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #333',
          borderTop: '3px solid #D4AF37',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 32px'
        }}></div>

        {/* Fallback instructions */}
        <div id="fallback" style={{
          display: 'none',
          padding: '20px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          border: '1px solid #333'
        }}>
          <p style={{
            fontSize: '14px',
            marginBottom: '16px',
            color: '#ccc'
          }}>
            If you're not redirected automatically:
          </p>
          <ol style={{
            textAlign: 'left',
            fontSize: '14px',
            color: '#999',
            lineHeight: '1.6',
            paddingLeft: '20px'
          }}>
            <li>Open the ReceiptGold app manually</li>
            <li>Your bank connection should be complete</li>
          </ol>
        </div>
      </div>

      {/* CSS for loading animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
