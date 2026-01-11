import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialBookPresenterSlice } from './book-presenter.slice';
import { computed } from '@angular/core';
import { BOOKS_COLLECTION } from '../../../data/books-collection';
import { signalMethod } from '@ngrx/signals';
export const BookPresenterStore = signalStore(
    withState(initialBookPresenterSlice), 
    withComputed(store => ({
        book: computed(() => BOOKS_COLLECTION[store.id()])
    })), 
    withMethods(store => ({
        setBookId:  signalMethod<number>(id => {
            patchState(store, {id});
        })
    }))
)