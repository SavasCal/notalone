/* global instantsearch algoliasearch */

app({
  appId: 'RQEAPZW16J',
  apiKey: 'a6ae5607838ce25ebffe2477fb2b73bd',
  indexName: 'repair_list',
});

function app(opts) {
  const search = instantsearch({
    searchClient: algoliasearch(opts.appId, opts.apiKey),
    indexName: opts.indexName,
    routing: true,
    searchFunction: opts.searchFunction,
  });

  search.addWidgets([

    instantsearch.widgets.configure({
        aroundLatLngViaIP: false,
        hitsPerPage: 5,
    }),

    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Search for a story',
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results'),
      },
    }),
    instantsearch.widgets.refinementList({
      container: '#category',
      attribute: 'city_part',
      operator: 'or',
      templates: {
        header: getHeader('city_part'),
      },
    }),
    instantsearch.widgets.refinementList({
      container: '#brand',
      attribute: 'brand',
      operator: 'or',
      searchForFacetValues: {
        placeholder: 'Search for brands',
        templates: {
          noResults: '<div class="sffv_no-results">No matching brands.</div>',
        },
      },
      templates: {
        header: getHeader('Brand'),
      },
    }),
    //instantsearch.widgets.rangeSlider({
    //  container: '#price',
    //  attribute: 'price',
    //  templates: {
    //    header: getHeader('Price'),
    //  },
    //}),
    instantsearch.widgets.refinementList({
      container: '#type',
      attribute: 'type',
      operator: 'and',
      templates: {
        header: getHeader('Type'),
      },
    }),
  ]);

  search.start();
}

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
  return `<h5>${title}</h5>`;
}