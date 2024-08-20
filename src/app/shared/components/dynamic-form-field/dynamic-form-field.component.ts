import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroupDirective,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Field, FieldType } from 'src/app/models';
import moment from 'moment';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSelectChange } from '@angular/material/select';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
})
export class DynamicFormFieldComponent implements OnInit {
  public fieldType = FieldType;

  public control: UntypedFormControl;

  moment = moment();

  @Input() field: Field;

  @Input() appearance: MatFormFieldAppearance;

  @Output() submitted = new EventEmitter();

  @Output() submitSelectChange = new EventEmitter();

  @Output() submitDatePickerChange = new EventEmitter();

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

    console.log(obj);

    this.submitDatePickerChange.emit(obj);
  }

  handleSelectListChange(event, field) {
    let obj = {
      value: event.value,
      field,
    };

    this.submitSelectChange.emit(obj);
  }

  handleInputChange(event, field) {
    let obj = {
      event,
      field,
    };
  }

  ngOnInit(): void {
    this.control = this.formGroupDirective.control.get(
      this.field.name
    ) as UntypedFormControl;

    moment();
  }
}
