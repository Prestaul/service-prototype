import { Router as routerFactory } from "express";
import resourceFactory from "./resource";

export default function( app ) {
	var router = routerFactory();
	var children = resourceFactory( app );

	router
		.get( "/:id", app.middleware.promiseJson( children.get ) );

	return router;
}
