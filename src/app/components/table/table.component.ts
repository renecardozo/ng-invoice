import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoiceService } from '../../services/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  listeners: Subscription[] = [];

  @Input()
  invoices: any[] = [];
  @Input() _net: any;

  taxes: any[] = [];
  invoiceNumber: any; 
  total: any;
  tax: any;

  constructor(private invoiceService: InvoiceService, private router: Router) {
    this.taxes.push(0);
    this.taxes.push(10.5);
    this.taxes.push(21);
    this.taxes.push(17);
  }

  public set net(value) {
    if (value !== '' ) {
      this._net = parseFloat(value);
    } else {
      this._net = value;
    }
    if(this.tax) {
      this.setTotal();
    }
  }

  public get net() {
    return this._net;
  }

  ngOnInit() {}

  ngOnDestroy () {
    this.listeners.forEach(listener => {
      listener.unsubscribe();
    });
  }

  taxSelected(tax) {
    this.tax = parseFloat(tax);
    if(this._net) {
      this.setTotal();
    }
  }

  addInvoice() {
    if (this._net && this.tax && this.invoiceNumber) {
      let newInvoice = {
        date: new Date(),
        invoiceNumber: this.invoiceNumber,
        net: this.net,
        tax: this.tax,
        total: this.total,
      }
      this.listeners.push(
        this.invoiceService.create(newInvoice).subscribe(
          response => {
            console.log(response.data);
            let invoice = response.data;
            let totalTax = invoice.total - invoice.net;
            invoice.totalTax = parseFloat(totalTax.toFixed(2));
            this.invoices.push(invoice);
            this.clearInvoice();
          },
          error => {
            console.log(error);
          }
        )
      );
    } else {
      alert('Is missing data in the invoice')
    }
  }

  clearInvoice() {
    this.tax = null;
    this.invoiceNumber = null;
    this.net = '';
  }

  deleteInvoice(invoice, index){
    const idInvoice = invoice._id;
    this.listeners.push(
      this.invoiceService.delete(idInvoice).subscribe(
        response => {
          this.invoices.splice(index, 1);
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  goResults() {
    this.router.navigate(['/results'])
  }

  private setTotal() {
    if(this._net && this.net) {
      let totalCrude = this._net * ( 1 + this.tax / 100);
      this.total = parseFloat(totalCrude.toFixed(2));
    }
  }
}
