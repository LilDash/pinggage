// components/location-picker/location-picker.js
Component({
  /**
   * Component properties
   */
  properties: {
    title: String
  },

  /**
   * Component initial data
   */
  data: {
    locationsData: [
      [
        {
          id: 0,
          name: "China",
          displayName: "中国",
          cities: [
            {
              id: 0,
              name: "Guangzhou",
              displayName: "广州",
            },
            {
              id: 1,
              name: "Shanghai",
              displayName: "上海",
            },
            {
              id: 2,
              name: "Shenzhen",
              displayName: "深圳",
            },
          ]
        },
        {
          id: 2,
          name: "Thailand",
          displayName: "泰国",
          cities: [
            {
              id: 0,
              name: "Bangkok",
              displayName: "曼谷",
            },
            {
              id: 1,
              name: "Phuket",
              displayName: "普吉",
            },
            {
              id: 2,
              name: "Chiangmai",
              displayName: "清迈",
            },
          ]

        },
        {
          id: 3,
          name: "Germany",
          displayName: "德国",
          cities: [
            {
              id: 0,
              name: "Berlin",
              displayName: "柏林",
            },
          ]
        },
        {
          id: 4,
          name: "Russia",
          displayName: "俄罗斯",
          cities: [
            {
              id: 0,
              name: "Moscow",
              displayName: "莫斯科",
            },
            {
              id: 1,
              name: "SantPetersburg",
              displayName: "圣彼得堡",
            },
          ]
        }
      ]
    ],
    locationArray: [['不限', '中国', '泰国', '德国', '俄罗斯'], ['不限', '广州', '深圳', '上海']],
    locationObjectArray: [
      
    ],
    locationIndex: [0, 0],
  },

  /**
   * Component methods
   */
  methods: {

  }
})
