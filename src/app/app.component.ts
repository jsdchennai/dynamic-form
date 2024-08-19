import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

export enum FieldType {
  CHECKBOX,
  DATEPICKER,
  RADIO,
  SELECTDROPDOWN,
  SELECTLIST,
  SLIDETOGGLE,
  TEXTAREA,
  TEXTFIELD,
  SUBHEADER,
  DIVIDER,
}

export interface Field {
  name: string;
  type: FieldType;
  children?: Field[];
  defaultValue?: any;
  disabled?: boolean;
  options?: string[];
  parent?: string;
  validation?: Validators[];
  visible?: boolean;
}

export const leftForm: Field[] = [
  {
    name: 'firstName',
    type: FieldType.TEXTFIELD,
    validation: [Validators.required, Validators.maxLength(25)],
  },
  {
    name: 'lastName',
    type: FieldType.TEXTFIELD,
  },
  {
    name: 'favoriteFood',
    type: FieldType.SELECTDROPDOWN,
    options: ['Ice Cream', 'Pizza', 'Tacos'],
  },
  {
    name: 'favoriteColor',
    type: FieldType.SELECTDROPDOWN,
    options: ['Red', 'Blue', 'Yellow'],
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  leftForm = leftForm;
}
