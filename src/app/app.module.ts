import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { InvoiceComponent } from './views/invoice/invoice.component';
import { TableComponent } from './components/table/table.component';
import { WeatherComponent } from './views/weather/weather.component';
import { ResultComponent } from './views/result/result.component';

import { InvoiceService } from './services/invoice.service';
import { SanitizerService } from './utils/sanitizer.service';
import { WeatherService } from './services/weather.service';
import { TextToNumberDirective } from './directives/text-to-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    TableComponent,
    WeatherComponent,
    ResultComponent,
    TextToNumberDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [
    InvoiceService,
    SanitizerService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
