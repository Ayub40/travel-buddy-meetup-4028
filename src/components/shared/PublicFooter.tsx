import Link from "next/link";

function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-10">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div>
            <h3 className="font-bold text-lg mb-2">Travel Buddy</h3>
            <p className="text-sm text-muted-foreground">
              Connect with travelers, find trip partners, explore destinations,
              and make your journey memorable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-foreground">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/buddies" className="text-muted-foreground hover:text-foreground">
                  Find Buddy
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-muted-foreground hover:text-foreground">
                  Travel Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              Travel Buddy HQ<br />
              Dhaka, Bangladesh<br />
              support@travelbuddy.com
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-10 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Travel Buddy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
