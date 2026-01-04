import { signalStore, withComputed, withState, withMethods, patchState} from "@ngrx/signals";
import { initialQuizSlice } from "./quiz.slice";
import { computed } from "@angular/core";
import { addAnswer, reset } from "./quiz.updaters";
import { map } from "rxjs";
import { Question } from '../models/question.model';


const checkAnswers = (questions: Question[], answers: number[]) => {
    let correct=0;
    
    answers.forEach((answer, index) => 
        correct += questions[index].correctIndex === answer ? 1 : 0);
    console.log('correct', correct);
    return correct;
}

export const QuizStore = signalStore(
    { providedIn: 'root'}, 
    withState(initialQuizSlice), 
    withComputed((store) => {
        const currentQuestionIndex = computed(() => store.answers().length);
        const isDone = computed(() => store.answers().length === store.questions().length);
        const currentQuestion = computed(() => store.questions()[currentQuestionIndex()]);
        const questionsCount = computed(() => store.questions().length);
        const correctCount = computed(() => checkAnswers(store.questions(), store.answers()));

        return ({
            currentQuestionIndex,
            isDone, 
            currentQuestion, 
            questionsCount,
            correctCount            
        });
        }), 
        withMethods((store) => ({
            addAnswer: (index: number) => patchState(store, addAnswer(index)),
            reset: () => patchState(store, reset())
        }))
);


