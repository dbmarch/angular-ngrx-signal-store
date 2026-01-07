import { DICTIONARIES } from "../data/dictionaries";

export function changeLanguage(languages: string[]) {
   return (state: any) => {
      const currentIndex = languages.indexOf(state.selectedLanguage);
      const nextIndex = (currentIndex + 1) % languages.length;
      const nextLanguage = languages[nextIndex];
      console.log(`Language changed to: ${nextLanguage}`);
      return {
         ...state,
         selectedLanguage: nextLanguage,
         selectedDictionary: DICTIONARIES[nextLanguage]
      }
   }
}
