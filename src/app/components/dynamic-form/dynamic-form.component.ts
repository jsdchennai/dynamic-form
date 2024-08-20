import { Component, inject, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { AgeGroup, AgeRange, Error, Field } from 'src/app/models';
import moment from 'moment';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  public form: UntypedFormGroup;

  public formInitialized: boolean = false;

  formBuilder = inject(UntypedFormBuilder);

  @Input() fieldset: Field[]; // Required

  @Input() errors: Error[] = []; // Optional

  @Input() disabled = false; // Optional

  @Input() appearance: MatFormFieldAppearance;

  ngOnInit(): void {
    if (this.fieldset) {
      this.initializeForm();
    } else {
      console.warn('Please pass a fieldset into the dynamic form component.');
    }
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({});

    this.fieldset.forEach((field) => {
      this.form.addControl(field.name, this.initializeFormControl(field));
    });

    this.formInitialized = true;
  }

  initializeFormControl(field): UntypedFormControl {
    let value: any;

    if (typeof field.defaultValue !== 'undefined') {
      value = field.defaultValue;
    }

    let validation = field.validation ? field.validation : [];
    let isDisabled = field.disabled || this.disabled ? true : false;

    return this.formBuilder.control(
      { value, disabled: isDisabled },
      validation
    );
  }

  calculateDuration() {
    let startDate = moment(this.form.get('startDate').value);
    let endDate = moment(this.form.get('endDate').value);
    let difference = endDate.diff(startDate, 'days');
    this.form.get('duration').patchValue(difference);
  }

  updateAgeGroup(event) {
    switch (event.value) {
      case AgeGroup.Infant:
        this.form.get('ageRange').patchValue(AgeRange.Zero_To_Two);
        break;

      case AgeGroup.Child:
        this.form.get('ageRange').patchValue(AgeRange.Three_To_Twelve);
        break;

      case AgeGroup.Teenager:
        this.form.get('ageRange').patchValue(AgeRange.Thirteen_To_Nineteen);
        break;

      case AgeGroup.Young_Adult:
        this.form.get('ageRange').patchValue(AgeRange.Twenty_To_ThirtyNine);
        break;

      case AgeGroup.Adult:
        this.form.get('ageRange').patchValue(AgeRange.Fourty_To_FiftyNine);
        break;

      case AgeGroup.Senior:
        this.form.get('ageRange').patchValue(AgeRange.Sixty_Plus);
        break;
    }
  }

  updateAgeRange(event) {
    switch (event.value) {
      case AgeRange.Zero_To_Two:
        this.form.get('ageGroup').patchValue(AgeGroup.Infant);
        break;

      case AgeRange.Three_To_Twelve:
        this.form.get('ageGroup').patchValue(AgeGroup.Child);
        break;

      case AgeRange.Thirteen_To_Nineteen:
        this.form.get('ageGroup').patchValue(AgeGroup.Teenager);
        break;

      case AgeRange.Twenty_To_ThirtyNine:
        this.form.get('ageGroup').patchValue(AgeGroup.Young_Adult);
        break;

      case AgeRange.Fourty_To_FiftyNine:
        this.form.get('ageGroup').patchValue(AgeGroup.Adult);
        break;

      case AgeRange.Sixty_Plus:
        this.form.get('ageGroup').patchValue(AgeGroup.Senior);
        break;
    }
  }

  handleDatePickerChange(event) {
    if (event.field.name == 'startDate') {
      this.calculateDuration();
    }

    if (event.field.name == 'endDate') {
      this.calculateDuration();
    }
  }

  handleSelectChange(event) {
    if (event.field.name == 'ageGroup') {
      this.updateAgeGroup(event);
    }

    if (event.field.name == 'ageRange') {
      this.updateAgeRange(event);
    }
  }

  handleInputChange(event) {
    let endDate = moment(this.form.get('startDate').value);
    endDate.add(event.value, 'days');
    this.form.get('endDate').patchValue(endDate);
  }
}
