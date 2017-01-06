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
                    'build/lib/id-core/presets.js': [
                        idPath + 'dist/presets.js',
                        idPath + 'js/id/presets.js',
                        idPath + 'js/id/presets/*.js'
                    ]
                }
            }
        },
        copy: {
            'app': {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: [
                            'map-styles/*',
                            'index.html',
                            '**/*.css'
                        ],
                        dest: 'build/'
                    }
                ]
            },
            'node-modules': {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules',
                        src: [
                            '@angular/**',
                            'rxjs/**',
                            'es6-shim/es6-shim.min.js',
                            'systemjs/dist/system-polyfills.js',
                            'systemjs/dist/system.src.js',
                            'moment/moment.js'
                        ],
                        dest: 'build/lib/'
                    }
                ]
            },
            'opening-hours': {
                files: [
                    {
                        expand: false,
                        src: ['node_modules/opening_hours/opening_hours+deps.js'],
                        dest: 'build/lib/opening-hours.js'
                    }
                ]
            },
            'id-locales': {
                files: [
                    {
                        expand: false,
                        src: idPath + 'js/lib/locale.js',
                        dest: 'build/lib/id-core/locale.js'
                    },
                    {
                        expand: true,
                        cwd: idPath + 'dist/locales/',
                        src: '*.json',
                        dest: 'build/lib/id-core/locales/'
                    },
                    {
                        expand: false,
                        src: idPath + 'data/locales.json',
                        dest: 'build/lib/id-core/locales.json'
                    }
                ]
            }
        },
        watch: {
            app: {
                files: 'src/**',
                tasks: ['app']
            }
        }
    });

    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-submake');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('opening-hours', [
        'run:opening-hours-npm-install',
        'submake:opening-hours-make',
        'copy:opening-hours'
    ]);

    grunt.registerTask('id-core', [
        'submake:id',
        'concat:id-presets',
        'copy:id-locales'
    ]);

    grunt.registerTask('app', [
        'copy:app',
        'copy:node-modules'
    ]);

    grunt.registerTask('build', [
        'opening-hours',
        'id-core',
        'app'
    ])
};
