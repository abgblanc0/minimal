import { Directory, File, NewFile } from "../models";

export async function fetchDir(dir: Directory) {
  const response = await fetch(`http://localhost:8000/directorys/${dir.id}`);
  const data: Directory[] = await response.json();
  return data;
}

export async function fetchFiles(dir: Directory) {
  const response = await fetch(
    `http://localhost:8000/directorys/files/${dir.id}`
  );
  const data: File[] = await response.json();
  return data;
}

export async function fetchLogin(data: FormData) {
  return fetch("http://localhost:8000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.get("username"),
      password: data.get("password"),
    }),
  });
}

export async function fetchRegister(data: FormData) {
  return fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.get("username"),
      password: data.get("password"),
    })
  });
}

export async function fetchFile(file: NewFile) {
  return fetch("http://localhost:8000/files", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(file)
  })
}