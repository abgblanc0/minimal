import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { home, useTermContext } from "../contexts/TerminalProvider";
import { Directory, NewDirectory, File } from "../models";
import { postDir } from "../utils/fetchData";
import { parsePermissions } from "../utils/funcs";

const keys = [
  "CTRL+Enter -> new terminal",
  "CTRL+E -> close last terminal",
  "CTRL+L -> clear terminal",
];

export const useCommand = () => {
  const { user, logout } = useAuth();
  const { dir, setDir, setType, setLabels } = useTermContext();
  const pad = useRef(0);
  useEffect(() => {
    if (dir.directorys) {
      pad.current = Math.max(
        ...dir.directorys.map((sb) => sb.username.length),
        pad.current
      );
    }
    if (dir.files) {
      pad.current = Math.max(
        ...dir.files.map((f) => f.username.length),
        pad.current
      );
    }
  }, [dir.directorys, dir.files]);
  console.log(pad.current);
  const commands: {
    [key: string]: (args: string[]) => Promise<string[]> | string[];
  } = {
    whoami: () => {
      return [user ? user.username : "guest"];
    },
    ls: () => {
      let output: string[] = [];
      dir.directorys?.forEach((subdir) => {
        output.push(
          `d${parsePermissions(subdir.permissions)} ${subdir.username.padEnd(
            pad.current,
            " "
          )} ${subdir.dirname}`
        );
      });
      dir.files?.forEach((file) => {
        output.push(
          `.${parsePermissions(file.permissions)} ${file.username.padEnd(
            pad.current,
            " "
          )} ${file.filename}`
        );
      });
      return output;
    },
    cd: (args) => {
      let ok: boolean = false;
      if (!args[0]) {
        setDir(home);
        return [""];
      }
      if (args[0] == "..") {
        setDir(dir.parent ? dir.parent : home);
        return [""];
      }
      for (const subdir of dir.directorys ? dir.directorys : []) {
        if (subdir.dirname === args[0]) {
          console.log((Math.floor(subdir.permissions / 10) % 10) % 2 == 1);
          if (user?.username === "root") {
            setDir(subdir);
            return [""];
          } else if (
            user?.username === subdir.username &&
            Math.floor(subdir.permissions / 100) % 2 == 1
          ) {
            setDir(subdir);
            return [""];
          } else if (
            user &&
            (Math.floor(subdir.permissions / 10) % 10) % 2 == 1
          ) {
            setDir(subdir);
            return [""];
          } else if (!user && Math.floor(subdir.permissions % 10) % 2 == 1) {
            setDir(subdir);
            return [""];
          } else return ["cd: permission denied: " + subdir.dirname];
        }
      }

      return [ok ? "" : `cd: no such directory: ${args}`];
    },
    umask: () => {
      return [String(user?.umask).padStart(3, "0")];
    },
    mkdir: async (args) => {
      if (!user)
        return [`mkdir: Failed to create '${args[0]}': Permission denied`];
      const new_dir: NewDirectory = {
        dirname: args[0],
        parent_id: dir.id,
        username: user ? user.username : "guest",
      };
      const response = await postDir(new_dir);
      return response.ok ? ["OK"] : ["NO OK"];
    },
    rmdir: async (args) => {
      let subDir: Directory | undefined;

      if (!subDir)
        return [`rmdir: Failed to remove '${args[0]}': No such directory`];
      if (!user)
        return [`rmdir: Failed to remove '${args[0]}': Permission denied`];
      for (const subdir of dir.directorys || []) {
        if (args[0] === subdir.dirname) {
          subDir = subdir;
          break;
        }
      }
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
        return [data.content];
      }
      return ["[cat error]: no such file"];
    },
    create: () => {
      setLabels(["filename: ", "content: "]);
      setType("create");
      return [""];
    },
    flowetch: () => {
      const ARTR1 = "    _ _    ";
      const ARTR2 = "   (_\\_)   ";
      const ARTR3 = "  (__<__)  ";
      const ARTR4 = "   (_/_)   ";
      const ARTR5 = "   \\ |     ";
      const ARTR6 = "    \\|/    ";

      return [
        `${ARTR1}  host    •••   minimal`,
        `${ARTR2}  user    •••   ${user? user.username : "guest"}`,
        `${ARTR3}  shell   •••   zshxd`,
        `${ARTR4}  wm      •••   hyprlrxd`,
        `${ARTR5}  theme   •••   ORchisss`,
        `${ARTR6}  pkg     •••   ¿£!·$·???¿?`
        ];
    },
    register: () => {
      if (user) return ["Already logged in"];
      setLabels(["username: ", "password: "]);
      setType("register");
      return [""];
    },
    help: () => {
      return [Object.keys(commands).join(", ")];
    },
    login: () => {
      if (user) return ["Already logged in"];
      setLabels(["username: ", "password: "]);
      setType("login");
      return [""];
    },
    logout: () => {
      if (!user) return ["Already logged out"];
      logout();
      return ["Logged out"];
    },
    keys: () => keys,
    chmod: () => {
      return [""];
    },
  };
  return commands;
};
