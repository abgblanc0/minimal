import { useEffect } from "react";
import { Directory } from "../models";
import { fetchDir, fetchFiles } from "../utils/fetchData";

const useDir = async (dir: Directory) => {
      useEffect(() => {
        if (dir?.dirname !== "home") {
          fetchDir(dir);
          fetchFiles(dir);
        }
      }, [dir, dir.directorys]);
}
export default useDir;