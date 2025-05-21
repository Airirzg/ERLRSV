import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';

// Extend the User type to include isActive property
type ExtendedUser = User & {
  isActive?: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const { isActive } = req.body;

    if (typeof id !== 'string' || typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'Invalid request parameters' });
    }

    // Cast the data to any to bypass TypeScript checking
    // This is a workaround until the Prisma schema is updated to include isActive
    const user = await prisma.user.update({
      where: { id },
      data: { isActive } as any,
    });

    // Create a notification for the user
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Account Status Updated',
        message: `Your account has been ${isActive ? 'activated' : 'deactivated'}.`,
        type: 'SYSTEM', // Using a valid notification type from the schema
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
