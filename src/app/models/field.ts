import { Validators } from '@angular/forms';
import { FieldType } from './field-type';

export interface Field {
  name: string;
  label?: string;
  placeholder?: string;
  type: FieldType;
  fieldType?: string;
  defaultValue?: any;
  multiple?: boolean;
  disabled?: boolean;
  options?: any;
  validation?: Validators[];
  visible?: boolean;
  datePickerMin?: Date;
}
