import { signalStore, withComputed, withState, withMethods, patchState, withHooks, getState} from "@ngrx/signals";
import { effect } from "@angular/core";
import { initialQuizSlice, QuizSlice } from "./quiz.slice";
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
        })),
        withHooks(store => ({
        onInit: () => {
            const stateJson = localStorage.getItem('quiz');
            if (stateJson) {
                const state = JSON.parse(stateJson) as QuizSlice;
                patchState(store, state);
            }

            // Monitor state and save it.
            effect(() => {
                const state = getState(store);
                const stateJson = JSON.stringify(state);
                localStorage.setItem('quiz', stateJson);
            })            
        }
    }))
);


