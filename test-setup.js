import chai from "chai";
import sinon from "sinon";
import hippie from "hippie";

sinon.assert.expose( chai.assert, { prefix: "" } );

hippie.prototype.then = function( resolving, rejecting ) {
	return new Promise( ( resolve, reject ) => {
		this.end( ( err, resp, body ) => {
			if ( err ) {
				return reject( err );
			}
			return resolve( body );
		} );
	} ).then( resolving, rejecting );
};
