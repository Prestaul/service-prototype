export default function( log ) {
	return ( req, res, next ) => {
		// Attach a logger to the request object for downstream use
		req.log = log.child( { requestCorrelationId: req.correlationId } );

		// Log the request
		req.log.info( { req } );

		next();
	};
}
