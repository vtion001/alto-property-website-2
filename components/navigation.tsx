"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </div>
    )
  },
)
ListItem.displayName = "ListItem"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  const closeSheet = () => setIsOpen(false)

  return (
    <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 md:space-x-3">
          <Image
            src="https://res.cloudinary.com/dbviya1rj/image/upload/v1754468711/fjyp4efl3h5bkdpnhyl9.png"
            alt="ALTO Property"
            width={60}
            height={60}
            className="object-contain md:w-[120px] md:h-[80px]"
          />
          <div>
            <div className="font-bold text-brown-800 text-lg md:text-xl"></div>
            <div className="text-brown-600 text-xs md:text-sm tracking-wider">South East Queensland's Premier</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-brown-800 hover:text-brand-red">Selling</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brown-500/50 to-brown-700/50 p-6 no-underline outline-none focus:shadow-md"
                        href="/selling"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white">Selling Your Property</div>
                        <p className="text-sm leading-tight text-white/90">
                          Get the best price for your property with our expert sales team.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                  <ListItem href="/selling/property-report" title="Property Report">
                    Get a comprehensive market analysis of your property.
                  </ListItem>
                  <ListItem href="/selling/selling-with-alto" title="Selling with Alto">
                    Discover our proven selling process and expertise.
                  </ListItem>
                  <ListItem href="/selling/recently-sold" title="Recently Sold">
                    View our latest successful property sales.
                  </ListItem>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-brown-800 hover:text-brown-900">Buying</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/buying/search-properties" title="Search Properties">
                    Find your perfect property in South East Queensland's best locations.
                  </ListItem>
                  <ListItem href="/buying/buying-with-alto" title="Buying with Alto">
                    Expert guidance through your property purchase.
                  </ListItem>
                  <ListItem href="/buying/off-market" title="Off Market">
                    Access exclusive off-market opportunities.
                  </ListItem>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-brown-800 hover:text-brown-900">Manage</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/manage/property-management" title="Property Management">
                    Professional management for your investment property.
                  </ListItem>
                  <ListItem href="/manage/rental-appraisal" title="Rental Appraisal">
                    Get a free rental assessment for your property.
                  </ListItem>
                  <ListItem href="/manage/management-fees" title="Management Fees">
                    Transparent pricing for our management services.
                  </ListItem>
                  <ListItem href="/manage/speak-specialist" title="Speak to Specialist">
                    Connect with our property management experts.
                  </ListItem>
                  <ListItem href="/manage/investing-tips" title="Investing Tips">
                    Expert advice for property investors.
                  </ListItem>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-brown-800 hover:text-brown-900">Renting</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/renting/search-rentals" title="Search Rentals">
                    Find your next rental property in Brisbane.
                  </ListItem>
                  <ListItem href="/renting/apply-now" title="Apply Now">
                    Submit your rental application online.
                  </ListItem>
                  <ListItem href="/renting/connect" title="Connect">
                    Stay connected with your property manager.
                  </ListItem>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/finance" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-brown-800 hover:text-brown-900")}>
                  Finance
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/team" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-brown-800 hover:text-brown-900")}>
                  Team
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-brown-800 hover:text-brown-900")}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-brown-800 hover:text-brown-900">Contact</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/contact" title="Contact Us">
                    Get in touch with our team.
                  </ListItem>
                  <ListItem href="/contact/about-alto" title="About Alto">
                    Learn more about our company and values.
                  </ListItem>

                  <ListItem href="/contact/join-team" title="Join Our Team">
                    Explore career opportunities with us.
                  </ListItem>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-6 py-6">
              <div className="flex flex-col space-y-3">
                <h4 className="font-semibold text-brown-800 border-b border-brown-200 pb-2">Selling</h4>
                <div className="ml-3 flex flex-col space-y-2">
                  <Link 
                    href="/selling" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Selling Your Property
                  </Link>
                  <Link 
                    href="/selling/property-report" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Property Report
                  </Link>
                  <Link 
                    href="/selling/selling-with-alto" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Selling with Alto
                  </Link>
                  <Link 
                    href="/selling/recently-sold" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Recently Sold
                  </Link>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <h4 className="font-semibold text-brown-800 border-b border-brown-200 pb-2">Buying</h4>
                <div className="ml-3 flex flex-col space-y-2">
                  <Link 
                    href="/buying/search-properties" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Search Properties
                  </Link>
                  <Link 
                    href="/buying/buying-with-alto" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Buying with Alto
                  </Link>
                  <Link 
                    href="/buying/off-market" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Off Market
                  </Link>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <h4 className="font-semibold text-brown-800 border-b border-brown-200 pb-2">Manage</h4>
                <div className="ml-3 flex flex-col space-y-2">
                  <Link 
                    href="/manage/property-management" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Property Management
                  </Link>
                  <Link 
                    href="/manage/rental-appraisal" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Rental Appraisal
                  </Link>
                  <Link 
                    href="/manage/management-fees" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Management Fees
                  </Link>
                  <Link 
                    href="/manage/speak-specialist" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Speak to Specialist
                  </Link>
                  <Link 
                    href="/manage/investing-tips" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Investing Tips
                  </Link>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <h4 className="font-semibold text-brown-800 border-b border-brown-200 pb-2">Renting</h4>
                <div className="ml-3 flex flex-col space-y-2">
                  <Link 
                    href="/renting/search-rentals" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Search Rentals
                  </Link>
                  <Link 
                    href="/renting/apply-now" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Apply Now
                  </Link>
                  
                  <Link 
                    href="/renting/connect" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Connect
                  </Link>
                </div>
              </div>

              <div className="flex flex-col space-y-3 border-t border-brown-200 pt-4">
                <Link 
                  href="/finance" 
                  className="font-semibold text-brown-800 hover:text-brown-900 transition-colors py-2 block"
                  onClick={closeSheet}
                >
                  Finance
                </Link>
                <Link 
                  href="/team" 
                  className="font-semibold text-brown-800 hover:text-brown-900 transition-colors py-2 block"
                  onClick={closeSheet}
                >
                  Team
                </Link>
                <Link 
                  href="/blog" 
                  className="font-semibold text-brown-800 hover:text-brown-900 transition-colors py-2 block"
                  onClick={closeSheet}
                >
                  Blog
                </Link>
              </div>

              <div className="flex flex-col space-y-3">
                <h4 className="font-semibold text-brown-800 border-b border-brown-200 pb-2">Contact</h4>
                <div className="ml-3 flex flex-col space-y-2">
                  <Link 
                    href="/contact" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Contact Us
                  </Link>
                  <Link 
                    href="/contact/about-alto" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    About Alto
                  </Link>

                  <Link 
                    href="/contact/join-team" 
                    className="text-sm text-muted-foreground hover:text-brown-800 transition-colors py-2 block"
                    onClick={closeSheet}
                  >
                    Join Our Team
                  </Link>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}