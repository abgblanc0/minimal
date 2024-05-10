import Input from "./Input";
import Prefix from "./Prefix";
import History from "./History";
import { useEffect, useState } from "react";
import { Command, Directory } from "../types";
import { useAuth } from "./AuthProvider";
import { fetchDir, home } from "../utils/commands";
import Form from "./Form";

interface TerminalProps {
  terminals: number;
  setTerminals: (terminals: number) => void;
}

const topics: Directory = {
  name: "topics",
  parent: home,
};

home.directorys?.push(topics);

export default function Terminal({ terminals, setTerminals }: TerminalProps) {
  const { user } = useAuth();
  const [history, setHistory] = useState<Command[]>([]);
  const [dir, setDir] = useState<Directory>(home);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    if (dir.name !== "home") {
      fetchDir(dir);
    }
  }, [dir]);
  console.log(labels)
  return (
    <div
      className={`p-5 grow h-[95%] w-[95%] text-white bg-black/60 border-2 rounded-xl focus:outline-none resize-none overflow-auto`}
    >
      <History history={history} />
      {labels.length === 0 && (
        <div className="flex gap-2">
          <Prefix dir={dir} username={user?.username} />
          <Input
            terminals={terminals}
            setTerminals={setTerminals}
            history={history}
            setHistory={setHistory}
            dir={dir}
            setDir={setDir}
            user={user!}
          />
        </div>
      )}
      {labels.length > 0  && (
        <Form
          labels={labels}
          setLabels={setLabels}
        />
      )}
    </div>
  );
}
