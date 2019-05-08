import { User } from './user';

export class Story {
    title: string;
    content: string;
    status: string;
    readBy: Array<User>;
    createdBy: User;
    createdOn: Date;
    lastModifiedOn: Date;

    constructor() {
        this.title = '';
        this.content = '';
        this.status = '';
        this.readBy = [];
        this.createdBy = new User();
        this.createdOn = null;
        this.lastModifiedOn = null;
    }
}
