'use client';

import { Report } from '@prisma/client';
import { format } from 'date-fns';
import {
  AreaChart,
  BarChart,
  Calendar,
  Edit3,
  LineChart,
  PieChart,
  Plus,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';

import { CreateFormButton } from '../components/ui/create-report-form';

import React, { useEffect, useState } from 'react';

const ReportsList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/report/list');
      const data = await res.json();
      setReports(data);
      console.log('Fetched reports:', data);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    // Implement delete API call here if needed
    setReports(reports.filter(r => r.id !== id));
  };

  // Returns the appropriate chart icon based on chartType
  const getChartIcon = (chartType: string) => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
        );
      case 'pie':
        return (
          <PieChart className="h-6 w-6 text-pink-500 dark:text-pink-400" />
        );
      case 'line':
        return (
          <LineChart className="h-6 w-6 text-green-500 dark:text-green-400" />
        );
      case 'area':
        return (
          <AreaChart className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        );
      case 'calendar':
        return (
          <Calendar className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
        );
      default:
        return (
          <BarChart className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Reports Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create and manage your data visualizations
          </p>
        </div>
        <CreateFormButton />
      </div>

      {reports.length === 0 ? (
        <div className="py-16 text-center">
          <BarChart className="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" />
          <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-gray-100">
            No reports yet
          </h3>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Get started by creating your first report
          </p>
          <button className="inline-flex items-center rounded-lg border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800">
            <Plus className="mr-2 h-5 w-5" />
            Create Your First Report
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map(report => (
            <div
              key={report.id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getChartIcon(
                      typeof report.definition === 'object' &&
                        report.definition !== null &&
                        'chartType' in report.definition
                        ? (report.definition as { chartType?: string })
                            .chartType || ''
                        : ''
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400">
                        {report.name}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                        {report.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link
                      href={`/editor/${report.id}`}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-500 dark:hover:bg-indigo-900 dark:hover:text-indigo-400"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => deleteReport(report.id)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-500 dark:hover:bg-red-900 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {report.description || 'No description provided'}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="mr-1 h-4 w-4" />
                    {report.updatedAt &&
                      format(new Date(report.updatedAt), 'MMM dd, yyyy')}
                  </div>
                  <Link
                    href={`/editor/${report.id}?edit=true`}
                    className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Open →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { ReportsList };
