import { Question } from '../models/question.model';


export const checkAnswers = (questions: Question[], answers: number[]) => {
    let correct=0;
    
    answers.forEach((answer, index) => 
        correct += questions[index].correctIndex === answer ? 1 : 0);
    console.log('correct', correct);
    return correct;
}