import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {

  listeners: Subscription[] = [];
  invoices: any[] = [];

  constructor(private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  ngOnDestroy() {
    this.listeners.forEach(listener => {
      listener.unsubscribe();
    });
  }

  getAll() {
    this.listeners.push(
      this.invoiceService.getAll().subscribe(
        response => {
          this.invoices = response.data.map(invoice => {
            let totalTax = invoice.total - invoice.net ;
            invoice.totalTax = parseFloat(totalTax.toFixed(2));
            return invoice;
          });
        },
        error => {
          console.log(error);
        }
      )
    ); 
  }

  goWeather() {
    this.router.navigate(['/weather']);
  }

}
