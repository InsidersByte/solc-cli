# solc-cli

[![Build Status](https://travis-ci.org/InsidersByte/solc-cli.svg?branch=master)](https://travis-ci.org/InsidersByte/solc-cli)  
[![Dependency Status](https://david-dm.org/insidersbyte/solc-cli.svg)](https://david-dm.org/insidersbyte/solc-cli)
[![devDependency Status](https://david-dm.org/insidersbyte/solc-cli/dev-status.svg)](https://david-dm.org/insidersbyte/solc-cli#info=devDependencies)

Command line interface for https://github.com/ethereum/solc-js

## Installation

```bash
$ npm install --save-dev solc-cli
```

## Usage

```bash
$ solc [options] <file> 
```

> Only one file is supported at the moment

## Options

```bash
$ solc --name=value
```

| Option   | Default     | Description                                 |
|----------|-------------|---------------------------------------------|
| out-dir  | ./contracts | Output directory for the compiled contracts |
| optimise | null        | If present activate the solc optimiser      |
