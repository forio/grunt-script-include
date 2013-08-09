grunt-script-include
===

> Include script files individually for debugging:

> An alternative to source maps, especially useful for browsers that don't support them.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-script-include --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-script-include');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-copy/tree/grunt-0.3-stable).*



## Include task
_Run this task with the `grunt include` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### include
Type: `String`

This option is a required option which specifies the full path to create your `<script>` tags in.

#### attributes
Type: `String`

This option specifies any space separated attributes to use on your `<script>` tags.  Defaults to ''.

### Usage Examples

```js
include: {
    dev: {
        options: {
            include: 'build/include/scripts.html'
        },
        files: [{
            expand: true,
            cwd: 'src/scripts',
            src: ['vendor/**/*.js', 'app/**/*.js'],
            dest: 'build/js/src/'
        }]
    }
}
```

This task supports all the file mapping format Grunt supports. Please read [Globbing patterns][http://gruntjs.com/configuring-tasks#globbing-patterns] and [Building the files object dynamically][http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically] for additional details.

If the files do not exist in the destination specified they will be copied there.
The root is automatically calculated based on the `include` option and `files.dest`.


## Release History

 * 2013-08-08   v0.0.1   Initial release

---
