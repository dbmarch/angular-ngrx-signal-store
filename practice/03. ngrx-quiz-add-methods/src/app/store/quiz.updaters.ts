import { PartialStateUpdater } from "@ngrx/signals";
import {QuizSlice} from './quiz.slice';


export function addAnswer(answer: number): PartialStateUpdater<QuizSlice> {
   return state => ({ answers: [...state.answers, answer] })
};

export function reset ():PartialStateUpdater<QuizSlice> {
   return state => ({ answers: [] })
};