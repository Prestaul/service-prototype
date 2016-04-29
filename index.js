require( "babel-register" );

var pkg = require( "./package" );
var config = require( "./config" )( pkg );
var appFactory = require( "./app" );

module.exports = appFactory( config ).start();
