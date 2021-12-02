// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

abstract contract Logger {
    function emitLog() public pure virtual returns(bytes32);
}