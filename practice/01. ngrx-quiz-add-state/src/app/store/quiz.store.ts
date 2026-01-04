import {signalStore, withState} from '@ngrx/signals';
import { initalQuizSlice } from './quiz.slice';

export const QuizStore = signalStore(
   {providedIn: 'root'}, 
   withState(initalQuizSlice)
);