import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {UiModule} from "./common/ui-lib/ui.module";
import {AppLoadingModule} from "./common/ui-lib/loading-module/app-loading.module";
import {AppDialogModule} from "./common/ui-lib/dialog-module/app-dialog.module";
import {AppNotificationModule} from "./common/ui-lib/notification-module/app-notification.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {PipeEffectsService} from "./common/services/pipe-effects/pipe-effects.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppLoadingModule,
    AppDialogModule,
    AppNotificationModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    UiModule
  ],
  providers: [
    PipeEffectsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
