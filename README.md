# c24.PizzaDiNoccatello

The KnockoutJS variation of the "Perfetto" research project.


## How to get started

Clone the repository, then load all the required node packages by executing the following commands:

    npm install grunt-cli -g
	npm install

Use the following commands to build/hint/minify/test etc:

	grunt                   -- hint, run unit tests, bundle amd modules, copy to dist, minify (== creates the production version)
	grunt live              -- everything from the above tasks, then run development server and open browser with live reload
	grunt test-unit         -- hint, then run unit tests
    grunt test-integration  -- hint, then run integration tests (require pizza express service to run on http://localhost:3000/)
    grunt build-html        -- copy and postprocess HTML files for production version
    grunt build-js          -- copy and postprocess JavaScript files for production version
