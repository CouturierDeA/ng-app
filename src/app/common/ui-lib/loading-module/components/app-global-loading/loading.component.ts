import {Component} from '@angular/core';
import {LoadingService} from "../../services/loading/loading.service";

/**
 * Indicates application loading processes
 */
@Component({
  selector: 'app-global-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class GlobalLoadingComponent {
  constructor(
    public loadingSvc: LoadingService
  ) {
  }
}
