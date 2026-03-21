import { Bot } from "lucide-react";
import Chat from "./component/Chat/Chat";
import InfoModal from "./component/InfoModal/InfoModal";
import MessageFeed from "./component/MessageFeed/MessageFeed";

const page = () => {
  return (
    <div className="flex flex-col h-screen">
      <InfoModal />

      <header className="border-b border-zinc-800 px-4 py-3 flex items-center gap-3 shrink-0">
        <div className="p-2 rounded-full bg-zinc-800">
          <Bot size={22} className="text-green-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">BullyChat</h1>
          <p className="text-xs text-zinc-500">
            Саркастичний AI, який roastить твої ідеї
          </p>
        </div>
      </header>

      <MessageFeed />
      <Chat />
    </div>
  );
};

export default page;
