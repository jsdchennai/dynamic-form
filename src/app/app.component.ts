import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Field, FieldType } from './models';

// export const leftForm: Field[] = [
//   {
//     name: 'firstName',
//     type: FieldType.TextField,
//     validation: [Validators.required, Validators.maxLength(25)],
//   },
//   {
//     name: 'lastName',
//     type: FieldType.TextField,
//   },
//   {
//     name: 'favoriteFood',
//     type: FieldType.SelectDropDown,
//     options: ['Ice Cream', 'Pizza', 'Tacos'],
//   },
//   {
//     name: 'favoriteColor',
//     type: FieldType.SelectDropDown,
//     options: ['Red', 'Blue', 'Yellow'],
//   },
// ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  leftForm: Field[] = [
    {
      name: 'firstName',
      type: FieldType.TextField,
      validation: [Validators.required, Validators.maxLength(25)],
    },
    // {
    //   name: 'lastName',
    //   type: FieldType.TextField,
    // },
    // {
    //   name: 'favoriteFood',
    //   type: FieldType.SelectDropDown,
    //   options: ['Ice Cream', 'Pizza', 'Tacos'],
    // },
    // {
    //   name: 'favoriteColor',
    //   type: FieldType.SelectDropDown,
    //   options: ['Red', 'Blue', 'Yellow'],
    // },
  ];

  test(value) {
    console.log(value);
  }
}
