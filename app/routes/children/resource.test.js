/* eslint-env mocha */
/* eslint-disable no-magic-numbers */
/* global testHelpers */
var { assert, sinon } = testHelpers;
import resourceFactory from "./resource";

var getById = sinon.stub();
var MOCK_APP = {
	data: {
		children: { getById }
	}
};

describe( "Children Resource", () => {
	var resource;

	before( () => {
		resource = resourceFactory( MOCK_APP );
	} );

	describe( "get action", () => {
		describe( "when called with non-existent id", () => {
			var next = sinon.stub();
			before( () => {
				var req = { params: { id: 42 } };
				getById.resolves( null );
				resource.get( req, {}, next );
			} );

			it( "should pass control to next handler", () => {
				assert.calledOnce( next );
			} );

			after( () => {
				getById.reset();
			} );
		} );

		describe( "when called with valid id", () => {
			var res = {
				json: sinon.stub()
			};
			var log = "LOG";

			before( () => {
				var req = { params: { id: 42 }, log };
				getById.resolves( { id: 42, type: "child" } );
				resource.get( req, res );
			} );

			it( "should make the correct data call", () => {
				assert.calledOnce( getById );
				assert.calledWithExactly( getById, log, 42 );
			} );

			it( "should send the correct json ", () => {
				assert.calledOnce( res.json );
				assert.calledWithExactly( res.json, { id: 42, type: "child" } );
			} );

			after( () => {
				getById.reset();
			} );
		} );
	} );
} );
