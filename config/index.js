var crampon = require( "crampon" );

export default function( pkg ) {
	// Set up our environment hierarchy. Right now dev inherits configuration from prod.
	return crampon( [ "production", "development", "test" ] )
		.addFile( "./config" ) // Use config.js as our main config file
		.addOverrideFile( "./config.local", true ) // Use config.local.js as local developer overrides
		.addOverride( { // Insert some package details in to the config
			appName: pkg.name,
			appVersion: pkg.version
		} )
		.getConfig();
}
