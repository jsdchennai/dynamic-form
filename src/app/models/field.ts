import { Validators } from '@angular/forms';
import { FieldType } from './field-type';

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
