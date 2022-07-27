export class User {
    id: number;
    username: string;
    password: string;
    roles: string[];

    constructor(id: number, username: string, password: string, roles: string[]) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }
}