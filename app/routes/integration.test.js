/* eslint-env mocha */
/* global testHelpers */
import HTTPStatus from "http-status";

var {
	assert,
	hippie,
	config,
	appFactory
} = testHelpers;

describe( "Integration - Routes", () => {
	describe( "when route is not matched", () => {
		var app;

		before( () => {
			app = appFactory( config );
		} );

		describe( "and json was requested", () => {
			it( "should respond with 404", async () => {
				var body = await hippie( app.server )
					.json()
					.get( "/foobar" )
					.expectStatus( HTTPStatus.NOT_FOUND )
					.then();

				assert.deepEqual( body, {
					message: "Not Found"
				} );
			} );
		} );

		describe( "and json was not requested", () => {
			it( "should respond with 406", async () => {
				var body = await hippie( app.server )
					.header( "Accept", "text/html" )
					.get( "/foobar" )
					.expectStatus( HTTPStatus.NOT_ACCEPTABLE )
					.then();

				assert.strictEqual( body, "Not Acceptable" );
			} );
		} );
	} );
} );
