import { patchState, signalStore, withComputed, withState, withMethods} from "@ngrx/signals";
import { initialQuizSlice } from "./quiz.slice";
import { computed } from "@angular/core";
import { addAnswer, resetQuiz} from "./quiz.updaters";

export const QuizStore = signalStore(
    { 
        providedIn: 'root',
        // protectedState: true    // default.  false lets you write the store externally
    }, 
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
    }),
    withMethods(store => ({
        addAnswer: (index: number) => patchState(store, addAnswer(index)),
        reset: () => patchState(store, resetQuiz())
        })
    ) 
);


