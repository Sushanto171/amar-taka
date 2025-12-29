/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function StatsSection() {
  const stats = [
    { value: 1_000_000, label: "Active Users", suffix: "+" },
    { value: 500_000_000, label: "Transacted", prefix: "$", suffix: "+" },
    { value: 99.9, label: "Uptime", suffix: "%" },
    { value: 24, label: "Support", suffix: "/7" },
  ];

  return (
    <div className="w-full border-y border-border-light dark:border-border-dark bg-surface dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => {
            const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

            return (
              <Card key={idx} ref={ref} className="p-6 bg-transparent shadow-none border-none">
                <CardContent className="flex flex-col gap-2 items-center">
                  <h3 className="text-3xl font-black text-primary">
                    {inView ? (
                      <CountUp
                        end={stat.value}
                        duration={2}
                        separator=","
                        prefix={stat.prefix || ""}
                        suffix={stat.suffix || ""}
                      />
                    ) : (
                      0
                    )}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
