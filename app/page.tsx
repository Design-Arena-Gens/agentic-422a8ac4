'use client';

import { useEffect, useState } from 'react';
import {
  Activity,
  Zap,
  Users,
  Settings,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface Stats {
  plugins: number;
  agents: number;
  skills: number;
  orchestrators: number;
  activePlanName: string;
  activeRunId: string;
}

interface Worker {
  id: string;
  label: string;
  status: 'completed' | 'running' | 'pending' | 'failed';
  eta: string | null;
}

interface RunDetails {
  id: string;
  status: string;
  startedAt: string;
  workers: Worker[];
}

interface Report {
  title: string;
  url: string;
  date: string;
}

const StatCard = ({ title, value, loading }: { title: string; value: number | string; loading: boolean }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
    {loading ? (
      <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
    ) : (
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    )}
  </div>
);

const WorkerStatusBadge = ({ status }: { status: Worker['status'] }) => {
  const styles = {
    completed: 'bg-green-100 text-green-800 border-green-200',
    running: 'bg-blue-100 text-blue-800 border-blue-200',
    pending: 'bg-gray-100 text-gray-800 border-gray-200',
    failed: 'bg-red-100 text-red-800 border-red-200'
  };

  const icons = {
    completed: CheckCircle2,
    running: Loader2,
    pending: Clock,
    failed: AlertCircle
  };

  const Icon = icons[status];

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      <Icon className={`w-3 h-3 ${status === 'running' ? 'animate-spin' : ''}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const QuickActionCard = ({ icon: Icon, title, description, onClick }: {
  icon: any;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left w-full"
  >
    <div className="p-2 bg-blue-50 rounded-lg">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </button>
);

export default function Overview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [runDetails, setRunDetails] = useState<RunDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const reports: Report[] = [
    { title: 'System Performance Analysis Q4 2024', url: '/reports/performance-q4', date: '2024-10-28' },
    { title: 'Agent Deployment Success Metrics', url: '/reports/deployment-metrics', date: '2024-10-25' },
    { title: 'Orchestration Efficiency Report', url: '/reports/efficiency', date: '2024-10-22' },
    { title: 'Plugin Integration Summary', url: '/reports/plugin-integration', date: '2024-10-20' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await fetch('/api/stats');
        const statsData = await statsRes.json();
        setStats(statsData);

        if (statsData.activeRunId) {
          const runRes = await fetch(`/api/runs/${statsData.activeRunId}`);
          const runData = await runRes.json();
          setRunDetails(runData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Agents Main Orchestration Suite
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            Centralized control and monitoring for all your AI agent workflows, orchestrations, and deployments.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => console.log('Open Marketplace clicked')}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Open Marketplace
            </button>
            <button
              onClick={() => console.log('Start Workflow clicked')}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-blue-400"
            >
              Start Workflow
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Plugins" value={stats?.plugins ?? '-'} loading={loading} />
          <StatCard title="Agents" value={stats?.agents ?? '-'} loading={loading} />
          <StatCard title="Skills" value={stats?.skills ?? '-'} loading={loading} />
          <StatCard title="Orchestrators" value={stats?.orchestrators ?? '-'} loading={loading} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Active Orchestration Plan */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Active Orchestration Plan</h2>
            </div>

            {loading ? (
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                <div className="space-y-3 mt-6">
                  <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            ) : stats && runDetails ? (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stats.activePlanName}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-sm text-gray-600">Run Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    {runDetails.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Current Workers</h4>
                  {runDetails.workers.map((worker) => (
                    <div key={worker.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{worker.label}</p>
                        {worker.eta && (
                          <p className="text-xs text-gray-500 mt-1">ETA: {worker.eta}</p>
                        )}
                      </div>
                      <WorkerStatusBadge status={worker.status} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-500">No active orchestration plan</p>
            )}
          </div>

          {/* Latest Reports */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Latest Reports</h2>
            </div>

            <div className="space-y-3">
              {reports.map((report, index) => (
                <a
                  key={index}
                  href={report.url}
                  className="block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">{report.title}</h4>
                  <p className="text-xs text-gray-500">{new Date(report.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              icon={Activity}
              title="Workflows"
              description="View and manage active workflows"
              onClick={() => console.log('Navigate to Workflows')}
            />
            <QuickActionCard
              icon={Users}
              title="Agents"
              description="Configure and deploy AI agents"
              onClick={() => console.log('Navigate to Agents')}
            />
            <QuickActionCard
              icon={Settings}
              title="Orchestrators"
              description="Set up orchestration pipelines"
              onClick={() => console.log('Navigate to Orchestrators')}
            />
            <QuickActionCard
              icon={TrendingUp}
              title="Analytics"
              description="Performance metrics and insights"
              onClick={() => console.log('Navigate to Analytics')}
            />
            <QuickActionCard
              icon={FileText}
              title="Documentation"
              description="Guides and API references"
              onClick={() => console.log('Navigate to Documentation')}
            />
            <QuickActionCard
              icon={Zap}
              title="Marketplace"
              description="Browse plugins and extensions"
              onClick={() => console.log('Navigate to Marketplace')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
