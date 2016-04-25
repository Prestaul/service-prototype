export default function( app ) {
	var status = {
		get health() {
			// This is not a meaningful check at this point but in the future the health
			// it should reflect the health of this service and its dependencies.
			return this.startTime ? "green" : "red";
		},
		startTime: null
	};

	app.on( "server:listening", () => {
		status.startTime = new Date();
	} );

	return status;
}
