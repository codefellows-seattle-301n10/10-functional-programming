'use strict';
var app = app || {};
//either set it to app or setting app to initial state which is an empty object
//constructing app obj in order for it to pass module, attach stuff to it IFFE runs and app is passed in, app and module are the same thing just a different label

(function (module) {

  // let articleView = {};
  function Article(rawDataObj) {
  // REVIEW: In Lab 8, we explored a lot of new functionality going on here. Let's re-examine the concept of context. Normally, "this" inside of a constructor function refers to the newly instantiated object. However, in the function we're passing to forEach, "this" would normally refer to "undefined" in strict mode. As a result, we had to pass a second argument to forEach to make sure our "this" was still referring to our instantiated object. One of the primary purposes of lexical arrow functions, besides cleaning up syntax to use fewer lines of code, is to also preserve context. That means that when you declare a function using lexical arrows, "this" inside the function will still be the same "this" as it was outside the function. As a result, we no longer have to pass in the optional "this" argument to forEach!
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Article.loadAll = articleData => {
    articleData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

    // /* OLD forEach():
    // articleData.forEach(articleObject => Article.all.push(new Article(articleObject)));
    // */

    Article.all = articleData.map(articleObject => new Article(articleObject));
    //we are going to set you to running a map on articleData. the transformation is we pass in article obj as the current item, each item in the article data array is article obj. Map is already pushing on to the new array.
  };

  //this is trying to call where Article.fetchAll is being called, bottom of index
  Article.fetchAll = callback => {
    $.get('/articles')
      .then(results => {
        Article.loadAll(results);
        callback();
      })
  };

  //rough count of all the words in all the articles
  Article.numWordsAll = () => {
    return Article.all
      .map(art => art.body.split(' ').length)
      .reduce((sum, num) => sum + num)
  };

  Article.allAuthors = () => {
    return Article.all
      .map(art => art.author)
      .reduce((uniqueNames, author) => {
        if(!uniqueNames.includes(author)) {
          uniqueNames.push(author);
        }
        return uniqueNames;
      }, []);
  };

  //to get num words just for a given author
  Article.numWordsByAuthor = () => {
    return Article.allAuthors().map(author => {
      //{ author: "Jane Doe", totalWords: 456}
      return {
        author,
        //object where key is same to valriable just write author instead of author : author
        totalWords : Article.app
          .filter(article => article.author === author)
          .map(art => art.body.split(' ').length)
          .reduce((sum, num) => sum + num)
      }
    })
  };

  Article.truncateTable = callback => {
    $.ajax({
      url: '/articles',
      method: 'DELETE',
    })
      .then(console.log)
    // REVIEW: Check out this clean syntax for just passing 'assumed' data into a named function! The reason we can do this has to do with the way Promise.prototype.then() works. It's a little outside the scope of 301 material, but feel free to research!
      .then(callback);
  };

  Article.prototype.insertRecord = function(callback) {
  // REVIEW: Why can't we use an arrow function here for .insertRecord()?
    $.post('/articles', {author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title})
      .then(console.log)
      .then(callback);
  };

  Article.prototype.deleteRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'DELETE'
    })
      .then(console.log)
      .then(callback);
  };

  Article.prototype.updateRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'PUT',
      data: {
        author: this.author,
        authorUrl: this.authorUrl,
        body: this.body,
        category: this.category,
        publishedOn: this.publishedOn,
        title: this.title,
        author_id: this.author_id
      }
    })
      .then(console.log)
      .then(callback);
  };
  //exporting means attach whatever you want to be accesible outside the function and in this case its the article constructor function. this pattern is called the module pattern, because of the way JS does scope. Article constructor and functions attached to it is available to the public.
  module.Article = Article ;
})(app)