import {signalStore, withComputed, withState} from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import {computed } from '@angular/core';

export const QuizStore = signalStore(
   {providedIn: 'root'}, 
   withState(initialQuizSlice), 
   withComputed((store) => ({
      currentQuestionIndex: computed(() => store.answers().length),
      isDone: computed(() => store.answers().length === store.questions().length),
   })),

   // Since it is dependent on the other parameters, you can break it out like this.  But there are better methods of doing this.
   withComputed((store)=>({
      currentQuestion: computed(() => store.questions()[store.currentQuestionIndex()])
   }))
);