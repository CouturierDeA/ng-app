import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UiModule} from "../ui.module";
import {NotificationService} from "./services/notification.service";
import {NotificationListComponent} from "./components/notification-list/notification-list.component";
import {NotificationItemComponent} from "./components/notification-item/notification-item.component";

@NgModule({
  declarations: [
    NotificationListComponent,
    NotificationItemComponent,
  ],
  imports: [
    CommonModule,
    UiModule
  ],
  providers: [
    NotificationService
  ],
  bootstrap: [],
  exports: [
    NotificationListComponent,
  ]
})
export class AppNotificationModule {

}
