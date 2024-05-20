import Input from "./Input";
import Prefix from "./Prefix";
import History from "./History";
import { useAuth } from "../contexts/AuthProvider";
import Form from "./Form";
import useLabels from "../hooks/useLabels";
import useDir from "../hooks/useDir";
import { useTermContext } from "../contexts/TerminalProvider";

export default function Terminal() {
  const { user} = useAuth();
  const {dir, labels} = useTermContext();
  useDir(dir);
  useLabels(); 

  return (
    <div
      className={`p-5 grow h-[95%] w-[95%] text-white bg-black/60 border-2 rounded-xl focus:outline-none resize-none overflow-auto`}
    >
      <History />
      {labels.length === 0 && (
        <div className="flex gap-2">
          <Prefix dir={dir} username={user?.username} />
          <Input/>
        </div>
      )}
      {labels.length > 0 && (
        <Form />
      )}
    </div>
  );
}
