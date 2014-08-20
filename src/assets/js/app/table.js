// iit.table
// table.js
// This sets up the table 

var iit = iit || {};

iit.table = (function() {

  // module defines properties to be exported
  var module = {
    el: '#gdp-table',
    template: '#gdp-table-template' //ractive template location
  };

  // on data load, signal ractive to update mustache
  var data_load = function() {
    module.ractive.set('countries', iit.data.countries);
  };

  // function to format table into n columns
  var into_columns = function(data_array, n) {
    // set up the appropriate column size for n columns
    // for example 10 elements into 4 columns will yield a 
    // column size of 3
    // 3 + 3 + 3 + 1 = 10
    var col_size = Math.ceil(data_array.length/n);

    // groups countries in n columns of maximum col_size
    return _.chain(data_array).groupBy(function(a, b) {
      return Math.floor(b % col_size);
    }).values().value();
  };

  var init = function() {
    // set up ractive model with loaded data
    module.ractive = new Ractive({
      el: module.el,
      template: module.template,
      data: {
        'countries': [],
        'format_gdp': iit.data.format_gdp,
        'into_columns': into_columns,
        'n_cols': 4
      }
    });

    // on data loaded, signal to update ractive model
    $(document).on('load.countries', function() {
      data_load();
    });

  };

  // init module
  init();
  return module;
})();