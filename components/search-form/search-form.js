// components/search-form/search-form.js
const tripService = require('../../services/tripService.js')
const locationService = require('../../services/locationService.js')

Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    countryCities: [],
    departureCountryId: 0,
    departureCityId: 0,
    arrivalCountryId: 0,
    arrivalCityId: 0,
    isLoading: false,
  },

  ready: function () {
    const self = this;
    locationService.getCountryCities((res) =>{
      self.setData({
        'countryCities': res,
      })
    });
  },

  /**
   * Component methods
   */
  methods: {
    onDepartureLocationSeleted: function(e) {
      this.setData({
        'departureCountryId': e.detail.countryId,
        'departureCityId': e.detail.cityId,
      })
    },

    onArrivalLocationSeleted: function(e) {
      this.setData({
        'arrivalCountryId': e.detail.countryId,
        'arrivalCityId': e.detail.cityId,
      })
    },

    onFormSubmit: function(e) {
      this.setData({'isLoading': true});
      tripService.searchTrips(
        this.data.departureCountryId, 
        this.data.departureCityId, 
        this.data.arrivalCountryId, 
        this.data.arrivalCityId, 0, (res) => {
        this.triggerEvent('onSearchFormSubmit', {
          trips: res,
        });
        this.setData({
          'isLoading': false,
        })
      });

    },

    onFormReset: function(e) {
      
    }



  }
})
