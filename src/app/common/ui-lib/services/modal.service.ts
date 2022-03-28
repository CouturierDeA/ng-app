// import {
//   Injectable,
//   Type
// } from "@angular/core";
// import {Subject} from "rxjs";
// import {AddComponentToDocumentService} from "./add-component-to-document.service";
// import {ResolvableComponent} from "../domain/dialog-component";
//
// @Injectable()
// export class ModalService {
//   constructor(
//     private ds: AddComponentToDocumentService
//   ) {
//   }
//
//   resolvableComponent<T, R>(component: Type<T & ResolvableComponent<R>>, componentProps?: any, el?: Element): Subject<R> {
//     const {instance, subject} = this.ds.attachResolvableComponent<T, R>(component)
//     if (componentProps !== null && typeof instance === 'object') {
//       Object.assign(instance, componentProps);
//     }
//     instance.resolver = subject
//     return subject
//   }
// }
