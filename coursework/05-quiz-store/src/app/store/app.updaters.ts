import { PartialStateUpdater } from "@ngrx/signals";
import { AppSlice } from "./app.slice";

export function changeLanguage(languages: string[]): PartialStateUpdater<AppSlice> {
   return state => {
      const index = languages.indexOf(state.selectedlanguage) ?? -1;
      const nextIndex = (index+1) % languages.length;
      const selectedlanguage = languages[nextIndex];
      return { selectedlanguage};
   } 
}

export function resetLanguages(languages: string[]): PartialStateUpdater<AppSlice> {
   return _ => ({
      possibleLanguages: languages,
      selectedlanguage: languages[0]
   });
}