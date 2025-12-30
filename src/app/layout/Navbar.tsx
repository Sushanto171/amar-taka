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

// Mega menu items for Service
const serviceMenuItems = [
  { href: "/service", label: "Our Services" },
  { href: "/service/#sendMoney", label: "Send Money" },
  { href: "/service/#deposit", label: "Deposit" },
  { href: "/service/#cashOut", label: "Cash Out" },
  { href: "/service/#payBill", label: "Pay Bill" },
];

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/service", label: "Service", role: "PUBLIC", megaMenu: serviceMenuItems },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/agent", label: "Dashboard", role: role.agent },
  { href: "/user", label: "Dashboard", role: role.user },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { data, isLoading } = useGetMeQuery(undefined);
  const [hovered, setHovered] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  return (
    <header className="sticky top-0 backdrop-blur-xl border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-20 justify-between items-center">
        {/* Left: Logo + Desktop Menu */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-primary hover:text-primary/90">
            <Wallet className="w-6 h-6" />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="h-full hidden md:flex">
            <NavigationMenuList className="h-full flex gap-4 items-center">
              {navigationLinks.map((link) => {
                const isActive = link.href === pathname;

                // Mega menu
                if (link.megaMenu) {
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
                          className={`font-medium ${isActive ? "text-primary" : "text-muted-foreground"
                            } hover:text-primary transition-colors`}
                        >
                          {link.label}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-64 bg-background-dark p-0 rounded-lg shadow-lg"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        align="start"
                      >
                        <Card className="bg-background border-none shadow-none">
                          <CardContent className="p-4">
                            <ul className="flex flex-col gap-2">
                              {link.megaMenu.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    to={item.href}
                                    className={`block py-2 px-3 rounded transition-all hover:bg-primary/10 hover:text-primary ${pathname === item.href
                                      ? "text-primary"
                                      : ""
                                      }`}
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

                // Regular links
                if (link.role === "PUBLIC" || link.role === data?.role) {
                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild active={isActive}>
                        <Link
                          to={link.href}
                          className={`py-1.5 px-2 font-medium rounded transition-colors ${isActive
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

        {/* Right: Mode toggle + Auth */}
        <div className="hidden md:flex items-center gap-2">
          <ModeToggle />
          {data ? (
            <Logout width={""} />
          ) : (
            <>
              <Button asChild variant="outline" size="sm" className="bg-transparent">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="text-background!">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-2 ">
          <ModeToggle />
          <Sheet >
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-full p-6 md:hidden">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4 h-screen overflow-auto">
                {navigationLinks.map((link) => {
                  if (link.role === "PUBLIC" || link.role === data?.role) {
                    if (link.megaMenu) {
                      return (
                        <div key={link.href} className="flex flex-col gap-2">
                          <span className="font-medium">{link.label}</span>
                          <ul className="pl-2 flex flex-col gap-2">
                            {link.megaMenu.map((item) => (
                              <li key={item.href}>
                                <Link
                                  to={item.href}
                                  className={`block py-2 px-3 rounded transition-colors ${pathname === item.href
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-primary"
                                    }`}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`block py-2 px-3 rounded transition-colors ${pathname === link.href
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                          }`}
                      >
                        {link.label}
                      </Link>
                    );
                  }
                  return null;
                })}
              </nav>

              {/* Auth Buttons */}
              <div className="mt-6 flex flex-col gap-2">
                {!data ? (
                  <>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                ) : (
                  <Logout width={""} />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
