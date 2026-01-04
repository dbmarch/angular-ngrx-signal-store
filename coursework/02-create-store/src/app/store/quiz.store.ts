import {signalStore, withComputed, withState} from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import {computed } from '@angular/core';

export const QuizStore = signalStore(
   {providedIn: 'root'}, 
   withState(initialQuizSlice), 
   // withComputed((store) => ({
   //    currentQuestionIndex: computed(() => store.answers().length),
   //    isDone: computed(() => store.answers().length === store.questions().length),
   // })),

   // // Since it is dependent on the other parameters, you can break it out like this.  But there are better methods of doing this.
   // withComputed((store)=>({
   //    currentQuestion: computed(() => store.questions()[store.currentQuestionIndex()])
   // }))

   withComputed((store) => {
      const currentQuestionIndex = computed(() => store.answers().length);
      const isDone = computed(() => store.answers().length === store.questions().length);
      const currentQuestion = computed(() => store.questions()[currentQuestionIndex()]);

      // return the list of key value pairs { currentQuestionIndex: currentQuestionIndex, ...}
      return {
         currentQuestionIndex,
         isDone,
         currentQuestion
      };

   })
);