"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'

type Platform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin' | 'pinterest'

const PLATFORMS: Platform[] = ['facebook', 'instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'pinterest']

export default function SocialPlannerPage() {
  const { toast } = useToast()
  const [status, setStatus] = useState<Record<Platform, boolean>>({
    facebook: false,
    instagram: false,
    tiktok: false,
    youtube: false,
    twitter: false,
    linkedin: false,
    pinterest: false,
  })
  const [statusLoading, setStatusLoading] = useState(true)
  const [statusError, setStatusError] = useState<string | null>(null)
  const [content, setContent] = useState('')
  const [selected, setSelected] = useState<Platform[]>(['facebook'])
  const [scheduledAt, setScheduledAt] = useState<string>('')
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [confirmPublishOpen, setConfirmPublishOpen] = useState(false)
  const [resultDialogOpen, setResultDialogOpen] = useState(false)
  const isFormValid = useMemo(() => content.trim().length > 0 || mediaUrls.length > 0, [content, mediaUrls])

  useEffect(() => {
    setStatusLoading(true)
    setStatusError(null)
    fetch('/api/integrations/social/auth/status')
      .then(async (r) => {
        const d = await r.json()
        if (!r.ok) throw new Error(d?.error || 'Status fetch failed')
        return d
      })
      .then((d) => setStatus(d.status))
      .catch((err) => setStatusError(err?.message || 'Unable to load status'))
      .finally(() => setStatusLoading(false))
  }, [])

  function togglePlatform(p: Platform) {
    setSelected((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]))
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('media', file)
      const res = await fetch('/api/social/media/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) {
        setMediaUrls((m) => [...m, data.url])
        toast({ title: 'Media uploaded', description: 'Your file is ready to use.' })
      } else {
        toast({ title: 'Upload failed', description: data.error || 'Try again later.', variant: 'destructive' })
      }
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function createScheduledPost() {
    setCreating(true)
    setResult(null)
    try {
      const res = await fetch('/api/social/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, mediaUrls, scheduledAt: scheduledAt || null, platforms: selected }),
      })
      const data = await res.json()
      setResult(data)
      if (!res.ok) {
        toast({ title: 'Failed to schedule', description: data.error || 'Please check inputs.', variant: 'destructive' })
      } else {
        toast({ title: 'Post scheduled', description: 'Your post is queued for publishing.' })
      }
    } finally {
      setCreating(false)
    }
  }

  async function publishNowConfirmed() {
    setPublishing(true)
    setResult(null)
    try {
      const res = await fetch('/api/social/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, mediaUrls, platforms: selected }),
      })
      const data = await res.json()
      setResult(data)
      if (!res.ok) {
        toast({ title: 'Publish failed', description: data.error || 'Try again later.', variant: 'destructive' })
      } else {
        toast({ title: 'Published', description: 'Your content was posted successfully.' })
      }
    } finally {
      setPublishing(false)
      setConfirmPublishOpen(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6">
      <aside className="rounded-lg border p-3 md:p-4 bg-white h-max sticky top-6 w-64">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Connections</span>
        </div>
        <div className="space-y-2">
          {statusLoading && (
            <div className="space-y-2" aria-busy="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          )}
          {!statusLoading && PLATFORMS.map((p) => (
            <div key={p} className="flex items-center justify-between">
              <span className="text-sm capitalize">{p}</span>
              {status[p] ? (
                <span className="text-xs text-green-600">Connected</span>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => (window.location.href = `/api/integrations/social/oauth/start?platform=${p}`)}
                        className="transition-colors duration-200 ease-out"
                      >
                        Connect
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Authorize {p} account</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          ))}
          {statusError && (
            <div className="text-xs text-red-600" role="alert">
              {statusError}
            </div>
          )}
        </div>
        <div className="mt-4">
          <span className="text-sm font-medium">Select Platforms</span>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {PLATFORMS.map((p) => (
              <Button
                key={p}
                variant={selected.includes(p) ? 'default' : 'outline'}
                size="sm"
                onClick={() => togglePlatform(p)}
                className="capitalize transition-colors duration-200 ease-out"
                aria-pressed={selected.includes(p)}
              >
                {p}
              </Button>
            ))}
          </div>
        </div>
      </aside>

      <div className="space-y-4">
        <Card className="p-4">
          <div className="mb-2 font-medium">Post Composer</div>
          <div className="space-y-2">
            <Label htmlFor="post-content" className="text-sm">Content</Label>
            <Textarea id="post-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post..." className="mb-2" />
          </div>
          <div className="flex items-center gap-2">
            <div className="space-y-1">
              <Label htmlFor="media-upload" className="text-sm">Media</Label>
              <Input id="media-upload" type="file" accept="image/*,video/*" onChange={handleUpload} disabled={uploading} aria-busy={uploading} aria-describedby="upload-status" />
            </div>
            <span id="upload-status" className="text-xs text-muted-foreground" aria-live="polite">{uploading ? 'Uploading…' : 'Upload media'}</span>
          </div>
          {mediaUrls.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {mediaUrls.map((u) => (
                <img key={u} src={u} alt="media" className="h-16 w-16 object-cover rounded border" />
              ))}
            </div>
          )}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="schedule-at" className="text-sm">Schedule</Label>
              <Input id="schedule-at" type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
            </div>
            <Button onClick={createScheduledPost} disabled={creating || !isFormValid} aria-busy={creating} className="transition-transform duration-200 ease-out active:scale-[0.98]">
              {creating ? 'Scheduling…' : 'Schedule Post'}
            </Button>
            <Button variant="secondary" onClick={() => setConfirmPublishOpen(true)} disabled={publishing || !isFormValid} aria-busy={publishing} className="transition-transform duration-200 ease-out active:scale-[0.98]">
              {publishing ? 'Publishing…' : 'Publish Now'}
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-2 font-medium">Preview</div>
          <Tabs defaultValue={selected[0] || 'facebook'}>
            <TabsList>
              {selected.map((p) => (
                <TabsTrigger key={p} value={p} className="capitalize transition-colors duration-200 ease-out">
                  {p}
                </TabsTrigger>
              ))}
            </TabsList>
            {selected.map((p) => (
              <TabsContent key={p} value={p} className="mt-3 transition-opacity duration-200 ease-out data-[state=active]:opacity-100 opacity-90">
                <Card className="p-3">
                  <div className="text-sm text-muted-foreground">{p} preview</div>
                  <div className="mt-2 whitespace-pre-wrap">{content}</div>
                  {mediaUrls.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {mediaUrls.map((u) => (
                        <img key={u} src={u} alt="media" className="h-20 w-20 object-cover rounded border" />
                      ))}
                    </div>
                  )}
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        <Card className="p-4">
          <div className="mb-2 font-medium">Result</div>
          <div role="status" aria-live="polite" className="text-xs whitespace-pre-wrap">
            {result ? (
              <>
                <pre className="text-xs whitespace-pre-wrap max-h-40 overflow-auto border rounded p-2 bg-muted/20">
                  {JSON.stringify(result, null, 2)}
                </pre>
                <div className="mt-2">
                  <Button variant="outline" size="sm" onClick={() => setResultDialogOpen(true)} className="transition-colors duration-200 ease-out">
                    View Details
                  </Button>
                </div>
              </>
            ) : (
              'No actions yet.'
            )}
          </div>
        </Card>
      </div>
      {/* Confirm Publish Dialog */}
      <Dialog open={confirmPublishOpen} onOpenChange={setConfirmPublishOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Publish now?</DialogTitle>
            <DialogDescription>Confirm posting immediately to selected platforms.</DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            {selected.length} platform(s) selected. {mediaUrls.length} media file(s).
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmPublishOpen(false)} className="transition-colors duration-200 ease-out">Cancel</Button>
            <Button onClick={publishNowConfirmed} className="transition-colors duration-200 ease-out">Confirm Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Result Details Dialog */}
      <Dialog open={resultDialogOpen} onOpenChange={setResultDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Action Result</DialogTitle>
            <DialogDescription>Detailed response from the server.</DialogDescription>
          </DialogHeader>
          <pre className="text-xs whitespace-pre-wrap max-h-80 overflow-auto border rounded p-3 bg-muted/20">
            {result ? JSON.stringify(result, null, 2) : 'No data.'}
          </pre>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResultDialogOpen(false)} className="transition-colors duration-200 ease-out">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}