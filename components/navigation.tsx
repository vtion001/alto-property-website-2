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
  return (
    <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/alto-logo.png" alt="Alto Property Group" width={40} height={40} className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wider text-brown-900">ALTO</span>
            <span className="text-xs text-brown-600 tracking-widest">PROPERTY GROUP</span>
          </div>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-brown-800 hover:text-brown-900">Selling</NavigationMenuTrigger>
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
                    Find your perfect property in Brisbane's best locations.
                  </ListItem>
                  <ListItem href="/buying/property-match" title="Property Match">
                    Let us find properties that match your criteria.
                  </ListItem>
                  <ListItem href="/buying/buying-with-alto" title="Buying with Alto">
                    Expert guidance through your property purchase.
                  </ListItem>
                  <ListItem href="/buying/open-homes" title="Open Homes">
                    Browse upcoming open home inspections.
                  </ListItem>
                  <ListItem href="/buying/recent-sales" title="Recent Sales">
                    Market insights from recent property transactions.
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
                  <ListItem href="/manage/management-services" title="Management Services">
                    Comprehensive services for property owners.
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
                  <ListItem href="/renting/prospective-tenants" title="Prospective Tenants">
                    Information for potential tenants.
                  </ListItem>
                  <ListItem href="/renting/express-checkin" title="Express Check-in">
                    Quick and easy property check-in process.
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
                  <ListItem href="/contact/our-team" title="Our Team">
                    Meet the professionals behind Alto Property Group.
                  </ListItem>
                  <ListItem href="/contact/join-team" title="Join Our Team">
                    Explore career opportunities with us.
                  </ListItem>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
