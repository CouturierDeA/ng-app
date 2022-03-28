import {Component, Input} from '@angular/core';

/**
 * компонент для индикации процесса загрузки:
 * @position позиционирование
 * @blocking блокирующий/неблокирующий интерфейс
 * @loading показывать/не показывать loader
 */
@Component({
  selector: 'AppLoading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input()
  size?: number
  @Input()
  position: 'fixed' | 'absolute' | 'unset' = 'unset'
  @Input()
  blocking?: boolean | null
  @Input()
  loading?: boolean | null
}
