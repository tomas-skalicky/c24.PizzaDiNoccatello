# c24.PizzaDiNoccatello

The KnockoutJS variation of the "Perfetto" research project.


## How to get started

Clone the repository, then load all node packages by executing the following command:

	npm install

Use the following commands to build/hint/minify/test etc:

	grunt              -- hint, minify, bundle amd modules, copy to dist (== creates the production version)
	grunt test         -- hint, then run tests (tests are not implemented yet)

Next TODOs: Implement tests (Kharma, Jasmine), HTML transformation dev->dist.

-----

## TEMP: How the infrastructure for this project has been built

**This section is for our own record, it will be deleted after the project infrastructure has reached a certain level of maturity.**

Create an empty folder and cd into it, then create `package.json` by executing (and answering all questions):

    npm init

You might want to convert the line endings to Windows (CRLF) as they get generated Unix style.

Next, install local grunt and bower versions by executing the following commands:

    npm install grunt-cli --save-dev
    npm install grunt --save-dev
    npm install bower --save-dev

The `--save-dev` argument will tell npm to add the dependencies to the `devDependency` section in the `package.json` document.

Next, install the used grunt plugins and other packages with npm:

    npm install grunt-contrib-uglify --save-dev
    npm install grunt-contrib-jshint --save-dev
    npm install grunt-contrib-watch --save-dev
    npm install grunt-contrib-concat --save-dev
    npm install grunt-requirejs --save-dev
    npm install connect-livereload --save-dev
    npm install grunt-open --save-dev
    npm install matchdep --save-dev
    npm install grunt-contrib-connect --save-dev

Then, you can add a file named `Gruntfile.js` into the root of your project that uses these plugins (see `Gruntfile.js`).

Next, place a file called `.bowerrc` into the project root folder containing the following content:

    {
        "directory": "dev/bower_components"
    }

This will tell bower where to install packages. Then execute the following command to create a `bower.json` file:

    bower init

You can delete everything from this file except the `dependencies` and `devDependencies` section. Now you can start importing bower packages like so:

    bower install requirejs --save
    bower install text --save
    bower install knockout.js --save
    bower install knockout-amd-helpers --save

The `--save` argument instructs bower to update the `dependencies` section in the `bower.json` file.

