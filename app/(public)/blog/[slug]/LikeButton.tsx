"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface LikeButtonProps {
  postId: string
  initialCount: number
}

export default function LikeButton({ postId, initialCount }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount)
  const [liked, setLiked] = useState(false)

  const toggleLike = async () => {
    if (liked) {
      setCount((c) => c - 1)
      setLiked(false)
    } else {
      setCount((c) => c + 1)
      setLiked(true)
    }

    try {
      await fetch(`/api/blog/${postId}/like`, { method: "POST" })
    } catch {
      if (liked) {
        setCount((c) => c + 1)
        setLiked(false)
      } else {
        setCount((c) => c - 1)
        setLiked(true)
      }
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLike}
      className="gap-2"
    >
      <Heart
        className={cn(
          "size-4 transition-colors",
          liked && "fill-red-500 text-red-500"
        )}
      />
      <span>{count}</span>
    </Button>
  )
}
