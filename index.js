#!/usr/bin/env node

require('babel-polyfill');

const solc = require('solc');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const cli = require('cli').enable('status', 'glob');

cli.parse({
    'out-dir': [false, 'Output directory for the compiled contracts', 'path', './contracts'],
    optimise: [false, 'If present activate the solc optimiser'],
});

cli.main((args, { 'out-dir': outputDirectory, optimise }) => {
    cli.debug(`out-dir: ${outputDirectory}`);
    cli.debug(`args: ${args}`);

    if (optimise) {
        cli.debug('solc optimiser enabled');
    }

    if (args.length === 0) {
        cli.fatal('a file is required');
    }

    const currentPath = process.cwd();

    cli.debug(`currentPath: ${currentPath}`);

    const sources = {};

    for (const fileName of args) {
        cli.debug(`loading ${fileName}`);

        const baseName = path.basename(fileName);
        const filePath = path.join(currentPath, fileName);
        const file = fs.readFileSync(filePath, 'utf8');

        sources[baseName] = file;

        cli.debug(`finished loading ${fileName}`);
    }

    const outputDirectoryPath = path.join(currentPath, outputDirectory);

    cli.debug(`out-dir-path ${outputDirectoryPath}`);

    mkdirp.sync(outputDirectoryPath);

    cli.debug('out-dir created (or it already existed)');

    cli.debug('compiling contracts');

    const compiledContracts = solc.compile({ sources }, optimise);

    cli.debug('finished compiling contracts');

    if (compiledContracts.errors) {
        throw compiledContracts.errors;
    }

    cli.debug('compiled without any errors');

    for (const [key, value] of Object.entries(compiledContracts.contracts)) {
        cli.debug(`creating ${key}.bin and ${key}.abi`);

        fs.writeFile(path.join(outputDirectoryPath, `${key}.bin`), value.bytecode);
        fs.writeFile(path.join(outputDirectoryPath, `${key}.abi`), value.interface);

        cli.debug(`finished creating ${key}.bin and ${key}.abi`);
    }
});
