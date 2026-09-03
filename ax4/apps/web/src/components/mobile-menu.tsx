"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function MobileMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="header-icon md:hidden" aria-label="메뉴 열기"><Menu size={20} /></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/35 backdrop-blur-sm transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Viewport className="fixed inset-0 z-[70] flex justify-end p-3">
          <Dialog.Popup className="flex h-full w-full max-w-sm flex-col rounded-[28px] bg-[var(--paper)] p-6 shadow-2xl transition-transform data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full">
            <div className="flex items-center justify-between"><Dialog.Title className="text-sm font-black tracking-[.14em]">AX4 MENU</Dialog.Title><Dialog.Close className="header-icon" aria-label="메뉴 닫기"><X size={20} /></Dialog.Close></div>
            <Dialog.Description className="mt-8 text-sm leading-6 text-[var(--muted)]">목적부터 물어보고, 선택 이유까지 설명하는 러닝 스토어.</Dialog.Description>
            <nav className="mt-8 grid border-t border-black/10 text-3xl font-black tracking-[-.05em]">{[["러닝화", "/shop"],["트레일", "/shop?surface=trail"],["AI 쇼퍼", "/#ai-shopper"],["비교하기", "/compare"],["마이 AX4", "/account"]].map(([label, href]) => <Dialog.Close key={href} render={<Link href={href} className="border-b border-black/10 py-4" />}>{label}</Dialog.Close>)}</nav>
            <p className="mt-auto text-xs text-[var(--muted)]">현재 mock 구축 검증 환경입니다.</p>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
