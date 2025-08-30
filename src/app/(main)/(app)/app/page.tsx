import { Activity, TrendingUp, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from 'shared/ui/card';

import { Fragment } from 'react';

const stats = [
  { label: 'Active Projects', value: '12', icon: Activity, trend: '+2.5%' },
  { label: 'Total Users', value: '1,284', icon: Users, trend: '+12.3%' },
  { label: 'API Calls', value: '54.2K', icon: Zap, trend: '+8.1%' },
  { label: 'Performance', value: '98.5%', icon: TrendingUp, trend: '+0.2%' },
];

export default async function VelociLogicAppPage() {
  return (
    <Fragment>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 px-4 py-4">
            {/* Stats Section */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map(stat => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-muted-foreground text-sm font-medium">
                        {stat.label}
                      </CardTitle>
                      <Icon className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs font-medium text-emerald-600">
                        {stat.trend} from last month
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
