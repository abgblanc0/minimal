export default async function handleCommand(
  path: string,
  setPath: (path: string) => void,
  command: string,
  args: string[]
) {
  switch (command) {
    case "whoami":
      return whoami();
    case "ls":
      return ls(path);
    case "cd":
      return cd(args[0], setPath);
    case "help":
      return help();
    case "login":
      return login();
    default:
      return "command not found";
  }
}

function cd(args: string, setPath: (path: string) => void) {
  console.log(args);
  if (args == "topics") setPath("/topics");
  if (args == "juegos") setPath("/juegos");
  if (args == "misc") setPath("/misc");
  if (!args) setPath("/");
  return "";
}

function whoami() {
  return "user";
}

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
  console.log(path.slice(1));
  const response = await fetch(`http://127.0.0.1:8000/topics/${path.slice(1)}`);
  const data = await response.json();
  return show_posts(data);
}

interface Topic {
  name: string;
}

interface Post {
  id: number;
  ctime: number;
  title: string;
  body: string;
  user_id: number;
  topic: string;
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
  return "cd, whoami, ls, su";
}

function login() {
  return "";
}
