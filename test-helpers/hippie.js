import hippie from "hippie";

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

export default hippie;
