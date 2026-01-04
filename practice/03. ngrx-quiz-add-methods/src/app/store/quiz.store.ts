import { signalStore, withComputed, withState, withMethods, patchState} from "@ngrx/signals";
import { initialQuizSlice } from "./quiz.slice";
import { computed } from "@angular/core";
import { addAnswer, reset } from "./quiz.updaters";
import { checkAnswers } from './quiz.helpers'


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


