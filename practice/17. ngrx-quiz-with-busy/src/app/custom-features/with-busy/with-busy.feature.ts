import { computed } from "@angular/core";
import { BusySlice, initialBusySlice } from "./with-busy.slice";
import { signalStoreFeature, SignalStoreFeature } from "@ngrx/signals";
import { withState, withComputed } from "@ngrx/signals";

export function withBusy(): SignalStoreFeature<{
   state: {},
   props: {},
   methods: {}
}, {
   state: BusySlice,
   props: {
      isIdle: boolean;
   },
   methods: {}
}>;

export function withBusy() : SignalStoreFeature {
   return signalStoreFeature(
      withState(initialBusySlice),
      withComputed(store => ({ 
            isIdle: computed(() => !store.isBusy),
         }))
   );
}