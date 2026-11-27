import React, { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

/**
 * Accessible modal built on the native HTML <dialog> element.
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.returnValue = "";
    }
    onClose?.();
  };

  // Light-dismiss fallback for browsers without closedby="any"
  const handleBackdropClick = (e) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (isOutside) {
      handleClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      closedby="any"
      onClose={handleClose}
      onClick={handleBackdropClick}
      className={`m-auto w-[calc(100%-2rem)] ${maxWidth} rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-xl`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <h1 id={titleId} className="text-lg font-semibold text-slate-900">
          {title}
        </h1>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="max-h-[75vh] overflow-y-auto px-6 py-5">{children}</div>
    </dialog>
  );
}
