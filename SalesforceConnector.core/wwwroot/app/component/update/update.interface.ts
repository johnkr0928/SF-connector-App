export class UpdateModel {
    constructor(
        public FirstName: string,
        public LastName: string,
        public Email: string,
        public Company: string,
        public Password: string,
        public ConfirmPassword: string,
        public IsActive: boolean,
        public ApplicationId: string
    ) { }
}