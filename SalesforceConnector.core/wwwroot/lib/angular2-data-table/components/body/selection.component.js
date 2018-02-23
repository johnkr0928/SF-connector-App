"use strict";
var core_1 = require('@angular/core');
var utils_1 = require('../../utils');
var types_1 = require('../../types');
var DataTableSelectionComponent = (function () {
    function DataTableSelectionComponent() {
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
    }
    DataTableSelectionComponent.prototype.selectRow = function (event, index, row) {
        if (!this.selectEnabled)
            return;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var multiShift = this.selectionType === types_1.SelectionType.multiShift;
        var multiClick = this.selectionType === types_1.SelectionType.multi;
        var selected = [];
        if (multiShift || multiClick || chkbox) {
            if (multiShift && event.shiftKey) {
                var newSelected = this.selected.slice();
                selected = utils_1.selectRowsBetween(newSelected, this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (multiShift && !event.shiftKey) {
                selected.push(row);
            }
            else {
                var newSelected = this.selected.slice();
                selected = utils_1.selectRows(newSelected, row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected.push(row);
        }
        if (this.selectCheck) {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected = selected;
        this.prevIndex = index;
        this.select.emit({
            selected: selected
        });
    };
    DataTableSelectionComponent.prototype.onActivate = function (model, index) {
        var type = model.type, event = model.event, row = model.row;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var select = (!chkbox && (type === 'click' || type === 'dblclick')) ||
            (chkbox && type === 'checkbox');
        if (select) {
            this.selectRow(event, index, row);
        }
        else if (type === 'keydown') {
            if (event.keyCode === utils_1.Keys.return) {
                this.selectRow(event, index, row);
            }
            else {
                this.onKeyboardFocus(model);
            }
        }
        this.activate.emit(model);
    };
    DataTableSelectionComponent.prototype.onKeyboardFocus = function (model) {
        var keyCode = model.event.keyCode;
        var shouldFocus = keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.right ||
            keyCode === utils_1.Keys.left;
        if (shouldFocus) {
            var isCellSelection = this.selectionType === types_1.SelectionType.cell;
            if (!model.cellElement || !isCellSelection) {
                this.focusRow(model.rowElement, keyCode);
            }
            else if (isCellSelection) {
                this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
            }
        }
    };
    DataTableSelectionComponent.prototype.focusRow = function (rowElement, keyCode) {
        var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
        if (nextRowElement)
            nextRowElement.focus();
    };
    DataTableSelectionComponent.prototype.getPrevNextRow = function (rowElement, keyCode) {
        var parentElement = rowElement.parentElement;
        if (parentElement) {
            var focusElement = void 0;
            if (keyCode === utils_1.Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === utils_1.Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    };
    DataTableSelectionComponent.prototype.focusCell = function (cellElement, rowElement, keyCode, cellIndex) {
        var nextCellElement;
        if (keyCode === utils_1.Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === utils_1.Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === utils_1.Keys.up || keyCode === utils_1.Keys.down) {
            var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                var children = nextRowElement.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement)
            nextCellElement.focus();
    };
    DataTableSelectionComponent.prototype.getRowSelected = function (row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    };
    DataTableSelectionComponent.prototype.getRowSelectedIdx = function (row, selected) {
        var _this = this;
        if (!selected || !selected.length)
            return -1;
        var rowId = this.rowIdentity(row);
        return selected.findIndex(function (r) {
            var id = _this.rowIdentity(r);
            return id === rowId;
        });
    };
    DataTableSelectionComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-selection',
                    template: "\n    <ng-content></ng-content>\n  "
                },] },
    ];
    /** @nocollapse */
    DataTableSelectionComponent.ctorParameters = [];
    DataTableSelectionComponent.propDecorators = {
        'rows': [{ type: core_1.Input },],
        'selected': [{ type: core_1.Input },],
        'selectEnabled': [{ type: core_1.Input },],
        'selectionType': [{ type: core_1.Input },],
        'rowIdentity': [{ type: core_1.Input },],
        'selectCheck': [{ type: core_1.Input },],
        'activate': [{ type: core_1.Output },],
        'select': [{ type: core_1.Output },],
    };
    return DataTableSelectionComponent;
}());
exports.DataTableSelectionComponent = DataTableSelectionComponent;
//# sourceMappingURL=selection.component.js.map