pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rent.sol";

contract TestRent {
  // The address of the rent contract to be tested
  Rent rent = Rent(DeployedAddresses.Rent());

  //The id of the spot that will be used for testing
  uint expectedSpotId = 8;

  //The expected renter of rented spot is this contract
  address expectedRenter = address(this);

  //Testing the rentSpot() function
  function testUserCanRentSpot() public {
    uint returnedId = rent.rentSpot(expectedSpotId);

    Assert.equal(returnedId, expectedSpotId, "Adoption of the expected spot should match what is returned.");
  }

  //Testing retrevial of a single spot's retnter
  function testGetRentersAddressBySpotId() public {
    address renter = rent.drivers(expectedSpotId);

    Assert.equal(renter, expectedRenter, "Renter of the expected spot should be this contract");
  }

  //Testing retrevial of all spot renters
  function testGetRenterAddressBySpotIdInArray() public {
    //Store renters in memory rather than contract's storage
    address[100] memory renters = rent.getDrivers();

    Assert.equal(renters[expectedSpotId], expectedRenter, "Owner of the expected spot should be this contract");
  }
}
