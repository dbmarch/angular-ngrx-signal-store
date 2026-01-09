import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { initialAppSlice } from "./app.slice";
import { inject } from "@angular/core";
import { changeLanguage, resetLanguages } from "./app.updaters";
import { setBusy, setDictionary } from "./app.updaters";
import { DictionariesService } from "../services/dictionaries.service";
import { firstValueFrom } from "rxjs";

export const AppStore = signalStore(
    { providedIn: 'root' }, 
    withState(initialAppSlice), 
    withProps(_ => {
        const _dictionaries = inject(DictionariesService);
        const _languages = _dictionaries.languages;

        return {
            _dictionaries, _languages
        }
    }),
    withMethods(store => {
        const _invalidateDictionary = async () => {
                patchState(store, setBusy(true));
                const dictionary = await firstValueFrom(
                    store._dictionaries.getDictionaryWithDelay(store.selectedLanguage()));
                patchState(store, setBusy(false), setDictionary(dictionary));
                };

        return {
            _resetLanguages: async () => {
                patchState(store, resetLanguages(store._languages)),
                await _invalidateDictionary();
            },
            changeLanguage: async () => {
                patchState(store, changeLanguage(store._languages));
                await _invalidateDictionary();
            }
        }
    }),
    withHooks(store => ({
        onInit: () => {
            store._resetLanguages();
        }
    }))
)