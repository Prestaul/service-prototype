import responseTime from "response-time";

export default function( log ) {
	return responseTime( ( req, res, time ) => {
		( req.log || log ).info( { res, time }, "Completed request (%s %s) in %d ms", req.method, req.originalUrl, time );
	} );
}
