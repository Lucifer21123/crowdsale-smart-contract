/**
 * File Name: 2_deploy.js
 * File Description: deploy smart contract to local test net (ganache)
 * Author(s): Iyad Al-Kassab & Samy Kalem @ SKITSC
 * Date: 06-05-2021
 */

const ERC20 = artifacts.require("my_crowdsale_token");
const ERC20_crowdsale = artifacts.require("my_crowdsale_contract");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ERC20, 'My Token', 'MYT', 18, '10000000000000000000000');
  const token = await ERC20.deployed();
  
  await deployer.deploy(ERC20_crowdsale, 1, accounts[0], token.address, accounts[0]);
  const crowdsale = await ERC20_crowdsale.deployed();

  token.transfer(crowdsale.address, await token.totalSupply())
};