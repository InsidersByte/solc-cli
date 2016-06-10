#!/usr/bin/env node

const solc = require('solc');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const cli = require('cli').enable('status');

function* entries(obj) {
    for (const key of Object.keys(obj)) {
        yield { key, value: obj[key] };
    }
}

cli.parse({
    'output-dir': ['d', 'Compile an input directory of contracts into an output directory', 'path', './contracts'],
    optimise: [false, 'Activate the solc optimiser'],
});

cli.main((args, { 'output-dir': outputDirectory, optimise }) => {
    if (args.length === 0) {
        cli.fatal('a contract file is required');
    }

    if (args.length > 1) {
        cli.fatal('only one contract file is supported');
    }

    const contractName = args[0];
    const contractPath = path.join(__dirname, contractName);
    const contract = fs.readFileSync(contractPath, 'utf8');

    const outputDirectoryPath = path.join(__dirname, outputDirectory);

    mkdirp(outputDirectoryPath, (error) => {
        if (error) {
            throw error;
        }

        const compiledContracts = solc.compile(contract, optimise);

        if (compiledContracts.errors) {
            throw compiledContracts.errors;
        }

        for (const { key, value } of entries(compiledContracts.contracts)) {
            fs.writeFile(path.join(outputDirectoryPath, `${key}.bin`), value.bytecode);
            fs.writeFile(path.join(outputDirectoryPath, `${key}.abi`), value.interface);
        }
    });
});
