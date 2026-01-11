import { withHooks, patchState, getState, signalStoreFeature, SignalStoreFeature} from "@ngrx/signals";
import { effect } from "@angular/core";
import { QuizSlice } from '../features/quiz/store/quiz.slice';

export function withLocalStorage (key: string):SignalStoreFeature {
   return signalStoreFeature(
   withHooks(store => ({
         onInit: () => {
               const stateJson = localStorage.getItem('quiz');
               if (stateJson) {
                  const state = JSON.parse(stateJson) as QuizSlice;
                  patchState(store, state);
               }

               effect(() => {
                  const state = getState(store);
                  const stateJson = JSON.stringify(state);
                  localStorage.setItem('quiz', stateJson);
               })
         }
      })))
}