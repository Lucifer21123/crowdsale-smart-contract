# off-chain to on-chain crowdsale smart contract

<img src="https://img.shields.io/badge/solidity-6.7-green" />

<i> Jump start your smart contract development with a working example of a crowdsale contract</i>. This code is a simple example of an Crowdsale smart contract that also pulls data from outside of the chain with <a href="https://chain.link/">Chainlink</a>. You could also just build on top of this.

## Install

Be sure to install truffle, also have ganache-cli local blockchain running.
```bash
npm i -g truffle
npm i -g ganache-cli

cp .env.example .env
```

## Deploy
```bash
ganache-cli -l 80000000000
```

In another console, at the root of the project directory (building will compile and migrate the contract):
```bash
npm run build
```

To edit the logic of your crowdsale (don't forget it's immutable!), simply edit the function <strong>_getTokenAmount(uin256 weiAmount)</strong> in <i>crowdsale_contract.sol</i>
```solidity
function _getTokenAmount(uint256 weiAmount) internal view override returns (uint256) {
        
  //add logic here if needed
		
  return p_rate.mul(weiAmount);
}
```
<strong>Important note</strong>: the aggregrated TWAP value is coded to work with the Rinkeby network, simply obtain the address of a contract in the network you require, check out the constructor of the contract.

Before deploying the token, be sure you edit /migrations/2_deploy.js const values or simply edit the .env file (.env.example template provided)

## Test

Tests are run with <i>mocha</i> and <i>chai</i>, you should add your own test suite with your current dev.
```bash
npm run test
```

## License
```text
MIT License

Copyright (c) 2021 SKITSC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Disclaimer: _This is not an officially supported SKITSC products._
