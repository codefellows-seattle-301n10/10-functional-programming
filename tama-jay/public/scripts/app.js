'use strict';

function adminToHtml() {
  const template = $('#admin-template').text();
  const render = Handlebars.compile(template);

  $.getJSON('/admin').then(stats => {
    stats.forEach(stat => {
      $('li').append(render(stat));
    });
  });

  return template(this);
}

adminToHtml();