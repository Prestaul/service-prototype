import { Router as routerFactory } from "express";
import statusFactory from "./status";

export default function( app ) {
	var router = routerFactory();

	// Pre-resource-routing middleware
	router.use( app.middleware.acceptsOnly( "json" ) );

	// Mount resources
	router.use( "/status", statusFactory( app ) );

	return router;
}
