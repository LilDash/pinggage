// components/location-picker/location-picker.js



Component({

  /**
   * Component properties
   */
  properties: {
    title: String,
    locations: {
      type: Array,
      observer: function (newVal, oldVal, changedPath) {
        this._initialLocationArray(newVal);        
      }
    },
  },

  /**
   * Component initial data
   */
  data: {
    locationArray: [[], []],
    locationIndex: [0, 0],
    country: "",
    city: "",
  },

  ready: function () {
    
  },

  /**
   * Component methods
   */
  methods: {
    onChange: function (e) {
      const countryIndex = e.detail.value[0];
      const cityIndex = e.detail.value[1];
      this.setData({
        country: this.properties.locations[countryIndex].countryDisplayName,
        city: this.properties.locations[countryIndex].cities[cityIndex].cityDisplayName,
      });

      this.triggerEvent('onLocationChange', {
        countryId: this.properties.locations[countryIndex].countryId,
        cityId: this.properties.locations[countryIndex].cities[cityIndex].cityId,
      });
    },

    onColumnChange: function (e) {
      if (e.detail.column == 0) {
        // country on change
        this._updateLocationArray(e.detail.value);
      }

    },

    _initialLocationArray: function(locationData) {
      const countriesArray = [];
      const citiesArray = [];
      for(var i in locationData) {
        countriesArray.push(locationData[i].countryDisplayName);
      }
      const locationArray = [countriesArray, citiesArray];
      this.setData({
        'locationArray': locationArray,
      });
      if (countriesArray.length > 0) {
        this._updateLocationArray(0);
      }
    },

    _updateLocationArray: function (countryIndex) {
      const locationArray = this.data.locationArray;
      const newCitiesArray = [];
      const country = this.properties.locations[countryIndex];
      for (var i in country.cities) {
        newCitiesArray.push(country.cities[i].cityDisplayName);
      }
      locationArray[1] = newCitiesArray;
      const locationIndex = [countryIndex, 0];
      this.setData({
        'locationArray': locationArray,
        'locationIndex': locationIndex,
      })
    }
  }
})
