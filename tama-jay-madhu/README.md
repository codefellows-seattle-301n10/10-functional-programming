# Lab 10

**Authors**: Tama Rushin, Jay Silvas, Mahdu Rebbana
**Version**: 1.0.0

## Overview
Create an Admin page that easily allows the user to view the stats of the blog page. Utilizes a template (using Handlebars .compile()method) that sets up rows of the author stats section. Invoke a specific callback (to access the Article.all data) after all the articles are loaded using Article.fetchall() method. Utilizes the IIFE'S so that the function calls are executed on page load. Uses map, filter and reduce chaining to transform each author srring into and object with properties for the author's name as well as the total number of words across all articles written by the specific author.

## Getting Started
Clone down repo. Install express and pg. Install nodemon (if needed) Run app using nodemon.


## Architecture
Languages: HTML5, CSS3, Javascript
Libraries: jquery
Pacakages: node, express, pg
Technologies: Mac OS, Git, GitHub
Database system: PostgreSQL


## Change Log
### 04-11-18
1. First, we set up the scaffold of our project
2. Then, we added a handlebar template
3. We updated index.html and admin.html to access our Article.all data
4. We updated Article.numWordsAll to Calculate all words.
We updated Article.allAuthors to Calculate total authors.
We updated Article.numWordsByAuthor to calculate total words for each author
5. Used nodemon.js to see our blog in the browser and confirm it was loading stats.
## Credits and Collaborations
Tama, Jay and Madhu, MDN, Code Fellows 301n10 instructional team and TA