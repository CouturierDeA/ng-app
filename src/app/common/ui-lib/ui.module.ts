import {NgModule} from '@angular/core';
import {ButtonComponent} from "./components/button/button.component";
import {ModalComponent} from "./components/modal/component/modal.component";
import {CommonModule} from "@angular/common";
import {ClickOutsideDirective} from "./directives/click-outside/click-outside.directive";
import {PlatformCheckerService} from "./services/platform-checker.service";
import {FormsModule} from "@angular/forms";
import {AppSettingsService} from "../services/app-settings/app-settings.service";

@NgModule({
  declarations: [
    ButtonComponent,
    ModalComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  bootstrap: [
    ButtonComponent,
    ModalComponent,
  ],
  providers: [
    PlatformCheckerService,
    AppSettingsService
  ],
  exports: [
    ButtonComponent,
    ModalComponent,
    ClickOutsideDirective,
  ]
})
export class UiModule {
}
