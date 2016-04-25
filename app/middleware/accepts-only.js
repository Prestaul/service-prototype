import HTTPStatus from "http-status";

export default function acceptsOnly( types ) {
	return ( req, res, next ) => {
		if ( req.accepts( types ) ) return next();

		res.status( HTTPStatus.NOT_ACCEPTABLE ).send( "Not Acceptable" );
	};
}
