import HTTPStatus from "http-status";

export default function( req, res ) {
	res.format( {
		json: () => {
			res.status( HTTPStatus.NOT_FOUND ).send( { message: "Not Found" } );
		},

		default: () => {
			res.status( HTTPStatus.NOT_ACCEPTABLE ).send( "Not Acceptable" );
		}
	} );
}
