import Input from "./Input";
import Prefix from "./Prefix";
import History from "./History";
import { useAuth } from "./AuthProvider";
import Form from "./Form";
import { Directory } from "../models";
import useLabels from "../hooks/useLabels";
import useTerminalState from "../hooks/useTerminalState";
import useDir from "../hooks/useDir";

interface TerminalProps {
  terminals: number;
  setTerminals: (terminals: number) => void;
}

export const home: Directory = {
  ctime: "",
  dirname: "~",
  id: 1,
  username: "root",
};

export default function Terminal({ terminals, setTerminals }: TerminalProps) {
  const { user, login } = useAuth();
  const {data, dir, setDir, history, setHistory, labels, setLabels, type, setType} = useTerminalState();
  useDir(dir);
  useLabels({data, dir, history, setHistory, labels, login, type, user}); // idk maybe wrong, react... >.<

  return (
    <div
      className={`p-5 grow h-[95%] w-[95%] text-white bg-black/60 border-2 rounded-xl focus:outline-none resize-none overflow-auto`}
    >
      <History history={history} />
      {labels.length === 0 && (
        <div className="flex gap-2">
          <Prefix dir={dir} username={user?.username} />
          <Input
            setType={setType}
            terminals={terminals}
            setTerminals={setTerminals}
            setLabels={setLabels}
            history={history}
            setHistory={setHistory}
            dir={dir}
            setDir={setDir}
            user={user!}
          />
        </div>
      )}
      {labels.length > 0 && (
        <Form labels={labels} data={data} setLabels={setLabels} />
      )}
    </div>
  );
}
