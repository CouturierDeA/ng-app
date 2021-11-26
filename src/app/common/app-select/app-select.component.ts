// https://www.youtube.com/watch?v=2SnVxPeJdwE
import {
  Component, ContentChild, ContentChildren,
  EventEmitter,
  Input, OnChanges, OnDestroy, OnInit, Optional,
  Output, Self, SimpleChanges, TemplateRef, ViewChildren,
} from '@angular/core';
import {
  ControlValueAccessor, NgControl,
  NgForm
} from "@angular/forms";
import {Subscription} from "rxjs";
import {AbstractControlValueAccessorComponent} from "../abstract-control/abstract-control";

export type SelectOption = {
  id: number | null | string;
  label: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss'],
})
export class AppSelectComponent extends AbstractControlValueAccessorComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {
  constructor(
    @Self() @Optional() public control: NgControl,
    @Optional() public controlContainer: NgForm,
  ) {
    super(
      control,
      controlContainer
    )
  }
  subscriptions: Array<Subscription | undefined> = []
  @Input() filterIsStandalone?: boolean;
  @Input() required?: boolean;
  @Input() options?: SelectOption[];
  @Output() changeEvent = new EventEmitter<SelectOption['id']>();
  @ContentChild('optionTemplate')
  optionTemplateRef: TemplateRef<any> | null = null;
  @ContentChild('noOptionsTemplate')
  noOptionsTemplateRef: TemplateRef<any> | null = null;
  @ContentChildren('arrTemplate')
  arrTemplatesRef?: TemplateRef<any>[];
  computedOptions?: SelectOption[] = [];
  selectedName? = '';

  updateSelectedName(value: SelectOption['id']) {
    const {options} = this;
    let $value = value || null;
    const option = options && options.find(opt => opt.id === $value);
    this.selectedName = option && option.label;
  }

  setSelected(selected: SelectOption['id']) {
    this.value = selected;
    this.changeEvent.emit(selected);
  }

  computeOptions() {
    const {options} = this;
    this.computedOptions = options;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['label'] || changes['options']) {
      this.computeOptions();
    }
  }

  ngOnInit() {
    this.computeOptions();
    this.subscriptions = [
      this.control?.valueChanges?.subscribe(value => {
        this.updateSelectedName(value);
      })
    ]
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(sub => sub?.unsubscribe())
  }

  selectOption(selected: SelectOption['id']) {
    this.setSelected(selected);
  }
}


