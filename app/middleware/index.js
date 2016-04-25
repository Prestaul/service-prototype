import acceptsOnly from "./accepts-only";
import notFound from "./not-found";
import requestLoggerFactory from "./request-logger";
import responseLoggerFactory from "./response-logger";
import reqCorrelationFactory from "./request-correlation-id";

export default function( app ) {
	return {
		acceptsOnly,
		notFound,
		requestLogger: requestLoggerFactory( app.log ),
		responseLogger: responseLoggerFactory( app.log ),
		requestCorrelationId: reqCorrelationFactory()
	};
}
