import { Router as routerFactory } from "express";
import resourceFactory from "./resource";

export default function( app ) {
	var router = routerFactory();
	var children = resourceFactory( app );

	router
		.get( "/:id", children.get );

	return router;
}
