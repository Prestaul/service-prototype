/* eslint-env mocha */
import { assert } from "chai";
import makeEmitter from "listen-up";
import appStatusFactory from "./app-status";

describe( "app-status", () => {
	describe( "health", () => {
		var appStatus;

		before( () => {
			appStatus = appStatusFactory( { on: () => null } );
		} );

		it( "should be 'red' when app is not started", () => {
			assert.equal( appStatus.health, "red" );
		} );

		it( "should be 'green' when app is not started", () => {
			appStatus.startTime = new Date();
			assert.equal( appStatus.health, "green" );
		} );
	} );

	describe( "startTime", () => {
		var app, appStatus;

		before( () => {
			app = makeEmitter();
			appStatus = appStatusFactory( app );
		} );

		it( "should initially be null", () => {
			assert.isNull( appStatus.startTime );
		} );

		it( "should be set with the app is initialized", () => {
			app.emit( "server:listening" );
			assert.typeOf( appStatus.startTime, "date" );
		} );
	} );
} );
