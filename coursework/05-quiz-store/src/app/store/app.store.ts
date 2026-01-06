import { initialAppSlice } from "./app.slice";
import { withState, signalStore } from "@ngrx/signals";

export const AppStore = signalStore(
   { providedIn: 'root'},
   withState(initialAppSlice),
)