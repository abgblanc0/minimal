import { Directory } from "../types";

export default function Prefix({ dir, username }: { dir: Directory, username: string | undefined }) {
    return (
        <h1>
            <span className="text-green">{username ? username : "guest"}@minimal:</span>
            <span className="text-blue font-bold">~{dir.name == "home" ? "" : `/${dir.name}`}</span>
            <span className="ml-2">$</span>
        </h1>
    )
}
