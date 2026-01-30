import { TrendingUp } from "lucide-react";
import { XAxis, Area, AreaChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import EmptyChart from "./empty-chart";
import { useGetUserAnalytics } from "@/hooks/api/user/use-getUserAnalytics";
import { getLast12MonthsRange } from "@/lib/helper";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  profileViews: {
    label: "Profile Views",
    color: "#22c55e", // green
  },
  sessionRequests: {
    label: "Session Requests",
    color: "#ef4444", // red
  },
} satisfies ChartConfig;

const MonthlyAnalytics = () => {
  const { data, isLoading } = useGetUserAnalytics();

  if (isLoading || !data) {
    return (
      <Card className="p-10">
        <Skeleton className="h-80" />
      </Card>
    );
  }

  const chartData = data.analytics;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>{getLast12MonthsRange()}</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <EmptyChart />
        ) : (
          <ChartContainer config={chartConfig} className="sm:h-80 w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}>
              {/* <CartesianGrid vertical={false} /> */}
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillProfileViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillSessionRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="profileViews"
                type="step"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#fillProfileViews)"
                dot={false}
              />
              <Area
                dataKey="sessionRequests"
                type="step"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#fillSessionRequests)"
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing data from the past 12 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default MonthlyAnalytics;
