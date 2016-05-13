/* eslint-env mocha */
/* global testHelpers */
import HTTPStatus from "http-status";

var {
	assert,
	hippie,
	config,
	appFactory
} = testHelpers;

describe( "Integration - Children Resource", () => {
	describe( "`get` action", () => {
		var app;

		before( () => {
			app = appFactory( config );
		} );

		it( "should respond with 401 if not authorized", async () => {
			var body = await hippie( app.server )
				.json()
				.get( "/children/2" )
				.expectStatus( HTTPStatus.UNAUTHORIZED );

			assert.deepEqual( body, { message: "Unauthorized" } );
		} );

		it( "should respond with 404 if missing id", async () => {
			var body = await hippie( app.server )
				.json()
				.header( "X-Silly-Auth", "open sesame" )
				.get( "/children/1" )
				.expectStatus( HTTPStatus.NOT_FOUND );

			assert.deepEqual( body, { message: "Not Found" } );
		} );

		it( "should respond with 406", async () => {
			var body = await hippie( app.server )
				.json()
				.header( "X-Silly-Auth", "open sesame" )
				.get( "/children/2" )
				.expectStatus( HTTPStatus.OK );

			assert.deepEqual( body, {
				id: 2,
				type: "child"
			} );
		} );
	} );
} );
