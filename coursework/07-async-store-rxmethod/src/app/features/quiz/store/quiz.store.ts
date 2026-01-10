import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { initialQuizSlice, QuizSlice } from "./quiz.slice";
import { computed, effect, inject } from "@angular/core";
import { addAnswer, resetQuiz } from "./quiz.updaters";
import { getCorrectCount } from "./quiz.helpers";
import { translate, translateToPairs } from "../../../store/app.helpers";
import { QUESTION_CAPTION } from "../../../data/dictionaries";
import { AppStore } from "../../../store/app.store";

export const QuizStore = signalStore(
    withState(initialQuizSlice), 
    withComputed((store) => {
        const appStore = inject(AppStore);
        const dictionary = appStore.selectedDictionary;

        const currentQuestionIndex = computed(() => store.answers().length);
        const isDone = computed(() => store.answers().length === store.questions().length);
        const currentQuestion = computed(() => store.questions()[currentQuestionIndex()]);
        const questionsCount = computed(() => store.questions().length);
        const correctCount = computed(() => getCorrectCount(store.answers(), store.questions()));
        const title = computed(() => translate(QUESTION_CAPTION, dictionary()));
        const captionColors = computed(() => translateToPairs(currentQuestion().caption, dictionary()));
        const answerColors = computed(() => translateToPairs(currentQuestion().answers, dictionary()));

        return {
            currentQuestionIndex,
            isDone, 
            currentQuestion, 
            questionsCount, 
            correctCount, 
            title,
            captionColors,
            answerColors
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


