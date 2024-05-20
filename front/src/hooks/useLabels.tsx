import { useEffect } from "react";
import { NewFile } from "../models";
import { fetchFile, fetchLogin, fetchRegister } from "../utils/fetchData";
import { useTermContext } from "../contexts/TerminalProvider";
import { useAuth } from "../contexts/AuthProvider";

const useLabels = () => {
  const { user, login } = useAuth();
  const { history, setHistory, type, dir, labels, data } = useTermContext();
  useEffect(() => {
    const handleLogin = async () => {
      const response = await fetchLogin(data);
      const user = await response.json();
      if (response.ok) login(user.username);

      setHistory([
        ...history.slice(0, -1),
        {
          command: type,
          dir: dir,
          outputs: [response.ok ? "OK" : "Invalid username or password"],
          username: "guest",
        },
      ]);
    };
    const handleRegister = async () => {
      const response = await fetchRegister(data);
      setHistory([
        ...history.slice(0, -1),
        {
          command: type,
          dir: dir,
          outputs: [
            response.ok
              ? "Register succesfully"
              : "ERROR: username already in use",
          ],
          username: user?.username,
        },
      ]);
    };

    const handleCreate = async () => {
      let newfile: NewFile = {
        filename: data.get("filename")!.toString(),
        content: data.get("content")!.toString(),
        username: user!.username,
        directory_id: dir.id,
      };
      const response = await fetchFile(newfile);
      setHistory([
        ...history.slice(0, -1),
        {
          command: type,
          dir: dir,
          outputs: [response.ok ? "OK" : "NO OK"],
          username: user?.username,
        },
      ]);
    };

    if (type === "login" && labels.length === 0) handleLogin();
    if (type === "register" && labels.length === 0) handleRegister();
    if (type === "create" && labels.length === 0 && user) handleCreate();
  }, [labels]);
};

export default useLabels;
