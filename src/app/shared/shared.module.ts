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

import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { components } from './components';

import { directives } from './directive';

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
  NgxErrorsModule,
];

@NgModule({
  declarations: [...components, ...directives],
  imports: [...Shared_Modules],
  exports: [...Shared_Modules, ...components, ...directives],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
