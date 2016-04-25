import express from "express";

export default function( app, config, resources ) {
	var server = express();

	// Set up global pre-routing middleware
	server
		.use( app.middleware.requestCorrelationId )
		.use( app.middleware.requestLogger )
		.use( app.middleware.responseLogger );

	// Set up our resource router
	server.use( "/", resources );

	// Set up global post-routing middleware
	server.use( app.middleware.notFound );

	return server;
}
