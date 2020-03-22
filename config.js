
var CONFIG = {
   customTheme: null, // CUSTOM_THEMES.TRANSPARENT, CUSTOM_THEMES.MATERIAL, CUSTOM_THEMES.MOBILE, CUSTOM_THEMES.COMPACT, CUSTOM_THEMES.HOMEKIT, CUSTOM_THEMES.WINPHONE, CUSTOM_THEMES.WIN95
   transition: TRANSITIONS.ANIMATED_GPU, //ANIMATED or SIMPLE (better perfomance)
   entitySize: ENTITY_SIZES.NORMAL, //SMALL, BIG are available
   tileSize: 150,
   tileMargin: 6,
   serverUrl: 'http://' + location.hostname + ':8123',
   wsUrl: 'ws://' + location.hostname + ':8123/api/websocket',
   authToken: null, // optional long-lived token (CAUTION: only if TileBoard is not exposed to the internet)
   debug: false, // Prints entities and state change info to the console.
   pingConnection: true, //ping connection to prevent silent disconnections

   // next fields are optional
   events: [],
   timeFormat: 24,
   menuPosition: MENU_POSITIONS.LEFT, // or BOTTOM
   hideScrollbar: false, // horizontal scrollbar
   groupsAlign: GROUP_ALIGNS.HORIZONTALLY, // or VERTICALLY
   onReady: function () {},

   header: { // https://github.com/resoai/TileBoard/wiki/Header-configuration
      styles: {
         padding: '30px 130px 0',
         fontSize: '28px'
      },
      right: [],
      left: [
         {
            type: HEADER_ITEMS.DATETIME,
            dateFormat: 'EEEE, LLLL dd', //https://docs.angularjs.org/api/ng/filter/date
         }
      ]
   },

   /*screensaver: {// optional. https://github.com/resoai/TileBoard/wiki/Screensaver-configuration
      timeout: 300, // after 5 mins of inactive
      slidesTimeout: 10, // 10s for one slide
      styles: { fontSize: '40px' },
      leftBottom: [{ type: SCREENSAVER_ITEMS.DATETIME }], // put datetime to the left-bottom of screensaver
      slides: [
         { bg: 'images/bg1.jpeg' },
         {
            bg: 'images/bg2.png',
            rightTop: [ // put text to the 2nd slide
               {
                  type: SCREENSAVER_ITEMS.CUSTOM_HTML,
                  html: 'Welcome to the <b>TileBoard</b>',
                  styles: { fontSize: '40px' }
               }
            ]
         },
         { bg: 'images/bg3.jpg' }
      ]
   },*/

   pages: [

        // ------------ page-1 is the home page ---------------
      {
         title: 'Main page',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-home-outline', // home icon
         groups: [

            {
               title: 'Doors and Windows',
               width: 2,
               height: 3,
               items: [
                  
                  {
                     position: [0, 0],
                     type: TYPES.SENSOR_ICON,
                     title: 'Kitchen Slider',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-bell',
                        off: 'mdi-bell-off',
                     },
                  },

                  {
                     position: [1, 0],
                     width: 1,
                     height: 1,
                     title: 'Slider Sensor Battery',
                     subtitle: '',
                     type: TYPES.GAUGE,
                     id: 'sensor.ecolink_door_window_sensor_battery_level',
                     value: function(item, entity){
                        return entity.state;
                     },
                     settings: {
                        size: 100, // Defaults to 50% of either height or width, whichever is smaller
                        type: 'arch', // Options are: 'full', 'semi', and 'arch'. Defaults to 'full'
                        min: 0, // Defaults to 0
                        max: 100, // Defaults to 100
                        cap: 'round', // Options are: 'round', 'butt'. Defaults to 'butt'
                        thick: 6, // Defaults to 6
                        //label: 'Door Sensor Battery', // Defaults to undefined
                        append: '@attributes.unit_of_measurement', // Defaults to undefined
                        //prepend: '%', // Defaults to undefined
                        duration: 1500, // Defaults to 1500ms
                        thresholds: { 0: { color: 'black'}, },  // Defaults to undefined
                        labelOnly: false, // Defaults to false
                        foregroundColor: 'rgba(0, 150, 136, 1)', // Defaults to rgba(0, 150, 136, 1)
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Defaults to rgba(0, 0, 0, 0.1)
                        fractionSize: 0, // Number of decimal places to round the number to. Defaults to current locale formatting
                     },
                  },

                ]        // end of items for Doors and Windows
            },           // end of Doors and Windows on Main page
   
        // ------------ page-2 is Hue Lights ---------------

            {
               title: 'Weather',
               width: 2,
               height: 3,
               items: [
                  
                  {
                     position: [0, 0],
                     width: 1,
                     height: 1,
                     title: 'Outside Temp',
                     subtitle: '',
                     type: TYPES.GAUGE,
                     id: 'sensor.outtemp',
                     value: function(item, entity){
                        return entity.state;
                     },
                     settings: {
                        size: 100, // Defaults to 50% of either height or width, whichever is smaller
                        type: 'arch', // Options are: 'full', 'semi', and 'arch'. Defaults to 'full'
                        min: 0, // Defaults to 0
                        max: 100, // Defaults to 100
                        cap: 'round', // Options are: 'round', 'butt'. Defaults to 'butt'
                        thick: 6, // Defaults to 6
                        //label: 'Door Sensor Battery', // Defaults to undefined
                        append: '@attributes.unit_of_measurement', // Defaults to undefined
                        //prepend: '%', // Defaults to undefined
                        duration: 1500, // Defaults to 1500ms
                        thresholds: { 0: { color: 'black'}, },  // Defaults to undefined
                        labelOnly: false, // Defaults to false
                        foregroundColor: 'rgba(0, 150, 136, 1)', // Defaults to rgba(0, 150, 136, 1)
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Defaults to rgba(0, 0, 0, 0.1)
                        fractionSize: 0, // Number of decimal places to round the number to. Defaults to current locale formatting
                     },
                  },

                ]        // end of items for Doors and Windows
            },           // end of Doors and Windows on Main page

         ]               // end of groups on Main page
      },                  // end of Main Page
      {
         title: 'Hue Lights',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-lightbulb-on', // home icon
         groups: [

            {
               title: 'Lights',
               width: 2,
               height: 3,
               items: [

                  {
                     position: [0, 0],
                     title: 'Lightstrip',
                     subtitle: 'Family Room',
                     id: 'light.hue_lightstrip',
                     type: TYPES.LIGHT,
                     states: { on: "On", off: "Off" },
                     icons: { on: "mdi-lightbulb-on", off: "mdi-lightbulb", },
                     colorpicker: false
                  },
                  
                  {
                     position: [1, 0],
                     title: 'Desk',
                     subtitle: 'Office',
                     id: 'light.desk',
                     type: TYPES.LIGHT,
                     states: { on: "On", off: "Off" },
                     icons: { on: "mdi-lightbulb-on", off: "mdi-lightbulb", },
                     colorpicker: false
                  },
                  
                  {
                     position: [0, 1],
                     title: 'Overhead',
                     subtitle: 'Baseball Room',
                     id: 'light.overhead',
                     type: TYPES.LIGHT,
                     states: { on: "On", off: "Off" },
                     icons: { on: "mdi-lightbulb-on", off: "mdi-lightbulb", },
                     colorpicker: false
                  },
                  
                  {
                     position: [1, 1],
                     title: 'Corner',
                     subtitle: 'Master Bedroom',
                     id: 'light.corner_lamp',
                     type: TYPES.LIGHT,
                     states: { on: "On", off: "Off" },
                     icons: { on: "mdi-lightbulb-on", off: "mdi-lightbulb", },
                     colorpicker: false
                  },

                ]        // end of items for Lights group
            },           // end of Lights group on Lights page

         ]               // end of groups on Main page
      }                  // end of Lights Page

   ],                    // end of pages
}                        // end of CONFIG
