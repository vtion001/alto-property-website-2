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
import { Menu, X, Phone, Mail } from "lucide-react"

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
      <div className="container flex h-16 md:h-20 items-center justify-between px-3 sm:px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 md:space-x-3">
          <Image
            src="https://res.cloudinary.com/dbviya1rj/image/upload/v1761117223/nb1ofmfxsmpumme5zztq.jpg"
            alt="ALTO REAL ESTATE"
            width={48}
            height={48}
            priority
            className="object-contain h-10 w-auto md:h-16 md:w-auto"
            sizes="(max-width: 768px) 40px, 64px"
          />
          <div className="hidden sm:block">
            <div className="font-bold text-brown-800 text-base md:text-xl"></div>
            <div className="text-brown-600 text-xs md:text-sm tracking-wider">SEQ&apos;s Premier Agency</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-brown-800 hover:text-brand-red text-sm md:text-base">Selling</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:p-6 w-[300px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-brown-500/50 to-brown-700/50 p-4 md:p-6 no-underline outline-none focus:shadow-md"
                        href="/selling"
                      >
                        <div className="mb-2 mt-4 text-base md:text-lg font-medium text-white">Selling Your Property</div>
                        <p className="text-xs md:text-sm leading-tight text-white/90">
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
              <NavigationMenuTrigger className="text-brown-800 hover:text-brown-900 text-sm md:text-base">Buying</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:p-6 w-[300px] md:w-[400px] lg:w-[600px] md:grid-cols-2">
                  <ListItem href="/buying/search-properties" title="Search Properties">
                    Find your perfect property in South East Queensland&apos;s best locations.
                  </ListItem>
                  <ListItem href="/buying/buying-with-alto" title="Buying with Alto">
                    Expert guidance through your property purchase.
                  </ListItem>
                  <ListItem href="/buying/buyers-agent-services" title="Buyers Agent Services">
                    Professional representation to protect your interests and secure the best deal.
                  </ListItem>
                  <ListItem href="/buying/off-market" title="Off Market">
                    Access exclusive off-market opportunities.
                  </ListItem>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-brown-800 hover:text-brown-900 text-sm md:text-base">Manage</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:p-6 w-[300px] md:w-[500px] lg:w-[600px] md:grid-cols-2">
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
              <NavigationMenuTrigger className="text-brown-800 hover:text-brown-900 text-sm md:text-base">Renting</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:p-6 w-[300px] md:w-[500px] md:grid-cols-2">
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
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-brown-800 hover:text-brown-900 text-sm md:text-base")}>
                <Link href="/finance">Finance</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-brown-800 hover:text-brown-900 text-sm md:text-base")}>
                <Link href="/team">Team</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-brown-800 hover:text-brown-900 text-sm md:text-base")}>
                <Link href="/blog">Blog</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-brown-800 hover:text-brown-900 text-sm md:text-base")}>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-brown-800 hover:text-brown-900 text-sm md:text-base">Contact</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:p-6 w-[300px] md:w-[500px] md:grid-cols-2">
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden h-10 w-10 touch-manipulation"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[280px] sm:w-[320px] overflow-y-auto p-0"
            aria-label="Mobile navigation"
          >
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col">
              <div className="flex flex-col space-y-1">
                <MobileNavSection title="Selling">
                  <MobileNavLink href="/selling" onClick={closeSheet}>Selling Your Property</MobileNavLink>
                  <MobileNavLink href="/selling/property-report" onClick={closeSheet}>Property Report</MobileNavLink>
                  <MobileNavLink href="/selling/selling-with-alto" onClick={closeSheet}>Selling with Alto</MobileNavLink>
                  <MobileNavLink href="/selling/recently-sold" onClick={closeSheet}>Recently Sold</MobileNavLink>
                </MobileNavSection>

                <MobileNavSection title="Buying">
                  <MobileNavLink href="/buying/search-properties" onClick={closeSheet}>Search Properties</MobileNavLink>
                  <MobileNavLink href="/buying/buying-with-alto" onClick={closeSheet}>Buying with Alto</MobileNavLink>
                  <MobileNavLink href="/buying/buyers-agent-services" onClick={closeSheet}>Buyers Agent Services</MobileNavLink>
                  <MobileNavLink href="/buying/off-market" onClick={closeSheet}>Off Market</MobileNavLink>
                </MobileNavSection>

                <MobileNavSection title="Manage">
                  <MobileNavLink href="/manage/property-management" onClick={closeSheet}>Property Management</MobileNavLink>
                  <MobileNavLink href="/manage/rental-appraisal" onClick={closeSheet}>Rental Appraisal</MobileNavLink>
                  <MobileNavLink href="/manage/management-fees" onClick={closeSheet}>Management Fees</MobileNavLink>
                  <MobileNavLink href="/manage/speak-specialist" onClick={closeSheet}>Speak to Specialist</MobileNavLink>
                  <MobileNavLink href="/manage/investing-tips" onClick={closeSheet}>Investing Tips</MobileNavLink>
                </MobileNavSection>

                <MobileNavSection title="Renting">
                  <MobileNavLink href="/renting/search-rentals" onClick={closeSheet}>Search Rentals</MobileNavLink>
                  <MobileNavLink href="/renting/apply-now" onClick={closeSheet}>Apply Now</MobileNavLink>
                  <MobileNavLink href="/renting/connect" onClick={closeSheet}>Connect</MobileNavLink>
                </MobileNavSection>

                <MobileNavLink href="/finance" onClick={closeSheet} className="font-semibold text-brown-800">Finance</MobileNavLink>
                <MobileNavLink href="/team" onClick={closeSheet} className="font-semibold text-brown-800">Team</MobileNavLink>
                <MobileNavLink href="/blog" onClick={closeSheet} className="font-semibold text-brown-800">Blog</MobileNavLink>
                <MobileNavLink href="/privacy-policy" onClick={closeSheet} className="font-semibold text-brown-800">Privacy Policy</MobileNavLink>
                <MobileNavLink href="/contact" onClick={closeSheet} className="font-semibold text-brown-800">Contact Us</MobileNavLink>
              </div>

              <div className="p-4 border-t mt-auto">
                <div className="space-y-3">
                  <a href="tel:+6175550123" className="flex items-center space-x-2 text-sm text-brown-800 hover:text-brand-red transition-colors">
                    <Phone className="h-4 w-4" />
                    <span>07 5550 123</span>
                  </a>
                  <a href="mailto:info@altoproperty.com.au" className="flex items-center space-x-2 text-sm text-brown-800 hover:text-brand-red transition-colors">
                    <Mail className="h-4 w-4" />
                    <span>info@altoproperty.com.au</span>
                  </a>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

function MobileNavSection({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode 
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left font-semibold text-brown-800 hover:bg-gray-50 transition-colors flex items-center justify-between"
      >
        {title}
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="px-4 py-2 space-y-1 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  )
}

function MobileNavLink({ 
  href, 
  children, 
  onClick, 
  className 
}: { 
  href: string; 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string 
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block px-3 py-2 text-sm text-muted-foreground hover:text-brown-800 hover:bg-white rounded-md transition-colors",
        className
      )}
    >
      {children}
    </Link>
  )
}