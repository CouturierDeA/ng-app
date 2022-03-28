import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UiModule} from "../ui.module";
import {DialogService} from "./services/dialog.service";
import {NotificationComponent} from "./components/notification/notification.component";
import {RendererComponent} from "./components/renderer/renderer.component";
import {DialogListComponent} from "./components/dialog-list/dialog-list.component";
import {NotificationService} from "../notification-module/services/notification.service";
import {ConfirmComponent, ConfirmService} from "./services/confirm.service";

@NgModule({
  declarations: [
    DialogListComponent,
    NotificationComponent,
    RendererComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    UiModule
  ],
  providers: [
    DialogService,
    NotificationService,
    ConfirmService
  ],
  bootstrap: [],
  exports: [
    DialogListComponent,
    NotificationComponent,
    ConfirmComponent
  ]
})
export class AppDialogModule {

}
