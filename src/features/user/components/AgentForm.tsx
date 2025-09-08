"use client";

import SinglePhotoUploader from "@/components/SiglePhotoUploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentCoreZodSchema } from "../types/agentForm.types";

type AgentFormValues = z.infer<typeof agentCoreZodSchema>;

export default function AgentForm() {
  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentCoreZodSchema),
    defaultValues: {
      agentCode: "",
      licenseNumber: "",
      nidNumber: "",
      nidPhotoUrl: {
        frontend: undefined,
        backend: undefined,
      },
      serviceAreas: [""],
    },
  });

  const onSubmit = (values: AgentFormValues) => {
    console.log("Form Submitted:", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8  p-6 rounded-lg shadow-md"
      >
        {/* Section 1: Agent Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Agent Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Agent Code */}
            <FormField
              control={form.control}
              name="agentCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Code</FormLabel>
                  <FormControl>
                    <Input placeholder="AGT-2025001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* License Number */}
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="License Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NID Number */}
            <FormField
              control={form.control}
              name="nidNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NID Number</FormLabel>
                  <FormControl>
                    <Input placeholder="10, 13 or 17 digits" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 2: NID Photos */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">NID Photos</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nidPhotoUrl.frontend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Front Photo</FormLabel>
                  <FormControl>
                    <SinglePhotoUploader field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nidPhotoUrl.backend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Back Photo</FormLabel>
                  <FormControl>
                    <SinglePhotoUploader field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 3: Service Areas */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Service Areas</h2>
          <FormField
            control={form.control}
            name="serviceAreas"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center mb-2">
                  <FormLabel>Add Service Areas</FormLabel>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => field.onChange([...field.value, ""])}
                  >
                    Add Area
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {field.value.map((area, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        {...field}
                        value={area}
                        onChange={(e) => {
                          const copy = [...field.value];
                          copy[index] = e.target.value;
                          field.onChange(copy);
                        }}
                        placeholder={`Service Area ${index + 1}`}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          const copy = field.value.filter(
                            (_, i) => i !== index
                          );
                          field.onChange(copy);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
