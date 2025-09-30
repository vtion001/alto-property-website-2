"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"

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
  Camera, // Import Camera icon
  Phone,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Play,
  Download,
  Star,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Footer from "@/components/ui/footer"
import Dialer from "@/components/dialer/dialer"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content?: string
  author: string
  category: string
  date: string
  status: 'published' | 'draft'
  views?: number
  slug?: string
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

interface CallLog {
  id: string
  callSid: string
  to: string
  from: string
  status: 'completed' | 'busy' | 'no-answer' | 'failed' | 'canceled'
  direction: 'inbound' | 'outbound'
  duration: number
  startTime: string
  endTime: string
  recordingUrl?: string
  transcription?: string
  sentiment?: 'positive' | 'neutral' | 'negative'
  qualityScore?: number
  tags?: string[]
}

interface CallAnalytics {
  totalCalls: number
  completedCalls: number
  averageDuration: number
  successRate: number
  sentimentBreakdown: {
    positive: number
    neutral: number
    negative: number
  }
  averageQualityScore: number
  callsByDay: { date: string; count: number }[]
  topPerformers: { agent: string; calls: number; avgScore: number }[]
}

export default function AdminPage() {
  const makeSlug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
  const blogPathFor = (post: BlogPost) => `/blog/${post.slug || makeSlug(post.title)}`
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false) // State for media manager dialog
  const [selectedPropertyForMedia, setSelectedPropertyForMedia] = useState<Property | null>(null) // To keep track of the property being managed
  const [createType, setCreateType] = useState<'blog' | 'property' | null>(null)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null) // State for viewing property details
  const [isBlogViewOpen, setIsBlogViewOpen] = useState(false)
  const [isBlogEditOpen, setIsBlogEditOpen] = useState(false)
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)
  const [editedBlogPost, setEditedBlogPost] = useState<BlogPost | null>(null)
  const [isDialerOpen, setIsDialerOpen] = useState(true) // Temporarily open for debugging
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [callLogs, setCallLogs] = useState<CallLog[]>([])
  const [callAnalytics, setCallAnalytics] = useState<CallAnalytics | null>(null)
  const [selectedCallLog, setSelectedCallLog] = useState<CallLog | null>(null)
  const [isCallLogViewOpen, setIsCallLogViewOpen] = useState(false)

  const adminNavItems = [
    { value: 'overview', label: 'Overview', icon: Home },
    { value: 'gci', label: 'GCI', icon: TrendingUp },
    { value: 'sale-properties', label: 'Sale Properties', icon: Home },
    { value: 'rent-properties', label: 'Rent Properties', icon: Home },
    { value: 'blog', label: 'Blog', icon: FileText },
    { value: 'rentals', label: 'Rentals', icon: Users },
    { value: 'management', label: 'Management', icon: Settings },
    { value: 'dialer', label: 'Dialer', icon: Phone },
    { value: 'call-analysis', label: 'Call Analysis', icon: BarChart3 },
    { value: 'integrations', label: 'Integrations', icon: Settings },
    { value: 'google-reviews', label: 'Google Reviews', icon: Eye },
  ]

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  const [properties, setProperties] = useState<Property[]>([])

  // Load properties from API (falls back to localStorage on failure)
  useEffect(() => {
    const mapPropertyRow = (row: unknown): Property => {
      const r = row as Record<string, unknown>
      return {
        id: String(r.id || ''),
        title: String(r.title || ''),
        address: String(r.address || ''),
        suburb: String(r.suburb || ''),
        price: String(r.price || ''),
        beds: Number(r.beds || 0),
        baths: Number(r.baths || 0),
        parking: Number(r.parking || 0),
        landSize: String(r.land_size || r.landSize || ''),
        status: String(r.status || 'available') as Property['status'],
        type: String(r.type || 'house') as Property['type'],
        listingType: String(r.listing_type || r.listingType || 'sale') as Property['listingType'],
        image: String(r.image || ''),
        images: Array.isArray(r.images) ? r.images.map(String) : [],
        dateAdded: String(r.date_added || r.dateAdded || ''),
        description: String(r.description || ''),
        features: Array.isArray(r.features) ? r.features.map(String) : [],
        commissionRate: Number(r.commission_rate ?? r.commissionRate ?? 0),
      }
    }
    ;(async () => {
      try {
        const res = await fetch('/api/properties', { cache: 'no-store' })
        const data = await res.json()
        if (Array.isArray(data)) {
          setProperties(data.map(mapPropertyRow))
          return
        }
      } catch {}
      try {
        const stored = localStorage.getItem('alto:properties')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) setProperties(parsed)
        }
      } catch {}
    })()
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('alto:properties', JSON.stringify(properties))
    } catch {}
  }, [properties])

  // Load blog posts from API (falls back to localStorage on failure)
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/blog-posts', { cache: 'no-store' })
        const data = await res.json()
        if (Array.isArray(data)) {
          const mapped = data.map((b: unknown): BlogPost => {
            const blog = b as Record<string, unknown>
            return {
              id: String(blog.id || ''),
              title: String(blog.title || ''),
              excerpt: String(blog.excerpt || ''),
              author: String(blog.author || ''),
              category: String(blog.category || ''),
              date: String(blog.date || ''),
              status: (blog.published ? 'published' : 'draft') as 'published' | 'draft',
              views: Number(blog.views || 0),
              slug: String(blog.slug || ''),
            }
          })
          setBlogPosts(mapped)
          return
        }
      } catch {}
      try {
        const stored = localStorage.getItem('alto:blogPosts')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) setBlogPosts(parsed)
        }
      } catch {}
    })()
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('alto:blogPosts', JSON.stringify(blogPosts))
    } catch {}
  }, [blogPosts])

  // Load call logs and analytics
  useEffect(() => {
    const loadCallData = async () => {
      try {
        // Try to fetch from API first
        const [logsRes, analyticsRes] = await Promise.all([
          fetch('/api/call-logs', { cache: 'no-store' }),
          fetch('/api/call-analytics', { cache: 'no-store' })
        ])
        
        if (logsRes.ok) {
          const logs = await logsRes.json()
          if (Array.isArray(logs)) {
            setCallLogs(logs)
          }
        }
        
        if (analyticsRes.ok) {
          const apiResponse = await analyticsRes.json()
          // Transform API response to match CallAnalytics interface
          const analytics: CallAnalytics = {
            totalCalls: apiResponse.overview?.totalCalls || 0,
            completedCalls: apiResponse.overview?.successfulCalls || 0,
            averageDuration: apiResponse.overview?.averageDuration || 0,
            successRate: apiResponse.overview?.successRate || 0,
            averageQualityScore: apiResponse.overview?.qualityScore || 0,
            sentimentBreakdown: {
              positive: 0,
              neutral: 0,
              negative: 0
            },
            callsByDay: [],
            topPerformers: []
          }
          setCallAnalytics(analytics)
        }
      } catch (_error) {
        // Fallback to mock data for development
        const mockCallLogs: CallLog[] = [
          {
            id: '1',
            callSid: 'CA1234567890abcdef',
            to: '+61412345678',
            from: '+61487654321',
            status: 'completed',
            direction: 'outbound',
            duration: 180,
            startTime: new Date(Date.now() - 86400000).toISOString(),
            endTime: new Date(Date.now() - 86400000 + 180000).toISOString(),
            recordingUrl: 'https://example.com/recording1.mp3',
            transcription: 'Hello, I\'m calling about the property listing...',
            sentiment: 'positive',
            qualityScore: 8.5,
            tags: ['property-inquiry', 'interested-buyer']
          },
          {
            id: '2',
            callSid: 'CA0987654321fedcba',
            to: '+61423456789',
            from: '+61487654321',
            status: 'completed',
            direction: 'outbound',
            duration: 240,
            startTime: new Date(Date.now() - 172800000).toISOString(),
            endTime: new Date(Date.now() - 172800000 + 240000).toISOString(),
            recordingUrl: 'https://example.com/recording2.mp3',
            transcription: 'Thank you for your interest in our rental property...',
            sentiment: 'neutral',
            qualityScore: 7.2,
            tags: ['rental-inquiry', 'follow-up']
          }
        ]
        
        const mockAnalytics: CallAnalytics = {
          totalCalls: 45,
          completedCalls: 38,
          averageDuration: 195,
          successRate: 84.4,
          sentimentBreakdown: {
            positive: 22,
            neutral: 12,
            negative: 4
          },
          averageQualityScore: 7.8,
          callsByDay: [
            { date: '2024-01-15', count: 8 },
            { date: '2024-01-16', count: 12 },
            { date: '2024-01-17', count: 6 },
            { date: '2024-01-18', count: 9 },
            { date: '2024-01-19', count: 10 }
          ],
          topPerformers: [
            { agent: 'John Smith', calls: 15, avgScore: 8.2 },
            { agent: 'Sarah Johnson', calls: 12, avgScore: 7.9 },
            { agent: 'Mike Wilson', calls: 11, avgScore: 7.5 }
          ]
        }
        
        setCallLogs(mockCallLogs)
        setCallAnalytics(mockAnalytics)
      }
    }
    
    loadCallData()
  }, [])

  const [rentalApplications, _setRentalApplications] = useState<RentalApplication[]>([])

  const [newBlogPost, setNewBlogPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    image: ""
  })

  const [newProperty, setNewProperty] = useState<{
    title: string
    address: string
    suburb: string
    price: string
    beds: string
    baths: string
    parking: string
    landSize: string
    type: Property['type']
    listingType: Property['listingType']
    description: string
    features: string[]
    image: string
    images: string[]
    commissionRate: string
  }>({
    title: "",
    address: "",
    suburb: "",
    price: "",
    beds: "",
    baths: "",
    parking: "",
    landSize: "",
    type: "house",
    listingType: "sale",
    description: "",
    features: [],
    image: "",
    images: [],
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
    const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
    const payload = {
      title: newBlogPost.title,
      slug: slugify(newBlogPost.title || `post-${Date.now()}`),
      excerpt: newBlogPost.excerpt,
      content: newBlogPost.content,
      author: newBlogPost.author,
      category: newBlogPost.category,
      image: newBlogPost.image,
      published: false,
    }
    ;(async () => {
      try {
        const res = await fetch('/api/blog-posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        const created = await res.json()
        if (res.ok) {
          setBlogPosts([created, ...blogPosts])
          setNewBlogPost({ title: "", excerpt: "", content: "", author: "", category: "", image: "" })
          setIsCreateDialogOpen(false)
        }
      } catch {}
    })()
  }

  const _handleViewBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post)
    setIsBlogViewOpen(true)
  }

  const _handleOpenEditBlogPost = (post: BlogPost) => {
    setEditedBlogPost({ ...post })
    setIsBlogEditOpen(true)
  }

  const handleSaveEditedBlogPost = () => {
    if (!editedBlogPost) return
    ;(async () => {
      try {
        const res = await fetch(`/api/blog-posts/${editedBlogPost.id}` , { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          title: editedBlogPost.title,
          slug: editedBlogPost.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-') || `post-${editedBlogPost.id}`,
          excerpt: editedBlogPost.excerpt,
          content: (editedBlogPost.content as string) || '',
          date: editedBlogPost.date,
          author: editedBlogPost.author,
          category: editedBlogPost.category,
          image: '',
          status: editedBlogPost.status,
        }) })
        const updated = await res.json()
        if (res.ok) {
          setBlogPosts(prev => prev.map(p => p.id === editedBlogPost.id ? { ...p, ...updated } : p))
          setIsBlogEditOpen(false)
        }
      } catch {}
    })()
  }

  const handleDeleteBlogPost = (postId: string) => {
    ;(async () => {
      try {
        const res = await fetch(`/api/blog-posts/${postId}`, { method: 'DELETE' })
        if (res.ok) setBlogPosts(prev => prev.filter(p => p.id !== postId))
      } catch {}
    })()
  }

  const handleCreateProperty = () => {
    const payload = {
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
      dateAdded: new Date().toISOString().split('T')[0],
      description: newProperty.description,
      features: newProperty.features,
      commissionRate: parseFloat(newProperty.commissionRate) || 0
    }
    ;(async () => {
      try {
        const res = await fetch('/api/properties', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        const created = await res.json()
        if (res.ok) {
          setProperties([created, ...properties])
          setNewProperty({ title: "", address: "", suburb: "", price: "", beds: "", baths: "", parking: "", landSize: "", type: "house", listingType: "sale", description: "", features: [], image: "", images: [], commissionRate: "" })
          setIsCreateDialogOpen(false)
        }
      } catch {}
    })()
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
    if (!editingProperty) return
    ;(async () => {
      try {
        const res = await fetch(`/api/properties/${editingProperty.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          title: editedProperty.title,
          address: editedProperty.address,
          suburb: editedProperty.suburb,
          price: editedProperty.price,
          beds: editedProperty.beds,
          baths: editedProperty.baths,
          parking: editedProperty.parking,
          landSize: editedProperty.landSize,
          status: editedProperty.status,
          type: editedProperty.type,
          listingType: editedProperty.listingType,
          image: editedProperty.image,
          dateAdded: editedProperty.dateAdded,
          description: editedProperty.description,
          features: editedProperty.features,
          commissionRate: editedProperty.commissionRate,
        }) })
        const updated = await res.json()
        if (res.ok) {
          setProperties(props => props.map(p => p.id === editingProperty.id ? { ...p, ...updated } : p))
          setIsEditDialogOpen(false)
          setEditingProperty(null)
        }
      } catch {}
    })()
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

  const handleDeleteProperty = (id: string) => {
    ;(async () => {
      try {
        const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' })
        if (res.ok) setProperties(prev => prev.filter(p => p.id !== id))
      } catch {}
    })()
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
              <div className="flex items-center gap-3">
              <Button variant="outline" onClick={async () => { try { await fetch('/api/admin/auth/logout', { method: 'POST' }) } catch {} router.push('/admin/auth/login') }}>Logout</Button>
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
                          <Select value={newProperty.type} onValueChange={(value) => setNewProperty({...newProperty, type: value as Property['type']})}>
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
                          <Select value={newProperty.listingType} onValueChange={(value: string) => setNewProperty({...newProperty, listingType: value as Property['listingType']})}>
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
              </div>

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
                          <Select value={editedProperty.type} onValueChange={(value: string) => setEditedProperty({...editedProperty, type: value as Property['type']})}>
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
                          <Select value={editedProperty.listingType} onValueChange={(value: string) => setEditedProperty({...editedProperty, listingType: value as Property['listingType']})}>
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
                        {(selectedPropertyForMedia.images?.length || 0) < 5 && (
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
                      {(selectedPropertyForMedia.images?.length || 0) >= 5 && (
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

            {/* Main Content with collapsible sidebar */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6">
              <aside
                className={`rounded-lg border p-3 md:p-4 bg-white h-max sticky top-6 ${
                  isSidebarCollapsed ? 'w-16' : 'w-64'
                } transition-all`}
              >
                <div className="flex items-center justify-between mb-2">
                  {!isSidebarCollapsed && (
                    <span className="text-sm font-medium text-brown-700">Navigation</span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    aria-expanded={!isSidebarCollapsed}
                  >
                    {isSidebarCollapsed ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : (
                      <ChevronLeft className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <nav
                  className="space-y-1"
                  role="navigation"
                  aria-label="Admin navigation"
                >
                  {adminNavItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.value
                    return (
                      <button
                        key={item.value}
                        onClick={() => setActiveTab(item.value)}
                        className={`w-full flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors ${
                          isActive
                            ? 'bg-brown-100 text-brown-900'
                            : 'hover:bg-brown-50 text-brown-700'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                        aria-label={isSidebarCollapsed ? item.label : undefined}
                        title={isSidebarCollapsed ? item.label : undefined}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!isSidebarCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </button>
                    )
                  })}
                </nav>
              </aside>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6" id="admin-tabs" data-component="admin-tabs">

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

              <TabsContent value="dialer" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-light text-brown-800">Twilio Dialer</h2>
                  <Button variant="outline" onClick={() => setIsDialerOpen(true)}>Open Dialer</Button>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Phone Dialing System</CardTitle>
                    <CardDescription>Place calls and manage Twilio configuration. Clicking &quot;Open Dialer&quot; will take you to the dedicated dialer interface.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-brown-700 text-sm">
                      <p>What you can do:</p>
                      <ul className="list-disc list-inside">
                        <li>Dial phone numbers via Twilio</li>
                        <li>Configure Account SID, Auth Token and Number</li>
                        <li>View recent call history and saved contacts</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <Dialog open={isDialerOpen} onOpenChange={setIsDialerOpen}>
                <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Dialer</DialogTitle>
                    <DialogDescription>Place calls and manage configuration</DialogDescription>
                  </DialogHeader>
                  <Dialer />
                </DialogContent>
              </Dialog>

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

              <TabsContent value="sale-properties" className="space-y-6" id="content-sale-properties" data-content="sale-properties">
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
                                    <Link href="/buying/search-properties" target="_blank" aria-label={`View ${property.title} on site`}>
                                      <Button asChild variant="ghost" size="sm" title="View listing on site">
                                        <span>
                                          <Eye className="h-4 w-4" />
                                        </span>
                                      </Button>
                                    </Link>
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
                                          <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDeleteProperty(property.id)}>
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

              <TabsContent value="rent-properties" className="space-y-6" id="content-rent-properties" data-content="rent-properties">
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
                                    <Link href="/buying/search-properties" target="_blank" aria-label={`View ${property.title} on site`}>
                                      <Button asChild variant="ghost" size="sm" title="View listing on site">
                                        <span>
                                          <Eye className="h-4 w-4" />
                                        </span>
                                      </Button>
                                    </Link>
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
                                          <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDeleteProperty(property.id)}>
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
                                <Link href={blogPathFor(post)} target="_blank" aria-label={`View ${post.title} on site`}>
                                  <Button asChild variant="ghost" size="sm" title="View post on site">
                                    <span>
                                      <Eye className="h-4 w-4" />
                                    </span>
                                  </Button>
                                </Link>
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
                                      <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDeleteBlogPost(post.id)}>
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
              {/* Blog View Dialog */}
              <Dialog open={isBlogViewOpen} onOpenChange={setIsBlogViewOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{selectedBlogPost?.title}</DialogTitle>
                    <DialogDescription>
                      {selectedBlogPost?.author} • {selectedBlogPost?.date} • {selectedBlogPost?.category}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-brown-700">{selectedBlogPost?.excerpt}</p>
                    <div className="text-sm text-brown-600">Status: {selectedBlogPost?.status}</div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Blog Edit Dialog */}
              <Dialog open={isBlogEditOpen} onOpenChange={setIsBlogEditOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Blog Post</DialogTitle>
                    <DialogDescription>Update title, excerpt, author, category and status.</DialogDescription>
                  </DialogHeader>
                  {editedBlogPost && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="edit-blog-title">Title</Label>
                        <Input id="edit-blog-title" value={editedBlogPost.title} onChange={(e) => setEditedBlogPost({ ...editedBlogPost, title: e.target.value })} />
                      </div>
                      <div>
                        <Label htmlFor="edit-blog-excerpt">Excerpt</Label>
                        <Textarea id="edit-blog-excerpt" value={editedBlogPost.excerpt} onChange={(e) => setEditedBlogPost({ ...editedBlogPost, excerpt: e.target.value })} rows={4} />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="edit-blog-author">Author</Label>
                          <Input id="edit-blog-author" value={editedBlogPost.author} onChange={(e) => setEditedBlogPost({ ...editedBlogPost, author: e.target.value })} />
                        </div>
                        <div>
                          <Label htmlFor="edit-blog-category">Category</Label>
                          <Input id="edit-blog-category" value={editedBlogPost.category} onChange={(e) => setEditedBlogPost({ ...editedBlogPost, category: e.target.value })} />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="edit-blog-date">Date</Label>
                          <Input id="edit-blog-date" type="date" value={editedBlogPost.date} onChange={(e) => setEditedBlogPost({ ...editedBlogPost, date: e.target.value })} />
                        </div>
                        <div>
                          <Label htmlFor="edit-blog-status">Status</Label>
                          <Select value={editedBlogPost.status} onValueChange={(v: string) => setEditedBlogPost({ ...editedBlogPost, status: v as BlogPost['status'] })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsBlogEditOpen(false)}>Cancel</Button>
                        <Button className="bg-brown-800 hover:bg-brown-900" onClick={handleSaveEditedBlogPost}>Save</Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
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

              <TabsContent value="integrations" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Google Reviews Integration */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Google Reviews</CardTitle>
                      <CardDescription>Connect your Google Business to sync reviews</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-brown-600 text-sm">Showcase verified Google Reviews across your site. Manage, sync and display reviews on key pages.</p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                          <Link href="/admin/integrations/google-reviews" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto">
                            Manage
                          </Link>
                          <Link href="/admin/integrations/google-reviews/oauth" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto">
                            Sync Now
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Placeholder for future integrations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Zapier (Coming Soon)</CardTitle>
                      <CardDescription>Automate workflows with zaps</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-brown-600 text-sm">We are preparing native Zapier integration to push new leads and reviews to your CRM.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Webhook (Coming Soon)</CardTitle>
                      <CardDescription>Send events to external services</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-brown-600 text-sm">Configure outbound webhooks for new review events and lead submissions.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="google-reviews" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-light text-brown-800">Google Reviews Integration</h2>
                  <p className="text-brown-600">Manage customer reviews from Google Business</p>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Quick Access</CardTitle>
                    <CardDescription>Access Google Reviews management tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Reviews</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Average Rating</span>
                        <span className="font-semibold text-green-600">4.8/5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Recent Reviews</span>
                        <span className="font-semibold text-blue-600">5 this month</span>
                      </div>
                      <Button className="w-full" variant="outline" asChild>
                        <a href="/admin/integrations/google-reviews">
                          Manage Google Reviews
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Review Analytics</CardTitle>
                      <CardDescription>Performance insights</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>5-Star Reviews</span>
                          <span className="font-semibold text-green-600">18</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>4-Star Reviews</span>
                          <span className="font-semibold text-blue-600">4</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Response Rate</span>
                          <span className="font-semibold text-green-600">100%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Integration Status</CardTitle>
                      <CardDescription>Google Business connection</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Connection Status</span>
                          <span className="font-semibold text-green-600">Connected</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Last Sync</span>
                          <span className="font-semibold">2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Auto-Sync</span>
                          <span className="font-semibold text-green-600">Enabled</span>
                        </div>
                        <Button className="w-full" variant="outline">
                          Sync Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="call-analysis" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-light text-brown-800">Call Analysis Dashboard</h2>
                  <p className="text-brown-600">Monitor call performance, quality, and analytics</p>
                </div>

                {/* Analytics Overview Cards */}
                {callAnalytics && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                        <Phone className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{callAnalytics.totalCalls}</div>
                        <p className="text-xs text-muted-foreground">
                          {callAnalytics.completedCalls} completed
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{callAnalytics.successRate}%</div>
                        <p className="text-xs text-muted-foreground">
                          Call completion rate
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{Math.floor(callAnalytics.averageDuration / 60)}m {callAnalytics.averageDuration % 60}s</div>
                        <p className="text-xs text-muted-foreground">
                          Average call length
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{callAnalytics.averageQualityScore}/10</div>
                        <p className="text-xs text-muted-foreground">
                          Average call quality
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Sentiment Analysis */}
                {callAnalytics && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-light">Sentiment Analysis</CardTitle>
                      <CardDescription>Call sentiment breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex items-center space-x-2">
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">Positive</p>
                            <p className="text-2xl font-bold text-green-600">{callAnalytics.sentimentBreakdown?.positive || 0}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full bg-gray-400"></div>
                          <div>
                            <p className="text-sm font-medium">Neutral</p>
                            <p className="text-2xl font-bold text-gray-600">{callAnalytics.sentimentBreakdown?.neutral || 0}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                          <div>
                            <p className="text-sm font-medium">Negative</p>
                            <p className="text-2xl font-bold text-red-600">{callAnalytics.sentimentBreakdown?.negative || 0}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Call Logs Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-light">Recent Call Logs</CardTitle>
                    <CardDescription>Detailed call history and recordings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date/Time</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Direction</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Sentiment</TableHead>
                          <TableHead>Quality</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {callLogs.map((call) => (
                          <TableRow key={call.id}>
                            <TableCell>
                              <div className="text-sm">
                                {new Date(call.startTime).toLocaleDateString()}
                                <br />
                                <span className="text-muted-foreground">
                                  {new Date(call.startTime).toLocaleTimeString()}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div className="font-medium">{call.to}</div>
                                <div className="text-muted-foreground">From: {call.from}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={call.direction === 'outbound' ? 'default' : 'secondary'}>
                                {call.direction}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {Math.floor(call.duration / 60)}m {call.duration % 60}s
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  call.status === 'completed' ? 'default' : 
                                  call.status === 'failed' ? 'destructive' : 
                                  'secondary'
                                }
                              >
                                {call.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {call.sentiment && (
                                <Badge 
                                  variant={
                                    call.sentiment === 'positive' ? 'default' : 
                                    call.sentiment === 'negative' ? 'destructive' : 
                                    'secondary'
                                  }
                                >
                                  {call.sentiment}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {call.qualityScore && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{call.qualityScore}/10</span>
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedCallLog(call)
                                    setIsCallLogViewOpen(true)
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {call.recordingUrl && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => window.open(call.recordingUrl, '_blank')}
                                  >
                                    <Play className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Call Detail Dialog */}
                <Dialog open={isCallLogViewOpen} onOpenChange={setIsCallLogViewOpen}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Call Details</DialogTitle>
                      <DialogDescription>
                        Detailed information and transcription for call {selectedCallLog?.callSid}
                      </DialogDescription>
                    </DialogHeader>
                    {selectedCallLog && (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label className="text-sm font-medium">Call Information</Label>
                            <div className="mt-2 space-y-2 text-sm">
                              <div><strong>Call SID:</strong> {selectedCallLog.callSid}</div>
                              <div><strong>To:</strong> {selectedCallLog.to}</div>
                              <div><strong>From:</strong> {selectedCallLog.from}</div>
                              <div><strong>Direction:</strong> {selectedCallLog.direction}</div>
                              <div><strong>Status:</strong> {selectedCallLog.status}</div>
                              <div><strong>Duration:</strong> {Math.floor(selectedCallLog.duration / 60)}m {selectedCallLog.duration % 60}s</div>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Analysis</Label>
                            <div className="mt-2 space-y-2 text-sm">
                              {selectedCallLog.sentiment && (
                                <div><strong>Sentiment:</strong> {selectedCallLog.sentiment}</div>
                              )}
                              {selectedCallLog.qualityScore && (
                                <div><strong>Quality Score:</strong> {selectedCallLog.qualityScore}/10</div>
                              )}
                              {selectedCallLog.tags && selectedCallLog.tags.length > 0 && (
                                <div>
                                  <strong>Tags:</strong>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {selectedCallLog.tags.map((tag, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {selectedCallLog.transcription && (
                          <div>
                            <Label className="text-sm font-medium">Call Transcription</Label>
                            <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                              {selectedCallLog.transcription}
                            </div>
                          </div>
                        )}
                        
                        {selectedCallLog.recordingUrl && (
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => window.open(selectedCallLog.recordingUrl, '_blank')}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Play Recording
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                const link = document.createElement('a')
                                link.href = selectedCallLog.recordingUrl!
                                link.download = `call-${selectedCallLog.callSid}.mp3`
                                link.click()
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TabsContent>
            </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}