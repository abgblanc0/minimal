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
            <Prefix />
            <p className="ml-2">{command.command}</p>
          </div>
          <p>
            {command.output}
          </p>
        </div>
      ))}
    </div>
  );
}
