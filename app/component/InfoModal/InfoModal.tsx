"use client";
import { HandMetal, TriangleAlert } from "lucide-react";
import { useBullyStore } from "@/app/store/useBullyStore";

const InfoModal = () => {
  const setWarningModalIsOpen = useBullyStore(
    (state) => state.setWarningModalIsOpen,
  );
  const warningModalIsOpen = useBullyStore((state) => state.warningModalIsOpen);

  if (!warningModalIsOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-white p-8 rounded-2xl max-w-lg shadow-2xl text-center space-y-6">
        <h2 className="text-5xl text-red-500 flex items-center justify-center gap-3 font-bold">
          <TriangleAlert size={60} />
          Warning!
        </h2>

        <p className="text-zinc-300 leading-relaxed">
          This app is made purely for fun. Everything you see here is humor,
          irony, and mild chaos. Don’t take it seriously, don’t try it at home,
          and definitely don’t call your mom about it.
        </p>

        <button
          type="button"
          className="mx-auto px-6 py-3 bg-green-600 hover:bg-green-700 transition-colors rounded-xl flex items-center gap-2 text-lg font-medium"
          onClick={() => setWarningModalIsOpen(false)}
        >
          Got It
          <HandMetal />
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
