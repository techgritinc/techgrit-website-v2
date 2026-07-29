"use client";

import { useEffect } from "react";
import type { MouseEvent, ReactNode } from "react";
import { CloseIcon } from "./icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  labelledBy?: string;
};

/** Shared overlay + glass panel primitive, styled after Header's `.nav-dd` dropdown. */
export default function Modal({ isOpen, onClose, children, title, labelledBy }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // Restore body scroll
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/70 px-4 py-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={stopPropagation}
        className="relative flex max-h-[90vh] w-full max-w-[520px] flex-col overflow-hidden rounded-lg border border-white/12 bg-dd-bg shadow-dropdown backdrop-blur-nav"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-6 top-6 z-10 text-secondary transition-colors cursor-pointer hover:text-primary "
        >
          <CloseIcon className="h-[18px] w-[18px]" />
        </button>

        {title && (
          <div className="shrink-0 border-b border-white/10 px-6 py-6 pr-14 sm:px-8">
            {title}
          </div>
        )}

        <div className="modal-scrollbar overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
