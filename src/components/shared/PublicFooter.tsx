"use client";

import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 container mx-auto rounded-t-xl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="text-blue-500" /> TravelBuddy
            </h3>
            <p className="text-sm leading-relaxed">
              Find your perfect travel partner and explore the world&apos;s most amazing destinations together safely.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Find Buddies</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Destinations</li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">Safety Guides</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2"><Mail size={16} /> support@travelbuddy.com</p>
              <p className="flex items-center gap-2"><Phone size={16} /> +880 1234 567890</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <Facebook className="hover:text-blue-500 cursor-pointer" />
              <Twitter className="hover:text-blue-400 cursor-pointer" />
              <Instagram className="hover:text-pink-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* <div className="mt-10 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Travel Buddy. All Rights Reserved.
        </div> */}

        <div className="pt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} TravelBuddy Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}



// import Link from "next/link";

// function PublicFooter() {
//   return (
//     <footer className="border-t bg-background mt-5">
//       <div className="container mx-auto px-4 py-10">
//         {/* Top Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

//           {/* Brand Info */}
//           <div>
//             <h3 className="font-bold text-lg mb-2">Travel Buddy</h3>
//             <p className="text-sm text-muted-foreground">
//               Connect with travelers, find trip partners, explore destinations,
//               and make your journey memorable.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-semibold mb-2">Quick Links</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link href="/" className="text-muted-foreground hover:text-foreground">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/destinations" className="text-muted-foreground hover:text-foreground">
//                   Destinations
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/buddies" className="text-muted-foreground hover:text-foreground">
//                   Find Buddy
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/plans" className="text-muted-foreground hover:text-foreground">
//                   Travel Plans
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="font-semibold mb-2">Support</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link href="/faq" className="text-muted-foreground hover:text-foreground">
//                   FAQ
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/help" className="text-muted-foreground hover:text-foreground">
//                   Help Center
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/terms" className="text-muted-foreground hover:text-foreground">
//                   Terms & Conditions
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
//                   Privacy Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="font-semibold mb-2">Contact Us</h3>
//             <p className="text-sm text-muted-foreground">
//               Travel Buddy HQ<br />
//               Dhaka, Bangladesh<br />
//               support@travelbuddy.com
//             </p>
//           </div>
//         </div>

//         {/* Bottom Text */}
//         <div className="mt-10 border-t pt-4 text-center text-sm text-muted-foreground">
//           &copy; {new Date().getFullYear()} Travel Buddy. All Rights Reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default PublicFooter;
