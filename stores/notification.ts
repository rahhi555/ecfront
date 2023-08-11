import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface NotificationStore {
  message: string;
  isOpen: boolean;
  timeoutId: NodeJS.Timeout | undefined;
  open: (message: string) => void;
  close: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  devtools((set, get) => ({
    message: "",
    isOpen: false,
    timeoutId: undefined,
    open: (message) => {
      const { close, timeoutId } = get();
      clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(close, 3000);
      set({ message, isOpen: true, timeoutId: newTimeoutId });
    },
    close: () => set({ isOpen: false, timeoutId: undefined }),
  })),
);
