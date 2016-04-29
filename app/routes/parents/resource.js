export default function( app ) {
	return {
		async get( req, res, next ) {
			var parent = await app.data.parents.getById( req.log, req.params.id );

			if ( !parent ) {
				return next();
			}

			res.json( parent );
		},

		async list( req, res ) {
			var parents = await app.data.parents.list( req.log );
			res.json( parents );
		},

		async getChildren( req, res ) {
			var children = await app.data.children.getByParentId( req.log, req.params.id );
			res.json( children );
		}
	};
}
