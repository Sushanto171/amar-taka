import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "@/features/auth/components/Logout";
import { IUser } from "@/features/user/types/user.types";
import { Home, User } from "lucide-react";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggle";

type UserDropdownProps = {
  user: IUser;
};

export default function UserDropdown({ user }: UserDropdownProps) {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <div className="relative w-10 h-10 ">
          {/* Ping animation circle */}
          <span className="animate-ping w-8 h-8 top-1 left-1 absolute inset-0 inline-flex rounded-full bg-primary opacity-40" />

          {/* Actual button / avatar */}
          <button className="relative w-full h-full cursor-pointer rounded-full border-2 border-primary/10 overflow-hidden flex items-center justify-center bg-background text-foreground">
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </button>
        </div>
      </DropdownMenuTrigger>


      <DropdownMenuContent className="w-52 ">
        <DropdownMenuLabel className="font-semibold bg-accent/10 rounded-md flex justify-between items-center">
          <span className="text-xs text-primary uppercase ">
            {user.role}
          </span>
          <ModeToggle />
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-semibold">
          {user.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {user.email}
        </DropdownMenuLabel>


        <DropdownMenuSeparator />
        <Link to="profile">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
        </Link>

        <Link to="/">
          <DropdownMenuItem>
            <Home className="mr-2 h-4 w-4" />
            Home
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Logout width="full" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}