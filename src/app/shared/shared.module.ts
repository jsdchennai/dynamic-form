import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';

import { components } from './components';
import { DelayedInputDirective } from './directive/delayed-input.directive';

const Shared_Modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatSelectModule,
  MatRadioModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatListModule,
  MatButtonModule,
  MatMomentDateModule,
  MatCardModule,
];

@NgModule({
  declarations: [...components, DelayedInputDirective],
  imports: [...Shared_Modules],
  exports: [...Shared_Modules, ...components, DelayedInputDirective],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
