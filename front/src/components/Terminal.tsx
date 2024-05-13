import Input from "./Input";
import Prefix from "./Prefix";
import History from "./History";
import { useEffect, useState } from "react";
import { Command, Directory, User } from "../types";
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
  const { user, login } = useAuth();
  const [history, setHistory] = useState<Command[]>([]);
  const [dir, setDir] = useState<Directory>(home);
  const [labels, setLabels] = useState<string[]>([]);
  const [data] = useState(new FormData());
  const [type, setType] = useState("");

  useEffect(() => {
    if (dir.name !== "home") {
      fetchDir(dir);
    }
  }, [dir]);

  useEffect(() => {
    const handleLogin = async () => {
      if(type == "login" && labels.length === 0) {
        const response = await fetch("http://localhost:8000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: data.get("username"), password: data.get("password")}),
        });
        const user: User = await response.json();
        if (response.ok) {
          login(user.username);
        }
      }
    }
    handleLogin();
  }, [labels])
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
