import { Component, computed, Input, signal } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
    selector: 'app-progress',
    imports: [SharedModule],
    templateUrl: './progress.component.html',
    styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  readonly value = signal(4);

  readonly max = signal(9);

  readonly ratio = computed(() => this.value() / this.max());

}
