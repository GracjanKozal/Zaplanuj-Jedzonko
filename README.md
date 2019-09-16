Together with my colegues from Bootcamp in CodersLab we created this Web app. when you can create recipes for food as well as the plans for each week. We worked in Scrum methodology. The time of the sprint was 2 weeks. The section regarding the food plans is not finished. There are as well small bugs. In this project we used only ES5. I was responsible for all JavaScript code. We used Sass to style the entire app. The username and the recipes are stored in localstorage

http://zaplanujjedzonko.cba.pl/


# ScrumLab
This is a repository dedicated to ScrumLab front-end project.

## How to start
To start development follow this instruction:

* `clone` this repo
* `npm install` all necessary npm packages


## Gulp usage
Avaliable commends for you to type in console:

`gulp` or `gulp serve`  - this will run gulp in browserSync mode, that means gulp will start serwer on your `localhost` and refresh it for you everytime you change `scss`, `js` or `html` file. Using this command will do all the work for you :)

`gulp watch` - runs gulp in watch mode, that will compiles your `main.scss` into `css/main.css`

`gulp sass` - compiles sass into CSS & auto-inject into browsers


## Folder Structure
```
| - development/
	| - css/      
	| - fonts/
	| - images/  
	| - js/
	| - scss/
	| - app.html  
	| - index.html  
	| - recipes.html    
	| - schedules.html
| - distribution/
| - package.json
| - gulpfile.js
```

***where:***
`distribution` - is used to contain optimized files for the production site.
`development`  - is used to contain source code.
