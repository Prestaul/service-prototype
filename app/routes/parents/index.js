import { Router as routerFactory } from "express";
import resourceFactory from "./resource";

export default function( app ) {
	var router = routerFactory();
	var parents = resourceFactory( app );

	router
		.get( "/", parents.list )
		.get( "/:id", parents.get )
		.get( "/:id/children", parents.getChildren );

	return router;
}
