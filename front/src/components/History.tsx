import { Command } from "../models";
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
            <Prefix dir={command.dir} username={command.username} />
            <p className="ml-2">{command.command}</p>
          </div>

          {command.outputs.map((out, index) => (
            <div className="flex gap-5" key={index}>
              {out.split(" ").map((word,index) => (
                <p key={index}>{word}</p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
