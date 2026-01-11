import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { initialAppSlice } from "./app.slice";
import { inject } from "@angular/core";
import { changeLanguage, resetLanguages } from "./app.updaters";
import { setBusy } from "./app.updaters";
import { DictionariesService } from "../services/dictionaries.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tap } from "rxjs/operators";
import { map, switchAll, switchMap } from "rxjs/operators";
import { setDictionary } from "./app.updaters";
import { NotificationsService } from "../services/notification.service";
import { ColorQuizGeneratorService } from "../services/color-quiz-generator.service";
import { tapResponse } from "@ngrx/operators";

export const AppStore = signalStore(
    { providedIn: 'root' }, 
    withState(initialAppSlice), 
    withProps(_ => {
        const _dictionariesService = inject(DictionariesService);
        const _languages = _dictionariesService.languages;
        return {
            _dictionariesService, 
            _languages,
            _quizGeneratorService: inject(ColorQuizGeneratorService),
            _notificationsService: inject(NotificationsService)
        }
    }),
    withMethods(store => {
        const _invalidateDictionary = rxMethod<string>(input$ => input$.pipe(
            tap(_ => patchState(store, setBusy(true))),
            switchMap((lang: string) => store._dictionariesService
                .getDictionaryWithDelay(lang).pipe(
                tapResponse({
                    next: dict => patchState(store, setDictionary(dict)),
                    error: err => store._notificationsService.error(`${err}`),
                    finalize: () => patchState(store, setBusy(false))
                    }
                )),
                ),
            // map((lang: string) => store._dictionariesService
            //     .getDictionaryWithDelay(lang).pipe(
            //     tapResponse({
            //         next: dict => patchState(store, setDictionary(dict)),
            //         error: err => store._notificationsService.error(`${err}`),
            //         finalize: () => patchState(store, setBusy(false))
            //         }
            //     )),
            //     ),
            // switchAll(),  // mergAll gives us all obervables, switchAll only the latest

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