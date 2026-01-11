import { QUESTIONS } from "../../../data/questions";
import { Question } from "../../../models/question.model";

export interface QuizSlice {
    readonly questions: Question[];
    readonly answers: number[];
    readonly isBusy: boolean;
}

export const initialQuizSlice: QuizSlice = {
    questions: [], 
    answers: [],
    isBusy: false
}

