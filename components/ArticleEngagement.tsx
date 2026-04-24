"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  Copy,
  Flame,
  HeartPulse,
  Infinity,
  Lightbulb,
  Link2,
  MessageCircle,
  Moon,
  Share2,
  Smartphone,
  Sun,
  Wind,
} from "lucide-react";
import { IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";

const SNIPPET = { fontFamily: "var(--font-snippet)" } as const;
const STORAGE_PREFIX = "intersecting_your_take:";

type TakeId =
  | "resonance"
  | "insight"
  | "ache"
  | "stillness"
  | "hope"
  | "whisper"
  | "unsettling"
  | "warmth"
  | "paradox";

const TAKES: {
  id: TakeId;
  label: string;
  hint: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number | string }>;
}[] = [
  { id: "resonance", label: "Resonance", hint: "connection", Icon: Link2 },
  { id: "insight", label: "Insight", hint: "intellectual clarity", Icon: Lightbulb },
  { id: "ache", label: "Ache", hint: "emotional depth", Icon: HeartPulse },
  { id: "stillness", label: "Stillness", hint: "calm, reflective", Icon: Moon },
  { id: "hope", label: "Hope", hint: "uplifting", Icon: Sun },
  { id: "whisper", label: "Whisper", hint: "subtle, quiet tone", Icon: Wind },
  {
    id: "unsettling",
    label: "Unsettling",
    hint: "disturbing but meaningful",
    Icon: AlertCircle,
  },
  { id: "warmth", label: "Warmth", hint: "comfort", Icon: Flame },
  { id: "paradox", label: "Paradox", hint: "thought-provoking complexity", Icon: Infinity },
];

function useShareSupported() {
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    setSupported(typeof navigator !== "undefined" && !!navigator.share);
  }, []);
  return supported;
}

function storageKeyForArticle(shareUrl: string) {
  return `${STORAGE_PREFIX}${shareUrl}`;
}

type ArticleEngagementProps = {
  shareUrl: string;
  title: string;
};

const panelClass =
  "absolute left-1/2 top-full z-[60] mt-3 w-[min(100vw-2rem,20rem)] -translate-x-1/2 rounded-xl border border-zinc-300/90 bg-white/95 p-2 shadow-lg backdrop-blur-sm dark:border-[#3A3A3A] dark:bg-[#2A2A2A]/95 sm:w-[22rem]";

const itemClass =
  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#21201f] transition hover:bg-[#1F6F78]/10 dark:text-[#E0E0DA] dark:hover:bg-[#4A9BA3]/15";

export default function ArticleEngagement({
  shareUrl: shareUrlProp,
  title,
}: ArticleEngagementProps) {
  const shareMenuId = useId();
  const takeMenuId = useId();
  const shareWrapRef = useRef<HTMLDivElement>(null);
  const takeWrapRef = useRef<HTMLDivElement>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [takeOpen, setTakeOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedTake, setSelectedTake] = useState<TakeId | null>(null);
  const [shareUrl, setShareUrl] = useState(shareUrlProp);
  const shareSupported = useShareSupported();

  useEffect(() => {
    if (shareUrlProp.startsWith("http")) {
      setShareUrl(shareUrlProp);
      return;
    }
    const path = shareUrlProp.startsWith("/") ? shareUrlProp : `/${shareUrlProp}`;
    setShareUrl(`${window.location.origin}${path}`);
  }, [shareUrlProp]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKeyForArticle(shareUrl));
      if (raw && TAKES.some((t) => t.id === raw)) setSelectedTake(raw as TakeId);
    } catch {
      /* ignore */
    }
  }, [shareUrl]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast("Link copied to clipboard.");
      window.setTimeout(() => setCopied(false), 2000);
      setShareOpen(false);
    } catch {
      showToast("Could not copy — try selecting the address bar.");
    }
  }, [shareUrl, showToast]);

  const shareOnX = useCallback(() => {
    const params = new URLSearchParams({
      url: shareUrl,
      text: title ? `${title} — ` : "",
    });
    window.open(
      `https://twitter.com/intent/tweet?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
    setShareOpen(false);
  }, [shareUrl, title]);

  const shareOnLinkedIn = useCallback(() => {
    const u = encodeURIComponent(shareUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      "_blank",
      "noopener,noreferrer",
    );
    setShareOpen(false);
  }, [shareUrl]);

  const shareOtherApps = useCallback(async () => {
    if (!navigator.share) {
      showToast("Your browser does not offer the system share sheet — use Copy link.");
      return;
    }
    try {
      await navigator.share({
        title: title || "Intersecting Lines",
        text: title ? `${title}\n` : "",
        url: shareUrl,
      });
      setShareOpen(false);
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        showToast("Sharing was cancelled or is not available here.");
      }
    }
  }, [shareUrl, title, showToast]);

  const selectTake = useCallback(
    (id: TakeId) => {
      setSelectedTake(id);
      try {
        localStorage.setItem(storageKeyForArticle(shareUrl), id);
      } catch {
        /* ignore */
      }
      setTakeOpen(false);
      const label = TAKES.find((t) => t.id === id)?.label;
      showToast(label ? `Your take: ${label} — saved on this device.` : "Saved on this device.");
    },
    [shareUrl, showToast],
  );

  useEffect(() => {
    if (!shareOpen && !takeOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShareOpen(false);
        setTakeOpen(false);
      }
    };
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (shareOpen && shareWrapRef.current && !shareWrapRef.current.contains(t)) {
        setShareOpen(false);
      }
      if (takeOpen && takeWrapRef.current && !takeWrapRef.current.contains(t)) {
        setTakeOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [shareOpen, takeOpen]);

  return (
    <div className="relative mx-auto mb-8 max-w-xl sm:mb-10">
      <div
        className="flex flex-wrap items-center justify-center gap-3"
        style={SNIPPET}
      >
        <div className="relative" ref={shareWrapRef}>
          <button
            type="button"
            aria-expanded={shareOpen}
            aria-haspopup="true"
            aria-controls={shareMenuId}
            onClick={() => {
              setTakeOpen(false);
              setShareOpen((o) => !o);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-4 py-2 text-sm font-semibold text-[#1F6F78] shadow-sm transition hover:border-[#1F6F78]/50 hover:bg-white dark:border-[#3A3A3A] dark:bg-[#2A2A2A]/80 dark:text-[#4A9BA3] dark:hover:border-[#4A9BA3]/50 dark:hover:bg-[#333]"
          >
            <Share2 className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Share
          </button>
          {shareOpen && (
            <div
              id={shareMenuId}
              role="menu"
              className={panelClass}
              style={SNIPPET}
            >
              <button type="button" role="menuitem" className={itemClass} onClick={copyLink}>
                {copied ? (
                  <Check className="h-4 w-4 shrink-0 text-[#1F6F78] dark:text-[#4A9BA3]" />
                ) : (
                  <Copy className="h-4 w-4 shrink-0 text-[#1F6F78] dark:text-[#4A9BA3]" />
                )}
                <span>
                  <span className="block font-semibold">Copy link</span>
                  <span className="text-xs font-normal text-zinc-500 dark:text-[#9A9A8E]">
                    Copy this page&apos;s URL
                  </span>
                </span>
              </button>
              <button type="button" role="menuitem" className={itemClass} onClick={shareOnX}>
                <IconBrandX
                  className="h-4 w-4 shrink-0 text-[#1F6F78] dark:text-[#4A9BA3]"
                  aria-hidden
                />
                <span>
                  <span className="block font-semibold">Share on X</span>
                  <span className="text-xs font-normal text-zinc-500 dark:text-[#9A9A8E]">
                    Open a post draft with link
                  </span>
                </span>
              </button>
              <button
                type="button"
                role="menuitem"
                className={itemClass}
                onClick={shareOnLinkedIn}
              >
                <IconBrandLinkedin
                  className="h-4 w-4 shrink-0 text-[#1F6F78] dark:text-[#4A9BA3]"
                  aria-hidden
                />
                <span>
                  <span className="block font-semibold">Share on LinkedIn</span>
                  <span className="text-xs font-normal text-zinc-500 dark:text-[#9A9A8E]">
                    Open LinkedIn with this page URL
                  </span>
                </span>
              </button>
              <button
                type="button"
                role="menuitem"
                className={`${itemClass} ${!shareSupported ? "opacity-60" : ""}`}
                onClick={shareOtherApps}
                disabled={!shareSupported}
              >
                <Smartphone className="h-4 w-4 shrink-0 text-[#1F6F78] dark:text-[#4A9BA3]" />
                <span>
                  <span className="block font-semibold">Other apps</span>
                  <span className="text-xs font-normal text-zinc-500 dark:text-[#9A9A8E]">
                    {shareSupported
                      ? "System share sheet (Messages, Mail, …)"
                      : "Not available in this browser"}
                  </span>
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="relative" ref={takeWrapRef}>
          <button
            type="button"
            aria-expanded={takeOpen}
            aria-haspopup="true"
            aria-controls={takeMenuId}
            onClick={() => {
              setShareOpen(false);
              setTakeOpen((o) => !o);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/70 px-4 py-2 text-sm font-semibold text-[#1F6F78] shadow-sm transition hover:border-[#1F6F78]/50 hover:bg-white dark:border-[#3A3A3A] dark:bg-[#2A2A2A]/80 dark:text-[#4A9BA3] dark:hover:border-[#4A9BA3]/50 dark:hover:bg-[#333]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Your take
            {selectedTake && (
              <span className="ml-0.5 max-w-[7rem] truncate text-xs font-medium opacity-90">
                · {TAKES.find((t) => t.id === selectedTake)?.label}
              </span>
            )}
          </button>
          {takeOpen && (
            <div
              id={takeMenuId}
              role="listbox"
              aria-label="Your take"
              className={`${panelClass} max-h-[min(70vh,28rem)] overflow-y-auto p-2 sm:w-[24rem]`}
              style={SNIPPET}
            >
              <p className="px-2 pb-2 text-xs text-zinc-500 dark:text-[#9A9A8E]">
                How did this piece land with you? One choice is saved on this device.
              </p>
              <ul className="space-y-0.5">
                {TAKES.map(({ id, label, hint, Icon }) => (
                  <li key={id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedTake === id}
                      onClick={() => selectTake(id)}
                      className={`${itemClass} ${selectedTake === id ? "bg-[#1F6F78]/12 dark:bg-[#4A9BA3]/20" : ""}`}
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-[#1F6F78] dark:text-[#4A9BA3]"
                        strokeWidth={2}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{label}</span>
                        <span className="text-xs font-normal text-zinc-500 dark:text-[#9A9A8E]">
                          {hint}
                        </span>
                      </span>
                      {selectedTake === id && (
                        <Check
                          className="h-4 w-4 shrink-0 text-[#1F6F78] dark:text-[#4A9BA3]"
                          aria-hidden
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <p
          role="status"
          className="pointer-events-none absolute left-1/2 top-full z-[70] mt-2 w-[min(100%,20rem)] -translate-x-1/2 rounded-lg border border-zinc-200 bg-white/95 px-3 py-2 text-center text-xs text-[#21201f] shadow-md dark:border-[#3A3A3A] dark:bg-[#1E1E1E] dark:text-[#E0E0DA]"
          style={SNIPPET}
        >
          {toast}
        </p>
      )}
    </div>
  );
}
