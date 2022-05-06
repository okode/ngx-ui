import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'button-component',
  templateUrl: './button.html',
  styleUrls: [ './button.scss' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ButtonComponent {

  @Input() color: 'primary' | 'red' = 'primary';
  @Input() mode: 'default' | 'outline' | 'clear' = 'default';
  @Input() size: 'default' | 'small' = 'default';
  @Input() rounded?: boolean;
  @Input() darkBackground?: boolean;
  @Input() disabled?: boolean;
  @HostBinding('class.full-width') @Input() fullWidth = false;
  @HostBinding('class.only-icon') @Input() onlyIcon = false;

  constructor() {}

}
