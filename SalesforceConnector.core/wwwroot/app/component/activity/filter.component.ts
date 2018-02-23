import { Component, Input } from '@angular/core';
@Component({
    selector: 'filter',
    templateUrl: 'app/component/profile/filter.component.html'
})
export class FilterComp {
    @Input data: any;
    @Input prop: any;
}