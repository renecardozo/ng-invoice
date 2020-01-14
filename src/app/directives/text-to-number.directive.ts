import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTextToNumber]'
})
export class TextToNumberDirective {

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event.target'])
  onEvent(target: HTMLInputElement) {
    const numberRegex = new RegExp('^\\d+$');
    if (numberRegex.test(target.value)) {
      this.control.viewToModelUpdate(target.value);
    } else {
      target.value = null;
    }
  }
}
