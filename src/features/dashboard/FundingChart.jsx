import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Card from "../../components/ui/Card";

export default function FundingChart() {
  const axiosSecure = useAxiosSecure();

  const { data: allFunding10 = [] } = useQuery({
    queryKey: ["allFunding10"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allFunding10");
      return res.data;
    },
  });

  const amountDateArray = allFunding10.map((funding) => ({
    amount: funding.amount,
    date: format(new Date(funding.date), "dd MMM"),
  }));

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Recent Funding Activity
          </h3>
          <p className="text-xs text-slate-500">
            Last 10 contributions by date (USD)
          </p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={amountDateArray}
            margin={{ top: 8, right: 16, left: 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
                fontSize: "13px",
              }}
            />
            <Bar
              dataKey="amount"
              fill="#e11d48"
              radius={[6, 6, 0, 0]}
              maxBarSize={42}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
