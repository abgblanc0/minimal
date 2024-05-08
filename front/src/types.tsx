export interface Post {
    id: number;
    ctime: number;
    title: string;
    body: string;
    user_id: number;
    topic: string;
}
export interface User {
    username: string;
}

export interface Topic {
    name: string;
}

export interface Command {
    command: string;
    output: string;
}