import express from "express";

export default function( app, config, resources ) {
	var server = express();

	// Mount global pre-routing middleware
	server
		.use( app.middleware.requestCorrelationId )
		.use( app.middleware.requestLogger )
		.use( app.middleware.responseLogger );

	// Mount our resource router
	server.use( "/", resources );

	// Mount global post-routing middleware
	server.use( app.middleware.notFound );

	return server;
}
