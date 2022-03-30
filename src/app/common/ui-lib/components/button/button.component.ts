import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss']
})
export class ButtonComponent {
  @Input()
  dataId?: string
  @Input()
  fullWidth?: boolean
  @Input()
  display?: 'block'
  @Input()
  disabled?: any
  @Input()
  type?: 'button' | 'reset' | 'submit'
  @Input()
  viewType?: 'success'
    | 'warning'
    | 'danger'
    | 'link'
    | 'text'
    | 'default'
    | 'no-border'

  @Input()
  size?: 'normal' | 'big'
}
