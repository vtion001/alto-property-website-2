"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { 
  FileText, 
  Home, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin,
  Calendar,
  DollarSign,
  Bed,
  Bath,
  Car,
  Square,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Camera // Import Camera icon
} from "lucide-react"
import Image from "next/image"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  category: string
  date: string
  status: 'published' | 'draft'
  views?: number
}

interface Property {
  id: string
  title: string
  address: string
  suburb: string
  price: string
  beds: number
  baths: number
  parking: number
  landSize: string
  status: 'available' | 'sold' | 'pending' | 'off-market'
  type: 'house' | 'apartment' | 'townhouse' | 'land'
  listingType: 'sale' | 'rent'
  image: string
  images?: string[] // Added for multiple images
  dateAdded: string
  description?: string
  features?: string[]
  commissionRate?: number
  grossIncome?: number
  commissionEarned?: number
}

interface RentalApplication {
  id: string
  applicantName: string
  property: string
  applicationDate: string
  status: 'pending' | 'approved' | 'rejected' | 'processing'
  income: string
  email: string
  phone: string
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false) // State for media manager dialog
  const [selectedPropertyForMedia, setSelectedPropertyForMedia] = useState<Property | null>(null) // To keep track of the property being managed
  const [createType, setCreateType] = useState<'blog' | 'property' | null>(null)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null) // State for viewing property details

  // Mock data - replace with actual data fetching
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Brisbane Property Market Outlook 2024",
      excerpt: "Discover the key trends shaping Brisbane's property market...",
      author: "Sarah Mitchell",
      category: "Market Analysis",
      date: "2024-03-15",
      status: "published",
      views: 1250
    },
    {
      id: "2",
      title: "Top Investment Suburbs in Brisbane",
      excerpt: "Our expert analysis of Brisbane's most promising suburbs...",
      author: "David Chen",
      category: "Investment Tips",
      date: "2024-03-10",
      status: "published",
      views: 890
    }
  ])

  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      title: "Luxury Riverside Apartment",
      address: "32 Veronica Avenue",
      suburb: "South Brisbane",
      price: "$850,000",
      beds: 2,
      baths: 2,
      parking: 1,
      landSize: "N/A",
      status: "available",
      type: "apartment",
      listingType: "sale",
      image: "/placeholder.svg?height=200&width=300",
      images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=301", "/placeholder.svg?height=200&width=302"], // Example images
      dateAdded: "2024-03-15",
      description: "A stunning apartment with river views.",
      features: ["Balcony", "Gym", "Pool"],
      commissionRate: 2.5
    },
    {
      id: "2",
      title: "Heritage Family Home",
      address: "15 Oxford Street",
      suburb: "New Farm",
      price: "$1,250,000",
      beds: 4,
      baths: 3,
      parking: 2,
      landSize: "607m²",
      status: "pending",
      type: "house",
      listingType: "sale",
      image: "/placeholder.svg?height=200&width=300",
      images: ["/placeholder.svg?height=200&width=303", "/placeholder.svg?height=200&width=304"],
      dateAdded: "2024-03-12",
      description: "A beautifully renovated heritage home.",
      features: ["Large Garden", "Fireplace", "Original Features"],
      commissionRate: 2.5
    },
    {
      id: "3",
      title: "Modern Townhouse",
      address: "8 River Terrace",
      suburb: "Teneriffe",
      price: "$650/week",
      beds: 3,
      baths: 2,
      parking: 2,
      landSize: "N/A",
      status: "available",
      type: "townhouse",
      listingType: "rent",
      image: "/placeholder.svg?height=200&width=300",
      images: ["/placeholder.svg?height=200&width=305"],
      dateAdded: "2024-03-10",
      description: "Contemporary townhouse living.",
      features: ["Balcony", "Modern Kitchen"],
      commissionRate: 10 // Assuming weekly rent for commission calc
    }
  ])

  const [rentalApplications, setRentalApplications] = useState<RentalApplication[]>([
    {
      id: "1",
      applicantName: "Emma Johnson",
      property: "Modern Townhouse, Teneriffe",
      applicationDate: "2024-03-16",
      status: "pending",
      income: "$75,000",
      email: "emma.j@email.com",
      phone: "0412 345 678"
    },
    {
      id: "2",
      applicantName: "Michael Zhang",
      property: "City Apartment, Spring Hill",
      applicationDate: "2024-03-15",
      status: "approved",
      income: "$85,000",
      email: "m.zhang@email.com",
      phone: "0423 456 789"
    },
    {
      id: "3",
      applicantName: "Sophie Williams",
      property: "Garden Cottage, Paddington",
      applicationDate: "2024-03-14",
      status: "processing",
      income: "$68,000",
      email: "sophie.w@email.com",
      phone: "0434 567 890"
    }
  ])

  const [newBlogPost, setNewBlogPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    image: ""
  })

  const [newProperty, setNewProperty] = useState({
    title: "",
    address: "",
    suburb: "",
    price: "",
    beds: "",
    baths: "",
    parking: "",
    landSize: "",
    type: "house" as const,
    listingType: "sale" as const,
    description: "",
    features: [] as string[],
    image: "",
    images: [] as string[], // Added for new property images
    commissionRate: ""
  })

  const [editedProperty, setEditedProperty] = useState<Property>({
    id: "",
    title: "",
    address: "",
    suburb: "",
    price: "",
    beds: 0,
    baths: 0,
    parking: 0,
    landSize: "",
    status: 'available',
    type: "house",
    listingType: "sale",
    image: "",
    images: [], // Added for edited property images
    dateAdded: "",
    description: "",
    features: [],
    commissionRate: 0
  })

  const handleCreateBlogPost = () => {
    const blogPost: BlogPost = {
      id: Date.now().toString(),
      title: newBlogPost.title,
      excerpt: newBlogPost.excerpt,
      author: newBlogPost.author,
      category: newBlogPost.category,
      date: new Date().toISOString().split('T')[0],
      status: 'draft'
    }
    setBlogPosts([...blogPosts, blogPost])
    setNewBlogPost({ title: "", excerpt: "", content: "", author: "", category: "", image: "" })
    setIsCreateDialogOpen(false)
  }

  const handleCreateProperty = () => {
    const property: Property = {
      id: Date.now().toString(),
      title: newProperty.title,
      address: newProperty.address,
      suburb: newProperty.suburb,
      price: newProperty.price,
      beds: parseInt(newProperty.beds) || 0,
      baths: parseInt(newProperty.baths) || 0,
      parking: parseInt(newProperty.parking) || 0,
      landSize: newProperty.landSize,
      status: 'available',
      type: newProperty.type,
      listingType: newProperty.listingType,
      image: newProperty.image || "/placeholder.svg?height=200&width=300",
      images: newProperty.images, // Store multiple images
      dateAdded: new Date().toISOString().split('T')[0],
      description: newProperty.description,
      features: newProperty.features,
      commissionRate: parseFloat(newProperty.commissionRate) || 0
    }
    setProperties([...properties, property])
    setNewProperty({
      title: "", address: "", suburb: "", price: "", beds: "", baths: "", 
      parking: "", landSize: "", type: "house", listingType: "sale", 
      description: "", features: [], image: "", images: [], commissionRate: "" // Reset images
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property)
    setEditedProperty({
      id: property.id,
      title: property.title,
      address: property.address,
      suburb: property.suburb,
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      parking: property.parking,
      landSize: property.landSize,
      status: property.status,
      type: property.type,
      listingType: property.listingType,
      image: property.image,
      images: [...property.images!], // Copy existing images
      dateAdded: property.dateAdded,
      description: property.description || "",
      features: property.features || [],
      commissionRate: property.commissionRate || 0
    })
    setIsEditDialogOpen(true)
  }

  // Function to handle viewing a property, sets viewingProperty state
  const handleViewProperty = (property: Property) => {
    setViewingProperty(property)
  }

  const handleSaveEditedProperty = () => {
    setProperties(properties.map(p => p.id === editingProperty?.id ? editedProperty : p))
    setIsEditDialogOpen(false)
    setEditingProperty(null)
  }

  // Function to open the media manager for a specific property
  const openMediaManager = (property: Property) => {
    setSelectedPropertyForMedia(property)
    setIsMediaManagerOpen(true)
  }

  // Function to handle image upload (max 5 images)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedPropertyForMedia || !event.target.files) return;

    const newImages = Array.from(event.target.files).slice(0, 5).map(file => URL.createObjectURL(file));

    setProperties(prevProperties => 
      prevProperties.map(prop => 
        prop.id === selectedPropertyForMedia.id 
          ? { ...prop, images: [...(prop.images || []), ...newImages].slice(0, 5) } 
          : prop
      )
    );
  };

  // Function to remove an image
  const removeImage = (imageUrl: string) => {
    if (!selectedPropertyForMedia) return;

    setProperties(prevProperties => 
      prevProperties.map(prop => 
        prop.id === selectedPropertyForMedia.id 
          ? { ...prop, images: prop.images?.filter(img => img !== imageUrl) || [] } 
          : prop
      )
    );
  };

  const calculateGrossIncomeAndCommission = (property: Property) => {
    let priceValue = 0;
    if (property.listingType === 'sale') {
      const priceString = property.price.replace(/[^0-9.]/g, '');
      priceValue = parseFloat(priceString) || 0;
    } else { // For rent, assume price is weekly and multiply by 52 for annual
      const priceString = property.price.replace(/[^0-9.]/g, '');
      const weeklyPrice = parseFloat(priceString) || 0;
      priceValue = weeklyPrice * 52;
    }
    const commissionRate = property.commissionRate || 0;
    const grossIncome = priceValue;
    const commissionEarned = (grossIncome * commissionRate) / 100;

    return { grossIncome, commissionEarned };
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      published: "default",
      draft: "secondary",
      available: "default",
      sold: "destructive",
      pending: "outline",
      approved: "default",
      rejected: "destructive",
      processing: "outline"
    }
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  const stats = {
    totalProperties: properties.length,
    availableProperties: properties.filter(p => p.status === 'available').length,
    totalBlogPosts: blogPosts.length,
    publishedPosts: blogPosts.filter(p => p.status === 'published').length,
    pendingApplications: rentalApplications.filter(a => a.status === 'pending').length,
    totalApplications: rentalApplications.length,
    totalGCI: properties
      .filter(p => p.listingType === 'sale')
      .reduce((total, p) => total + calculateGrossIncomeAndCommission(p).commissionEarned, 0),
    saleProperties: properties.filter(p => p.listingType === 'sale').length
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-8">
        <div className="container max-w-7xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-light text-brown-800">Admin Dashboard</h1>
                <p className="text-brown-600 font-light">Manage your properties, blog posts, and rental applications</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-brown-800 hover:bg-brown-900">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New {createType === 'blog' ? 'Blog Post' : createType === 'property' ? 'Property' : 'Item'}</DialogTitle>
                    <DialogDescription>
                      {!createType && "Choose what you'd like to create"}
                      {createType === 'blog' && "Add a new blog post to your website"}
                      {createType === 'property' && "Add a new property listing"}
                    </DialogDescription>
                  </DialogHeader>

                  {!createType && (
                    <div className="grid gap-4 py-4">
                      <Button 
                        onClick={() => setCreateType('blog')}
                        variant="outline"
                        className="h-20 flex-col"
                      >
                        <FileText className="h-8 w-8 mb-2" />
                        Blog Post
                      </Button>
                      <Button 
                        onClick={() => setCreateType('property')}
                        variant="outline"
                        className="h-20 flex-col"
                      >
                        <Home className="h-8 w-8 mb-2" />
                        Property Listing
                      </Button>
                    </div>
                  )}

                  {createType === 'blog' && (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="blog-title">Title</Label>
                          <Input
                            id="blog-title"
                            value={newBlogPost.title}
                            onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
                            placeholder="Enter blog post title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="blog-author">Author</Label>
                          <Input
                            id="blog-author"
                            value={newBlogPost.author}
                            onChange={(e) => setNewBlogPost({...newBlogPost, author: e.target.value})}
                            placeholder="Author name"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="blog-category">Category</Label>
                          <Select onValueChange={(value) => setNewBlogPost({...newBlogPost, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Market Analysis">Market Analysis</SelectItem>
                              <SelectItem value="Investment Tips">Investment Tips</SelectItem>
                              <SelectItem value="Property Tips">Property Tips</SelectItem>
                              <SelectItem value="Selling Guide">Selling Guide</SelectItem>
                              <SelectItem value="Buying Guide">Buying Guide</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="blog-image">Image URL</Label>
                          <Input
                            id="blog-image"
                            value={newBlogPost.image}
                            onChange={(e) => setNewBlogPost({...newBlogPost, image: e.target.value})}
                            placeholder="Image URL"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="blog-excerpt">Excerpt</Label>
                        <Textarea
                          id="blog-excerpt"
                          value={newBlogPost.excerpt}
                          onChange={(e) => setNewBlogPost({...newBlogPost, excerpt: e.target.value})}
                          placeholder="Brief description"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="blog-content">Content</Label>
                        <Textarea
                          id="blog-content"
                          value={newBlogPost.content}
                          onChange={(e) => setNewBlogPost({...newBlogPost, content: e.target.value})}
                          placeholder="Full blog post content"
                          rows={8}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setCreateType(null)} variant="outline">
                          Back
                        </Button>
                        <Button onClick={handleCreateBlogPost} className="bg-brown-800 hover:bg-brown-900">
                          Create Blog Post
                        </Button>
                      </div>
                    </div>
                  )}

                  {createType === 'property' && (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="prop-title">Property Title</Label>
                          <Input
                            id="prop-title"
                            value={newProperty.title}
                            onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                            placeholder="e.g., Luxury Riverside Apartment"
                          />
                        </div>
                        <div>
                          <Label htmlFor="prop-address">Address</Label>
                          <Input
                            id="prop-address"
                            value={newProperty.address}
                            onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                            placeholder="Street address"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <Label htmlFor="prop-suburb">Suburb</Label>
                          <Input
                            id="prop-suburb"
                            value={newProperty.suburb}
                            onChange={(e) => setNewProperty({...newProperty, suburb: e.target.value})}
                            placeholder="Suburb"
                          />
                        </div>
                        <div>
                          <Label htmlFor="prop-price">Price</Label>
                          <Input
                            id="prop-price"
                            value={newProperty.price}
                            onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                            placeholder="$850,000 or $650/week"
                          />
                        </div>
                        <div>
                          <Label htmlFor="prop-land">Land Size</Label>
                          <Input
                            id="prop-land"
                            value={newProperty.landSize}
                            onChange={(e) => setNewProperty({...newProperty, landSize: e.target.value})}
                            placeholder="607m² or N/A"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <Label htmlFor="prop-beds">Bedrooms</Label>
                          <Input
                            id="prop-beds"
                            type="number"
                            value={newProperty.beds}
                            onChange={(e) => setNewProperty({...newProperty, beds: e.target.value})}
                            placeholder="3"
                          />
                        </div>
                        <div>
                          <Label htmlFor="prop-baths">Bathrooms</Label>
                          <Input
                            id="prop-baths"
                            type="number"
                            value={newProperty.baths}
                            onChange={(e) => setNewProperty({...newProperty, baths: e.target.value})}
                            placeholder="2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="prop-parking">Parking</Label>
                          <Input
                            id="prop-parking"
                            type="number"
                            value={newProperty.parking}
                            onChange={(e) => setNewProperty({...newProperty, parking: e.target.value})}
                            placeholder="2"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="prop-type">Property Type</Label>
                          <Select value={newProperty.type} onValueChange={(value: any) => setNewProperty({...newProperty, type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="house">House</SelectItem>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="prop-listing-type">Listing Type</Label>
                          <Select value={newProperty.listingType} onValueChange={(value: any) => setNewProperty({...newProperty, listingType: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sale">For Sale</SelectItem>
                              <SelectItem value="rent">For Rent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="prop-description">Description</Label>
                        <Textarea
                          id="prop-description"
                          value={newProperty.description}
                          onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                          placeholder="Property description and features"
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label htmlFor="prop-features">Features</Label>
                        <Input
                          placeholder="Comma-separated features (e.g., Balcony, Gym)"
                          onChange={(e) => setNewProperty({...newProperty, features: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '')})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="prop-commission-rate">Commission Rate (%)</Label>
                        <Input
                          id="prop-commission-rate"
                          type="number"
                          value={newProperty.commissionRate}
                          onChange={(e) => setNewProperty({...newProperty, commissionRate: e.target.value})}
                          placeholder="e.g., 2.5 for sales, 10 for rentals"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setCreateType(null)} variant="outline">
                          Back
                        </Button>
                        <Button onClick={handleCreateProperty} className="bg-brown-800 hover:bg-brown-900">
                          Create Property
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Property: {editingProperty?.title}</DialogTitle>
                    <DialogDescription>Update property details and view commission calculations.</DialogDescription>
                  </DialogHeader>
                  {editingProperty && (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="edit-prop-title">Property Title</Label>
                          <Input
                            id="edit-prop-title"
                            value={editedProperty.title}
                            onChange={(e) => setEditedProperty({...editedProperty, title: e.target.value})}
                            placeholder="e.g., Luxury Riverside Apartment"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-prop-address">Address</Label>
                          <Input
                            id="edit-prop-address"
                            value={editedProperty.address}
                            onChange={(e) => setEditedProperty({...editedProperty, address: e.target.value})}
                            placeholder="Street address"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <Label htmlFor="edit-prop-suburb">Suburb</Label>
                          <Input
                            id="edit-prop-suburb"
                            value={editedProperty.suburb}
                            onChange={(e) => setEditedProperty({...editedProperty, suburb: e.target.value})}
                            placeholder="Suburb"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-prop-price">Price</Label>
                          <Input
                            id="edit-prop-price"
                            value={editedProperty.price}
                            onChange={(e) => setEditedProperty({...editedProperty, price: e.target.value})}
                            placeholder="$850,000 or $650/week"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-prop-land">Land Size</Label>
                          <Input
                            id="edit-prop-land"
                            value={editedProperty.landSize}
                            onChange={(e) => setEditedProperty({...editedProperty, landSize: e.target.value})}
                            placeholder="607m² or N/A"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <Label htmlFor="edit-prop-beds">Bedrooms</Label>
                          <Input
                            id="edit-prop-beds"
                            type="number"
                            value={editedProperty.beds}
                            onChange={(e) => setEditedProperty({...editedProperty, beds: parseInt(e.target.value) || 0})}
                            placeholder="3"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-prop-baths">Bathrooms</Label>
                          <Input
                            id="edit-prop-baths"
                            type="number"
                            value={editedProperty.baths}
                            onChange={(e) => setEditedProperty({...editedProperty, baths: parseInt(e.target.value) || 0})}
                            placeholder="2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-prop-parking">Parking</Label>
                          <Input
                            id="edit-prop-parking"
                            type="number"
                            value={editedProperty.parking}
                            onChange={(e) => setEditedProperty({...editedProperty, parking: parseInt(e.target.value) || 0})}
                            placeholder="2"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="edit-prop-type">Property Type</Label>
                          <Select value={editedProperty.type} onValueChange={(value: any) => setEditedProperty({...editedProperty, type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="house">House</SelectItem>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-prop-listing-type">Listing Type</Label>
                          <Select value={editedProperty.listingType} onValueChange={(value: any) => setEditedProperty({...editedProperty, listingType: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sale">For Sale</SelectItem>
                              <SelectItem value="rent">For Rent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="edit-prop-description">Description</Label>
                        <Textarea
                          id="edit-prop-description"
                          value={editedProperty.description}
                          onChange={(e) => setEditedProperty({...editedProperty, description: e.target.value})}
                          placeholder="Property description and features"
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-prop-features">Features</Label>
                        <Input
                          placeholder="Comma-separated features (e.g., Balcony, Gym)"
                          defaultValue={editedProperty.features?.join(', ')}
                          onChange={(e) => setEditedProperty({...editedProperty, features: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '')})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-prop-commission-rate">Commission Rate (%)</Label>
                        <Input
                          id="edit-prop-commission-rate"
                          type="number"
                          value={editedProperty.commissionRate}
                          onChange={(e) => setEditedProperty({...editedProperty, commissionRate: parseFloat(e.target.value) || 0})}
                          placeholder="e.g., 2.5 for sales, 10 for rentals"
                        />
                      </div>
                      <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">Calculated Income & Commission</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Gross Income</Label>
                            <p className="font-medium text-brown-800">
                              {calculateGrossIncomeAndCommission(editedProperty).grossIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </p>
                          </div>
                          <div>
                            <Label>Commission Earned</Label>
                            <p className="font-medium text-green-700">
                              {calculateGrossIncomeAndCommission(editedProperty).commissionEarned.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end pt-4">
                        <Button onClick={() => setIsEditDialogOpen(false)} variant="outline">
                          Cancel
                        </Button>
                        <Button onClick={handleSaveEditedProperty} className="bg-brown-800 hover:bg-brown-900">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Media Manager Dialog */}
              <Dialog open={isMediaManagerOpen} onOpenChange={(isOpen) => {
                setIsMediaManagerOpen(isOpen);
                if (!isOpen) setSelectedPropertyForMedia(null);
              }}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Manage Photos for: {selectedPropertyForMedia?.title}</DialogTitle>
                    <DialogDescription>Upload and manage up to 5 photos for this property.</DialogDescription>
                  </DialogHeader>
                  {selectedPropertyForMedia && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        {selectedPropertyForMedia.images?.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={imageUrl}
                              alt={`Property image ${index + 1}`}
                              width={150}
                              height={150}
                              className="rounded-md object-cover w-full h-full"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 invisible group-hover:visible"
                              onClick={() => removeImage(imageUrl)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        {/* Placeholder for adding more images */}
                        {selectedPropertyForMedia.images?.length! < 5 && (
                          <label htmlFor="media-upload" className="flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer h-40 bg-gray-50 hover:bg-gray-100">
                            <Plus className="h-6 w-6 text-gray-500" />
                            <Input
                              id="media-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      {selectedPropertyForMedia.images?.length! >= 5 && (
                        <p className="text-sm text-center text-gray-500">Maximum of 5 photos reached.</p>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2 justify-end pt-4">
                    <Button onClick={() => { setIsMediaManagerOpen(false); setSelectedPropertyForMedia(null); }} variant="outline">
                      Done
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Property View Dialog (New) */}
              <Dialog open={!!viewingProperty} onOpenChange={(isOpen) => {
                if (!isOpen) setViewingProperty(null);
              }}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{viewingProperty?.title}</DialogTitle>
                    <DialogDescription>{viewingProperty?.address}, {viewingProperty?.suburb}</DialogDescription>
                  </DialogHeader>
                  {viewingProperty && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Image Gallery */}
                        <div>
                          <Image
                            src={viewingProperty.image || "/placeholder.svg"}
                            alt={viewingProperty.title}
                            width={400}
                            height={300}
                            className="rounded-lg shadow-md w-full object-cover"
                          />
                          {/* You could add a carousel for multiple images here */}
                        </div>

                        {/* Property Details */}
                        <div className="space-y-4">
                          <h3 className="text-2xl font-semibold text-brown-800 border-b pb-2">{viewingProperty.title}</h3>
                          <p className="text-brown-600 leading-relaxed">{viewingProperty.description || 'No description available.'}</p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Bed className="h-5 w-5 text-brown-600" />
                              <span className="font-medium">{viewingProperty.beds} Beds</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Bath className="h-5 w-5 text-brown-600" />
                              <span className="font-medium">{viewingProperty.baths} Baths</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Car className="h-5 w-5 text-brown-600" />
                              <span className="font-medium">{viewingProperty.parking} Parking</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Square className="h-5 w-5 text-brown-600" />
                              <span className="font-medium">{viewingProperty.landSize} Land Size</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-brown-600" />
                            <span className="font-medium">{viewingProperty.address}, {viewingProperty.suburb}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-brown-600" />
                            <span className="font-medium text-xl text-brown-800">{viewingProperty.price}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{viewingProperty.type.charAt(0).toUpperCase() + viewingProperty.type.slice(1)}</Badge>
                            <Badge variant="outline">{viewingProperty.listingType.charAt(0).toUpperCase() + viewingProperty.listingType.slice(1)}</Badge>
                            {getStatusBadge(viewingProperty.status)}
                          </div>

                          {viewingProperty.features && viewingProperty.features.length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold text-brown-800 mb-2">Key Features:</h4>
                              <ul className="list-disc list-inside text-brown-600">
                                {viewingProperty.features.map((feature, index) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex items-center gap-2 mt-4">
                            <Calendar className="h-5 w-5 text-brown-600" />
                            <span className="text-sm text-brown-600">Added: {viewingProperty.dateAdded}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 justify-end pt-4">
                    <Button onClick={() => setViewingProperty(null)} variant="outline">
                      Close
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brown-600">Total Properties</p>
                      <p className="text-3xl font-light text-brown-800">{stats.totalProperties}</p>
                    </div>
                    <Home className="h-8 w-8 text-brown-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brown-600">Available Properties</p>
                      <p className="text-3xl font-light text-brown-800">{stats.availableProperties}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brown-600">Total GCI</p>
                      <p className="text-3xl font-light text-brown-800">
                        ${stats.totalGCI.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brown-600">Blog Posts</p>
                      <p className="text-3xl font-light text-brown-800">{stats.publishedPosts}/{stats.totalBlogPosts}</p>
                    </div>
                    <FileText className="h-8 w-8 text-brown-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brown-600">Pending Applications</p>
                      <p className="text-3xl font-light text-brown-800">{stats.pendingApplications}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-7 w-full max-w-4xl">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="gci">GCI</TabsTrigger>
                <TabsTrigger value="sale-properties">Sale Properties</TabsTrigger>
                <TabsTrigger value="rent-properties">Rent Properties</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="rentals">Rentals</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
              </TabsList>

              <TabsContent value="gci" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-light text-brown-800">Gross Commission Income (GCI)</h2>
                  <div className="text-right">
                    <p className="text-sm text-brown-600">Total Sales Commission</p>
                    <p className="text-2xl font-light text-brown-800">
                      ${stats.totalGCI.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property</TableHead>
                          <TableHead>Sale Price</TableHead>
                          <TableHead>Commission Rate</TableHead>
                          <TableHead>Commission Earned</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date Listed</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {properties
                          .filter(property => property.listingType === 'sale')
                          .map((property) => {
                            const { commissionEarned } = calculateGrossIncomeAndCommission(property);
                            return (
                              <TableRow key={property.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleViewProperty(property)}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Image
                                      src={property.image || "/placeholder.svg"} // Fallback image
                                      alt={property.title}
                                      width={50}
                                      height={50}
                                      className="rounded object-cover"
                                    />
                                    <div>
                                      <p className="font-medium text-brown-800">{property.title}</p>
                                      <p className="text-sm text-brown-600">{property.address}, {property.suburb}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">{property.price}</TableCell>
                                <TableCell>{property.commissionRate}%</TableCell>
                                <TableCell className="font-medium text-green-700">
                                  ${commissionEarned.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </TableCell>
                                <TableCell>{getStatusBadge(property.status)}</TableCell>
                                <TableCell>{property.dateAdded}</TableCell>
                              </TableRow>
                            );
                          })}
                        {properties.filter(p => p.listingType === 'sale').length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-brown-600">
                              No sale properties found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-light">Sales Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-brown-600">Properties for Sale</span>
                          <span className="font-semibold">{stats.saleProperties}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-brown-600">Average Commission</span>
                          <span className="font-semibold">
                            ${stats.saleProperties > 0 ? (stats.totalGCI / stats.saleProperties).toLocaleString('en-US', { maximumFractionDigits: 0 }) : '0'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-brown-600">Total GCI</span>
                          <span className="font-semibold text-green-700">
                            ${stats.totalGCI.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-light">Property Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-brown-600">Available</span>
                          <span className="font-semibold text-green-600">
                            {properties.filter(p => p.listingType === 'sale' && p.status === 'available').length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-brown-600">Pending</span>
                          <span className="font-semibold text-orange-600">
                            {properties.filter(p => p.listingType === 'sale' && p.status === 'pending').length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-brown-600">Sold</span>
                          <span className="font-semibold text-blue-600">
                            {properties.filter(p => p.listingType === 'sale' && p.status === 'sold').length}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-light">Commission Rates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-brown-600">Average Rate</span>
                          <span className="font-semibold">
                            {stats.saleProperties > 0 
                              ? (properties
                                  .filter(p => p.listingType === 'sale')
                                  .reduce((sum, p) => sum + (p.commissionRate || 0), 0) / stats.saleProperties
                                ).toFixed(2)
                              : '0'
                            }%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-brown-600">Highest Rate</span>
                          <span className="font-semibold text-green-600">
                            {stats.saleProperties > 0 
                              ? Math.max(...properties.filter(p => p.listingType === 'sale').map(p => p.commissionRate || 0))
                              : '0'
                            }%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-brown-600">Lowest Rate</span>
                          <span className="font-semibold text-blue-600">
                            {stats.saleProperties > 0 
                              ? Math.min(...properties.filter(p => p.listingType === 'sale').map(p => p.commissionRate || 0))
                              : '0'
                            }%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Recent Properties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {properties.slice(0, 3).map((property) => (
                          <div key={property.id} className="flex items-center gap-4 p-4 border border-brown-100 rounded-lg">
                            <Image
                              src={property.image || "/placeholder.svg"} // Fallback image
                              alt={property.title}
                              width={60}
                              height={60}
                              className="rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-brown-800 truncate">{property.title}</p>
                              <p className="text-sm text-brown-600">{property.suburb} • {property.price}</p>
                            </div>
                            {getStatusBadge(property.status)}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {rentalApplications.slice(0, 3).map((application) => (
                          <div key={application.id} className="flex items-center justify-between p-4 border border-brown-100 rounded-lg">
                            <div>
                              <p className="font-medium text-brown-800">{application.applicantName}</p>
                              <p className="text-sm text-brown-600">{application.property}</p>
                            </div>
                            {getStatusBadge(application.status)}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sale-properties" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-light text-brown-800">Sale Properties</h2>
                  <Button 
                    onClick={() => {
                      setCreateType('property')
                      setIsCreateDialogOpen(true)
                    }}
                    className="bg-brown-800 hover:bg-brown-900"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sale Property
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Sale Price</TableHead>
                          <TableHead>Commission Rate</TableHead>
                          <TableHead>GCI</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {properties
                          .filter(property => property.listingType === 'sale')
                          .map((property) => {
                            const { commissionEarned } = calculateGrossIncomeAndCommission(property);
                            return (
                              <TableRow key={property.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Image
                                      src={property.image || "/placeholder.svg"} // Fallback image
                                      alt={property.title}
                                      width={50}
                                      height={50}
                                      className="rounded object-cover"
                                    />
                                    <div>
                                      <p className="font-medium text-brown-800">{property.title}</p>
                                      <p className="text-sm text-brown-600">{property.address}, {property.suburb}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{property.type}</Badge>
                                </TableCell>
                                <TableCell className="font-medium">{property.price}</TableCell>
                                <TableCell className="font-medium">{property.commissionRate}%</TableCell>
                                <TableCell className="font-medium text-green-700">
                                  ${commissionEarned.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-3 text-sm text-brown-600">
                                    <span className="flex items-center gap-1">
                                      <Bed className="h-3 w-3" />
                                      {property.beds}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Bath className="h-3 w-3" />
                                      {property.baths}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Car className="h-3 w-3" />
                                      {property.parking}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(property.status)}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleViewProperty(property)} title="View property details">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleEditProperty(property)} title="Edit property details">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => openMediaManager(property)} title="Manage photos (up to 5 images)">
                                      <Camera className="h-4 w-4" />
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete Property</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to delete this property listing? This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {properties.filter(p => p.listingType === 'sale').length === 0 && (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-brown-600">
                              No sale properties found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rent-properties" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-light text-brown-800">Rent Properties</h2>
                  <Button 
                    onClick={() => {
                      setCreateType('property')
                      setIsCreateDialogOpen(true)
                    }}
                    className="bg-brown-800 hover:bg-brown-900"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rental Property
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Weekly Rent</TableHead>
                          <TableHead>Annual Income</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {properties
                          .filter(property => property.listingType === 'rent')
                          .map((property) => {
                            const { grossIncome } = calculateGrossIncomeAndCommission(property);
                            return (
                              <TableRow key={property.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Image
                                      src={property.image || "/placeholder.svg"} // Fallback image
                                      alt={property.title}
                                      width={50}
                                      height={50}
                                      className="rounded object-cover"
                                    />
                                    <div>
                                      <p className="font-medium text-brown-800">{property.title}</p>
                                      <p className="text-sm text-brown-600">{property.address}, {property.suburb}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{property.type}</Badge>
                                </TableCell>
                                <TableCell className="font-medium">{property.price}</TableCell>
                                <TableCell className="font-medium text-blue-700">
                                  ${grossIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-3 text-sm text-brown-600">
                                    <span className="flex items-center gap-1">
                                      <Bed className="h-3 w-3" />
                                      {property.beds}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Bath className="h-3 w-3" />
                                      {property.baths}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Car className="h-3 w-3" />
                                      {property.parking}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(property.status)}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleViewProperty(property)} title="View property details">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleEditProperty(property)} title="Edit property details">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => openMediaManager(property)} title="Manage photos (up to 5 images)">
                                      <Camera className="h-4 w-4" />
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete Property</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to delete this property listing? This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {properties.filter(p => p.listingType === 'rent').length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-brown-600">
                              No rental properties found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="blog" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-light text-brown-800">Blog Posts</h2>
                  <Button 
                    onClick={() => {
                      setCreateType('blog')
                      setIsCreateDialogOpen(true)
                    }}
                    className="bg-brown-800 hover:bg-brown-900"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium text-brown-800">{post.title}</p>
                                <p className="text-sm text-brown-600 truncate max-w-xs">{post.excerpt}</p>
                              </div>
                            </TableCell>
                            <TableCell>{post.author}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{post.category}</Badge>
                            </TableCell>
                            <TableCell>{post.date}</TableCell>
                            <TableCell>{getStatusBadge(post.status)}</TableCell>
                            <TableCell>{post.views || 0}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" title="View post">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" title="Edit post">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this blog post? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rentals" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-light text-brown-800">Rental Applications</h2>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Applicant</TableHead>
                          <TableHead>Property</TableHead>
                          <TableHead>Application Date</TableHead>
                          <TableHead>Income</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rentalApplications.map((application) => (
                          <TableRow key={application.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium text-brown-800">{application.applicantName}</p>
                                <p className="text-sm text-brown-600">{application.email}</p>
                                <p className="text-sm text-brown-600">{application.phone}</p>
                              </div>
                            </TableCell>
                            <TableCell>{application.property}</TableCell>
                            <TableCell>{application.applicationDate}</TableCell>
                            <TableCell>{application.income}</TableCell>
                            <TableCell>{getStatusBadge(application.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" title="View application">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-green-600 hover:text-green-700"
                                  title="Approve application"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                  title="Reject application"
                                >
                                  <AlertCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="management" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Property Management</CardTitle>
                      <CardDescription>Manage properties under management</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Properties Under Management</span>
                          <span className="font-semibold">12</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Monthly Rental Income</span>
                          <span className="font-semibold">$28,650</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Vacancy Rate</span>
                          <span className="font-semibold text-green-600">2.1%</span>
                        </div>
                        <Button className="w-full" variant="outline">
                          View Management Dashboard
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Maintenance Requests</CardTitle>
                      <CardDescription>Active maintenance and repair requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Open Requests</span>
                          <span className="font-semibold text-orange-600">3</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>In Progress</span>
                          <span className="font-semibold text-blue-600">2</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Completed This Month</span>
                          <span className="font-semibold text-green-600">14</span>
                        </div>
                        <Button className="w-full" variant="outline">
                          View All Requests
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Financial Overview</CardTitle>
                      <CardDescription>Monthly financial summary</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Total Revenue</span>
                          <span className="font-semibold">$32,450</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Management Fees</span>
                          <span className="font-semibold">$2,875</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Maintenance Costs</span>
                          <span className="font-semibold text-red-600">$1,250</span>
                        </div>
                        <Button className="w-full" variant="outline">
                          Download Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Quick Actions</CardTitle>
                      <CardDescription>Common management tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        <Button variant="outline" className="justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          Tenant Communication
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Rent Collection
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Property Inspections
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Reports
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-8">
        <div className="container text-center">
          <p className="text-brown-200">© {new Date().getFullYear()} ALTO Property. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}