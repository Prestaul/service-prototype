/* eslint-disable no-magic-numbers */
const childFactory = id => ( {
	id, type: "child"
} );

export default function( app ) {
	return {
		async getById( logger, id ) {
			id = parseInt( id, 10 ); // eslint-disable-line no-magic-numbers

			logger.debug( { id }, "Retrieving child from db by id" );

			// Our db only has even numbered children up to 10
			if ( id % 2 === 1 || id > 10 ) {
				logger.debug( { id }, "Unable to find child in db by id" );
				return null;
			}

			return childFactory( id );
		},

		async getByParentId( logger, parentId ) {
			parentId = parseInt( parentId, 10 ); // eslint-disable-line no-magic-numbers

			logger.debug( { parentId }, "Listing children from db by parentId" );

			// Our db only has odd numbered parents up to 10
			if ( parentId % 2 === 0 || parentId > 10 ) {
				logger.debug( { parentId }, "Unable to find children in db by parentId" );
				return null;
			}

			return [
				childFactory( 2 ),
				childFactory( 4 ),
				childFactory( 6 ),
				childFactory( 8 ),
				childFactory( 10 )
			];
		}
	};
}
