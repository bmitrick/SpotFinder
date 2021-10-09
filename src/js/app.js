App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../spots.json', function(data) {
      var spotsRow = $('#spotRow');
      var spotTemplate = $('#spotTemplate');

      for (i = 0; i < data.length; i ++) {
        spotTemplate.find('.panel-title').text(data[i].lotName);
        spotTemplate.find('img').attr('src', data[i].picture);
        spotTemplate.find('.spot-price').text(data[i].price);
        spotTemplate.find('.spot-address').text(data[i].address);
        spotTemplate.find('.btn-rent').attr('data-id', data[i].id);

        spotsRow.append(spotTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    /*
     * Replace me...
     */

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
