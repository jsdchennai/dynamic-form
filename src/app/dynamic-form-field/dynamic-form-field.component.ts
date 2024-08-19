import { Component, inject, Input } from '@angular/core';
import {
  FormGroupDirective,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Field, FieldType } from '../models';

// export enum FieldType {
//   CHECKBOX,
//   DATEPICKER,
//   RADIO,
//   SELECTDROPDOWN,
//   SELECTLIST,
//   SLIDETOGGLE,
//   TEXTAREA,
//   TEXTFIELD,
//   SUBHEADER,
//   DIVIDER,
// }

// export enum fieldType {
//   checkbox,
//   datePicker,
//   radio,
//   selectDropDown,
//   selectList,
//   slideToggle,
//   textArea,
//   textField,
// }

// export interface Field {
//   name: string;
//   type: fieldType;
//   children?: Field[];
//   defaultValue?: any;
//   disabled?: boolean;
//   options?: string[];
//   parent?: string;
//   validation?: Validators[];
//   visible?: boolean;
// }

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
})
export class DynamicFormFieldComponent {
  public control: UntypedFormControl;
  public fieldType = FieldType;

  @Input() field: Field;

  constructor(private formGroupDir: FormGroupDirective) {}

  ngOnInit(): void {
    this.control = this.formGroupDir.control.get(
      this.field.name
    ) as UntypedFormControl;
  }
}
