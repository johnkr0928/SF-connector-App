export class ActivityModel {
    constructor(
        public UserName: string,
        public ErrorMessage: string,
        public ActivityStatus: string,
        public CreatedOn: string
    ) { }
}