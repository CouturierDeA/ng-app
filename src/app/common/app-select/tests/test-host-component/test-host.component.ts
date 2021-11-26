// https://www.youtube.com/watch?v=2SnVxPeJdwE
import {
  Component, Input, TemplateRef, ViewChild
} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AppSelectComponent} from "../../app-select.component";

@Component({
  selector: 'app-test-host',
  templateUrl: './test-host.component.html',
  styleUrls: ['./test-host.component.scss'],
})
export class TestHostComponent {
  @Input() useCustomOptionTemplate?: boolean;
  @Input() useCustomErrorTemplate?: boolean;
  @Input() requiredCheck?: boolean;
  @Input() selectName?: string;
  @Input() optionList?: Array<{
    id: number | null,
    label: string
  }>;

  size = null;

  @ViewChild('appSelect')
  appSelect?: AppSelectComponent;
  @ViewChild('profileForm')
  form?: NgForm;

  onSizeChange(v: any) {
    this.size = v;
  }
}


