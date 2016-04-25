import { Router as routerFactory } from "express";
import resourceFactory from "./resource";

export default function( app ) {
	var router = routerFactory();
	var status = resourceFactory( app );

	router.get( "/", status.get );

	return router;
}
