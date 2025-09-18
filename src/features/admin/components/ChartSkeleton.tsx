"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

export function ChartSkeleton({ children }: { children: ReactNode }) {
  return (
    <Card>
      <CardHeader>{children}</CardHeader>
      <CardContent className="h-[420px] md:h-[210px]"></CardContent>
    </Card>
  );
}
