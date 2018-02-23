export interface Login {
    UserName: string;
    Password: string;
}

export class LoginModel
{
    constructor(
        public Email: string,
        public Password: string
    ) { }
}


