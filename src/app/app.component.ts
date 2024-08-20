import { AfterViewInit, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AgeGroup, AgeRange, Field, FieldType } from './models';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { AgeGroupOptions, AgeRangeOptions, Zero } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor() {}

  appearance: MatFormFieldAppearance = 'outline';

  fields: Field[] = [
    {
      name: 'ageGroup',
      label: 'Age Group',
      placeholder: 'Age Group',
      type: FieldType.SelectDropDown,
      multiple: false,
      options: AgeGroupOptions,
      defaultValue: AgeGroup.Infant,
      validation: [Validators.required],
    },
    {
      name: 'ageRange',
      label: 'Age Range',
      placeholder: 'Age Range',
      type: FieldType.SelectDropDown,
      multiple: false,
      options: AgeRangeOptions,
      defaultValue: AgeRange.Zero_To_Two,
      validation: [Validators.required],
    },
    {
      name: 'startDate',
      label: 'Start Date',
      placeholder: 'Start Date',
      type: FieldType.DatePicker,
      defaultValue: new Date(),
      validation: [Validators.required],
    },
    {
      name: 'endDate',
      label: 'End Date',
      placeholder: 'End Date',
      type: FieldType.DatePicker,
      defaultValue: new Date(),
      validation: [Validators.required],
    },
    {
      name: 'duration',
      label: 'Duration',
      placeholder: 'Duration',
      type: FieldType.TextField,
      defaultValue: Zero,
      validation: [Validators.required],
    },
  ];

  ngAfterViewInit(): void {}
}
