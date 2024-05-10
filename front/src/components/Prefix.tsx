import { Directory } from "../types";

export default function Prefix({ dir, username }: { dir: Directory, username: string | undefined }) {
    const parent_name = dir.parent ? dir.parent.name : "";
    return (
        <h1>
            <span className="text-green">{username ? username : "guest"}@minimal:</span>
            <span className="text-blue font-bold">{dir.name == "~" ? " ~" : ` ${parent_name}/${dir.name}`}</span>
            <span className="ml-2">$</span>
        </h1>
    )
}
