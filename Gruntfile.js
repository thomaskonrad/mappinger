module.exports = function(grunt) {
    grunt.initConfig({
        run: {
            opening_hours_npm_install: {
                exec: 'cd node_modules/opening_hours/ && npm install'
            }
        },
        submake: {
            opening_hours_clean: {
                'node_modules/opening_hours/': 'clean'
            },
            opening_hours_browserify: {
                'node_modules/opening_hours/': 'opening_hours+deps.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-submake');

    grunt.registerTask('opening_hours', [
        'run:opening_hours_npm_install',
        'submake:opening_hours_clean',
        'submake:opening_hours_browserify'
    ]);
}
