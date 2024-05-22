import { API_URL } from "../App";
import { Directory, File, NewDirectory, NewFile } from "../models";

export async function fetchDirs(dir: Directory) {
  const response = await fetch(`${API_URL}/directorys/${dir.id}`);
  const data: Directory[] = await response.json();
  return data;
}

export async function getFiles(dir: Directory) {
  const response = await fetch(`${API_URL}/directorys/files/${dir.id}`);
  const data: File[] = await response.json();
  return data;
}

export async function fetchLogin(data: FormData) {
  return fetch(`${API_URL}/users/login`, {
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
  return fetch(`${API_URL}/users`, {
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

export async function postFile(file: NewFile) {
  return fetch(`${API_URL}/files`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(file),
  });
}
export async function postDir(dir: NewDirectory) {
  return fetch(`${API_URL}/directorys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dir),
  });
}
