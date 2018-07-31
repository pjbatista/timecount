import fs = require("fs");
import glob = require("glob");
import mocha = require("gulp-mocha");
import sourcemaps = require("gulp-sourcemaps");
import typedoc = require("gulp-typedoc");
import typescript = require("gulp-typescript");
import merge2 = require("merge2");
import path = require("path");
import rimraf = require("rimraf");
import runSequence = require("run-sequence");

// tslint:disable-next-line:no-var-requires
const gulp = require("gulp") as any;

const postProcessRegex = /<p>Generated using <a href="http:\/\/typedoc.org\/" target="_blank">TypeDoc<\/a><\/p>/;
const postProcessReplace = `
<p>Generated using <a href="http://typedoc.org/" target="_blank">TypeDoc</a></p>
<hr />
<p>Copyright 2017-2018 Pedro José Batista.</p>
`;

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
    const outStream = gulp.dest("./build");

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

gulp.task("clean:build", (callback: any) => {
    return rimraf("./build", callback);
});

gulp.task("clean:docs", (callback: any) => {
    return rimraf("./docs", callback);
});

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

gulp.task("postprocess:docs", (callback: any) => {

    fs.writeFileSync(path.join(__dirname, "docs", ".nojekyll"), "");

    glob("docs/**/*.html", (error, matches) => {
        if (error) { throw error; }

        for (const match of matches) {
            const content = fs.readFileSync(match).toString();
            fs.writeFileSync(match, content.replace(postProcessRegex, postProcessReplace));
        }

        callback();
    });
});

gulp.task("test", () => {
    return gulp.src("./tests/**/*.test.ts")
        .pipe(mocha({
            require: "ts-node/register",
        } as any));
});
