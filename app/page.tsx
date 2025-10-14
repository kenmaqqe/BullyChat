import Chat from "./component/Chat/Chat";
import InfoModal from "./component/InfoModal/InfoModal";
import MessageFeed from "./component/MessageFeed/MessageFeed";

const page = () => {
  return (
    <div className="text-3xl">
      <InfoModal />
      <MessageFeed />
      <Chat />
    </div>
  );
};

export default page;
