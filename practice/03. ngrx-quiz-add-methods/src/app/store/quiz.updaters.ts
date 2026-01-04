import {initialQuizSlice} from './quiz.slice';


export function addAnswer= (store, answer): QuizSlice => ({...store, answer});
export function reset = (store):QuizSlice => ({...initialQuizSlice});