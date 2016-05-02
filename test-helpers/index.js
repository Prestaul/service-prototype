/* global testHelpers */
import chai from "chai";
import sinon from "sinon";
import hippie from "./hippie";
import pkg from "../package.json";
import appFactory from "../app";
import configFactory from "../config";

require( "sinon-as-promised" );

sinon.assert.expose( chai.assert, { prefix: "" } );

global.testHelpers = {
	assert: chai.assert,
	appFactory,
	configFactory,
	hippie,
	sinon,
	config: configFactory( pkg )
};

export default testHelpers;
