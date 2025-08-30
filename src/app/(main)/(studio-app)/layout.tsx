import { SidebarInset, SidebarProvider } from 'shared/ui/sidebar';

import { AppSidebar } from './app/_components/sidebar/app-sidebar';
import { Topbar } from './app/_components/topbar';

import { ReactNode } from 'react';

interface VelociLogicStudioLayoutProps {
  children: ReactNode;
}

export default function VelociLogicStudioLayout({
  children,
}: Readonly<VelociLogicStudioLayoutProps>) {
  return (
    <div
      id="velocilogic-studio-app-layout"
      style={
        {
          '--body-height': '100% !important',
        } as React.CSSProperties
      }
      className="flex min-h-screen flex-col [--header-height:calc(--spacing(14))]"
    >
      <Topbar />
      <SidebarProvider
        className="min-h-[var(--body-height)]"
        style={
          {
            '--sidebar-width': '19rem',
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
