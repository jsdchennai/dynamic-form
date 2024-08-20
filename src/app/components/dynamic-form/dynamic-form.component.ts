import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  public formBuilder = inject(UntypedFormBuilder);

  /**
   * Initialize empty Form Group,
   * The formInitialized marker is true, when all the FormControls added to the FormGroup
   */

  public form: UntypedFormGroup;
  public formInitialized: boolean = false;

  /**
   * The fields input is the required one and responsbile for the building of the Form
   */

  @Input() fields: Field[] = [];
  @Input() errors: Error[] = [];
  @Input() disabled = false;

  /**
   * It decides the appearance of the FormField. It has two options outline or fill.
   */

  @Input() appearance: MatFormFieldAppearance;

  /**
   * submitFormValue event emitter is used to emit the form value to the parent.
   */

  @Output() submitFormValue = new EventEmitter();

  ngOnInit(): void {
    if (this.fields) {
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({});

    this.fields.forEach((field) => {
      this.form.addControl(field.name, this.initializeFormControl(field));
    });

    this.formInitialized = true;
  }

  initializeFormControl(field): UntypedFormControl {
    let value: any;

    /**
     * If the default value is given, that will be assigned to the FormControl
     */
    if (typeof field.defaultValue !== 'undefined') {
      value = field.defaultValue;
    }

    /**
     * Sets the validation for the FormControl, if the Validators are given.
     * isDisabled property disables the FormControl and disabled property disables the whole FormGroup.
     */
    let validation = field.validation ? field.validation : [];
    let isDisabled = field.disabled || this.disabled;

    /**
     *  Return new Form Control up to the form.
     */
    return this.formBuilder.control(
      { value, disabled: isDisabled },
      validation
    );
  }

  calculateDuration() {
    let startDate = moment(this.form.get('startDate').value);
    let endDate = moment(this.form.get('endDate').value);

    if (startDate.isAfter(endDate)) {
      alert('The start date must be lesser than end date');
      return;
    }

    if (endDate.isBefore(startDate)) {
      alert('The end date must be greater than start date');
      return;
    }

    let difference = endDate.diff(startDate, 'days');

    if (!isNaN(difference)) {
      this.form.get('duration').patchValue(difference);
    }
  }

  updateAgeRange(event) {
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

  updateAgeGroup(event) {
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
      this.updateAgeRange(event);
    }

    if (event.field.name == 'ageRange') {
      this.updateAgeGroup(event);
    }
  }

  handleInputChange(event) {
    let endDate = moment(this.form.get('startDate').value);
    endDate.add(event.value, 'days');
    this.form.get('endDate').patchValue(endDate);
  }

  onSubmit() {
    this.submitFormValue.emit(this.form.value);
  }
}
