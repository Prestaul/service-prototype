export default function( log ) {
	return ( req, res, next ) => {
		log.info( { requestCorrelationId: req.correlationId, req } );
		next();
	};
}
