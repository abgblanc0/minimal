export default function commands(command: string | undefined) {
    if (command === "whoami") return "user";
    return "...";
}