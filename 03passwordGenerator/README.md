#Project 3 of my learning React from scratch
It's a small project though it thought me a lot about 3 things


1. useCallback - Such a usefull hook that helps you to eache a function defination between re-renders. Here in this project I use it to passwordGenarator function that helps me to create a random functin and when ever we change any of those dependencies value useCallback function help us to call the function again and again.

2. useEffect -  This Hooks lets us synchronize a component with an external system. I use useEffect to re-render our component every time our passwordGenerator function is called and we should update the DOM so we use useEffect hook for that purpose

3. useRef - This hook lets us reference a value that’s not needed for rendering. In this project I use as a referance of the password and store it in passwordRef then I use it to copy our password and store it in clipboard