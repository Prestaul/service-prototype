export default function( app ) {
	var { name, version } = app;

	return {
		get( req, res ) {
			res.json( { name, version, ...app.status } );
		}
	};
}
