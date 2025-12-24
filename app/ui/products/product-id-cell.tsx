"use client"

import { Copy } from "lucide-react"
import { Button } from "@/app/ui/button"
import { useState } from "react"

export default function ProductIdCell({ id }: { id: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <span 
        className="font-mono text-xs text-gray-500 truncate max-w-[80px]" 
        title={id} // Esto muestra el ID completo al dejar el mouse quieto encima
      >
        {id}
      </span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 text-gray-400 hover:text-black"
        onClick={handleCopy}
        title="Copiar ID completo"
      >
        {copied ? (
            <span className="text-green-600 font-bold text-xs">✓</span>
        ) : (
            <Copy className="h-3 w-3" />
        )}
      </Button>
    </div>
  )
}