App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load spots.
    $.getJSON('../spots.json', function(data) {
      var spotsRow = $('#spotsRow');
      var spotTemplate = $('#spotTemplate');

      for (i = 0; i < data.length; i ++) {
        spotTemplate.find('.panel-title').text(data[i].name);
        spotTemplate.find('img').attr('src', data[i].picture);
        spotTemplate.find('.availability').text(data[i].availability);
        spotTemplate.find('.spot-price').text(data[i].price);
        spotTemplate.find('.spot-location').text(data[i].location);
        spotTemplate.find('.btn-rent').attr('data-id', data[i].id);

        spotsRow.append(spotTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Rent.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var RentalArtifact = data;
      App.contracts.Rent = TruffleContract(RentalArtifact);

      // Set the provider for our contract
      App.contracts.Rent.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markRented();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-rent', App.handleRented);
  },

  markRented: function() {
    var rentalInstance;

    App.contracts.Rent.deployed().then(function(instance) {
      rentalInstance = instance;

      return rentalInstance.getDrivers.call();
    }).then(function(renters) {
      for (i = 0; i < renters.length; i++) {
        if (renters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-spot').eq(i).find('button').text('Rented').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleRented: function(event) {
    event.preventDefault();

    var spotId = parseInt($(event.target).data('id'));

    var rentalInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Rent.deployed().then(function(instance) {
        rentalInstance = instance;

        // Execute adopt as a transaction by sending account
        return rentalInstance.rentSpot(spotId, {from: account});
      }).then(function(result) {
        return App.markRented();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
};

$(function() {
  $(document).ready(function() {
    App.init();
    console.log("test");
  });
});
