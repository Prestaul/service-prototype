import bunyan from "bunyan";

export default ( name, config ) => bunyan.createLogger( {
	name,
	serializers: bunyan.stdSerializers,
	level: config && config.level || "info"
} );
