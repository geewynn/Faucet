// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "./Owned.sol";
import "./Logger.sol";

import "./IFaucet.sol";


contract Faucet is Owned, IFaucet {
    uint public numOfFunders;
    mapping(address => bool) private funders;
    mapping(uint => address) private lutFunders;

    modifier limitWithdrawal(uint withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000 ether, 
            "Withdraw amount greater than 0.1 ether"
            );
            _;
    }

    receive() external payable {}

    function addFunds() override public payable {
        address funder = msg.sender;

        if (!funders[funder]) {

            uint index = numOfFunders++;
            funders[funder] =true;
            lutFunders[index] = funder;
        }
    }

    // withdraw function
    function withdraw(uint withdrawAmount) override  external limitWithdrawal(withdrawAmount) {
        payable (msg.sender).transfer(withdrawAmount);
    }

    // get all founders
    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);
        for (uint i =0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }

    // return index of funders
    function getFunderAtIndex(uint8 index) external view returns(address) {
        return lutFunders[index];
    }

}

// const instance = await Faucet.deployed()
// instance.addFunds({value:"2", from: accounts[0]})
// instance.addFunds({value:"2", from: accounts[1]})