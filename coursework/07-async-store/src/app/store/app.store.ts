import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { initialAppSlice } from "./app.slice";
import { computed, inject } from "@angular/core";
import { DICTIONARIES_TOKEN } from "../tokens/dictionaries.token";
import { changeLanguage, resetLanguages } from "./app.updaters";
import { getDictionary } from "./app.helpers";

export const AppStore = signalStore(
    { providedIn: 'root' }, 
    withState(initialAppSlice), 
    withProps(_ => {
        const _dictionaries = inject(DICTIONARIES_TOKEN);
        const _languages = Object.keys(_dictionaries);

        return {
            _dictionaries, _languages
        }
    }),
    withComputed((store) => ({
        selectedDictionary: computed(() => 
            getDictionary(store.selectedLanguage(), store._dictionaries)), 
    })),
    withMethods(store => ({
            changeLanguage: () => patchState(store, changeLanguage(store._languages)), 
            _resetLanguages: () => patchState(store, resetLanguages(store._languages))
        }
    )),
    withHooks(store => ({
        onInit: () => {
            store._resetLanguages();
        }
    }))
)