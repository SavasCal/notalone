/* global instantsearch algoliasearch $script */

$script(
  'https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyATQMie45x7xGTkOj-k1Xjcj9nwfFKDmCc',
  function() {
    var search = instantsearch({
      searchClient: algoliasearch(
        'latency',
        'a6ae5607838ce25ebffe2477fb2b73bd'
      ),
      indexName: 'repair_list',
      routing: true,
    });

    search.addWidgets([
      instantsearch.widgets.configure({
        aroundLatLngViaIP: true,
        hitsPerPage: 12,
      }),

      instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Vad söker du efter?',
        showSubmit: false,
        cssClasses: {
          input: 'form-control',
        },
      }),

      instantsearch.widgets.stats({
        container: '#stats',
      }),

      instantsearch.widgets.hits({
        container: '#hits',
        templates: {
          item:
            '<div class="hit col-sm-3">' +
            '<div class="pictures-wrapper">' +
            '<img class="picture" src="{{picture_url}}" />' +
            '<img class="profile" src="{{user.user.thumbnail_url}}" />' +
            '</div>' +
            '<div class="infos">' +
            '<h4 class="media-heading">{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h4>' +
            '<p>' +
            '{{#helpers.highlight}}{ "attribute": "city" }{{/helpers.highlight}},' +
            '{{#helpers.highlight}}{ "attribute": "country" }{{/helpers.highlight}}' +
            '</p>' +
            '</div>' +
            '</div>',
          empty:
            '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>',
        },
      }),

      instantsearch.widgets.pagination({
        container: '#pagination',
        scrollTo: '#results',
        cssClasses: {
          list: 'pagination',
          selectedItem: 'active',
        },
      }),

      instantsearch.widgets.refinementList({
        container: '#room_types',
        attribute: 'room_type',
        sortBy: ['name:asc'],
        cssClasses: {
          item: ['col-sm-3'],
        },
      }),

      instantsearch.widgets.rangeSlider({
        container: '#price',
        attribute: 'price',
        pips: false,
        tooltips: {
          format: function(rawValue) {
            return '$' + parseInt(rawValue);
          },
        },
      }),

      instantsearch.widgets.geoSearch({
        container: '#map',
        googleReference: window.google,
        enableRefineControl: false,
        builtInMarker: {
          createOption: function(hit) {
            return {
              title: hit.description,
            };
          },
        },
      }),
    ]);

    search.start();
  }
);