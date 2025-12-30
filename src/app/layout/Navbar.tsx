"use client";

import LoadingSpinner from "@/components/Loading";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { role } from "@/constant/role";
import Logout from "@/features/auth/components/Logout";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { Menu, Wallet } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

/* ----------------------------- Navigation Data ----------------------------- */

const serviceMenuItems = [
  { href: "/service", label: "Our Services" },
  { href: "/service/#sendMoney", label: "Send Money" },
  { href: "/service/#deposit", label: "Deposit" },
  { href: "/service/#cashOut", label: "Cash Out" },
  { href: "/service/#payBill", label: "Pay Bill" },
];

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/user", label: "Dashboard", role: role.user },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/agent", label: "Dashboard", role: role.agent },
  { href: "/about", label: "About", role: "PUBLIC" },
  {
    href: "/service",
    label: "Service",
    role: "PUBLIC",
    megaMenu: serviceMenuItems,
  },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
];

/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const { pathname } = useLocation();
  const { data, isLoading } = useGetMeQuery(undefined);
  const [hovered, setHovered] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 h-20 items-center">
        {/* ------------------------------------------------------------------ */}
        {/* Left: Logo                                                         */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex items-center">
          <Link to="/" className="text-primary hover:text-primary/90 flex items-center gap-2">
            <Wallet className="w-6 h-6" />
            <h3 className="text-xl font-bold  text-foreground">Amar Taka</h3>
          </Link>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Center: Navigation (md+)                                            */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden md:flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4 items-center">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href;

                /* ------------------------- Mega Menu ------------------------ */
                if (link.megaMenu && link.role === "PUBLIC") {
                  return (
                    <Popover
                      key={link.href}
                      open={hovered}
                      onOpenChange={setHovered}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onMouseEnter={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                          className={`font-medium ${isActive
                            ? "text-primary"
                            : "text-muted-foreground"
                            }`}
                        >
                          {link.label}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        align="start"
                        className="w-64 p-0"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      >
                        <Card className="border-none shadow-none">
                          <CardContent className="p-4">
                            <ul className="flex flex-col gap-2">
                              {link.megaMenu.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    to={item.href}
                                    className="block px-3 py-2 rounded-md hover:bg-primary/10 transition"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </PopoverContent>
                    </Popover>
                  );
                }

                /* ------------------------ Regular Link ----------------------- */
                if (link.role === "PUBLIC" || link.role === data?.role) {
                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild active={isActive}>
                        <Link
                          to={link.href}
                          className={`px-2 py-1.5 font-medium transition-colors ${isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                            }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }

                return null;
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Right: Actions (md+)                                                */}
        {/* ------------------------------------------------------------------ */}
        <div className="hidden md:flex justify-end items-center gap-2">
          <ModeToggle />
          {data ? (
            <Logout width="" />
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Mobile Menu                                                        */}
        {/* ------------------------------------------------------------------ */}
        <div className="flex md:hidden justify-end items-center gap-2 col-span-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="bottom" className="h-full p-6">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-4 overflow-auto">
                {navigationLinks.map((link) => {
                  if (link.role === "PUBLIC" || link.role === data?.role) {
                    if (link.megaMenu) {
                      return (
                        <div key={link.href} className="flex flex-col gap-2">
                          <span className="font-medium">{link.label}</span>
                          {link.megaMenu.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="pl-3 text-muted-foreground hover:text-primary"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="font-medium text-muted-foreground hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    );
                  }
                  return null;
                })}
              </nav>

              <div className="mt-6 flex flex-col gap-2">
                {data ? (
                  <Logout width="" />
                ) : (
                  <>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
