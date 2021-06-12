// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RasilToken is ERC20{
    
    mapping(address=>bool) public owner;
    
    constructor() ERC20('RasilToken', 'RBT'){
        owner[msg.sender] = true;
    }
    
    function mintToken(address account, uint amount) public{
        _mint(account,amount);
    }
   
}
