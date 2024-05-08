import { Post, User, Topic } from "../types";

const commands = ["whoami", "ls", "cd", "help", "login", "logout", "keys", "cat"]
let topics: Topic[] = [];


export default async function handleCommand(
  command: string,
  args: string[],
  path: string,
  setPath: (path: string) => void,
  login: (email: string) => void,
  logout: () => void,
  user?: User
) : Promise<string[]>{
  switch (command) {
    case "whoami":
      return whoami(user);
    case "ls":
      return ls(path);
    case "cd":
      return cd(args[0], path, setPath);
    case "help":
      return commands;
    case "cat":
      return cat();
    case "login":
      return handleLogin(login);
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
// TO DO: Hardcoded for now
async function cd(args: string, path:string, setPath: (path: string) => void) {
  console.log(args);
  if (args == "topics") {
    const response = await fetch("http://127.0.0.1:8000/topics");
    topics = await response.json();
    setPath("/topics")
  };
  topics.forEach(topic => {
    if(args === topic.name){
      setPath(`${path}/${topic.name}`)
    }
  })
  if(args == "..") setPath(path === "/" ? "/" : path.replace(path.split('/').pop()!, ""))
  if (!args) setPath("/");
  return [""];
}

function whoami(user?: User) {
  return [user?user.username:"guest"];
}

function keys(){
  return ["CTRL+Enter -> new terminal","CTRL+E -> close last terminal","CTRL+L -> clear terminal"]
}

// TODO: hardcoded for now
async function ls(path: string) {
  if (path == "/") {
    return ["..."];
  }
  if (path == "/topics") {
    const response = await fetch("http://127.0.0.1:8000/topics");
    const data = await response.json();
    return show_topics(data);
  }
  const response = await fetch(`http://127.0.0.1:8000/topics/${path.slice(1)}`);
  const data: Post[] = await response.json();
  return show_posts(data);
}

function show_topics(data: Topic[]) {
  topics = data
  let result:string[] = [];
  for (const topic of topics) {
    result.push(topic.name);
  }
  return result;
}
1
function show_posts(posts: Post[]) {
  let result:string[] = [];
  for (const post of posts) {
    result.push(`${post.title}.txt`);
  }
  return result;
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
  return response.ok ? ["OK"] : ["OKN'T"];
}

function handleLogout(logout: any, user?: User) {
  if(user){
    logout();
    return ["Logged out"];
  }
  return ["You are already logged out"];
}

function cat() {
  return [""];
}