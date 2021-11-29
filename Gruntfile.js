module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            cssFontDisplayBlock: {
                expand: true,
                cwd: 'public/',
                src: [
                    '*.css',
                    '!*.font-display-block.css'
                ],
                dest: 'public/',
                options: {
                    process (content) {
                        return content.replace(/font-display:optional;/g, 'font-display:block;');
                    }
                },
                rename (dest, src) {
                    return dest + src.replace('.css', '.font-display-block.css');
                }
            }
        },
        cacheBust: {
            base: {
                options: {
                    length: 16,
                    algorithm: 'md5',
                    baseDir: './public/',
                    assets: ['*', '!**/*.*.*', '!manifest.json'],
                    deleteOriginals: true,
                    jsonOutput: true,
                    jsonOutputFilename: 'manifest.json',
                    outputDir: '',
                    clearOutputDir: true
                },
                src: [
                    'public/main.css',
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-cache-bust');

    grunt.registerTask('pre-production', ['copy', 'cacheBust']);
};