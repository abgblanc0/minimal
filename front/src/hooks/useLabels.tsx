import { useEffect } from 'react';
import { Command, Directory, NewFile, User } from '../models';
import { fetchFile, fetchLogin, fetchRegister } from '../utils/fetchData';

interface Props {
    labels: string[];
    data: FormData;
    type: string;
    login: (username:string) => void;
    history: Command[];
    setHistory: (history: Command[]) => void;
    dir: Directory;
    user?: User;
}

const useLabels = ({ labels, data, type, login, setHistory, history, dir , user}: Props) => {
  useEffect(() => {
    const handleLogin = async () => {
      const response = await fetchLogin(data);
      const user = await response.json();
      if (response.ok) login(user.username);
      
      setHistory([
        ...history.slice(0, -1),
        { command: type, dir: dir, outputs: [response.ok? "OK": "NO OK"], username: "guest"},
      ]);
    };
    const handleRegister = async () => {
      const response = await fetchRegister(data);
      setHistory([
        ...history.slice(0,-1),
        {command : type, dir: dir, outputs: [response.ok ? "Register succesfully" : "ERROR: something gone wrong"], username: user?.username}
      ]);
    }

    const handleCreate = async () => {
      let newfile : NewFile = {
        filename: data.get("filename")!.toString(),
        content: data.get("content")!.toString(),
        username: user!.username,
        directory_id: dir.id
      }
      const response = await fetchFile(newfile);
      setHistory([
        ...history.slice(0,-1),
        {command : type, dir: dir, outputs: [response.ok ? "OK" : "NO OK"], username: "guest"}
      ]);
    }

    if (type === "login" && labels.length === 0) handleLogin();
    if (type === "register" && labels.length === 0) handleRegister();
    if (type === "create" && labels.length === 0 && user) handleCreate()
  }, [labels]);
};

export default useLabels;
