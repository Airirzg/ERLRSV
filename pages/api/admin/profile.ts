import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });

    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Ensure user has an email
    if (!session.user.email) {
      return res.status(400).json({ error: 'User email is required' });
    }

    switch (req.method) {
      case 'GET':
        try {
          const profile = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
              id: true,
              email: true,
              role: true,
              firstName: true,
              lastName: true,
              phoneNumber: true,
              createdAt: true,
            },
          });

          if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
          }

          return res.status(200).json(profile);
        } catch (error) {
          console.error('Error fetching profile:', error);
          return res.status(500).json({ error: 'Failed to fetch profile' });
        }

      case 'PUT':
        try {
          const { email, firstName, lastName, phoneNumber } = req.body;

          if (!email || !firstName || !lastName) {
            return res.status(400).json({ error: 'Email, first name, and last name are required' });
          }

          const updatedProfile = await prisma.user.update({
            where: { email: session.user.email },
            data: {
              email,
              firstName,
              lastName,
              phoneNumber,
            },
            select: {
              id: true,
              email: true,
              role: true,
              firstName: true,
              lastName: true,
              phoneNumber: true,
              createdAt: true,
            },
          });

          return res.status(200).json(updatedProfile);
        } catch (error) {
          console.error('Error updating profile:', error);
          return res.status(500).json({ error: 'Failed to update profile' });
        }

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Error in profile handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
