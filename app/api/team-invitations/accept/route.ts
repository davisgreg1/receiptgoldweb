import { NextRequest, NextResponse } from 'next/server';
import { db, auth } from '../../../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc, addDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { TeamInvitation, TeamMember, TeamMemberRole } from '../../../../types/team';

interface AcceptInvitationRequest {
  token: string;
  password: string;
  displayName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AcceptInvitationRequest = await request.json();
    const { token, password, displayName } = body;

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

    // 1. Find and validate the invitation
    const invitationsRef = collection(db, 'teamInvitations');
    const q = query(
      invitationsRef,
      where('token', '==', token),
      where('status', '==', 'pending')
    );
    
    const querySnapshot = await getDocs(q);
    
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

    // 2. Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      invitation.inviteEmail, 
      password
    );
    const user = userCredential.user;

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
      permissions: getDefaultPermissions(invitation.role)
    };

    const teamMemberDoc = await addDoc(collection(db, 'teamMembers'), {
      ...teamMember,
      joinedAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
    });

    // 4. Update invitation status
    await updateDoc(doc(db, 'teamInvitations', invitation.id!), {
      status: 'accepted',
      acceptedAt: serverTimestamp(),
    });

    // 5. Create user profile (optional)
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: displayName,
      isTeamMember: true,
      accountHolderId: invitation.accountHolderId,
      businessId: invitation.businessId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      userId: user.uid,
      teamMember: {
        ...teamMember,
        id: teamMemberDoc.id
      }
    });

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

// Helper function that would be used in the real implementation
function getDefaultPermissions(role: 'teammate' | 'admin') {
  switch (role) {
    case 'teammate':
      return {
        canCreateReceipts: true,
        canEditOwnReceipts: true,
        canDeleteOwnReceipts: true,
        canViewTeamReceipts: false,
      };
    case 'admin':
      return {
        canCreateReceipts: true,
        canEditOwnReceipts: true,
        canDeleteOwnReceipts: true,
        canViewTeamReceipts: true,
      };
    default:
      return {
        canCreateReceipts: false,
        canEditOwnReceipts: false,
        canDeleteOwnReceipts: false,
        canViewTeamReceipts: false,
      };
  }
}