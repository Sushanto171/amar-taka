import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { FormValues } from "@/types/transactionForm.types";
import type { UseFormReturn } from "react-hook-form";

export function Summary({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <Card className="w-full border-none bg-transparent">
      <CardHeader className="sr-only">
        <CardTitle className="text-lg font-semibold sr-only">Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Phone */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Phone</span>
          <span className="font-medium">{form.getValues("phone") || "-"}</span>
        </div>
        <Separator />

        {/* Amount */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-medium">
            {form.getValues("amount") || 0} BDT
          </span>
        </div>
        <Separator />

        {/* Reference */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Reference</span>
          <span className="font-medium">
            {form.getValues("reference") || "N/A"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
