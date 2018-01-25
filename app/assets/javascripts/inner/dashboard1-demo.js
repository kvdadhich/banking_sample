(function(){
  'use strict';

  var Morris = window.Morris,
  WrapkitUtils = window.WrapkitUtils;

  // sparkline
  var drawSpark = function(){
    $('#spark-posts').sparkline([166,137,187,119,129,124,179,172,138,115,149,195,167,173,152,182,190,139,108,175,170,118,113,122,183,183,120,141,190,153,122], {
      type: 'bar', barColor: '#AC92EC', barWidth: '6', height: '32' });

    $('#spark-projects').sparkline([130,153,185,178,167,113,185,128,198,109,193,176,186,117,110,158,150,111,177,169,135,143,189,148,138,180,129,130,110,193,146], {
      type: 'line', fillColor: false, lineColor: '#5D9CEC', width: '90%', height: '32' });

    $('#spark-storage').sparkline([177,155,121,174,105,105,128,159,140,103,114,106,158,146,152,161,164,106,170,137,128,141,190,153,198,181,133,152,182,190,139], {
      type: 'bar', barColor: '#4FC1E9', barWidth: '6', height: '32' });

    $('#spark-download').sparkline([781,789,750,776,768,635,737,664,610,879,894,895,613,810,886,788,707,892,680,683,898,957,979,611,715,912,860,930,841,986,722], {
      type: 'line', fillColor: false, lineColor: '#48CFAD', width: '90%', height: '32' });
  };

  // If page is not link from graph
  if($("#graph-audience").length ==0 ) return

  // Graph Audience Overview
  var graphAudience = Morris.Line({
    element: 'graph-audience',
    fillOpacity: 0.1,
    lineWidth: 2,
    data: [
      { period: '2015-09-1', pageviews: 2666, users: 1294 },
      { period: '2015-09-2', pageviews: 2778, users: 2294 },
      { period: '2015-09-3', pageviews: 4912, users: 1969 },
      { period: '2015-09-4', pageviews: 3767, users: 3597 },
      { period: '2015-09-5', pageviews: 6810, users: 1914 },
      { period: '2015-09-6', pageviews: 5670, users: 4293 },
      { period: '2015-09-7', pageviews: 4820, users: 3795 },
      { period: '2015-09-8', pageviews: 15073, users: 5967 },
      { period: '2015-09-9', pageviews: 10687, users: 4460 },
      { period: '2015-09-10', pageviews: 8432, users: 5713 }
    ],
    xkey: 'period',
    xLabelFormat: function (x) {
      var IndexToMonth = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des' ],
      month = IndexToMonth[ x.getMonth() ],
      date = x.getDate();
      return month + ' ' + date;
    },
    dateFormat: function (x) {
      x = new Date(x);
      var IndexToMonth = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des' ],
      month = IndexToMonth[ x.getMonth() ],
      date = x.getDate();
      return month + ' ' + date;
    },
    ykeys: ['pageviews', 'users'],
    labels: ['Pageviews', 'Users'],
    pointSize: 0,
    hideHover: true,
    lineColors: ['#48CFAD', '#5D9CEC'],
    grid: false,
    gridTextColor: 'rgba(22, 24, 27, 0.87)',
    resize: true // NOTE: This has a significant performance impact, so is disabled by default.
  });


  // Graph Latest Signup
  var graphLatSig = Morris.Line({
    element: 'graph-latest-signup',
    fillOpacity: 0.1,
    lineWidth: 2,
    data: [
      { period: '2015-01', right: 31, left: 40 },
      { period: '2015-02', right: 27, left: 46 },
      { period: '2015-03', right: 39, left: 40 },
      { period: '2015-04', right: 36, left: 42 },
      { period: '2015-05', right: 46, left: 41 },
      { period: '2015-06', right: 48, left: 47 },
      { period: '2015-07', right: 56, left: 61 },
      { period: '2015-08', right: 96, left: 79 },
      { period: '2015-09', right: 60, left: 65 },
      { period: '2015-10', right: 45, left: 53 }
    ],
    xkey: 'period',
    xlabel: 'day',
    xLabelFormat: function (x) {
      var IndexToMonth = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des' ];
      return IndexToMonth[ x.getMonth() ];
    },
    dateFormat: function (x) {
      x = new Date(x);
      var IndexToMonth = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des' ];
      return IndexToMonth[ x.getMonth() ];
    },
    ykeys: ['right', 'left'],
    labels: ['Right', 'Left'],
    axes: false,
    pointSize: 0,
    lineColors: ['#AC92EC', '#4FC1E9'],
    grid: false,
    gridTextColor: 'rgba(22, 24, 27, 0.54)',
    hideHover: true,
    resize: true // NOTE: This has a significant performance impact, so is disabled by default.
  });

  if (WrapkitUtils.isMobile()) {
    setTimeout(function(){
      graphAudience.redraw();
      graphLatSig.redraw();

      drawSpark();
    }, 100);
  } else{
    drawSpark();
  }

  // update when content width changed (only on desktop for save performance)
  if (!WrapkitUtils.isMobile()) {
    [].forEach.call(['show', 'hide', 'size', 'setMode'], function(ev){
      window.sidebar.on( ev, WrapkitUtils.debounce(function(){
        graphAudience.redraw();
        graphLatSig.redraw();

        drawSpark();
      }, 250));
    });
    window.wl.on( 'layoutChanged', WrapkitUtils.debounce(function(){
      graphAudience.redraw();
      graphLatSig.redraw();

      drawSpark();
    }, 250));
  }
  window.addEventListener( 'resize', WrapkitUtils.debounce(function(){
    drawSpark();
  }, 250));



  

})(window);

