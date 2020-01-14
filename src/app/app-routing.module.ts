import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceComponent } from './views/invoice/invoice.component';
import { WeatherComponent } from './views/weather/weather.component';
import { ResultComponent } from './views/result/result.component';

const routes: Routes = [
  {
    path: '',
    component: InvoiceComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: 'results',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
