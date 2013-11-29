# c24.PizzaDiNoccatello

The KnockoutJS variation of the "Perfetto" research project.


## How to get started

Clone the repository, then load all node packages by executing the following command:

	npm install

Use the following commands to build/hint/minify/test etc:

	grunt              -- hint, run unit tests, bundle amd modules, copy to dist, minify (== creates the production version)
	grunt server       -- everything from the above tasks, then run development server and open browser with live reload
	grunt unit         -- hint, then run unit tests
	grunt integration  -- hint, then run integration tests (require pizza express service to run on http://localhost:3000/)

TODO: Merge require.js into dist/main.js