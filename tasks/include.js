var _       = require('lodash');
var path    = require('path');

function gcroot(a, b) {
    var partsA = a.split(path.sep);
    var partsB = b.split(path.sep);
    var root = '';
    var possibleRoot;

    while ((possibleRoot = partsA.shift()) === partsB.shift()) {
        root = possibleRoot + '/';
    }

    return root;
}

module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('include', 'Include script files individually for debugging.', function () {

        var options = this.options({
            separator: grunt.util.linefeed,
            attributes: ''
        });

        if (!options.include) {
            grunt.log.error('options.include is required');

            throw new Error('Invalid config.');
        }

        var output = [];

        this.files.forEach(function (file) {
            var webRoot = gcroot(options.include, file.dest);

            file.src.forEach(function (path) {
                if (!grunt.file.exists(path)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                } else {
                    output.push(_.compact(['<script', options.attributes, 'src="' + file.dest.replace(new RegExp('^' + webRoot), '') + '"></script>']).join(' '));

                    // Copy if it's not where it's suppose to be.
                    if (path !== file.dest) {
                        grunt.file.copy(path, file.dest);
                    }
                }
            });

        });

        if (output.length < 1) {
            grunt.log.warn('Destination not written because compiled files were empty.');
        } else {
            grunt.file.write(options.include, output.join(grunt.util.normalizelf(options.separator)));
            grunt.log.writeln('File "' + options.include + '" created.');
        }

    });
}