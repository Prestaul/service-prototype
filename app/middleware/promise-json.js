// hanlder could:
// - respond
//     - we do nothing
// - call next
//     - we do nothing
// - return a promise
//     - if resolved
//         - forward 'next' or 'route' to next
//         - if object with status and data then set status code and send data as json
//         - any other response is sent as json with 200
//     - if rejected
//         - call next with the error
// - return something else
//     - Promise.resolve it and handle

export default function promiseJsonMiddleware( handler ) {
	return function( req, res, next ) {
		var handled = false;

		function wrappedNext( err ) {
			if ( handled ) return;
			handled = true;

			next( err );
		}

		Promise.resolve( handler( req, res, wrappedNext ) ).then( result => {
			if ( handled || result === undefined ) return;
			handled = true;

			if ( result === null ) {
				return next();
			} else if ( result === "route" ) {
				return next( result );
			}

			if ( result && /^[1-5]\d\d$/.test( result.status ) && result.data ) {
				res.status( result.status ).json( result.data );
			} else {
				res.json( result );
			}
		}, err => {
			if ( handled ) return;
			handled = true;

			next( err );
		} );
	};
}
