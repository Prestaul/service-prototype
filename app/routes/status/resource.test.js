/* eslint-env mocha */
import { assert } from "chai";
import sinon from "sinon";
import resourceFactory from "./resource";

const MOCK_APP = {
	name: "the app",
	version: "6.6.6",
	middleware: {},
	status: {
		health: "green",
		startTime: new Date( "2000-01-01T00:00:00.000Z" )
	}
};

describe( "Status Resource", () => {
	var resource;

	before( () => {
		resource = resourceFactory( MOCK_APP );
	} );

	describe( "get action", () => {
		it( "should be a function", () => {
			assert.isFunction( resource.get );
		} );

		describe( "when called", () => {
			var res;

			before( () => {
				res = { json: sinon.stub() };
				resource.get( {}, res );
			} );

			it( "should send the proper response", () => {
				assert.calledOnce( res.json );
				assert.calledWithExactly( res.json, {
					name: MOCK_APP.name,
					version: MOCK_APP.version,
					health: MOCK_APP.status.health,
					startTime: MOCK_APP.status.startTime
				} );
			} );
		} );
	} );
} );
