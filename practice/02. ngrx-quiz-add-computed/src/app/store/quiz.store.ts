import { signalStore, withComputed, withState } from "@ngrx/signals";
import { initialQuizSlice } from "./quiz.slice";
import { computed } from "@angular/core";

export const QuizStore = signalStore(
    { providedIn: 'root'}, 
    withState(initialQuizSlice),
    withComputed((store) => {
        const currentQuestionIndex = computed(() => store.answers().length);
        const isDone = computed(() => currentQuestionIndex() === questionCount());
        const currentQuestion = computed(() => store.questions()[currentQuestionIndex()]);
        const questionCount = computed(() => store.questions().length);

        return {
            currentQuestionIndex,
            isDone,
            currentQuestion,
            questionCount
        };
    })
);


