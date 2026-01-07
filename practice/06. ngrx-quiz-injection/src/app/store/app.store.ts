import { withState, signalStore, patchState, withHooks, withMethods,  } from "@ngrx/signals";
import { initialAppSlice } from "./app.slice";
import { DICTIONARIES_TOKEN } from "../tokens/dictionaries.token";
import { inject } from "@angular/core";
import { changeLanguage } from "./app.updaters";

export const AppStore = signalStore (
   {
      providedIn: 'root',
   },
   withState(initialAppSlice),
   withMethods(store => {
      const dictionaries = inject(DICTIONARIES_TOKEN);
      const languages = Object.keys(dictionaries);

      return {
            changeLanguage: () => {
               console.log('Changing language...');
             return  patchState(store, changeLanguage(languages))
            }
      }
   }),
   withHooks(store => ({
      onInit: () => {
         const dictionaries = inject(DICTIONARIES_TOKEN);
         const languages = Object.keys(dictionaries);
         patchState(store, {
            possibleLanguages: languages,
            selectedLanguage: languages[0]
         })
      }
   })),

)

