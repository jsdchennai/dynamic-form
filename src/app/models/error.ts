import { Validators } from '@angular/forms';

export interface Error {
  name: string;
  text: string;
  rules: Validators[];
}
