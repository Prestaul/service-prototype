import uuid from "node-uuid";
import { networkInterfaces } from "os";

var nodeId;
function getNodeId() {
	if ( nodeId !== undefined ) return nodeId;

	// We only need to run this once and if it fails we'll always return null
	nodeId = null;

	var all = networkInterfaces();
	var iface = all.eth0 || all.eth1 || all.en0 || all.en1;

	if ( !iface ) {
		// Fall back to whichever interface is registered first
		iface = all[ Object.keys( all )[ 0 ] ];
	}

	if ( iface ) {
		let mac = iface[ 0 ].mac;
		// Protect against 00:00:00:00:00:00 mac adressess
		if ( !/^[0:]+$/.test( mac ) ) {
			nodeId = mac.split( ":" ).map( b => parseInt( b, 16 ) );
		}
	}

	return nodeId;
}

function getId( callback ) {
	var id = uuid.v1( { node: getNodeId() } );
	process.nextTick( callback.bind( null, id ) );
}

export default function( options ) {
	const HEADER = options && options.header || "X-Request-Correlation-Id";
	const PROPERTY = options && options.property || "correlationId";
	const generateId = options && options.generateId || getId;

	function setId( req, res, reqId, next ) {
		res.set( HEADER, reqId );
		req[ PROPERTY ] = reqId;
		next();
	}

	return ( req, res, next ) => {
		var reqId = req.get( HEADER );

		if ( reqId ) {
			setId( req, res, reqId, next );
		} else {
			generateId( _reqId => {
				setId( req, res, _reqId, next );
			} );
		}
	};
}
