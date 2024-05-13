import { home } from "../components/Terminal";
import { Directory, User, File } from "../models";

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
  args = mergeStringsBetweenQuotes(args)
  switch (command) {
    case "whoami":
      return whoami(user);
    case "ls":
      return ls(dir);
    case "cd":
      return cd(args[0], dir, setDir);
    case "help":
      return commands;
    case "cat":
      return cat(args[0], dir);
    case "login":
      return handleLogin(setLabels, setType);
    case "logout":
      return handleLogout(logout, user);
    case "keys":
      return keys();
    case "touch":
      return touch(args);
    case "":
      return [""];
    default:
      return [`${command}: command not found`];
  }
}

function touch(args: string[]) {
  return [""];
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
  return [ok ? "" : `cd: no such file or directory: ${args}`];
}

export async function fetchDir(dir: Directory) {
  const response = await fetch(`http://localhost:8000/directorys/${dir.id}`);
  const data: Directory[] = await response.json();
  data.forEach(aux => aux.parent = dir);
  dir.directorys = data;
}

export async function fetchFiles(dir: Directory) {
  const response = await fetch(`http://localhost:8000/directorys/files/${dir.id}`);
  const data: File[] = await response.json();
  dir.files = data;
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

async function ls(dir: Directory) {
  let output: string[] = [];
  console.log(dir);
  dir.directorys?.forEach((subdir) => {
    output.push(subdir.dirname);
  });
  dir.files?.forEach((file) => {
    output.push(file.filename);
  });
  return output;
}

async function handleLogin(setLabels: (labels: string[]) => void, setType: (type: string) => void) {
  setLabels(["Username: ", "Password: "]);
  setType("login");
 return [""];
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
    return [data.filename, data.content, "user: " + data.user_id];
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