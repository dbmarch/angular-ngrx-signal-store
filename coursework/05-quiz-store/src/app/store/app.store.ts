import { computed, inject } from "@angular/core";
import { DICTIONARIES_TOKEN } from "../tokens/dictionaries.token";
import { initialAppSlice } from "./app.slice";
import { withState, signalStore, patchState, withHooks, withMethods, withComputed, withProps} from "@ngrx/signals";
import { changeLanguage, resetLanguages } from "./app.updaters";
import { getDictionary } from "./app.helpers";

export const AppStore = signalStore(
   { providedIn: 'root'},
   withState(initialAppSlice),
   withProps(_ => {
      // allows store variables to be created with injected dependencies
      const _dictionaries = inject(DICTIONARIES_TOKEN);
      const _languages = Object.keys(_dictionaries);
      return {
         _dictionaries, _languages
      }
   }),
   // Alternative way to inject dependencies
   // withComputed((store, dictionairies = inject(DICTIONARIES_TOKEN)) => {
   withComputed(store => ({
         selectedDictionary: computed(()=> {
            return getDictionary(store.selectedlanguage(), store._dictionaries);
         })
      }
   )),
   withMethods(store => ({
            changeLanguage: () => patchState(store, changeLanguage(store._languages)),
            // private functions have leading _
            _resetLanguages: () => patchState(store, resetLanguages(store._languages))
   })),
   withHooks(store => ({
      onInit: () => {
         store._resetLanguages();
      }
   })),
);