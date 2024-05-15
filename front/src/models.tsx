
export interface User {
    username: string;
}

export interface Directory {
    id: number;
    ctime: string;
    dirname: string;
    username: string;
    parent?: Directory;
    directorys?: Directory[];
    files?: File[];
}

export interface NewDirectory {
    dirname: string;
    username?: string;
    parent_id: number;
}

export interface Command {
    username: string | undefined;
    dir: Directory;
    command: string;
    outputs: string[];
}

export interface File {
    id: number;
    ctime: string;
    filename: string;
    content: string;
    username: string;
    directory_id: number;
}

