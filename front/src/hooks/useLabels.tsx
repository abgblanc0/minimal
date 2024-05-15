import { useEffect } from 'react';
import { Command, Directory } from '../models';
import { fetchLogin, fetchRegister } from '../utils/fetchData';

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
      const response = await fetchLogin(data);
      const user = await response.json();
      if (response.ok) login(user.username);

      setHistory([
        ...history.slice(0, -1),
        { command: type, dir: dir, outputs: [response.ok? "OK": "NO OK"], username: "guest" },
      ]);
    };
    const handleRegister = async () => {
      const response = await fetchRegister(data);
      setHistory([
        ...history.slice(0,-1),
        {command : type, dir: dir, outputs: [response.ok ? "OK" : "NO OK"], username: "guest"}
      ]);
    }
    if (type === "login" && labels.length === 0) handleLogin();
    if (type === "register" && labels.length === 0) handleRegister();
  }, [labels]);
};

export default useLabels;
