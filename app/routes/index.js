import { Router as routerFactory } from "express";
import statusFactory from "./status";
import parentsFactory from "./parents";
import childrenFactory from "./children";

export default function( app ) {
	var router = routerFactory();

	// Pre-resource-routing middleware
	router.use( app.middleware.acceptsOnly( "json" ) );

	// Mount resources
	router
		.use( "/status", statusFactory( app ) )
		.use( "/parents", parentsFactory( app ) )
		.use( "/children", childrenFactory( app ) );

	return router;
}
