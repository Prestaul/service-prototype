/* eslint-disable no-magic-numbers */
export default {
	production: {
		host: {
			name: process.env.HOST_NAME,
			port: process.env.HOST_PORT || 1337
		}
	},

	// development configuration inherits and overrides production configuration
	development: {
		// coming soon...
	}
};
