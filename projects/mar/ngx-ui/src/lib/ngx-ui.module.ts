import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button';
import { HeaderComponent } from './components/header/header';

const DECLARATIONS = [
  // Components
  HeaderComponent,
  ButtonComponent,
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ...DECLARATIONS
  ]
})
export class NgxUiModule { }
