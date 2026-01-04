import { Component, computed, input } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
    selector: 'app-done',
    imports: [SharedModule],
    templateUrl: './done.component.html',
    styleUrl: './done.component.scss'
})
export class DoneComponent {
  readonly correct = input.required<number>();

  readonly total = input.required<number>();

  readonly score = computed(() => this.correct() / this.total());

}
