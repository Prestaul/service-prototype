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
			var result;
			before( async () => {
				var req = { params: { id: 42 } };
				getById.resolves( null );
				result = await resource.get( req, {}, next );
			} );

			it( "should result in a null value", () => {
				assert.isNull( result );
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
			var result;

			before( async () => {
				var req = { params: { id: 42 }, log };
				getById.resolves( { id: 42, type: "child" } );
				result = await resource.get( req, res );
			} );

			it( "should make the correct data call", () => {
				assert.calledOnce( getById );
				assert.calledWithExactly( getById, log, 42 );
			} );

			it( "should form the correct response", () => {
				assert.deepEqual( result, { id: 42, type: "child" } );
			} );

			after( () => {
				getById.reset();
			} );
		} );
	} );
} );
