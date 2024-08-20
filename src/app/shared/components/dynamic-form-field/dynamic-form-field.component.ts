import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroupDirective, UntypedFormControl } from '@angular/forms';

import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelectChange } from '@angular/material/select';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { Field, FieldType } from 'src/app/models';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
})
export class DynamicFormFieldComponent implements OnInit {
  public fieldType = FieldType;

  public control: UntypedFormControl;

  @Input() field: Field;

  @Input() appearance: MatFormFieldAppearance;

  @Output() submitSelectChange = new EventEmitter();

  @Output() submitDatePickerChange = new EventEmitter();

  @Output() submitInputChange = new EventEmitter();

  constructor(private formGroupDirective: FormGroupDirective) {}

  handleSelectChange(matSelectChange: MatSelectChange, field: Field) {
    let obj = {
      value: matSelectChange.value,
      field,
    };

    this.submitSelectChange.emit(obj);
  }

  handleDatePickerChange(event: MatDatepickerInputEvent<any>, field) {
    let obj = {
      value: event.target.value,
      field,
    };

    this.submitDatePickerChange.emit(obj);
  }

  handleSelectListChange(event, field) {
    let obj = {
      value: event.value,
      field,
    };

    this.submitSelectChange.emit(obj);
  }

  handleInputChange(event: any, field) {
    let obj = {
      value: event.target.value,
      field,
    };

    this.submitInputChange.emit(obj);
  }

  ngOnInit(): void {
    this.control = this.formGroupDirective.control.get(
      this.field.name
    ) as UntypedFormControl;
  }
}
