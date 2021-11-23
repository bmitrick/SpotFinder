pragma solidity ^0.5.0;

contract Rent {
  address[100] public drivers;

  //Renting a spot
  function rentSpot(uint spotId) public returns (uint) {
    require (spotId >= 0 && spotId <= 99);

    drivers[spotId] = msg.sender;

    return spotId;
  }

  //Retrieving the drivers
  function getDrivers() public view returns (address[100] memory) {
    return drivers;
  }
}
