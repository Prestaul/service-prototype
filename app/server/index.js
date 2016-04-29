import express from "express";

export default function( app, config, routes ) {
	var server = express();

	// Mount global pre-routing middleware
	server
		.use( app.middleware.requestCorrelationId )
		.use( app.middleware.requestLogger )
		.use( app.middleware.responseLogger );

	// Mount our routes
	server.use( "/", routes );

	// Mount global post-routing middleware
	server.use( app.middleware.notFound );

	return server;
}
