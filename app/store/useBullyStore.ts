import { create } from "zustand";

interface BullyState {
  warningModalIsOpen: boolean;
  setWarningModalIsOpen: (isOpen: boolean) => void;
}

export const useBullyStore = create<BullyState>((set) => ({
  warningModalIsOpen: true,
  setWarningModalIsOpen: (isOpen: boolean) =>
    set({ warningModalIsOpen: isOpen }),
}));
