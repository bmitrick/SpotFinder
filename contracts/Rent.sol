pragma solidity ^0.5.0;

contract Rent {
  address[16] public drivers;

  //Renting a spot
  function rentSpot(uint spotId) public returns (uint) {
    require (spotId >= 0 && spotId <= 15);

    drivers[spotId] = msg.sender;

    return spotId;
  }

  //Retrieving the drivers
  function getDrivers() public view returns (address[16] memory) {
    return drivers;
  }
}
