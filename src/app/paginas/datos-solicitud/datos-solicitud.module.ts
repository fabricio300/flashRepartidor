import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DatosSolicitudPage } from './datos-solicitud.page';

const routes: Routes = [
  {
    path: '',
    component: DatosSolicitudPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DatosSolicitudPage]
})
export class DatosSolicitudPageModule {}
