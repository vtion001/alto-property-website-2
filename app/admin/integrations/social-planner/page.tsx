"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

type Platform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin' | 'pinterest'

const PLATFORMS: Platform[] = ['facebook', 'instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'pinterest']

export default function SocialPlannerPage() {
  const [status, setStatus] = useState<Record<Platform, boolean>>({
    facebook: false,
    instagram: false,
    tiktok: false,
    youtube: false,
    twitter: false,
    linkedin: false,
    pinterest: false,
  })
  const [content, setContent] = useState('')
  const [selected, setSelected] = useState<Platform[]>(['facebook'])
  const [scheduledAt, setScheduledAt] = useState<string>('')
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    fetch('/api/integrations/social/auth/status')
      .then((r) => r.json())
      .then((d) => setStatus(d.status))
      .catch(() => {})
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
      } else {
        alert(data.error || 'Upload failed')
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
      if (!res.ok) alert(data.error || 'Failed to create post')
    } finally {
      setCreating(false)
    }
  }

  async function publishNow() {
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
      if (!res.ok) alert(data.error || 'Publish failed')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6">
      <aside className="rounded-lg border p-3 md:p-4 bg-white h-max sticky top-6 w-64">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Connections</span>
        </div>
        <div className="space-y-2">
          {PLATFORMS.map((p) => (
            <div key={p} className="flex items-center justify-between">
              <span className="text-sm capitalize">{p}</span>
              {status[p] ? (
                <span className="text-xs text-green-600">Connected</span>
              ) : (
                <Button variant="outline" size="sm" onClick={() => (window.location.href = `/api/integrations/social/oauth/start?platform=${p}`)}>
                  Connect
                </Button>
              )}
            </div>
          ))}
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
                className="capitalize"
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
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post..." className="mb-2" />
          <div className="flex items-center gap-2">
            <Input type="file" accept="image/*,video/*" onChange={handleUpload} disabled={uploading} />
            <span className="text-xs text-muted-foreground">{uploading ? 'Uploading…' : 'Upload media'}</span>
          </div>
          {mediaUrls.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {mediaUrls.map((u) => (
                <img key={u} src={u} alt="media" className="h-16 w-16 object-cover rounded border" />
              ))}
            </div>
          )}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
            <Button onClick={createScheduledPost} disabled={creating}>
              {creating ? 'Scheduling…' : 'Schedule Post'}
            </Button>
            <Button variant="secondary" onClick={publishNow} disabled={publishing}>
              {publishing ? 'Publishing…' : 'Publish Now'}
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-2 font-medium">Preview</div>
          <Tabs defaultValue={selected[0] || 'facebook'}>
            <TabsList>
              {selected.map((p) => (
                <TabsTrigger key={p} value={p} className="capitalize">
                  {p}
                </TabsTrigger>
              ))}
            </TabsList>
            {selected.map((p) => (
              <TabsContent key={p} value={p} className="mt-3">
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
          <pre className="text-xs whitespace-pre-wrap">
            {result ? JSON.stringify(result, null, 2) : 'No actions yet.'}
          </pre>
        </Card>
      </div>
    </div>
  )
}