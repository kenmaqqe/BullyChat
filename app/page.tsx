import Chat from "./component/Chat/Chat";
import InfoModal from "./component/InfoModal/InfoModal";

const page = () => {
  return (
    <div className="text-3xl">
      <InfoModal />
      <Chat />
    </div>
  );
};

export default page;
