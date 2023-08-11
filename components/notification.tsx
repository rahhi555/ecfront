"use client";

import { useNotificationStore } from "@/stores/notification";

export function Notification() {
  const { isOpen, message, close } = useNotificationStore();

  return (
    <>
      {isOpen && (
        <div
          className="absolute left-1/2 top-16 z-40 mb-3 inline-flex w-1/3 -translate-x-1/2 items-center rounded-lg border bg-slate-700 px-6 py-5 text-sm font-semibold text-white shadow-md"
          role="alert"
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {message}
        </div>
      )}
    </>
  );
}
