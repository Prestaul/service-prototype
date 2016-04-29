import HTTPStatus from "http-status";

export default function acceptsOnly( types ) {
	return ( req, res, next ) => {
		if ( req.accepts( types ) ) return next();

		req.log.debug( { req, invalidAcceptHeader: true }, "Request has invalid 'Accept' header" );
		res.status( HTTPStatus.NOT_ACCEPTABLE ).send( "Not Acceptable" );
	};
}
