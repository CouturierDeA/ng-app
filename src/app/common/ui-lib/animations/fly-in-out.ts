import {animate, group, state, style, transition, trigger} from "@angular/animations";

export const flyInOut = trigger('flyInOut', [
  state('in', style({
    width: '*',
    transform: 'translateX(0)', opacity: 1
  })),
  transition(':enter', [
    style({ height: '0px', transform: 'translateX(100%)', opacity: 0 }),
    group([
      animate('0.3s 0.1s ease', style({
        transform: 'translateX(0)',
        height: '*'
      })),
      animate('0.3s ease', style({
        opacity: 1
      }))
    ])
  ]),
  transition(':leave', [
    group([
      animate('0.3s ease', style({
        transform: 'translateX(100%)',
        height: '0px'
      })),
      animate('0.3s 0.2s ease', style({
        opacity: 0
      }))
    ])
  ])
])
