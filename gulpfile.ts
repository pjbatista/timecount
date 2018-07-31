import fs = require("fs");
import mocha = require("gulp-mocha");
import sourcemaps = require("gulp-sourcemaps");
import typedoc = require("gulp-typedoc");
import typescript = require("gulp-typescript");
import merge2 = require("merge2");
import rimraf = require("rimraf");
import runSequence = require("run-sequence");

// tslint:disable-next-line:no-var-requires
const gulp = require("gulp") as any;

gulp.task("build", ["clean:build"], () => {
    // Obtaining and parsing TS configurations
    const tsConfig = require("./tsconfig.json");
    const project = typescript.createProject(tsConfig.compilerOptions);

    // Creating streams to compile and output
    const compileStream = gulp.src("./src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(project());
    const outStream = gulp.dest("./build");

    // Merging typing, code and sourcemaps
    return merge2([
        compileStream.dts.pipe(outStream),
        compileStream.js.pipe(outStream),
        compileStream.js.pipe(sourcemaps.write()).pipe(outStream),
    ]);
});

gulp.task("clean:build", (callback: any) => {
    return rimraf("./build", callback);
});

gulp.task("clean:docs", (callback: any) => {
    return rimraf("./docs", callback);
});

gulp.task("document", ["clean:docs"], () => {
    // Obtaining and parsing typedoc configurations
    const tsConfig = require("./tsconfig.json");

    // Sending stream to plugin
    return gulp.src("./src/**/*.ts").pipe(typedoc(tsConfig.typedocOptions));
});

gulp.task("export:files", () => {
    return gulp
        .src([
            "./AUTHORS.md",
            "./CHANGELOG.md",
            "./CONTRIBUTING.md",
            "./LICENSE",
            "./README.md",
        ])
        .pipe(gulp.dest("./build"));
});

gulp.task("export:package", (callback: any) => {
    const packageObj = require("./package.json");
    delete packageObj.private;

    packageObj.main = "index.js";
    packageObj.types = "index.d.ts";
    packageObj.typings = "index.d.ts";

    fs.writeFile("./build/package.json", JSON.stringify(packageObj, null, 4), callback);
});

gulp.task("package", (callback: any) => {
    return runSequence("test", ["build", "document"], ["export:files", "export:package"], callback);
});

gulp.task("test", () => {
    return gulp.src("./tests/**/*.test.ts")
        .pipe(mocha({
            require: "ts-node/register",
        } as any));
});
