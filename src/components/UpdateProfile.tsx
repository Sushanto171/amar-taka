/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { IUser } from "@/features/user/types/user.types";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useUpdateUserMutation } from "@/redux/features/user/user.api";
import { ImagePlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ButtonLoader from "./ButtonLoader";

// Bangladesh phone regex: +8801XXXXXXXXX, 8801XXXXXXXXX, 01XXXXXXXXX
const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
const schema = z.object({
  name: z.string().min(1, "First name is required"),
  phone: z
    .string({
      error: "Phone number is required",
    })
    .regex(bdPhoneRegex, { message: "Invalid Bangladesh phone number format" }),
  email: z.email({ error: "Invalid email type" }).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function UpdateProfile({ user }: { user: IUser }) {
  const [open, setOpen] = useState<boolean>(false);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await updateProfile({ ...values, _id: user._id }).unwrap();
      toast.success(res.message);
      setOpen(false);
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader>
          <DialogTitle className="border-b px-6 py-4 text-base">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="sr-only">
            Update your MFS user profile details here.
          </DialogDescription>
        </DialogHeader>

        <ProfileBg />
        <Avatar />

        <div className="px-6 pt-4 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/*  Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="type name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Wallet */}
              <div>
                <FormLabel>Wallet ID</FormLabel>
                <Input value={user.wallet} disabled />
              </div>

              {/* Role */}
              <div>
                <FormLabel>Role</FormLabel>
                <Badge variant="secondary">{user.role}</Badge>
              </div>

              {/* Verification */}
              <div>
                <FormLabel>Verification</FormLabel>
                {user.isVerified ? (
                  <Badge variant="default" className="bg-green-600 text-white">
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="destructive">Unverified</Badge>
                )}
              </div>

              {/* Footer buttons */}
              <DialogFooter className="border-t px-6 py-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                  <ButtonLoader spin={isLoading} />
                  {isLoading ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProfileBg() {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const currentImage = files[0]?.preview || null;

  return (
    <div className="h-32 relative">
      {currentImage ? (
        <img
          className="w-full h-full object-cover"
          src={currentImage}
          alt="Profile background"
        />
      ) : (
        <div className="bg-muted w-full h-full flex items-center justify-center">
          <span>No background</span>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center gap-2">
        <button
          type="button"
          className="bg-black/60 text-white rounded-full p-2"
          onClick={openFileDialog}
        >
          <ImagePlusIcon size={16} />
        </button>
        {currentImage && (
          <button
            type="button"
            className="bg-black/60 text-white rounded-full p-2"
            onClick={() => removeFile(files[0]?.id)}
          >
            <XIcon size={16} />
          </button>
        )}
      </div>

      <input {...getInputProps()} className="sr-only" />
    </div>
  );
}

function Avatar() {
  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
  });

  const currentImage = files[0]?.preview || null;

  return (
    <div className="-mt-10 px-6">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-background">
        {currentImage ? (
          <img
            src={currentImage}
            alt="Profile avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-muted w-full h-full flex items-center justify-center">
            <span>No avatar</span>
          </div>
        )}
        <button
          type="button"
          className="absolute bottom-0 right-0 bg-black/60 text-white rounded-full p-2"
          onClick={openFileDialog}
        >
          <ImagePlusIcon size={16} />
        </button>
        <input {...getInputProps()} className="sr-only" />
      </div>
    </div>
  );
}
