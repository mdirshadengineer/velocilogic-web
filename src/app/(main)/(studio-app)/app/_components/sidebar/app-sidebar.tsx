'use client';

import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Settings2Icon,
  SquareTerminal,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from 'shared/ui/sidebar';

import { NavMain } from './nav-main';

import React from 'react';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'REST',
          url: '#',
        },
        {
          title: 'GraphQL',
          url: '#',
        },
        {
          title: 'Database',
          url: '#',
        },
      ],
    },
    {
      title: 'Enterprise Tools',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Projects / Workspace',
          url: '#',
        },
        {
          title: 'Template & Blueprints',
          url: '#',
        },
        {
          title: 'Datasource / Integrations',
          url: '#',
        },
        {
          title: 'Marketplace / Plugins',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Governance',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'User Management',
          url: '#',
        },
        {
          title: 'Monitoring & Logs',
          url: '#',
        },
        {
          title: 'Notifications',
          url: '#',
        },
        {
          title: 'Helps & Docs',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! p-4 pr-0"
      variant="floating"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Global</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
