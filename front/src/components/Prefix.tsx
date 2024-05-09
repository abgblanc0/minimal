export default function Prefix({ path, username }: { path: string, username: string | undefined }) {
    return (
        <h1>
            <span className="text-green">{username ? username : "guest"}@minimal:</span>
            <span className="text-blue font-bold">~{path}</span>
            <span className="ml-2">$</span>
        </h1>
    )
}
