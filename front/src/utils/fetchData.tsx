import { Directory, File } from "../models";

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