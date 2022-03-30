import {animate, group, style, transition, trigger} from "@angular/animations";
export const fadeInOutAnimation = trigger("fadeInOut", [
  transition(':enter', [
    style({ opacity: 0 }),
    group([
      animate('0.3s ease', style({
        opacity: 1
      }))
    ])
  ]),
  transition(':leave', [
    group([
      animate('0.3s ease', style({
        opacity: 0
      }))
    ])
  ])
])
