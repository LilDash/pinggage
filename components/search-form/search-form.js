// components/search-form/search-form.js

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

  }
})
