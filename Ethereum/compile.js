const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname,'build');
const contractFileName = 'Product.sol';

//Delete the current build folder

fs.removeSync(buildPath);

const productPath = path.resolve(__dirname,"contract","OnlineStore.sol");
const source = fs.readFileSync(productPath,"utf8");

const input = {
    language: 'Solidity',
    sources: {},
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
};
input.sources[contractFileName] = {
    content: source
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts[contractFileName];

//Creates the build folder
fs.ensureDirSync(buildPath);

for(let contract in contracts) {
    if(contracts.hasOwnProperty(contract)) {
        const element  = contracts[contract];
        fs.outputJsonSync(
            path.resolve(buildPath,`${contract}.json`),
            contracts[contract]
        );
    }
}