import Input from "./Input";
import Prefix from "./Prefix";
import History from "./History";
import { useEffect, useState } from "react";
import { Command, Directory } from "../types";
import { useAuth } from "./AuthProvider";
import { fetchDir, home } from "../utils/commands";

interface TerminalProps {
  terminals: number;
  setTerminals: (terminals: number) => void;
}


export default function Terminal({ terminals, setTerminals }: TerminalProps) {
  const { user } = useAuth();
  const [history, setHistory] = useState<Command[]>([]);
  const [dir, setDir] = useState<Directory>(home);


  useEffect(() => {
    if(dir.name != "home"){
      fetchDir(dir);
    }
  }, [dir])

  return (
    <div
      className={`p-5 grow h-[95%] w-[95%] text-white bg-black/60 border-2 rounded-xl focus:outline-none resize-none overflow-auto`}
    >
      <History history={history} />
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
    </div>
  );
}
