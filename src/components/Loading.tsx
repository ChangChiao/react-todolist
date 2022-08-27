import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/50">
      <div className="text-4xl text-white ">
        <AiOutlineLoading className="animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
