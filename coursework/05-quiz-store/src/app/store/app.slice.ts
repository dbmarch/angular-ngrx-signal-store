

export interface AppSlice {
   readonly selectedlanguage: string;
   readonly possibleLanguages: string[];
}

export const initialAppSlice: AppSlice ={
   selectedlanguage: '',
   possibleLanguages: []
}