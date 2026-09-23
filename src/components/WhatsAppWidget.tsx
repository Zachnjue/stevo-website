"use client";

import { useState } from "react";

const PHONE = "254748679132"; // 0748 679 132 in international format
const PREFILLED_MESSAGE = "Hi, I want to know more!";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.696 4.614 1.9 6.487L4 29l7.73-1.865A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 17.06c-.294.827-1.71 1.58-2.36 1.68-.603.093-1.365.132-2.2-.138-.507-.163-1.157-.38-1.99-.744-3.502-1.512-5.79-5.04-5.966-5.278-.176-.238-1.44-1.914-1.44-3.65 0-1.735.912-2.588 1.235-2.94.323-.353.705-.44.94-.44.235 0 .47.002.675.013.216.011.507-.082.793.605.294.706.998 2.44 1.086 2.617.088.176.147.383.03.618-.117.235-.176.383-.353.588-.176.206-.37.46-.529.618-.176.176-.36.367-.156.72.205.353.912 1.507 1.958 2.44 1.345 1.199 2.48 1.57 2.842 1.746.362.176.573.147.784-.088.212-.235.9-1.05 1.14-1.412.24-.362.48-.294.813-.176.333.117 2.117.998 2.48 1.18.362.176.603.264.69.412.089.147.089.851-.205 1.678Z" />
    </svg>
  );
}

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const chatHref = `https://wa.me/${PHONE}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[300px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:w-[320px]">
          <div className="flex items-start justify-between gap-3 bg-brand-blue-deep px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Thee Printing Hub</p>
              <p className="text-xs text-white/75">Typically replies within a day</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="mt-0.5 text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="space-y-3 bg-[#fafaf7] px-4 py-4">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm text-ink shadow-sm">
              <p className="font-semibold">Thee Printing Hub</p>
              <p className="mt-1 text-ink-soft">
                Welcome to Thee Printing Hub — your one-stop shop for branding
                and printing!
              </p>
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-emerald-100 px-3 py-2 text-sm text-ink">
              {PREFILLED_MESSAGE}
            </div>
          </div>

          <div className="p-3">
            <a
              href={chatHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Let&apos;s Chat
            </a>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hidden rounded-full bg-white px-4 py-2 text-left text-xs text-ink shadow-lg ring-1 ring-black/5 transition hover:shadow-xl sm:block"
          >
            <span className="block font-semibold">Need a quote?</span>
            <span className="text-ink-soft">Chat with us on WhatsApp →</span>
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition hover:bg-emerald-600"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}
