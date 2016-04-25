require( "babel-register" );

var crampon = require( "crampon" );
var pkg = require( "./package" );
var appFactory = require( "./app" );

// Set up our environment hierarchy. Right now dev inherits configuration from prod.
var config = crampon( [ "production", "development" ] );

// Use config.js as our config and config.local.js as local developer overrides
config.addFile( "./config" )
	.addOverrideFile( "./config.local", true )
	.addOverride( {
		appName: pkg.name,
		appVersion: pkg.version
	} );

appFactory( config.getConfig() ).start();
