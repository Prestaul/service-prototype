import bunyan from "bunyan";

export default function( name ) {
	return bunyan.createLogger( {
		name,
		serializers: bunyan.stdSerializers
	} );
}
