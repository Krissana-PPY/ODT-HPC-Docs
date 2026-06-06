"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ code, language = "bash", title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("rounded-xl overflow-hidden border border-slate-200 shadow-sm", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1e293b]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          {title && (
            <span className="text-slate-400 text-xs font-mono ml-1">{title}</span>
          )}
          {!title && (
            <span className="text-slate-500 text-xs font-mono">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs transition-colors px-2 py-1 rounded hover:bg-white/10"
          title="คัดลอกโค้ด"
        >
          {copied ? (
            <>
              <Check size={13} className="text-green-400" />
              <span className="text-green-400">คัดลอกแล้ว</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>คัดลอก</span>
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <pre className="bg-[#0f172a] text-slate-300 text-sm overflow-x-auto p-4 font-mono leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
