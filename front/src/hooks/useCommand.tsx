import { useAuth } from "../contexts/AuthProvider";
import { home, useTermContext } from "../contexts/TerminalProvider";
import { Directory, NewDirectory, File } from "../models";

const keys = [
    "CTRL+Enter -> new terminal",
    "CTRL+E -> close last terminal",
    "CTRL+L -> clear terminal",
  ];
  

export const useCommand = () => {
  const { user, logout } = useAuth();
  const { dir, setDir, setType, setLabels } = useTermContext();
  const commands: { [key: string]: ((args: string[]) => Promise<string[]> | string[])} = {
    whoami: () => {
      return [user ? user.username : "guest"];
    },
    ls: () => {
      let output: string[] = [];
      dir.directorys?.forEach((subdir) => {
        output.push(`drwx-x--x- ${subdir.username} ${subdir.dirname}`);
      });
      dir.files?.forEach((file) => {
        output.push(`.rwx-r-xr-- ${file.username} ${file.filename}`);
      });
      return output;
    },
    cd: (args) => {
        let ok: boolean = false;
        dir.directorys?.forEach((subdir) => {
          if (subdir.dirname === args[0]) {
            setDir(subdir);
            ok = true;
          }
        });
        if (args[0] == "..") {
          setDir(dir.parent ? dir.parent : home);
          ok = true;
        }
        if (!args[0]) {
          setDir(home);
          ok = true;
        }
        return [ok ? "" : `cd: no such directory: ${args}`];
    },
    mkdir: async (args) => {
        if(!user)
            return [`mkdir: Failed to create '${args[0]}': Permission denied`];
        const new_dir: NewDirectory = {
            dirname: args[0],
            parent_id: dir.id,
            username: user ? user.username : "guest",
          };
          const response = await fetch("http://localhost:8000/directorys", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(new_dir),
          });
          return response.ok ? ["OK"] : ["NO OK"];
    },
    rmdir: async (args) => {
        let subDir: Directory | undefined;

        if(!user)
            return [`rmdir: Failed to remove '${args[0]}': No such directory`];
        for (const subdir of dir.directorys || []) {
          if (args[0] === subdir.dirname) {
            subDir = subdir;
            break;
          }
        }
        if (!subDir)
          return [`rmdir: Failed to remove '${args[0]}': No such directory`];
        if (subDir.username !== user?.username && user?.username !== "root")
          return [`rmdir: Failed to remove '${args[0]}': Permission denied`];
      
        try {
          const response = await fetch(
            `http://localhost:8000/directorys/${subDir.id}`,
            { method: "DELETE" }
          );
          return response.ok ? ["OK"] : ["NO OK"];
        } catch (error) {
          return ["ERROR"];
        }
    },
    cat: async (args) => {
        let uri = "";
        dir.files?.forEach((file) => {
          if (file.filename == args[0]) {
            uri = `/files/${file.id}`;
          }
        });
        if (uri) {
          const response = await fetch(`http://localhost:8000${uri}`);
          const data: File = await response.json();
          return [data.filename, data.content, "user: " + data.username];
        }
        return ["[cat error]: no such file"];
    },
    create: () => {
        setLabels(["filename: ", "content: "]);
        setType("create")
        return [""];
    },
    flowetch: () => {
        return ["🌹"];
    },
    register: () => {
        if(user)
            return ["Already logged in"];

        setLabels(["username: ", "password: "]);
        setType("register");
        return [""];
    },
    help: () => {
        return [Object.keys(commands).join(", ")]
    },
    login: () => {
        if(user) return ["Already logged in"]
        setLabels(["username: ", "password: "]);
        setType("login");
        return [""];
    },
    logout: () => {
        if(!user) return ["Already logged out"];
        logout();
        return ["Logged out"];
    },
    keys: () => keys
  };
  return commands;
};


