module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            [
              "babelify",
              {
                presets: ["es2015"],
                plugins: [
                  "transform-class-properties",
                  "transform-function-bind"
                ]
              }
            ]
          ]
        },
        files: {
          "./exapmles/dist/cabinet.js": ["./examples/src/index.js"]
        }
      }
    },
    watch: {
      scripts: {
        files: [
          "src/index.js",
          "src/StorageFactory.js",
          "src/utilities.js",
          "src/Entry.js",
          "examples/src/index.js"
        ],
        tasks: ["browserify"],
        options: {
          spawn: false
        }
      }
    }
  })

  grunt.loadNpmTasks("grunt-browserify")
  grunt.loadNpmTasks("grunt-contrib-uglify")
  grunt.loadNpmTasks("grunt-contrib-watch")

  grunt.registerTask("default", ["browserify"])
}
