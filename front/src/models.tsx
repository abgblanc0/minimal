
export interface User {
    username: string;
}

export interface Directory {
    id: number;
    ctime: string;
    dirname: string;
    username: string;
    permissions: number;
    parent?: Directory;
    directorys?: Directory[];
    files?: File[];
}

export interface NewDirectory {
    dirname: string;
    username?: string;
    permissions?: number;
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
    permissions: number;
    directory_id: number;
}

export interface NewFile {
    filename: string;
    content: string;
    username: string;
    permissions?: number;
    directory_id: number;
}

