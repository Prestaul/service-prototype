import parentsFactory from "./parents";
import childrenFactory from "./children";

export default app => ( {
	parents: parentsFactory( app ),
	children: childrenFactory( app )
} );
