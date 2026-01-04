# Try it yourself - Creating a signal store
In this exercise we will repeat what I did in the **Colors Quiz** project, and add a signal store.

Please repeat the following steps: 

1. Create a `/store` folder and in it a `quiz.slice.ts` file
   - Define an interface with the correct **Core State**
   - Define a constant with the initial value of the sate
2. Create a `quiz.store.ts` file
   - Define a constant, and call the `signalStore` function
   - Use the `withState` function to add a state feature with the slice you have defined
   - Add configuration so that the store is provided in root
3. Consume the store into the app component
    - Inject the store using the `inject` function
    - Display the questions in the template