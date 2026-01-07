import { Component, input } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { inject } from '@angular/core';
import { AppStore } from '../../store/app.store';

@Component({
    selector: 'app-toolbar',
    imports: [SharedModule],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  readonly appStore = inject(AppStore);
  readonly caption = input.required<string>();

  readonly icon = input<string>('');

}
