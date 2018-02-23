export interface Profile {
    UserName: string;
    Password: string;
}
export class ProfileModel {
    constructor(
        public Email: string,
        public Password: string
    ) { }
}