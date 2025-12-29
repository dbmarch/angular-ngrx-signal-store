import { QUESTIONS } from "../data/questions";
import { Question } from "../models/question.model";

export interface QuizSlice {
   readonly questions: Question[];
   readonly answers: number[];
   // readonly currentQuestionIndex: number;  // not needed.  index = length of the question array
}

export const initialQuizSlice: QuizSlice = {
   questions: QUESTIONS,
   answers: []
}