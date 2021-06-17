// SPDX-License-Identifier: MIT

/**
 * File Name: crowdsale_contract.sol
 * File Description: test crowdsale smart contract
 * Author(s): Iyad Al-Kassab & Samy Kalem @ SKITSC
 * Date: 06-05-2021
 */
 
pragma solidity ^0.6.7;

///aggregator abstract interface for price feeds
import "./chainlink/AggregatorV3Interface.sol";

///definition of ERC20 standard
import "./token/ERC20/ERC20.sol";

///implementation of role based action (owner API)
import "./access/Roles.sol";

///implementation of crowdsale
import "./crowdsale/Crowdsale.sol";

contract my_crowdsale_token is Context, ERC20 {
    
    constructor
        (
        ////ERC20 data
            string memory name,
            string memory symbol,
            uint8 decimals,
            uint256 init_supply
        ) public ERC20(name, symbol, decimals) { //ERC20 constructor
        
            _mint(_msgSender(), init_supply);
        }
}

contract my_crowdsale_contract is Crowdsale {
    
    ////defining and implementing private owner role
    using Roles for Roles.Role;
    Roles.Role private p_owner;
    
    ////defining current rate
    uint256 private p_rate;
    
    ////aggregator initialization for ETH/USD price
    AggregatorV3Interface internal priceFeed;
    
    ////constructor
    constructor
        (
        ////crowsale data
            uint256 init_rate,
            address payable wallet,
            IERC20 token_addr,
            address owner_addr
        )
        Crowdsale(init_rate, wallet, token_addr) public { //crowdsale constructor
            
            p_owner.add(owner_addr);
            p_rate = init_rate; //initial rate 1:1
            
            /**
            * Network: Rinkeby
            * Aggregator: ETH/USD
            * Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
            */
            priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e); ///testing offchain data
        }

    uint80 private _roundID;
    int private last_eth_usd_price;
    uint private _startedAt;
    uint private _timeStamp;
    uint80 private _answeredInRound;

    //view function to obtain price from chainlink
    function getThePrice() public returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        _roundID = roundID;
        last_eth_usd_price = price;
        _startedAt = startedAt;
        _timeStamp = timeStamp;
        _answeredInRound = answeredInRound;

        return last_eth_usd_price;
    }
    
    function f_set_rate(uint256 newRate) public {
        p_rate = newRate;
    }

    function f_view_rate() public view returns (uint256) {
        return p_rate;
    }

    function _getTokenAmount(uint256 weiAmount) internal view override returns (uint256) {
        
        //add logic here if needed
		
		//here
		
        return p_rate.mul(weiAmount);
    }
}