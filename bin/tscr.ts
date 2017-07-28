#! /usr/bin/env node
import * as minimist from 'minimist';
import * as fs from 'fs-extra';
import * as process from 'process';
import * as path from 'path';
import * as spawn from 'cross-spawn';

const argv = minimist(process.argv.slice(2));
const args = argv._;
let templatePath: string;
let targetPath: string;
let packageJSON: {name: string};

if (args[0] === undefined) {
    console.error('Usage: tscr <project-name>')
    process.exit(1);
}

targetPath = path.resolve(process.cwd(), args[0]);
if (fs.existsSync(targetPath)) {
    console.error('File already exists: %s', targetPath);
    process.exit(1);
}

if (argv['lib']) {
    templatePath = path.resolve(__dirname, '..', 'template', 'lib')
} else {
    templatePath = path.resolve(__dirname, '..', 'template', 'app')
}

fs.mkdirSync(targetPath);

fs.copySync(templatePath, targetPath);

const buf = fs.readFileSync(path.resolve(targetPath, 'package.json'))

packageJSON = JSON.parse(buf.toString());

packageJSON.name = args[0];

fs.writeFileSync(path.resolve(targetPath, 'package.json'), JSON.stringify(packageJSON, null, 2));

process.chdir(targetPath);

const proc = spawn('npm', ['install', '--save'], {stdio: 'inherit'});
proc.on('error', function(err: any) {
    console.log(err);
});
proc.on('close', function(code: number) {
    if (code !== 0) {
        console.error('Command failed with exit code ' + code);
    }
})

if (argv['lib']) {
    const proc = spawn('tscr', ['docs'], {stdio: 'inherit'});
    proc.on('error', (err: any) => {
        console.log(err);
    })
    proc.on('close', (code: number) => {
        if (code !== 0) {
            console.error('Command failed with exit code ' + code);
        }
    })
}