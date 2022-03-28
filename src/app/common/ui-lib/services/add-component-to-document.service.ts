// import {
//   ApplicationRef,
//   ComponentFactoryResolver, ComponentRef,
//   EmbeddedViewRef,
//   Inject,
//   Injectable,
//   Injector,
//   Renderer2, RendererFactory2, Type
// } from "@angular/core";
// import {DOCUMENT} from "@angular/common";
// import {Subject} from "rxjs";
// import {finalize, first, tap} from "rxjs/operators";
// import {DialogComponent} from "../domain/dialog-component";
//
// @Injectable()
// export class AddComponentToDocumentService {
//   private readonly document: Document;
//   private readonly renderer: Renderer2;
//
//   constructor(
//     @Inject(DOCUMENT) document: Document,
//     private componentFactoryResolver: ComponentFactoryResolver,
//     private injector: Injector,
//     private applicationRef: ApplicationRef,
//     rendererFactory: RendererFactory2
//   ) {
//     this.renderer = rendererFactory.createRenderer(null, null);
//     this.document = document;
//   }
//
//   public createComponent<T>(component: Type<T>, el?: Element): ComponentRef<T> {
//     const injections = Injector.create({
//       providers: [],
//       parent: this.injector,
//     })
//
//     return this.componentFactoryResolver
//       .resolveComponentFactory(component)
//       .create(injections);
//   }
//
//   attachComponent<T>(componentRef: ComponentRef<T>, el?: Element): Function {
//     this.applicationRef.attachView(componentRef.hostView);
//     const componentRootNode = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
//     this.renderer.appendChild(el || this.document.body, componentRootNode);
//     return () => this.applicationRef.detachView(componentRef.hostView);
//   }
//
//   private createAndAttachComponent<T>(component: Type<T>, el?: Element): {
//     instance: T,
//     destroy: Function
//   } {
//     const componentRef = this.createComponent(component)
//     const detachView = this.attachComponent(componentRef, el);
//     const instance = componentRef.instance;
//
//     const destroy = () => {
//       detachView()
//       componentRef.destroy();
//     };
//
//     return {
//       instance,
//       destroy
//     }
//   }
//
//   attachDialogComponent<T, R>(component: Type<T & DialogComponent<R>>, el?: Element): {
//     instance: T & DialogComponent<R>
//     subject: Subject<R>
//   } {
//     const subject = new Subject<R>();
//     const {instance, destroy} = this.createAndAttachComponent(component)
//
//     subject.pipe(
//       tap(() => destroy()),
//       finalize(() => destroy()),
//     ).toPromise()
//
//     return {
//       instance,
//       subject
//     }
//   }
// }
