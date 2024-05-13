import { Post, User, Directory, Topic } from "../types";


export const home: Directory = {
  name: "~",
  directorys: []
};

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
    if (subdir.name === args) {
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
  let aux = "";
  if (dir.name === "topics") {
    aux = "/topics";
    const response = await fetch(`http://localhost:8000${aux}`);
    const data: Topic[] = await response.json();
    let dirs: Directory[] = [];
    data.forEach((topic) => {
      dirs.push({ parent: dir, name: topic.name });
    });
    dir.directorys = dirs;
  }
  if (dir.parent && dir.parent.name === "topics") {
    aux = `/topics/${dir.name}`;
    const response = await fetch(`http://localhost:8000${aux}`);
    const data: Post[] = await response.json();
    dir.files = data;
  }
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
    output.push(subdir.name);
  });
  dir.files?.forEach((file) => {
    output.push(file.name);
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
    if (file.name == args) {
      uri = `/posts/${file.id}`;
    }
  });
  if (uri) {
    const response = await fetch(`http://localhost:8000${uri}`);
    const data: Post = await response.json();
    return [data.name, data.body, "user: " + data.user_id];
  }
  return [""];
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