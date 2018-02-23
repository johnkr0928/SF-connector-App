export class RegisterModel {
    constructor(
        public FirstName: string,
        public LastName: string,
        public Email: string,
        public Company: string,
        public Password: string,
        public ConfirmPassword: string
    ) { }
}