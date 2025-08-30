'use client';

import {
  ArrowUpRight,
  AudioWaveform,
  Command,
  ExternalLink,
  GalleryVerticalEnd,
  LayoutDashboard,
  SquareTerminal,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'shared/ui/sidebar';

import { TeamSwitcher } from './team-switcher';

import React from 'react';

interface NavigationItem {
  icon: React.ComponentType<any>;
  label: string;
  path: string;
  openInNewTab?: boolean;
}

function VelociLogicAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const navigationItems: NavigationItem[] = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/app/studio/analytics/3456789?id=djasda&dhasd=asdtvasbdad',
      openInNewTab: false,
    },
    {
      icon: SquareTerminal,
      label: 'Studio',
      path: '/app/studio/',
      openInNewTab: true, // This will open in a new tab
    },
  ];

  const handleNavigation = (item: NavigationItem) => {
    if (item.openInNewTab) {
      window.open(item.path, '_blank', 'noopener,noreferrer');
    } else {
      router.push(item.path);
    }
  };

  return (
    <Sidebar collapsible={'offcanvas'} {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[
            {
              name: 'Acme Inc',
              logo: GalleryVerticalEnd,
              plan: 'Enterprise',
            },
            {
              name: 'Acme Corp.',
              logo: AudioWaveform,
              plan: 'Startup',
            },
            {
              name: 'Evil Corp.',
              logo: Command,
              plan: 'Free',
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={index} className="!cursor-pointer">
                    <SidebarMenuButton
                      onClick={() => handleNavigation(item)}
                      className="group"
                    >
                      <Icon />
                      <span>{item.label}</span>
                      {item.openInNewTab && (
                        <ExternalLink className="ml-auto h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}

export { VelociLogicAppSidebar };
