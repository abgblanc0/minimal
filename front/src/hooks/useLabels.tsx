import { useEffect } from 'react';
import { Command, Directory } from '../models';

interface Props {
    labels: string[];
    data: FormData;
    type: string;
    login: (username:string) => void;
    history: Command[];
    setHistory: (history: Command[]) => void;
    dir: Directory;
}

const useLabels = ({ labels, data, type, login, setHistory, history, dir }: Props) => {
  useEffect(() => {
    const handleLogin = async () => {
      let output = "NO OK";
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.get("username"),
          password: data.get("password"),
        }),
      });
      const user = await response.json();
      if (response.ok) {
        login(user.username);
        output = "OK";
      }
      setHistory([
        ...history.slice(0, -1),
        { command: "login", dir: dir, outputs: [output], username: "guest" },
      ]);
    };

    if (type === "login" && labels.length === 0) handleLogin();
  }, [labels]);
};

export default useLabels;
