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
  args = mergeStringsBetweenQuotes(args)
  switch (command) {
    case "whoami":
      return whoami(user);
    case "ls":
      return ls(dir);
    case "cd":
      return cd(args[0], dir, setDir);
    case "mkdir":
      return mkdir(args[0], dir, user)
    case "rmdir":
      return rmdir(args[0], dir)
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
    case "":
      return [""];
    default:
      return [`${command}: command not found`];
  }
}

async function rmdir(args: string, dir: Directory) {
  let id;
  dir.directorys?.forEach(subdir => {
    if(args === subdir.dirname) {
      id = subdir.id;
    }
  })
  const response = await fetch(`http://localhost:8000/directorys/${id}`, {method: "DELETE"})
  return response.ok ? ["OK"] : ["NO OK"];
}

async function mkdir(args: string, parent: Directory, user?: User) {
  const new_dir: NewDirectory = {
    dirname: args,
    parent_id: parent.id,
    username: user? user.username : "guest"
  }
  const response = await fetch("http://localhost:8000/directorys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(new_dir)
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

async function ls(dir: Directory) {
  let output: string[] = [];
  console.log(dir);
  dir.directorys?.forEach((subdir) => {
    output.push(`drwx-x--x- ${subdir.username} ${subdir.dirname}`);
  });
  dir.files?.forEach((file) => {
    output.push(`.rwx-r--r-- ${file.username} ${file.filename}`);
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