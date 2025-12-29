import {signalStore, withState} from "@ngrx/signals";
import { initialQuizSlice } from "./quiz.slice";

export const QuizStore = signalStore(
   { providedIn: 'root'},     // no need to add providers in app.config  or any component.
   withState(initialQuizSlice)
)

