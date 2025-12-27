"use server";

import Link from "next/link";
import { Menu, ChevronDown, ShieldAlert, Mail, Info, User, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import LogoutButton from "./LogoutButton";
import { getUserInfo } from "@/service/auth/getUserInfo";

const PublicNavbar = async () => {
  const user = await getUserInfo();
  const role = user?.role;
  const isLoggedIn = !!user?.email;

  const publicNav = [
    { href: "/", label: "Home" },
    { href: "/allTravelPlan", label: "Explore Travelers" },
    { href: "/find-buddy", label: "Find Travel Buddy" },
  ];

  const userNav = [
    { href: "/", label: "Home" },
    { href: "/allTravelPlan", label: "Explore Travelers" },
    { href: "/dashboard/my-travel-plan", label: "My Travel Plans" },
    { href: "/find-buddy", label: "Find Travel Buddy" },
  ];

  const adminNav = [
    { href: "/", label: "Home" },
    { href: "/admin/dashboard", label: "Admin Dashboard" },
    { href: "/admin/dashboard/user-management", label: "Manage Users" },
    { href: "/admin/dashboard/travel-management", label: "Manage Travel Plans" },
  ];

  const resourceItems = [
    { href: "/about", label: "About Us", icon: Info },
    { href: "/contact", label: "Contact Support", icon: Mail },
    { href: "/privacy", label: "Privacy & Terms", icon: ShieldAlert },
  ];

  let navItems = publicNav;
  if (isLoggedIn && role === "USER") navItems = userNav;
  if (isLoggedIn && role === "ADMIN") navItems = adminNav;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          TripMates Hub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
            >
              {item.label}
            </Link>
          ))}

          {/* Help Center Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50/50 outline-none transition-all font-medium">
              Help Center <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl bg-white border border-gray-100 shadow-xl">
              {resourceItems.map((res) => (
                <DropdownMenuItem key={res.label} asChild>
                  <Link href={res.href} className="flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-blue-50">
                    <res.icon size={16} className="text-blue-600" />
                    <span className="text-sm">{res.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Action / Profile Area */}
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="rounded-full">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700 px-6">Register</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {role === "USER" && (
                <Link href="/dashboard/pricing-page" className="hidden lg:block">
                  <Button variant="outline" size="sm" className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50">Upgrade</Button>
                </Link>
              )}

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-9 w-9 border-2 border-blue-100 hover:border-blue-400 transition-all">
                    <AvatarImage src={user?.profileImage || ""} alt={user?.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl mt-2">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={role === "ADMIN" ? "/admin/dashboard/admin-profile" : "/dashboard/my-profile"} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={role === "ADMIN" ? "/admin/dashboard" : "/dashboard"} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <div className="p-1">
                    <LogoutButton />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Mobile Menu (Sheet) */}
        <div className="lg:hidden flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetTitle className="text-left text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TripMates</SheetTitle>
              <div className="mt-8 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href} className="text-lg font-medium hover:text-blue-600">
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Help Center</p>
                  {resourceItems.map((res) => (
                    <Link key={res.label} href={res.href} className="flex items-center gap-3 py-2 text-md text-gray-600">
                      <res.icon size={18} /> {res.label}
                    </Link>
                  ))}
                </div>
                <div className="pt-6 border-t mt-auto">
                  {!isLoggedIn ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                      <Link href="/register"><Button className="w-full bg-blue-600">Register</Button></Link>
                    </div>
                  ) : (
                    <LogoutButton />
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
