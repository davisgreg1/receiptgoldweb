import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../../../lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user is a team member
    const teamMembersRef = adminDb.collection('teamMembers');
    const querySnapshot = await teamMembersRef
      .where('userId', '==', userId)
      .where('status', '==', 'active')
      .get();

    if (!querySnapshot.empty) {
      // User is a team member
      const teamMemberDoc = querySnapshot.docs[0];
      const teamMemberData = teamMemberDoc.data();

      const teamMember = {
        id: teamMemberDoc.id,
        accountHolderId: teamMemberData.accountHolderId,
        accountHolderEmail: teamMemberData.accountHolderEmail,
        businessId: teamMemberData.businessId,
        businessName: teamMemberData.businessName,
        userId: teamMemberData.userId,
        email: teamMemberData.email,
        displayName: teamMemberData.displayName,
        role: teamMemberData.role,
        status: teamMemberData.status,
        joinedAt: teamMemberData.joinedAt?.toDate ? teamMemberData.joinedAt.toDate() : new Date(teamMemberData.joinedAt),
        lastActiveAt: teamMemberData.lastActiveAt?.toDate ? teamMemberData.lastActiveAt.toDate() : new Date(teamMemberData.lastActiveAt),
        permissions: teamMemberData.permissions,
      };

      return NextResponse.json({
        isTeamMember: true,
        isAccountHolder: false,
        teamMember: teamMember,
      });
    } else {
      // User is not a team member (account holder or regular user)
      return NextResponse.json({
        isTeamMember: false,
        isAccountHolder: true,
      });
    }
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}