import browserify = require("browserify");
import fs = require("fs");
import glob = require("glob");
import gulp = require("gulp");
import mocha = require("gulp-mocha");
import sourcemaps = require("gulp-sourcemaps");
import tslintPlugin = require("gulp-tslint");
import typedoc = require("gulp-typedoc");
import typescript = require("gulp-typescript");
import uglify = require("gulp-uglify");
import merge2 = require("merge2");
import path = require("path");
import rimraf = require("rimraf");
import runSequence = require("run-sequence");
import buffer = require("vinyl-buffer");
import source = require("vinyl-source-stream");

// tslint:disable-next-line:no-var-requires
const tsify = require("tsify");
const tslint = tslintPlugin.default;

const ppRegex1 = /\.tsd-page-toolbar {(.*?)background:(.*?;)(.*?)}$/m;
const ppReplace1 = ".tsd-page-toolbar {$1background: #36a8fe;$2}";
const ppRegex2 = /<p>Generated using <a href="http:\/\/typedoc.org\/" target="_blank">TypeDoc<\/a><\/p>/;
const ppReplace2 = `
<p>Generated using <a href="http://typedoc.org/" target="_blank">TypeDoc</a></p>
<hr />
<p>Copyright &copy; 2017-2018 - Pedro José Batista.</p>
`;
const ppRegex3 = /<h2>Index<\/h2>/;
const ppReplace3 = `<h2><a name="index" style="color: #000; text-decoration: none">Index</a></h2>`;
const ppRegex4 = /<h3>Hierarchy<\/h3>/;
const ppReplace4 = `<h3><a name="hierarchy" style="color: #000; text-decoration: none">Hierarchy</a></h3>`;

gulp.task("build", (callback: any) => {
    return runSequence(
        "clean:build",
        "build:ts",
        callback,
    );
});

gulp.task("build:ts", () => {
    // Obtaining and parsing TS configurations
    const tsConfig = require("./tsconfig.json");
    const project = typescript.createProject(tsConfig.compilerOptions);

    // Creating streams to compile and output
    const compileStream = gulp.src("./src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(project());
    const outStream = gulp.dest("./build/local");

    // Merging typing, code and sourcemaps
    return merge2([
        compileStream.dts.pipe(outStream),
        compileStream.js.pipe(outStream),
        compileStream.js.pipe(sourcemaps.write()).pipe(outStream),
    ]);
});

gulp.task("build:docs", () => {
    // Obtaining and parsing typedoc configurations
    const tsConfig = require("./tsconfig.json");
    tsConfig.typedocOptions.logger = "none";

    // Sending stream to plugin
    return gulp.src("./src/**/*.ts").pipe(typedoc(tsConfig.typedocOptions));
});

gulp.task("bundle", (callback: any) => runSequence(["bundle:full", "bundle:minify"], callback));

gulp.task("bundle:full", () => {

    const compilerOptions = require("./tsconfig.json").compilerOptions;
    compilerOptions.lib = ["es6"];
    compilerOptions.target = "es5";

    // Transform regular node stream to gulp (buffered vinyl) stream
    const browserified = browserify({
        debug: true,
        entries: "./src/index.ts",
    });

    return browserified
        .plugin(tsify, compilerOptions)
        .bundle()
        .pipe(source("timecount.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./build"));
});

gulp.task("bundle:minify", () => {

    const compilerOptions = require("./tsconfig.json").compilerOptions;
    compilerOptions.lib = ["es6"];
    compilerOptions.target = "es5";

    // Transform regular node stream to gulp (buffered vinyl) stream
    const browserified = browserify({
        debug: true,
        entries: "./src/index.ts",
    });

    return browserified
        .plugin(tsify, compilerOptions)
        .bundle()
        .pipe(source("timecount.min.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./build"));
});

gulp.task("clean:build", (callback: any) => rimraf("./build", callback));

gulp.task("clean:docs", (callback: any) => rimraf("./docs", callback));

gulp.task("document", (callback: any) => {
    return runSequence(
        "clean:docs",
        "build:docs",
        "postprocess:docs",
        callback,
    );
});

gulp.task("export:files", () => {
    return gulp
        .src([
            "./AUTHORS.md",
            "./CHANGELOG.md",
            "./LICENSE",
            "./README.md",
        ])
        .pipe(gulp.dest("./build/local"));
});

gulp.task("export:package", (callback: any) => {
    const packageObj = require("./package.json");
    delete packageObj.private;

    packageObj.main = "index.js";
    packageObj.types = "index.d.ts";
    packageObj.typings = "index.d.ts";

    fs.writeFile("./build/local/package.json", JSON.stringify(packageObj, null, 4), callback);
});

gulp.task("lint", () => {
    return gulp.src("./src/**/*.ts")
        .pipe(tslint({ formatter: "verbose" }))
        .pipe(tslint.report());
});

gulp.task("package", (callback: any) => {
    return runSequence("lint", "test", ["build", "document"], ["export:files", "export:package"], "bundle", callback);
});

gulp.task("postprocess:docs", (callback: any) => {

    // Creating .nojekyll file
    fs.writeFileSync(path.join(__dirname, "docs", ".nojekyll"), "");

    // Editting the CSS
    const cssFile = path.join(__dirname, "docs", "assets", "css", "main.css");
    const css = fs.readFileSync(cssFile).toString();
    fs.writeFileSync(cssFile, css.replace(ppRegex1, ppReplace1));

    // Editting each HTML file with the post-processor
    glob("docs/**/*.html", (error, matches) => {
        if (error) { throw error; }

        for (const match of matches) {
            const content = fs.readFileSync(match).toString().replace(ppRegex2, ppReplace2);
            fs.writeFileSync(match, content.replace(ppRegex3, ppReplace3).replace(ppRegex4, ppReplace4));
        }

        callback();
    });
});

gulp.task("test", () => {
    return gulp.src("./tests/**/*.test.ts")
        .pipe(mocha({ bail: true, require: ["ts-node/register"] }));
});
