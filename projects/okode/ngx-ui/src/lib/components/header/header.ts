import { Component, ChangeDetectionStrategy, Input, HostBinding, OnChanges, OnInit } from '@angular/core';
import { timer } from 'rxjs';

/**
 * @ignore
 */
let headerProgressBarValue: number | null;

@Component({
  selector: 'header-component',
  templateUrl: './header.html',
  styleUrls: [ './header.scss' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() mode: 'default' | 'logo' | 'featured' | 'featured-logo' = 'default';
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() progressBar?: number;
  @Input() progressBarAnimated = false;
  @Input() collapseHeader = false;
  @Input() collapseHeaderTopMargin = 0;

  @HostBinding('class')
  @Input() backgroundColor: 'white' | 'light' | 'medium' | 'dark' | 'red' = 'white';

  @Input() bordered = false;

  /**
   * @ignore
   */
  @HostBinding('class.bordered') get borderedClass () { return this.bordered; }

  constructor() {}

  ngOnInit() {
    this.setStatusBar(this.backgroundColor);
    this.initProgressBar();
  }

  ngOnChanges(changes: any) {
    if (changes?.backgroundColor?.currentValue !== changes?.backgroundColor?.previousValue) {
      const currentBackgroundColor = changes?.backgroundColor?.currentValue;
      this.setStatusBar(currentBackgroundColor);
    }
  }

  private setStatusBar(backgroundColor: string) {

  }

  private initProgressBar() {
    if (this.progressBar) {
      if (this.progressBarAnimated) {
        const setValue = this.progressBar;
        this.progressBar = headerProgressBarValue || 0.1;
        timer(100).subscribe(() => {
          this.progressBar = setValue;
          headerProgressBarValue = this.progressBar;
        });
      }
      headerProgressBarValue = this.progressBar;
    } else {
      headerProgressBarValue = null;
    }
  }

}
