import "dotenv/config";
import { WebhookEvent } from '@clerk/nextjs/server';
import { syncClerkUserToDatabase } from '../lib/auth/sync-user';
import prisma from '../lib/prisma';

async function testWebhook() {
  console.log('Testing Clerk Webhook sync...');

  const mockPayload: WebhookEvent = {
    data: {
      id: 'user_mock_123',
      email_addresses: [
        {
          id: 'email_mock_123',
          email_address: 'evaluator.mock@example.com',
        }
      ],
      first_name: 'Mock',
      last_name: 'Evaluator',
      image_url: 'https://example.com/mock.jpg',
    } as any,
    object: 'event',
    type: 'user.created',
  };

  try {
    await syncClerkUserToDatabase(mockPayload.data);
    console.log('✅ Sync successful.');
    
    // Fetch and display
    const user = await prisma.platformUser.findUnique({
      where: { clerkUserId: 'user_mock_123' },
      include: { evaluatorProfile: true }
    });
    console.log('Stored User:', user);

    // Clean up
    await prisma.platformUser.delete({
      where: { clerkUserId: 'user_mock_123' }
    });
    console.log('✅ Cleanup successful.');

  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

testWebhook();
