/*!
 * Bremen.js - Chapter #3
 *
 * CaloryCounter'
 *
 * Copyright(c) 2012 Bremen, Germany - All rights reserved.
 *
 * Authors:
 *
 *     Lukas Magedanz <lukas.magedanz@gmail.com>
 *     André König <andre.koenig@gmail.com>
 *
 */
 require.config({
    baseUrl: '/javascripts/app',
    paths: {
        'backbone': '/javascripts/vendor/backbone'
      , 'underscore': '/javascripts/vendor/underscore'
      , 'jquery': '/javascripts/vendor/jquery'
      , 'text': '/javascripts/vendor/text'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery', 'text'],
            exports: 'Backbone'
        }
    }
});

require([
    'app'
],
function (CaloryCounterApp) {
    // The main container in which everything will be rendered.
    var $main = $('#main');

    new CaloryCounterApp($main).run();
});