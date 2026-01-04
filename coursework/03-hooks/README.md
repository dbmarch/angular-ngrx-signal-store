# Try it yourself - Adding methods and quiz-done
In this exercise we will repeat what I did in the **Colors Quiz** project, and add methods and updaters.
We will also add a little more functionality

Please repeat the following steps: 

## Repeat the steps:
1. Add updaters.
    - Create the file `quiz.updaters.ts`
    - Add 2 updaters: `addAnswer` and `reset`
2. Create store methods
    - Add the `withMethods` feature
    - Define the two methods: `addAnswer`, `reset`
    - Don't forget to use the updaters inside the `patchState` utility function
3. Connect the UI to the method
    - In the question presenter component, call the `addAnswer` method and pass `$index` as parameter

## Adding more functionality
3. The toolbar now contains a "Reset" button, you can find it in the file `app.component.html`
    - Implement the button by calling the reset method in the store

4. Supporting "quiz done"
   - In the store, add the following computed signals:
      - `isDone`: a boolean that tells if the quiz is completed (there are answers to all questions)
      - `correctCount`: The number of correct answers. (Hint, to keep the code clean, add a pure helper function that receives the list of questions and answers and returns the number of correct answers)
   - In `app.component.html` and a proper `@if` block so that when the quiz is not done, it presents the `app-progress` and `app-question-presenter` and when the quiz is done it presents `app-done` instead
   - In the `done.component.ts` file, inject the store and make sure the two signals are received from the store.


