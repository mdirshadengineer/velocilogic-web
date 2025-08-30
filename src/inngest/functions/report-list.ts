import { prisma } from 'src/lib/db/prisma';

import { inngest } from '../client';

export default inngest.createFunction(
  {
    id: 'velocilogic-reportlist',
  },
  { event: 'velocilogic-reportlist/event.sent' },
  async ({ event, step }) => {
    // Fetch all reports from the database
    const reports = await prisma.report.findMany();

    return {
      status: 200,
      body: reports, // Return the complete list
    };
  }
);
