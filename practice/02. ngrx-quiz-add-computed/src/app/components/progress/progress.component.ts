import { Component, computed, inject, input, Input, signal } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { QuizStore } from '../../store/quiz.store';

@Component({
    selector: 'app-progress',
    imports: [SharedModule],
    templateUrl: './progress.component.html',
    styleUrl: './progress.component.scss'
})
export class ProgressComponent {
  readonly store = inject(QuizStore);
  readonly value = input.required<number>();

  readonly max = input.required<number>();

  readonly ratio = computed(() => this.value() / this.max());

}
