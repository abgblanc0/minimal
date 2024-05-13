import { Directory } from "../models";

export default function Prefix({ dir, username }: { dir: Directory, username: string | undefined }) {
    const parent_name = dir.parent ? dir.parent.dirname : "";
    return (
        <h1>
            <span className="text-green">{username ? username : "guest"}@minimal:</span>
            <span className="text-blue font-bold">{dir.dirname == "~" ? " ~" : ` ${parent_name}/${dir.dirname}`}</span>
            <span className="ml-2">$</span>
        </h1>
    )
}
