export default function( app ) {
	return {
		async get( req, res, next ) {
			var child = await app.data.children.getById( req.log, req.params.id );

			if ( !child ) {
				return next();
			}

			res.json( child );
		}
	};
}
