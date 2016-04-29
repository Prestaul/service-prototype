/* eslint-disable no-magic-numbers */
const parentFactory = id => ( {
	id, type: "parent"
} );

export default function( app ) {
	return {
		async getById( logger, id ) {
			logger.debug( { id }, "Retrieving parent from db by id" );

			// Our db only has odd numbered parents up to 10
			if ( id % 2 === 0 || id > 10 ) {
				logger.debug( { id }, "Unable to find parent in db by id" );
				return null;
			}

			return parentFactory( id );
		},

		async list( logger ) {
			logger.debug( "Listing parents from db" );
			return [
				parentFactory( 1 ),
				parentFactory( 3 ),
				parentFactory( 5 ),
				parentFactory( 7 ),
				parentFactory( 9 )
			];
		}
	};
}
