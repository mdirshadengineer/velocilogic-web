'use client';

import {
  Bell,
  ChevronDown,
  HelpCircle,
  Search,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from 'shared/ui/avatar';
import { Badge } from 'shared/ui/badge';
import { Button } from 'shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'shared/ui/dropdown-menu';
import { Input } from 'shared/ui/input';
import { NavbarLogo } from 'src/components/ui/resizable-navbar';

import TopbarMenus from './topbar-menus';

const navigationItems = [
  { label: 'All', href: '/', active: true },
  { label: 'Favorites', href: '/favorites' },
  { label: 'History', href: '/history' },
  { label: 'Table Builder', href: '/table-builder' },
  { label: 'Admin', href: '/admin' },
];

export const Topbar = () => {
  return (
    <header className="bg-background/80 sticky top-0 z-50 h-14 border-b backdrop-blur-sm">
      <div className="flex h-full items-center px-4">
        {/* Logo and Brand */}
        {/* <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-primary to-primary/80">
            <span className="text-sm font-bold text-primary-foreground">VL</span>
          </div>
          <span className="text-lg font-medium">VelociLogic</span>
        </div> */}
        <NavbarLogo />

        {/* Navigation Tabs */}
        <TopbarMenus />

        {/* Center Section - Current Context */}
        <div className="flex flex-1 items-center justify-center px-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-border bg-muted/50 flex max-w-md items-center gap-2"
              >
                <span className="truncate text-sm">
                  Table Builder - Low Code Platform
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-64">
              <DropdownMenuItem>
                <span>Switch Project</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Recent Projects</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Create New Project</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search..."
              className="bg-background border-input w-64 pl-9"
            />
          </div>

          {/* Action Buttons */}
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <HelpCircle className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground relative"
          >
            <Bell className="h-4 w-4" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Avatar with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/user.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
