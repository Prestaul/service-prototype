export default function( app ) {
	return {
		get( req ) {
			return app.data.children.getById( req.log, req.params.id );
		}
	};
}
