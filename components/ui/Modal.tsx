"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { CloseIcon } from "./icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  labelledBy?: string;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Shared overlay + glass panel primitive, styled after Header's `.nav-dd` dropdown. */
export default function Modal({ isOpen, onClose, children, title, labelledBy }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={stopPropagation}
        className="relative flex max-h-[90vh] w-full max-w-[520px] flex-col overflow-hidden rounded-lg border border-border bg-dd-bg shadow-dropdown backdrop-blur-nav"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-6 top-6 z-10 text-secondary transition-colors cursor-pointer hover:text-primary "
        >
          <CloseIcon className="h-[18px] w-[18px]" />
        </button>

        {title && (
          <div className="shrink-0 border-b border-border-image px-6 py-6 pr-14 sm:px-8">
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
