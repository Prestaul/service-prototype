/* global testHelpers */
import chai from "chai";
import sinon from "sinon";
import hippie from "./hippie";
import appFactory from "../app";
import configFactory from "../config";

sinon.assert.expose( chai.assert, { prefix: "" } );

global.testHelpers = {
	assert: chai.assert,
	appFactory,
	configFactory,
	hippie,
	sinon
};

export default testHelpers;
