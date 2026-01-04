import { Injectable } from "@angular/core";
import { Observable, delay, map, of } from "rxjs";
import { Question } from "../models/question.model";
import { randomColorQuiz } from "./helpers";

@Injectable({providedIn: 'root'})
export class ColorQuizGeneratorService {
    createRandomQuiz(): Observable<Question[]> {
        return of(1).pipe(
            map(_ => randomColorQuiz()), 
            delay(2000)
        );        
    }    
}