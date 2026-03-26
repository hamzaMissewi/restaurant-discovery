import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


// Save user consent to PostgreSQL database using Prisma
async function saveUserConsent(userId: string, consent: 'accept' | 'decline') {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        cookieConsent: consent as string,
        cookieConsentDate: new Date(),
        updatedAt: new Date()
      },
      select: {
        id: true,
        cookieConsent: true,
        cookieConsentDate: true
      }
    });

    console.log(`Successfully saved consent ${consent} for user ${userId}`);
    return true;
  } catch (error) {
    console.error('Error saving user consent to database:', error);
    return false;
  }
}

// Get user consent from PostgreSQL database using Prisma
async function getUserConsent(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        cookieConsent: true,
        cookieConsentDate: true
      }
    });

    if (!user) {
      console.log(`User ${userId} not found`);
      return null;
    }

    const consent = user.cookieConsent;
    console.log(`Retrieved consent ${consent} for user ${userId}`);
    return consent;
  } catch (error) {
    console.error('Error getting user consent from database:', error);
    return null;
  }
}

// Create user if not exists (for demo purposes) using Prisma
async function createOrUpdateUser(userId: string, email: string, name: string) {
  try {
    const user = await prisma.user.upsert({
      where: { id: parseInt(userId) },
      update: {
        email,
        name,
        updatedAt: new Date()
      },
      create: {
        id: parseInt(userId),
        email,
        name,
        password: 'demo_hash',
        role: 'client'
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    return user;
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { consent, userId, email, name } = await request.json();

    if (!consent || !['accept', 'decline'].includes(consent)) {
      return NextResponse.json(
        { error: 'Invalid consent value' },
        { status: 400 }
      );
    }

    // Only save to database if user is logged in (userId provided)
    if (userId) {
      // First, ensure user exists in database
      if (email && name) {
        await createOrUpdateUser(userId, email, name);
      }

      const success = await saveUserConsent(userId, consent);

      if (!success) {
        return NextResponse.json(
          { error: 'Failed to save consent to database - user may not exist' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: true, message: 'Consent saved successfully', consent },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error saving cookie consent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const consent = await getUserConsent(userId);

    return NextResponse.json(
      {
        userId,
        consent,
        message: consent ? 'Consent retrieved successfully' : 'No consent found for user'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error getting cookie consent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
