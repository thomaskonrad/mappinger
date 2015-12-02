module.exports = function(grunt) {
    var idPath = 'node_modules/iD/';

    grunt.initConfig({
        run: {
            'opening-hours-npm-install': {
                exec: 'cd node_modules/opening_hours/ && npm install'
            }
        },
        submake: {
            'opening-hours-make': {
                'node_modules/opening_hours/': 'opening_hours+deps.js'
            },
            'id': {
                'node_modules/iD/': 'all'
            }
        },
        concat: {
            'id-presets': {
                options: {
                    banner: 'var iD = { data: {} };',
                    footer: 'var idPresets = iD.presets().load(iD.data.presets);'
                },
                files: {
                    'app/components/id-core/presets.js': [
                        idPath + 'dist/presets.js',
                        idPath + 'js/id/presets.js',
                        idPath + 'js/id/presets/*.js'
                    ]
                }
            }
        },
        copy: {
            'opening-hours': {
                files: [
                    {
                        expand: false,
                        src: ['node_modules/opening_hours/opening_hours+deps.js'],
                        dest: 'app/components/opening-hours.js'
                    }
                ]
            },
            'id-locale': {
                files: [
                    {
                        expand: false,
                        src: idPath + 'js/lib/locale.js',
                        dest: 'app/components/id-core/locale.js'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-submake');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('opening-hours', [
        'run:opening-hours-npm-install',
        'submake:opening-hours-clean',
        'submake:opening-hours-make',
        'copy:opening-hours'
    ]);

    grunt.registerTask('id-core', [
        'submake:id',
        'concat:id-presets'
    ]);
};
