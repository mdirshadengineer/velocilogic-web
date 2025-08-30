import { SidebarInset, SidebarProvider } from 'shared/ui/sidebar';
import { VelociLogicAppSidebar } from 'src/app/(main)/(app)/_components/sidebar/app-sidebar';

import { VelociLogicAppHeader } from './_components/header/app-header';

export default function VelociLogicAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="velocilogic-app-layout">
      <SidebarProvider
        id="velocilogic-app-sidebar"
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 16)',
          } as React.CSSProperties
        }
      >
        <VelociLogicAppSidebar variant="inset" />
        <SidebarInset>
          <VelociLogicAppHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
