import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { QuizStore } from '../../store/quiz.store';
import { Question } from '../../models/question.model';
import { patchState } from '@ngrx/signals';

@Component({
    selector: 'app-question-presenter',
    imports: [SharedModule],
    templateUrl: './question-presenter.component.html',
    styleUrl: './question-presenter.component.scss'
})
export class QuestionPresenterComponent {
  readonly store = inject(QuizStore);
  readonly question = this.store.currentQuestion;

  
  // onSelect (index: number) {
  //   console.log ('Selected answer: ', index);
  //   this.store.addAnswer(index);
  // }
}
