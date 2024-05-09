import { Command } from "../types";
import Prefix from "./Prefix";
type HistoryProps = {
  history: Command[];
};

export default function History({ history }: HistoryProps) {
  return (
    <div>
      {history.map((command, index) => (
        <div key={index}>
          <div className="flex">
            <Prefix path={command.path} username={command.username}/>
            <p className="ml-2">{command.command}</p>
          </div>
          
          {command.outputs.map((out, index) => (
              <p key={index}>
                {out}
              </p>
          ))}
  
        </div>
      ))}
    </div>
  );
}
