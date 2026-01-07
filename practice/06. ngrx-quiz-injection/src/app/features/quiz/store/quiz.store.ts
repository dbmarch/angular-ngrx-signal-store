import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialQuizSlice, QuizSlice } from "./quiz.slice";
import { computed, effect, inject } from "@angular/core";
import { addAnswer, resetQuiz } from "./quiz.updaters";
import { getCorrectCount } from "./quiz.helpers";

export const QuizStore = signalStore(
    { 
        providedIn: 'root',
    }, 
    withState(initialQuizSlice), 
    withComputed((store) => {
        const currentQuestionIndex = computed(() => store.answers().length);
        const isDone = computed(() => store.answers().length === store.questions().length);
        const currentQuestion = computed(() => store.questions()[currentQuestionIndex()]);
        const questionsCount = computed(() => store.questions().length);
        const correctCount = computed(() => getCorrectCount(store.answers(), store.questions()));
        


        return {
            currentQuestionIndex,
            isDone, 
            currentQuestion, 
            questionsCount, 
            correctCount, 
        }
    }), 
    withMethods(store => ({
        addAnswer: (index: number) => patchState(store, addAnswer(index)),
        reset: () => patchState(store, resetQuiz())
    })), 
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
    }))
);


