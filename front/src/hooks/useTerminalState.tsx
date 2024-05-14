import { useState } from "react";
import { home } from "../components/Terminal";
import { Command, Directory } from "../models";

const useTerminalState = () => {
    const [history, setHistory] = useState<Command[]>([]);
    const [dir, setDir] = useState<Directory>(home);
    const [labels, setLabels] = useState<string[]>([]);
    const [data] = useState(new FormData());
    const [type, setType] = useState("");
    
    return { history, setHistory, dir, setDir, labels, setLabels, data, type, setType };
};

export default useTerminalState;