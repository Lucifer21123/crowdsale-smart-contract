/**
 * File Name: 2_deploy.js
 * File Description: deploy smart contract to local test net (ganache)
 * Author(s): Iyad Al-Kassab & Samy Kalem @ SKITSC
 * Date: 06-05-2021
 */

const ERC20 = artifacts.require("my_crowdsale_token");
const ERC20_crowdsale = artifacts.require("my_crowdsale_contract");

require('dotenv').config({path:__dirname + "/./../../.env"});

const token_name = process.env.TOKEN_NAME || "My Token";
const token_symbol = process.env.TOKEN_SYMBOL || "MYT";
const token_decimals = process.env.TOKEN_DECIMALS || 18;
const token_supply = process.env.TOKEN_INIT_SUPPLY || "10000000000000000000000";

module.exports = async function (deployer, network, accounts) {

  let addr = await web3.eth.getAccounts();

  await deployer.deploy(ERC20, token_name, token_symbol, token_decimals, token_supply);
  const token = await ERC20.deployed();
  
  await deployer.deploy(ERC20_crowdsale, 1, addr[0], token.address, addr[0]);
  const crowdsale = await ERC20_crowdsale.deployed();

  token.transfer(crowdsale.address, await token.totalSupply());

  console.log("These addresses are in your Ganache Front end...");
  console.log(addr);
};