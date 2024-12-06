# Guide for the game
## Goal
Join for an adventure to help the little furball see the aurora!

## Controls
### Menu
* **Spacebar:** Start the game
* **G:** Guide for the game
### Game
* **Spacebar:** Jump _(press twice for double jump)_
* **Left Right Arrows:** Moving 
* **R:** Restart the game
* **Esc:** Go back to the menu
### Game Over
* **R:** Restart the game
* **Esc:** Go back to the menu

# References
## Tools
* **JSDoc:** [JSDoc](https://jsdoc.app/)
  * Used for documenting the code, to make it easier to understand for you and me
* **Switch Case:** [W3Schools - JavaScript Switch Statement](https://www.w3schools.com/js/js_switch.asp)
  * Used for key press handling, so that it isn't full of `if` statements
* **Arrow Function:** [W3Schools - JavaScript Arrow Functions](https://www.w3schools.com/js/js_arrow_function.asp)
  * `() => {}`, used in function parameters, so that I don't have to write the bulky `function` (looks much cleaner tbh)
* **Ternary Operators:** [W3Schools - JavaScript Comparison and Logical Operators](https://www.w3schools.com/js/js_comparisons.asp)
  * `condition ? true : false`, I just didn't want to use bulky `if` statements, if I can write them in one line
  * Used for determining if we want to reverse the scaling for the canvas and determining the direction of the friction
* **Class Static:** [W3Schools - JavaScript Static Methods](https://www.w3schools.com/js/js_class_static.asp)
  * To be able to use the class methods without having to create an object of the class
* **Default Parameter Values**: [W3Schools - JavaScript Function Parameters](https://www.w3schools.com/js/js_function_parameters.asp)
  * `parameter = value`, it seems easier in I only have to specify the parameters that are only used in special occasions
* **Map:** [MDN - JavaScript Map Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
  * Used for storing the screens and levels, so that I can use any string as keys, so that I don't have to find shortcuts for referencing them
* **Promise:** [W3Schools - JavaScript Promises](https://www.w3schools.com/js/js_promise.asp)
  * Canvas size calculation, to be able to use multiple return values in different places, without having to declare a new variable and call the function again
### p5.js
* **Load Image:** [p5.js - loadImage](https://p5js.org/reference/p5/loadImage)
* **Image:** [p5.js - Image](https://p5js.org/reference/p5/image)
* **Constrain:** [p5.js - constrain](https://p5js.org/reference/p5/constrain)
## Code
### AI
* **GitHub Copilot Autocompletion:** Used for obvious, smaller completions (e.g. specifying the element objects, key presses)
* **Citation 1:** [ChatGPT - Scale Canvas](https://chatgpt.com/share/6751bd73-509c-8000-9796-315ce017e062)
* **Citation 2:** [ChatGPT - Camera Simulation](https://chatgpt.com/share/6751bc6e-16cc-8000-9eb3-b6eab3772748)
## Help
* **Kajsa Granström:** [GitHub - moakajsa](https://github.com/moakajsa)
* **Bence Tuzson:** [GitHub - Bence Tuzson](https://github.com/bencetuzson)

![Lutyuly](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTJ4bzB6YWQ1eTV1dDB5NXZhemhrNnVxZDVuZ3kzMzU5aDhqOGpudCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Dh5q0sShxgp13DwrvG/giphy.gif)
