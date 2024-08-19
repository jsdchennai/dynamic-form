import { Component, inject, Input } from '@angular/core';
import {
  FormGroupDirective,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Field, FieldType } from 'src/app/models';

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
