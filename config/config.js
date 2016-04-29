/* eslint-disable no-magic-numbers */
export default {
	production: {
		host: {
			name: process.env.HOST_NAME,
			port: process.env.HOST_PORT || 1337
		},

		logger: {
			level: process.env.LOG_LEVEL || "info"
		}
	},

	// development configuration inherits and overrides production configuration
	development: {
		// coming soon...
	},

	// test configuration inherits and overrides development and production configuration
	test: {
		logger: {
			level: "fatal"
		}
	}
};
