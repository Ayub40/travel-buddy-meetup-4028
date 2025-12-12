"use server";


// export const dynamic = "force-dynamic";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";

import LogoutButton from "./LogoutButton";
import { getUserInfo } from "@/service/auth/getUserInfo";

const PublicNavbar = async () => {
  const user = await getUserInfo();

  const role = user?.role;
  const isLoggedIn = !!user?.email;

  // Logged Out Menu
  const publicNav = [
    { href: "/", label: "Home" },
    { href: "/allTravelPlan", label: "Explore Travelers" },
    { href: "/find-buddy", label: "Find Travel Buddy" },
  ];

  // USER Logged In
  const userNav = [
    { href: "/", label: "Home" },
    { href: "/allTravelPlan", label: "Explore Travelers" },
    { href: "/dashboard/my-travel-plan", label: "My Travel Plans" },
    { href: "/find-buddy", label: "Find Travel Buddy" },
    // { href: "/dashboard/my-profile", label: "Profile" },
  ];

  // ADMIN Logged In
  const adminNav = [
    { href: "/", label: "Home" },
    { href: "/admin/dashboard", label: "Admin Dashboard" },
    { href: "/admin/dashboard/user-management", label: "Manage Users" },
    // { href: "/admin/manage-travel-plans", label: "Manage Travel Plans" },
    { href: "/admin/dashboard/travel-management", label: "Manage Travel Plans" },
    // { href: "/my-profile", label: "Profile" },
    { href: "/admin/dashboard/admin-profile", label: "Profile" },
  ];

  // Correct Logic
  let navItems = publicNav;

  if (isLoggedIn && role === "USER") navItems = userNav;
  if (isLoggedIn && role === "ADMIN") navItems = adminNav;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          TripMates Hub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </>
          ) : (
            <>
              {role === "USER" && (
                <Link href="/dashboard/pricing-page">
                  <Button variant="outline">Upgrade Plan</Button>
                </Link>
              )}
              <Link href={role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}>
                <Button>Dashboard</Button>
              </Link>
              <LogoutButton />
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline"><Menu /></Button>
            </SheetTrigger>

            <SheetContent className="p-4 w-[300px]" side="right">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href} className="text-lg">
                    {item.label}
                  </Link>
                ))}

                <div className="border-t pt-4">
                  {!isLoggedIn ? (
                    <>
                      <Link href="/login">
                        <Button className="w-full">Login</Button>
                      </Link>
                      <Link href="/register" className="mt-2 block">
                        <Button variant="outline" className="w-full">Register</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}>
                        <Button className="w-full">Dashboard</Button>
                      </Link>
                      <LogoutButton />
                    </>
                  )}
                </div>
              </nav>

            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
};

export default PublicNavbar;














// // import { getCookie } from "@/services/auth/tokenHandlers";
// import { getCookie } from "@/service/auth/tokenHandlers";
// import { Menu } from "lucide-react";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
// import LogoutButton from "./LogoutButton";

// const PublicNavbar = async () => {
//   const navItems = [
//     { href: "/", label: "Home" },
//     // { href: "/destinations", label: "Destinations" },
//     { href: "/find-buddy", label: "Find Buddy" },
//     { href: "/allTravelPlan", label: "Explore Travelers" },
//     // { href: "/contact", label: "Contact" },
//   ];

//   const accessToken = await getCookie("accessToken");

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur  dark:bg-background/95">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-xl font-bold text-primary">TripMates Hub</span>
//         </Link>

//         <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
//           {navItems.map((link) => (
//             <Link
//               key={link.label}
//               href={link.href}
//               className="text-foreground hover:text-primary transition-colors"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Desktop Actions */}
//         <div className="hidden md:flex items-center space-x-2">
//           {accessToken ? (
//             <>
//               <Link href="/dashboard">
//                 <Button>Dashboard</Button>
//               </Link>
//               <LogoutButton />
//             </>
//           ) : (
//             <Link href="/login">
//               <Button>Login</Button>
//             </Link>
//           )}
//         </div>
//         {/* Mobile Menu */}

//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline">
//                 {" "}
//                 <Menu />{" "}
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
//               <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
//               <nav className="flex flex-col space-y-4 mt-8">
//                 {navItems.map((link) => (
//                   <Link
//                     key={link.label}
//                     href={link.href}
//                     className="text-lg font-medium"
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//                 <div className="border-t pt-4 flex flex-col space-y-4">
//                   <div className="flex justify-center"></div>
//                   <Link href="/login" className="text-lg font-medium">
//                     <Button>Login</Button>
//                   </Link>
//                 </div>
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default PublicNavbar;
