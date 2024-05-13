export interface Post {
    id: number;
    ctime: number;
    name: string;
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
    dir: Directory;
    command: string;
    outputs: string[];
}

export interface Directory {
    name: string;
    parent?: Directory;
    directorys?: Directory[];
    files?: Post[];
}

