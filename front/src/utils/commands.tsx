import { Post, User, Topic } from "../types";

export default async function handleCommand(
  command: string,
  args: string[],
  path: string,
  setPath: (path: string) => void,
  login: (email: string) => void,
  logout: () => void,
  user?: User
) {
  switch (command) {
    case "whoami":
      return whoami(user);
    case "ls":
      return ls(path);
    case "cd":
      return cd(args[0], setPath);
    case "help":
      return help();
    case "login":
      return handleLogin(login);
    case "logout":
      return handleLogout(logout, user);
    case "shorcuts":
      return shortcuts();
    case "":
      return "";
    default:
      return `${command}: command not found`;
  }
}
// TO DO: Hardcoded for now
function cd(args: string, setPath: (path: string) => void) {
  console.log(args);
  if (args == "topics") setPath("/topics");
  if (args == "juegos") setPath("/juegos");
  if (args == "misc") setPath("/misc");
  if (!args) setPath("/");
  return "";
}

function whoami(user?: User) {
  return user?user.username:"user";
}

function shortcuts(){
  return "CTRL+Enter -> new terminal\nCTRL+E -> close last terminal\nCTRL+L -> clear terminal"
}

// TODO: hardcoded for now
async function ls(path: string) {
  if (path == "/") {
    return "...";
  }
  if (path == "/topics") {
    const response = await fetch("http://127.0.0.1:8000/topics");
    const data = await response.json();
    const topics = show_topics(data);
    return topics;
  }
  const response = await fetch(`http://127.0.0.1:8000/topics/${path.slice(1)}`);
  const data = await response.json();
  return show_posts(data);
}

function show_topics(topics: Topic[]) {
  let result = "";
  for (const topic of topics) {
    result += topic.name + "\n";
  }
  return result.slice(0, -1);
}

function show_posts(posts: Post[]) {
  let result = "";
  for (const post of posts) {
    result += `---${post.title}---\n${post.body}\n`;
  }
  return result;
}

function help() {
  return "cd, whoami, ls, login, logout, shortcuts";
}

//TODO: find way to do a good form terminal way, using prompts for now
async function handleLogin(login: (email: string) => void) {
  const email = prompt("Email: ");
  const password = prompt("Password: ");
  const response = await fetch("http://localhost:8000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  const user: User = await response.json();
  if (response.ok) {
    login(user.username);
  }
  return response.ok ? "OK" : "OKN'T";
}

function handleLogout(logout: any, user?: User) {
  if(user){
    logout()
    return "Logged out"
  }
  return "You are already logged out"
}
