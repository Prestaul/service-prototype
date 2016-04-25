export default function( app ) {
	var { name, version } = app;

	return {
		get( req, res ) {
			var { status } = app;
			res.json( { name, version, ...status } );
		}
	};
}
