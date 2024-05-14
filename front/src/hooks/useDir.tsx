import { useEffect } from "react";
import { home } from "../components/Terminal";
import { Directory } from "../models";
import { fetchDir, fetchFiles } from "../utils/fetchData";

const useDir = async (dir: Directory) => {
    useEffect(() => {
        fetchDir(home);
        fetchFiles(home);
      }, []);
    
      useEffect(() => {
        if (dir?.dirname !== "home") {
          fetchDir(dir);
          fetchFiles(dir);
        }
      }, [dir, dir.directorys]);
}
export default useDir;