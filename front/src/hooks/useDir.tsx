import { useEffect } from "react";
import { Directory } from "../models";
import { fetchDirs, getFiles } from "../utils/fetchData";

const useDir = (dir: Directory) => {
  useEffect(() => {
    const fetching = async () => {
      dir.directorys = await fetchDirs(dir);
      dir.directorys.forEach((aux) => (aux.parent = dir));
      dir.files = await getFiles(dir);
    }
    fetching();
  }, [dir, dir.directorys]);
};
export default useDir;
