import { create } from "zustand";

type Message = {
  id: string;
  role: "ai" | "user";
  content: string;
};

interface BullyState {
  warningModalIsOpen: boolean;
  setWarningModalIsOpen: (isOpen: boolean) => void;
  messages: Message[];
  addNewMessage: (newMessage: Message) => void;
  updateMessage: (id: string, chunk: string) => void;
}

export const useBullyStore = create<BullyState>((set) => ({
  warningModalIsOpen: true,
  messages: [],
  setWarningModalIsOpen: (isOpen: boolean) =>
    set({ warningModalIsOpen: isOpen }),
  addNewMessage: (newMessage: Message) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
  updateMessage: (id: string, chunk: string) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            content: message.content + chunk,
          };
        }
        return message;
      }),
    })),
}));
