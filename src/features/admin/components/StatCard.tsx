import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-medium truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
