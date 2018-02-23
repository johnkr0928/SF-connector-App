"use strict";
var ActivityModel = (function () {
    function ActivityModel(UserName, ErrorMessage, ActivityStatus, CreatedOn) {
        this.UserName = UserName;
        this.ErrorMessage = ErrorMessage;
        this.ActivityStatus = ActivityStatus;
        this.CreatedOn = CreatedOn;
    }
    return ActivityModel;
}());
exports.ActivityModel = ActivityModel;
