// Replace with your own values
const searchClient = algoliasearch(
  'RQEAPZW16J',
  'a6ae5607838ce25ebffe2477fb2b73bd' // search only API key, not admin API key
);

const search = instantsearch({
  indexName: 'repair_list',
  searchClient,
  routing: false,
});

var results =
    '<div class="card">'+
    '<div class="card-body">'+
      '<div class="row">'+
        '<div class="col-md-2 mb-3">'+
               '<img src="{{img_link}}" width="100" height="100">'+
        '</div>'+
        '<div class="col-md-3 mb-3">'+
              '<h3 class="smaller-title mb-2 pb-1" style="font-size:1.4em;">{{title}} </h3>' +
        '</div>'+
        '<div class="col-md-5">'+
                    '<p class="smaller-description">Stad: {{city}} </p>' +  
                    '<p class="smaller-description">Stadsdel: {{city_part}} </p>' +  
                    '<p class="smaller-description">Tel nr: {{Telefonnummer}} </p>' +   
                    
        '</div>'+
        '<div class="col-md-2">'+
               '<button type="button" class="mt-auto btn btn-primary btn-md"> <a style="color:white !important;text-decoration:none;" href="{{title_link}}"> Besök </a> </button>'+
        '</div>'+
          '</div>'+
      '</div>'+
  '</div>'+
  '<br>'
;



search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 5,
  })
]);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Vad söker du efter?',
  })
]);

search.addWidgets([
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: results,
      empty: `Vi hittade inget på sökningen: <strong>"{{query}}"</strong>`,
    },
  })
]);


search.start();