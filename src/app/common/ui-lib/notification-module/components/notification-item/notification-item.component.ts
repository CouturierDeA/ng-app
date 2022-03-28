import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NotifyOptions} from "../../services/notification.service";
import {Subscription, of, interval, tap} from "rxjs";
import {AppSettingsService} from "../../../../services/app-settings/app-settings.service";

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit, OnDestroy {
  constructor(
    private settings: AppSettingsService
  ) {

  }
  @Input()
  hovered = false;
  @Output()
  closeEvent = new EventEmitter<NotifyOptions>()
  @Input()
  notification!: NotifyOptions

  remove() {
    this.closeEvent.emit(this.notification)
  }

  ngOnInit() {
    this.delayTime = this.getLifeTime();
    this.timer$ = this.tickToClose().subscribe()
  }

  ngOnDestroy() {
    this.timer$?.unsubscribe()
  }

  secondsPassed = 0
  delayTime? = 0

  getLifeTime() {
    const {lifeTime} = this.notification
    if (lifeTime === Infinity) {
      return undefined;
    }
    return lifeTime || 5_000
  }

  timer$?: Subscription

  tickToClose() {
    if (!this.delayTime || this.settings.isServer) {
      return of()
    }
    return interval(1000).pipe(
      tap(() => {
        if (!this.hovered) {
          this.secondsPassed = this.secondsPassed += 1000;
        }

        if (this.delayTime && this.secondsPassed >= this.delayTime) {
          this.remove();
        }
      }),
    )
  }
}
