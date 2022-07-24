/* global instantsearch algoliasearch */

app({
  appId: 'BLHYRRTEVV',
  apiKey: '7aa12bdafd772595b8f2136a22d8b1d6',
  indexName: 'stories-prod',
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
      placeholder: 'Search for stories',
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results'),
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
    instantsearch.widgets.refinementList({
      container: '#type',
      attribute: 'attribute',
      operator: 'and',
      templates: {
        header: getHeader('attribute'),
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