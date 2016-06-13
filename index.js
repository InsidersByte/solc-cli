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
    if (args.length === 0) {
        cli.fatal('a file is required');
    }

    const currentPath = process.cwd();

    const sources = {};

    for (const fileName of args) {
        const filePath = path.join(currentPath, fileName);
        const file = fs.readFileSync(filePath, 'utf8');

        sources[fileName] = file;
    }

    const outputDirectoryPath = path.join(currentPath, outputDirectory);

    mkdirp(outputDirectoryPath, (error) => {
        if (error) {
            throw error;
        }

        const compiledContracts = solc.compile({ sources }, optimise);

        if (compiledContracts.errors) {
            throw compiledContracts.errors;
        }

        for (const [key, value] of Object.entries(compiledContracts.contracts)) {
            fs.writeFile(path.join(outputDirectoryPath, `${key}.bin`), value.bytecode);
            fs.writeFile(path.join(outputDirectoryPath, `${key}.abi`), value.interface);
        }
    });
});
