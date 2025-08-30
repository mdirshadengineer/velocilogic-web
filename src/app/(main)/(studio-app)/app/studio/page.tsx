'use client';

import {
  ArrowRightCircle,
  Code,
  Database,
  DatabaseIcon,
  FileText,
  LayoutDashboardIcon,
  PieChart,
  Play,
  Plus,
  TrendingUpDownIcon,
  Workflow,
  WorkflowIcon,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from 'shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'shared/ui/dropdown-menu';

import { Fragment, useState } from 'react';

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  gradient: string;
  badge: string;
  badgeColor: string;
}

const quickStartTemplates = [
  {
    title: 'Start a Web App',
    icon: Code,
    color: 'text-blue-600',
    description: 'Kickstart your application development with this template.',
  },
  {
    title: 'Build a Workflow',
    icon: Workflow,
    color: 'text-purple-600',
    description: 'Automate your processes with this workflow template.',
  },
  {
    title: 'Import Data',
    icon: Database,
    color: 'text-green-600',
    description: 'Easily import data from various sources with this template.',
  },
  {
    title: 'Create Dashboard',
    icon: PieChart,
    color: 'text-orange-600',
    description: 'Visualize your data with this dashboard template.',
  },
];

const modules: ModuleCard[] = [
  {
    id: 'app-builder',
    title: 'App Builder',
    description:
      'Build responsive web applications with drag-and-drop components.',
    icon: LayoutDashboardIcon,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    badge: '12 Apps',
    badgeColor:
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    id: 'automation-builder',
    title: 'Automation Builder',
    description:
      'Create powerful workflows with our visual node-based designer.',
    icon: WorkflowIcon,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600',
    badge: '8 Workflows',
    badgeColor:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Manage your data with intuitive low-code table builders.',
    icon: DatabaseIcon,
    color: 'text-indigo-600',
    gradient: 'from-indigo-500 to-indigo-600',
    badge: '15 Tables',
    badgeColor:
      'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Unlock insights with powerful analytics and visualizations.',
    icon: TrendingUpDownIcon,
    color: 'text-teal-600',
    gradient: 'from-teal-500 to-teal-600',
    badge: '18 Reports',
    badgeColor:
      'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  },
];

export default function VelociLogicStudioPage() {
  const [launchingModule, setLaunchingModule] = useState<string | null>(null);

  const handleLaunch = async (moduleId: string) => {
    setLaunchingModule(moduleId);

    // Simulate launch process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Here you would navigate to the module or perform the actual launch
    console.log(`Launching ${moduleId}`);

    setLaunchingModule(null);
  };

  const handleQuickAction = (moduleId: string, action: string) => {
    console.log(`${action} for module ${moduleId}`);
  };

  const getModuleTypeLabel = (moduleId: string) => {
    switch (moduleId) {
      case 'app-builder':
        return 'App';
      case 'automation-builder':
        return 'Workflow';
      case 'database':
        return 'Table';
      case 'analytics':
        return 'Report';
      default:
        return 'Item';
    }
  };

  // Shadcn DropdownMenu for Quick Actions
  const renderQuickActionsButton = (moduleId: string) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="px-3 transition-transform hover:scale-105"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => handleQuickAction(moduleId, 'create-new')}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New {getModuleTypeLabel(moduleId)}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleQuickAction(moduleId, 'import')}>
          <ArrowRightCircle className="mr-2 h-4 w-4" />
          Import Template
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleQuickAction(moduleId, 'browse')}>
          <FileText className="mr-2 h-4 w-4" />
          Browse Examples
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <Fragment>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>

      <div className="space-y-4">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl">
          <Image
            src="/platform-hero.jpg"
            alt="Platform overview"
            fill
            className="h-full w-full object-cover"
            priority
          />
          <div className="from-background/90 to-background/20 absolute inset-0 bg-gradient-to-r"></div>
          <div className="relative px-8 py-12">
            <div className="max-w-2xl">
              <h1 className="text-foreground mb-4 text-4xl font-bold">
                Build Enterprise Applications
                <span className="text-primary block">Without Code</span>
              </h1>
              <p className="text-muted-foreground mb-6 text-lg">
                Create powerful business applications with our visual low-code
                platform. Connect to any database, build custom workflows, and
                deploy instantly.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="h-12 px-8">
                  Create New Project
                  <ArrowRightCircle className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8">
                  View Templates
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section>
          <div>
            <h4 className="text-foreground my-6 text-xl font-semibold">
              Quick Start Templates
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickStartTemplates.map(template => {
                const Icon = template.icon;
                return (
                  <Card
                    key={template.title}
                    className="cursor-pointer transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {template.title}
                      </CardTitle>
                      <Icon className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-xs">
                        {template.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section>
          <h4 className="text-foreground my-6 text-xl font-semibold">
            Modules
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {modules.map(module => {
              const Icon = module.icon;
              const isLaunching = launchingModule === module.id;

              return (
                <Card
                  key={module.id}
                  className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={`rounded-xl bg-gradient-to-br p-3 ${module.gradient} shadow-md`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${module.badgeColor}`}
                      >
                        {module.badge}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardTitle className="group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                      {module.title}
                    </CardTitle>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {module.description}
                    </p>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className={`relative flex-1 overflow-hidden transition-all duration-300 ${
                          isLaunching ? 'animate-pulse-glow' : ''
                        }`}
                        onClick={() => handleLaunch(module.id)}
                        disabled={isLaunching}
                      >
                        {isLaunching ? (
                          <>
                            <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            <div className="relative z-10 flex items-center">
                              <div
                                className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                                style={{
                                  animation: 'spin 1s linear infinite',
                                }}
                              ></div>
                              Launching...
                            </div>
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Launch
                          </>
                        )}
                      </Button>

                      {renderQuickActionsButton(module.id)}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </Fragment>
  );
}
