import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {

  listeners: Subscription[] = [];

  totalInvoices: any[] = [];

  constructor(private invoiceService: InvoiceService, private route: Router) {}

  ngOnInit() {
    this.getAll();
  }

  ngOnDestroy() {
    this.listeners.forEach(listener => {
      listener.unsubscribe()
    });
  }

  getAll() {
    this.listeners.push(this.invoiceService.getAll().subscribe(
      response => {
        let invoices = response.data.map(invoice => {
          let totalTax = invoice.total - invoice.net ;
          invoice.totalTax = parseFloat(totalTax.toFixed(2));
          return invoice;
        });
        let totalNet = this.getSum('net', invoices);
        let totalTaxes = this.getSum('totalTax', invoices);
        let totalGlobal =  this.getSum('total', invoices);
        this.totalInvoices.push({
          totalNet, totalTaxes, totalGlobal
        });
      },
      error => {
        console.log(error);
      }
    ));
  }

  deleteWord() {
    this.listeners.push(
      this.invoiceService.deleteAll().subscribe(
        response => {
          this.route.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  private getSum(property, items) {
    let sum = 0;
    items.forEach(item => {
      sum += item[property];
    });
    return sum;
  }
}
