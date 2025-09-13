import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IUser } from "@/features/user/types/user.types";
import { ShieldCheck, ShieldX } from "lucide-react";
import UpdateProfile from "./UpdateProfile";

export default function ProfileCard({ user }: { user: IUser }) {
  return (
    <Card className="w-full shadow-lg rounded-xl">
      <CardHeader className="flex flex-col items-center space-y-3">
        <Avatar className="h-16 w-16">
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl font-semibold">{user.name}</CardTitle>
        <Badge
          variant={user.role === "ADMIN" ? "destructive" : "secondary"}
          className="px-3 py-1"
        >
          {user.role}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Phone</span>
          <span>{user.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Wallet ID</span>
          <span>{user.wallet.slice(0, 8)}...</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status</span>
          {user.isSuspended ? (
            <Badge variant="destructive">Suspended</Badge>
          ) : (
            <Badge variant="default">Active</Badge>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Verification</span>
          {user.isVerified ? (
            <ShieldCheck size={18} className="text-green-600" />
          ) : (
            <ShieldX size={18} className="text-red-600" />
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Failed Attempts</span>
          <span>{user.failedLoginAttempts}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Created</span>
          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Updated</span>
          <span>{new Date(user.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardContent>

      {/* Footer with Update Button */}
      <CardFooter className="flex justify-center pt-2">
        {/* <Button variant="secondary">Update Profile</Button> */}
        <UpdateProfile />
      </CardFooter>
    </Card>
  );
}
