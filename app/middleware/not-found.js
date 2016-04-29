import HTTPStatus from "http-status";

export default function( req, res ) {
	req.log.debug( { req, notFound: true }, "Request url not found" );
	res.status( HTTPStatus.NOT_FOUND ).send( { message: "Not Found" } );
}
