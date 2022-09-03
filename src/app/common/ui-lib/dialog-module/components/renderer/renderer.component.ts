import {Component, Injector, Input, OnInit, ViewContainerRef} from '@angular/core';
import {NotificationParams} from "../../domain/notification";
import {DialogComponent, DialogControls} from "../../../domain/dialog-component";

/**
 * Creates angular components and renders it into ViewContainerRef
 */
@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
})
export class RendererComponent implements DialogComponent, OnInit {
  constructor(
    public viewContainerRef: ViewContainerRef,
    public injector: Injector,
  ) {
  }

  @Input()
  dialogControls?: DialogControls
  @Input()
  overlayVisible?: boolean
  @Input()
  resolver!: DialogComponent["resolver"]

  @Input()
  notificationParams!: NotificationParams

  ngOnInit() {
    const {viewContainerRef} = this;
    const {component, componentOptions, injector} = this.notificationParams
    viewContainerRef.clear();
    const cmp = viewContainerRef.createComponent(component, {
      injector: injector
    })
    if (componentOptions) {
      Object.assign(cmp.instance, componentOptions)
    }
    cmp.instance.dialogControls = this.dialogControls;
    const resolver = this.resolver;
    if (!resolver) {
      return;
    }
    cmp.instance.resolver = resolver;
    cmp.instance.cancelEvent?.subscribe(() => resolver.complete())
    cmp.instance.errorEvent?.subscribe((e: Error) => resolver.error(e))
    cmp.instance.resolveEvent?.subscribe((e: Error) => resolver.next(e))
  }
}
