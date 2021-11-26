import {Directive, Input} from '@angular/core';

@Directive({selector: 'app-option'})
export class OptionDirective {
  @Input() someId?: string;
}
