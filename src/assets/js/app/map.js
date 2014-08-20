// iit.map
// map.js
// This sets up the map visualisation
var iit = iit || {};

iit.map = (function() {

  var module, settings;

  // basic settings
  settings = {
    el: '#gdp-map',
  };

  // module defines properties to be exported
  module = {
    settings: settings,
    data: []
  };

  // data_load gets called when iit.data finishes loading data.
  var data_load = function() {
    module.data = iit.data.countries;
  };

  // update_tooltip puts the relevant country info in the tooltip
  // gets called on click events
  module.update_tooltip = function(geo) {

    var d = module.map.options.data[geo.id],  // lookup datum for country
      position = d3.mouse(module.map.options.element); // position from  mouse

    module.tooltip
      .style("top", (position[1] - 10) + "px")
      .style("left", (position[0] + 10) + "px")
      .html(['<h3>' + d.name + '</h3>',
        '<span>GDP: ' + iit.data.format_gdp(d.gdp) + '</span>'
      ].join(''));

  };

  var setup_map = function() {

    // basic world map setup
    module.map = new Datamap({
      element: $(settings.el).get()[0],
      scope: 'world',
      fills: {
        defaultFill: '#989898'
      },
      // indexes the countries array by the code (e.g. USA) property
      // this plugs into the datamap geography data, giving it access to 
      // the loaded gdp data for each country
      data: _.indexBy(module.data, 'code'), 
      geographyConfig: {
        highlightOnHover: true,
        popupOnHover: false
      },
      done: function(datamap) {
        // sets up emtpy tooltip element
        module.tooltip = d3.select(module.settings.el)
          .append("div")
          .classed('tooltip', true);

        // update tooltip on click event for each country
        datamap.svg.selectAll('.datamaps-subunit').on('click', function (geo) {
          module.update_tooltip(geo);
        });
      }
    });


    // draws country labels
    module.map.labels({
      labelColor: '#333333',
      fontSize: 10
    });

  };

  var init = function() {
    // on data load, save data reference, and setup map
    $(document).on('load.countries', function() {
      data_load();
      setup_map();
    });

  };

  // module init
  init();
  return module;
})();