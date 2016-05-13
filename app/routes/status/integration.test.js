/* eslint-env mocha */
/* global testHelpers */
import HTTPStatus from "http-status";

var {
	assert,
	hippie,
	sinon,
	configFactory,
	appFactory
} = testHelpers;


const MOCK_PACKAGE = {
	name: "test-app-name",
	version: "6.6.6"
};
const config = configFactory( MOCK_PACKAGE );


describe( "Integration - Status Resource", () => {
	var now = Date.now();
	var clock;

	before( () => {
		clock = sinon.useFakeTimers( now );
	} );

	after( () => {
		clock.restore();
	} );

	describe( "when app isn't started", () => {
		var app;

		before( () => {
			app = appFactory( config );
		} );

		it( "should report correct status", async () => {
			var body = await hippie( app.server )
				.json()
				.get( "/status" )
				.expectStatus( HTTPStatus.OK );

			assert.deepEqual( body, {
				name: MOCK_PACKAGE.name,
				version: MOCK_PACKAGE.version,
				health: "red",
				startTime: null
			} );
		} );
	} );

	describe( "when app is started", () => {
		var app;

		before( () => {
			app = appFactory( config ).emit( "server:listening" );
		} );

		it( "should report correct status", async () => {
			var body = await hippie( app.server )
				.json()
				.get( "/status" )
				.expectStatus( HTTPStatus.OK );

			assert.deepEqual( body, {
				name: MOCK_PACKAGE.name,
				version: MOCK_PACKAGE.version,
				health: "green",
				startTime: new Date().toISOString()
			} );
		} );
	} );
} );
