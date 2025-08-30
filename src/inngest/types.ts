import { EventSchemas } from 'inngest';

type WorkflowListEventSent = {
  name: 'velocilogic-workflowlist/event.sent';
  data: {
    id: string;
  };
};

type ReportListEventSent = {
  name: 'velocilogic-reportlist/event.sent';
  data: {
    id: string;
  };
};

export const schemas = new EventSchemas().fromUnion<
  WorkflowListEventSent | ReportListEventSent
>();
