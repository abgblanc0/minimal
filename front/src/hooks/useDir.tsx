import { useEffect } from "react";
import { Directory } from "../models";
import { fetchDir, fetchFiles } from "../utils/fetchData";

const useDir = (dir: Directory) => {
  useEffect(() => {
    const fetching = async () => {
      dir.directorys = await fetchDir(dir);
      dir.directorys.forEach((aux) => (aux.parent = dir));
      dir.files = await fetchFiles(dir);
    }
    fetching();
  }, [dir, dir.directorys]);
};
export default useDir;
