# solc-cli

[![npm](https://img.shields.io/npm/v/solc-cli.svg?maxAge=2592000)](https://www.npmjs.com/package/solc-cli)  
[![Build Status](https://travis-ci.org/InsidersByte/solc-cli.svg?branch=master)](https://travis-ci.org/InsidersByte/solc-cli)  
[![Dependency Status](https://david-dm.org/insidersbyte/solc-cli.svg)](https://david-dm.org/insidersbyte/solc-cli)
[![peerDependency Status](https://david-dm.org/insidersbyte/solc-cli/peer-status.svg)](https://david-dm.org/insidersbyte/solc-cli#info=peerDependencies)
[![devDependency Status](https://david-dm.org/insidersbyte/solc-cli/dev-status.svg)](https://david-dm.org/insidersbyte/solc-cli#info=devDependencies)

[![NPM](https://nodei.co/npm/solc-cli.png?downloads=true&downloadRank=true)](https://nodei.co/npm/solc-cli/)

Command line interface for https://github.com/ethereum/solc-js

## Installation

```bash
$ npm install --save-dev solc solc-cli
```

> Solc is a [peer dependency](https://nodejs.org/en/blog/npm/peer-dependencies/) so needs to be installed alongside this cli

## Usage

```bash
$ solc [options] [files]
```

## Examples

**Single File**

```bash
solc example.sol
```

**Multiple Files**

```bash
solc example.sol anotherExample.sol
```

**Glob**

```bash
solc *.sol
```

> Uses https://github.com/isaacs/node-glob

## Options

```bash
$ solc --name=value
```

| Option   | Default     | Description                                 |
|----------|-------------|---------------------------------------------|
| out-dir  | ./contracts | Output directory for the compiled contracts |
| optimise | null        | If present activates the solc optimiser     |
| debug    | null        | If present shows the debug messages         |
