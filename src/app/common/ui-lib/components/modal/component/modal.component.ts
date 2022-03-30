import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Inject, PLATFORM_ID
} from '@angular/core';

import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {DialogControls} from "../../../domain/dialog-component";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit, OnDestroy, DialogControls {
  @Input() componentType?: 'dialog' | 'notification';
  @Input() overlayVisible?: boolean = true;
  @Input('no-padding') noPadding?: boolean;
  @Input() width?: string;
  @Input() appendToBody?: boolean;
  @Input() blocked?: boolean;
  @Output()
  closeEvent = new EventEmitter<void>();
  opened: boolean = false
  private element: any;

  constructor(
    @Inject(PLATFORM_ID) platform: string,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
  ) {
    this.element = el.nativeElement;
    this.isBrowser = isPlatformBrowser(platform);
  }

  isBrowser

  get toBody() {
    return this.isBrowser && this.appendToBody
  }

  onWrapperClick($event: MouseEvent) {
    if (this.blocked) {
      return
    }
    const className = ($event.target as HTMLElement)?.className
    if (className && className.includes('app-modal')) {
      this.close();
    }
  }

  insert() {
    if (this.toBody) {
      this.document.body?.appendChild(this.element);
    }
  }

  ngOnInit(): void {
    this.insert()
    this.open()
  }

  remove() {
    if (this.toBody) {
      this.element.remove();
    }
  }


  ngOnDestroy(): void {
    this.remove()
  }

  open(): void {
    this.opened = true
  }

  close(): void {
    this.closeEvent.emit()
    this.opened = false
  }

  disable(v: boolean) {
    this.blocked = v
  }

  isDisabled() {
    return !!this.blocked
  }
}
