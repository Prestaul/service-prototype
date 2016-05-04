import HTTPStatus from "http-status";

export default function auth( { header = "x-silly-auth", secret = "open sesame" } = {} ) {
	return ( req, res, next ) => {
		if ( req.get( header ) === secret ) return next();

		req.log.debug( { req, failedAuth: true }, "Unauthorized request." );
		res.status( HTTPStatus.UNAUTHORIZED ).send( { message: "Unauthorized" } );
	};
}
