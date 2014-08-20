// iit.data
// data.js
// This module loads the data via xhr
// it also contains parsing functions,
// and any necesary data cleansing procedure

var iit = iit || {};

iit.data = (function() {

  // module defines properties to be exported
  var module = {
    countries: []
  };
  // format gdp formats numbers into a human readable format
  // it takes numbers in millions
  module.format_gdp = function(num) {
    if (num > 1000000) return (num / 1000000).toFixed(2) + ' T'; // trillions
    if (num > 1000) return (num / 1000).toFixed(2) + ' B'; // billions
    if (num < 0) return 'NA'; // not available data
    if (num === 0) return ''; // empty elements
    return num + ' M'; // millions
  };

  var parse_gdp = function(gdp_string) {
    // Parse gdp strings into values

    if (gdp_string == '..') {
      // data not available markes with two dots, return -1
      return -1;
    }
    // replace comma thousand separators and turn into integers
    return +gdp_string.replace(/,/g, '');
  };

  var load_countries = function() {
    d3.csv("data/GDP.csv", function(d) {
      return {
        code: d.code,
        rank: +d.rank, // convert "rank" column to number
        name: d.name,
        gdp: parse_gdp(d.gdp), // parse gdp numbers
        caveats: d.caveats // collect any caveats
      };
    }, function(error, rows) {
      module.countries = rows;
      // trigger applicatoin that data is ready
      $(document).trigger('load.countries');
    });
  };

  var init = function() {
    load_countries();
  };

  // init module
  init();
  return module;
})();