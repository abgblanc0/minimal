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
    parent: Topic;
    child: Topic;
}

export interface Command {
    username: string | undefined;
    path: string;
    command: string;
    outputs: string[];
}

export interface Directory {
    name: string;
    parent?: Directory;
    directorys?: Directory[];
    files?: string[];
}