import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { initialAppSlice } from "./app.slice";
import { inject } from "@angular/core";
import { changeLanguage, resetLanguages } from "./app.updaters";
import { setBusy } from "./app.updaters";
import { DictionariesService } from "../services/dictionaries.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tap, delay } from "rxjs/operators";

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
        const _invalidateDictionary = rxMethod<string>(input$ => input$.pipe(
            tap(lang => {
                console.log('invalidate dictionary for', lang);
                patchState(store, setBusy(true));
            }),
            delay(1000),
            tap(lang=> {
                console.log('dictionary loaded for', lang);
                patchState(store, setBusy(false));
            })
        ))

        return {
            _resetLanguages: () => {
                patchState(store, resetLanguages(store._languages)),
                _invalidateDictionary(store.selectedLanguage());
            },
            changeLanguage: () => {
                patchState(store, changeLanguage(store._languages));
                _invalidateDictionary(store.selectedLanguage());
            }
        }
    }),
    withHooks(store => ({
        onInit: () => {
            store._resetLanguages();
        }
    }))
)