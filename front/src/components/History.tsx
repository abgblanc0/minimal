import { useTermContext } from "../contexts/TerminalProvider";
import Prefix from "./Prefix";

export default function History() {
  const { history } = useTermContext();
  return (
    <div>
      {history.map((command, index) => (
        <div key={index}>
          <div className="flex">
            <Prefix dir={command.dir} username={command.username} />
            <p className="ml-2">{command.command}</p>
          </div>
          <div>
            {command.outputs.map((out, outIndex) => (
              <div key={outIndex} className="flex">
                {out.length > 0 && out.split(" ").map((word, wordIndex) => (
                  <span key={`${outIndex}-${wordIndex}`}>{word}&nbsp;</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
