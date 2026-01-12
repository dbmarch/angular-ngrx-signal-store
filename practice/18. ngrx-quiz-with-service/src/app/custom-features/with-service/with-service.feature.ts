import { PartialStateUpdater, patchState, Prettify, signalStoreFeature, SignalStoreFeature, withMethods, type} from '@ngrx/signals';
import { Observable } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, tap } from 'rxjs/operators';
import { setBusy, setIdle } from '../with-busy/with-busy.updaters';
import { BusySlice } from '../with-busy/with-busy.slice';
import { tapResponse } from '@ngrx/operators';
import { Signal } from '@angular/core';

type Update <S extends object> = Partial<Prettify<S>> | PartialStateUpdater<Prettify<S>>;

export function withService<T,S extends object>(
   loader: () => Observable<T>, 
   updater: (data: T) => Update<S> ): SignalStoreFeature<
   {
      state: S & BusySlice;
      props: {},
      methods: {}
   }, {
      state: {},
      props: {},
      methods: {
         _load: () => void
      }
   }>

export function withService<T,S extends object>(
   loader: () => Observable<T>, 
   updater: (data: T) => Update<S> ) {
   return signalStoreFeature(
      {state: type<S & BusySlice>()},
      withMethods(store => {
         const source$ = loader();
         return {
            _load: rxMethod<void>(trigger$ => trigger$.pipe(
               tap(_ => patchState(store, setBusy() as any)),
               exhaustMap(_ => source$.pipe(
                  tapResponse({
                     next: value => patchState(store, updater(value)),
                     error: err => console.error('Error in withService loader', err),
                     finalize: () => patchState(store, setIdle() as any)
                  })
               )
            )),
         )};
      }),
   );
}
                        
          