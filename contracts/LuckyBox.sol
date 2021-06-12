// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./RasilToken.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";



contract LuckyBox {
    string public name = "Decentralized Market Place";

    RasilToken private rasilToken;

    mapping(address=>bool) public owner;

    uint private balance;

    uint256 private tokenMultiple;


    // enum PrizePool   {   }
    constructor(RasilToken tokenAddress){
        rasilToken = RasilToken(tokenAddress);
        tokenMultiple = 1000;
    }

  function purchaseTokens() public payable{
        require(msg.value>0,'Insufficient ETH');
        balance += msg.value;
        uint amount = SafeMath.mul(msg.value,tokenMultiple);
        rasilToken.mintToken(msg.sender,amount);
    }


}
