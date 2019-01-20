// components/search-form/search-form.js
const tripService = require('../../services/tripService.js')
const locationService = require('../../services/locationService.js')

Component({
  /**
   * Component properties
   */
  properties: {
    page: Number,
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
      const searchCriteria = {
        depCountryId: this.data.departureCountryId, 
        depCityId: this.data.departureCityId,
        arrCountryId: this.data.arrivalCountryId, 
        arrCityId: this.data.arrivalCityId,
        page: 0,
      }
      tripService.searchTrips(searchCriteria, (res) => {
        this.triggerEvent('onSearchFormSubmit', {
          searchCriteria: searchCriteria,
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
