import { home } from "../components/Terminal";
import { Directory, User, File, NewDirectory } from "../models";

const commands = [
  "whoami",
  "ls",
  "cd",
  "help",
  "login",
  "logout",
  "keys",
  "cat",
];

export default async function handleCommand(
  command: string,
  args: string[],
  setLabels: (labels: string[]) => void,
  dir: Directory,
  setDir: (dir: Directory) => void,
  logout: () => void,
  setType: (type: string) => void,
  user?: User
): Promise<string[]> {
  args = mergeStringsBetweenQuotes(args);
  switch (command) {
    case "whoami":
      return whoami(user);
    case "ls":
      return ls(dir);
    case "cd":
      return cd(args[0], dir, setDir);
    case "mkdir":
      return mkdir(args[0], dir, user);
    case "rmdir":
      return rmdir(args[0], dir, user);
    case "help":
      return commands;
    case "cat":
      return cat(args[0], dir);
    case "login":
      return handleLogin(setLabels, setType);
    case "logout":
      return handleLogout(logout, user);
    case "register":
      return register(setLabels, setType);
    case "keys":
      return keys();
    case "flowetch":
      return ['🌹'];
    case "":
      return [""];
    default:
      return [`${command}: command not found`];
  }
}

function register(
  setLabels: (label: string[]) => void,
  setType: (type: string) => void
) {
  setLabels(["username: ", "password: "]);
  setType("register");
  return [""]
}

async function rmdir(dirname: string, dir: Directory, user?: User) {
  let subDir: Directory | undefined;

  for (const subdir of dir.directorys || []) {
    if (dirname === subdir.dirname) {
      subDir = subdir;
      break;
    }
  }
  if (!subDir)
    return [`rmdir: Failed to remove '${dirname}': No such directory`];
  if (subDir.username !== user?.username && user?.username !== "root")
    return [`rmdir: Failed to remove '${dirname}': Permission denied`];

  try {
    const response = await fetch(
      `http://localhost:8000/directorys/${subDir.id}`,
      { method: "DELETE" }
    );
    return response.ok ? ["OK"] : ["NO OK"];
  } catch (error) {
    return ["ERROR"];
  }
}

async function mkdir(args: string, parent: Directory, user?: User) {
  const new_dir: NewDirectory = {
    dirname: args,
    parent_id: parent.id,
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
}

async function cd(
  args: string,
  dir: Directory,
  setDir: (dir: Directory) => void
) {
  let ok: boolean = false;
  dir.directorys?.forEach((subdir) => {
    if (subdir.dirname === args) {
      setDir(subdir);
      ok = true;
    }
  });
  if (args == "..") {
    setDir(dir.parent ? dir.parent : home);
    ok = true;
  }
  if (!args) {
    setDir(home);
    ok = true;
  }
  return [ok ? "" : `cd: no such directory: ${args}`];
}

function whoami(user?: User) {
  return [user ? user.username : "guest"];
}

function keys() {
  return [
    "CTRL+Enter -> new terminal",
    "CTRL+E -> close last terminal",
    "CTRL+L -> clear terminal",
  ];
}

function ls(dir: Directory) {
  let output: string[] = [];
  dir.directorys?.forEach((subdir) => {
    output.push(`drwx-x--x- ${subdir.username} ${subdir.dirname}`);
  });
  dir.files?.forEach((file) => {
    output.push(`.rwx-r-xr-- ${file.username} ${file.filename}`);
  });
  return output;
}

async function handleLogin(
  setLabels: (labels: string[]) => void,
  setType: (type: string) => void
) {
  setLabels(["username: ", "password: "]);
  setType("login");
  return [""]
}

function handleLogout(logout: any, user?: User) {
  if (user) {
    logout();
    return ["Logged out"];
  }
  return ["You are already logged out"];
}

async function cat(args: string, dir: Directory) {
  let uri = "";
  dir.files?.forEach((file) => {
    if (file.filename == args) {
      uri = `/files/${file.id}`;
    }
  });
  if (uri) {
    const response = await fetch(`http://localhost:8000${uri}`);
    const data: File = await response.json();
    return [data.filename, data.content, "user: " + data.username];
  }
  return ["[cat error]: no such file"];
}

function mergeStringsBetweenQuotes(arr: string[]): string[] {
  const result: string[] = [];
  let currentString: string = "";
  let insideQuotes: boolean = false;

  for (const string of arr) {
    if (string.startsWith('"')) {
      insideQuotes = true;
      currentString += string.slice(1);
    } else if (string.endsWith('"')) {
      insideQuotes = false;
      currentString += " " + string.slice(0, -1);
      result.push(currentString);
      currentString = "";
    } else if (insideQuotes) {
      currentString += " " + string;
    } else {
      result.push(string);
    }
  }

  return result;
}


/*
function flowetch(user?: User) {
  const ARTR1 = "    _ _        ";
  const ARTR2 = "  (_\\_)       ";
  const ARTR3 = "  (__<__)      ";
  const ARTR4 = "   (_/_)       ";
  const ARTR5 = "  \\ |         ";
  const ARTR6 = "   \\|/        ";
  return [
    `${ARTR1}  host  ...   minimal`,
    `${ARTR2}  user  ...   ${user?.username}`,
    `${ARTR3}  shell ...   zsh - >.<`,
    `${ARTR4}  wm    ...   Hyprland`,
    `${ARTR5}  theme ...   ¿#¿.-.-¿`,
    `${ARTR6}  pkg   ...   -.¿?¿?;¿?`];
}
*/