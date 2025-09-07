import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';
import { TeamInvitation } from '../../../../types/team';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Query Firestore for the invitation using Admin SDK
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

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    const invitation: TeamInvitation = {
      id: doc.id,
      accountHolderId: data.accountHolderId,
      accountHolderEmail: data.accountHolderEmail,
      accountHolderName: data.accountHolderName,
      businessId: data.businessId,
      businessName: data.businessName,
      inviteEmail: data.inviteEmail,
      status: data.status,
      token: data.token,
      role: data.role,
      expiresAt: data.expiresAt?.toDate ? data.expiresAt.toDate() : new Date(data.expiresAt),
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
      acceptedAt: data.acceptedAt?.toDate ? data.acceptedAt.toDate() : undefined,
      revokedAt: data.revokedAt?.toDate ? data.revokedAt.toDate() : undefined,
    };

    // Check if invitation has expired
    if (new Date() > invitation.expiresAt) {
      return NextResponse.json(
        { error: 'Invitation has expired' },
        { status: 410 }
      );
    }

    return NextResponse.json(invitation);

  } catch (error) {
    console.error('Error validating team invitation token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}