var _       = require('lodash');
var path    = require('path');

function gcroot(a, b) {
    var partsA = a.split(path.sep);
    var partsB = b.split(path.sep);
    var root = '';
    var possibleRoot;

    while ((possibleRoot = partsA.shift()) === partsB.shift()) {
        root = path.join(possibleRoot, path.sep);
    }

    return root;
}

module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('include', 'Include script files individually for debugging.', function () {
        grunt.config.requires('include');

        var options = this.options({
            separator: grunt.util.linefeed,
            attributes: ''
        });

        var output = [];

        this.files.forEach(function (file) {
            var root = new RegExp('^' + gcroot(options.include, file.dest));
            var relativePath = file.dest.replace(root, '');

            file.src.forEach(function (path) {
                if (!grunt.file.exists(path)) {
                    grunt.log.warn('Source file "' + path + '" not found.');
                } else {
                    var ext = getExtension(relativePath);
                    output.push(getTag(ext, options.attributes, relativePath).join(' '));

                    // Copy if it's not where it's suppose to be, overwriting existing files.
                    if (!grunt.file.arePathsEquivalent(path, file.dest)) {
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
    
    function getTag(extension, attributes, path){
        switch(extension){
            case 'css':
                return _.compact(['<link', attributes, 'rel="stylesheet" href="' + path + '"/>']);
            case 'js':
            default:
                return _.compact(['<script', attributes, 'src="' + path + '"></script>']);
        }
    }

    function getExtension(filename){
        var i = filename.lastIndexOf('.');
        return (i < 0) ? '' : filename.substr(i + 1);
    }
}
