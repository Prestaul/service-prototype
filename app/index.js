import makeEmitter from "listen-up";
import appStatusFactory from "./app-status";
import loggerFactory from "./logger";
import middlewareFactory from "./middleware";
import resourcesFactory from "./resources";
import serverFactory from "./server";

export default function( config ) {
	var log = loggerFactory( config.appName, config.logger );

	// The application object hosts all common objects and utilities
	var app = makeEmitter( {
		name: config.appName,
		version: config.appVersion,
		config,
		log,
		start() {
			app.server.listen( config.host.port, config.host.name, () => {
				app.emit( "server:listening" );
				app.log.info( "%s started, listening on port %d", app.name, config.host.port );
			} );
			return this;
		}
	} );

	app.middleware = middlewareFactory( app );

	// Set up application routing
	var resources = resourcesFactory( app );

	// Set up our express server
	app.server = serverFactory( app, config.host, resources );
	app.status = appStatusFactory( app );

	return app;
}
