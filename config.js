
//
// color codes - https://www.rapidtables.com/web/color/green-color.html
//               https://www.rapidtables.com/web/color/red-color.html
//

var CONFIG = {
   customTheme: null, // CUSTOM_THEMES.TRANSPARENT, CUSTOM_THEMES.MATERIAL, CUSTOM_THEMES.MOBILE, CUSTOM_THEMES.COMPACT, CUSTOM_THEMES.HOMEKIT, CUSTOM_THEMES.WINPHONE, CUSTOM_THEMES.WIN95
   transition: TRANSITIONS.ANIMATED_GPU, //ANIMATED or SIMPLE (better perfomance)
   entitySize: ENTITY_SIZES.NORMAL, //SMALL, BIG are available
   tileSize: 100,
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
         //padding: '10px 130px 0',
         //fontSize: '16px'
         fontSize: '14px'
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
               title: 'Summary',
               width: 1,
               height: 4,
               items: [

                  // ---- this gives a total of doors open ----
                  {
                     position: [0, 0],
                     type: TYPES.CUSTOM,
                     id: { },
                     title: 'Doors',
                     icons: {
                        1: 'mdi-numeric-one-circle',
                        2: 'mdi-numeric-two-circle',
                        3: 'mdi-numeric-three-circle',
                        4: 'mdi-numeric-four-circle'
                     },
                     state: function() {
                        var sensors = [
                                    "&binary_sensor.ecolink_door_window_sensor_sensor.state", 
                                    "&binary_sensor.ecolink_door_window_sensor_sensor_2.state", 
                                    "&binary_sensor.ecolink_door_window_sensor_sensor_3.state",
                                     ];
                        var count = 0;
                        for(i=0; i<sensors.length; i++) {
                            if (this.parseFieldValue(sensors[i]) == "on") { count++; }
                        }
                        if (count > 0) { return count; } else { return "ok"; }
                     },
                     customStyles: function(item, entity){
                        var sensors = [
                                    "&binary_sensor.ecolink_door_window_sensor_sensor.state", 
                                    "&binary_sensor.ecolink_door_window_sensor_sensor_2.state", 
                                    "&binary_sensor.ecolink_door_window_sensor_sensor_3.state",
                                     ];
                        var count = 0;
                        for(i=0; i<sensors.length; i++) {
                            if (this.parseFieldValue(sensors[i]) == "on") { count++; }
                        }
                        if (count > 0)       {return { 'backgroundColor': '#B80D0D', };}
                        else if (count == 0) {return { 'backgroundColor': '#2E8B57', };}
                        else                 {return { 'backgroundColor': '#708090', };}
                      },
                     icons: function(item, entity){
                        var sensors = [
                                    "&binary_sensor.ecolink_door_window_sensor_sensor.state", 
                                    "&binary_sensor.ecolink_door_window_sensor_sensor_2.state", 
                                    "&binary_sensor.ecolink_door_window_sensor_sensor_3.state",
                                     ];
                        var count = 0;
                        for(i=0; i<sensors.length; i++) {
                            if (this.parseFieldValue(sensors[i]) == "on") { count++; }
                        }
                        if (count > 0) { return 'mdi-bell'; }
                     },
                  },

                  // ---- this gives a total of windows open         ----
                  // ---- press on the icon to open the windows page ----

                  {
                     position: [0, 1],
                     type: TYPES.CUSTOM,
                     id: { },
                     title: 'Lights',
                     action: function(e) {
                       window.openPage(CONFIG.pages[1]);
                     },
                     icons: {
                        1: 'mdi-numeric-one-circle',
                        2: 'mdi-numeric-two-circle',
                        3: 'mdi-numeric-three-circle',
                        4: 'mdi-numeric-four-circle'
                     },
                     state: function() {
                        var sensors = [
                                    "&light.hue_lightstrip.state",
                                    "&light.desk.state",
                                    "&light.overhead.state",
                                    "&light.big_lamp.state",
                                    "&light.corner.state",
                                     ];
                        var count = 0;
                        for(i=0; i<sensors.length; i++) {
                            if (this.parseFieldValue(sensors[i]) == "on") { count++; }
                        }
                        if (count > 0) { return count; } else { return "off"; }
                     },
                     customStyles: function(item, entity){
                        var sensors = [
                                    "&light.hue_lightstrip.state",
                                    "&light.desk.state",
                                    "&light.overhead.state",
                                    "&light.big_lamp.state",
                                    "&light.corner.state",
                                     ];
                        var count = 0;
                        for(i=0; i<sensors.length; i++) {
                            if (this.parseFieldValue(sensors[i]) == "on") { count++; }
                        }
                        if (count > 0)       {return { 'backgroundColor': '#B80D0D', };}
                        else if (count == 0) {return { 'backgroundColor': '#2E8B57', };}
                        else                 {return { 'backgroundColor': '#708090', };}
                      },
                     icons: function(item, entity){
                        var sensors = [
                                    "&light.hue_lightstrip.state",
                                    "&light.desk.state",
                                    "&light.overhead.state",
                                    "&light.big_lamp.state",
                                    "&light.corner.state",
                                     ];
                        var count = 0;
                        for(i=0; i<sensors.length; i++) {
                            if (this.parseFieldValue(sensors[i]) == "on") { count++; }
                        }
                        if (count > 0) { return 'mdi-bell'; }
                     },
                  },

                ]        // end of items for Doors and Windows group
            },

            {
               title: 'Doors and Windows',
               width: 2,
               height: 4,
               items: [

                  {
                     position: [0, 0],
                     type: TYPES.SENSOR_ICON,
                     title: 'Slider',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-bell',
                        off: 'mdi-bell-off',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [0, 1],
                     type: TYPES.SENSOR_ICON,
                     title: 'Front',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_2',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-bell',
                        off: 'mdi-bell-off',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [1, 0],
                     type: TYPES.SENSOR_ICON,
                     title: 'Laundry',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_3',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-bell',
                        off: 'mdi-bell-off',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },


                  {
                     position: [0, 2],
                     type: TYPES.SENSOR_ICON,
                     title: 'FR Left',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_5',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-bell',
                        off: 'mdi-bell-off',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [1, 2],
                     type: TYPES.SENSOR_ICON,
                     title: 'FR Mid',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_6',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-bell',
                        off: 'mdi-bell-off',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [0, 3],
                     type: TYPES.SENSOR_ICON,
                     title: 'FR Right',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_7',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-bell',
                        off: 'mdi-bell-off',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },



                  {
                     position: [1, 1],
                     type: TYPES.SENSOR_ICON,
                     title: 'Kitchen',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_4',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-bell',
                        off: 'mdi-bell-off',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                ]        // end of items for Doors and Windows group
            },           // end of Doors and Windows group on Main page
     
            //---- second group on this page ----

            {
               title: 'Weather',
               width: 2,
               height: 4,
               items: [
                
                {
                   position: [0, 0],
                   type: TYPES.SENSOR,
                   title: 'Outdoor',
                   id: 'sensor.outtemp',
                   unit: 'F', // override default entity unit
                   state: false, // hiding state
                   filter: function (value) { // optional
                      var num = parseFloat(value);
                      return num && !isNaN(num) ? num.toFixed(1) : value;
                   },
                   customStyles: function(item, entity){
                     if (entity.state > 85)      {return {'backgroundColor': '#B80D0D',  };}
                     else if (entity.state > 60) {return {'backgroundColor': '#2E8B57',  };}
                     else if (entity.state > 32) {return {'backgroundColor': 'darkblue', };}
                     else if (entity.state < 32) {return {'backgroundColor': 'blue',     };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                {
                   position: [0, 1],
                   type: TYPES.SENSOR,
                   title: 'Wind Gust',
                   id: 'sensor.wind',
                   unit: 'mph', // override default entity unit
                   state: false, // hiding state
                   filter: function (value) { // optional
                      var num = parseFloat(value);
                      return num && !isNaN(num) ? num.toFixed(0) : value;
                   },
                   customStyles: function(item, entity){
                     if (entity.state > 40) {return {'backgroundColor': '#B80D0D',  };}
                     else if (entity.state > 20)      {return {'backgroundColor': 'salmon', };}
                     else if (entity.state > 10) {return {'backgroundColor': 'darkblue', };}
                     else if (entity.state > 0)  {return {'backgroundColor': '#2E8B57',  };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                {
                   position: [0, 2],
                   type: TYPES.SENSOR,
                   title: 'Rain',
                   id: 'sensor.dayrain',
                   unit: 'in', // override default entity unit
                   state: false, // hiding state
                   filter: function (value) { // optional
                      var num = parseFloat(value);
                      return num && !isNaN(num) ? num.toFixed(2) : value;
                   },
                   customStyles: function(item, entity){
                     if (entity.state > 2) {return {'backgroundColor': '#B80D0D',     };}
                     else if (entity.state > 1.0) {return {'backgroundColor': 'salmon', };}
                     else if (entity.state > 0.7)      {return {'backgroundColor': 'darkblue',  };}
                     else if (entity.state > 0.3)  {return {'backgroundColor': 'blue',  };}
                     else if (entity.state > 0)  {return {'backgroundColor': 'green',  };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                ]        // end of items for Doors and Windows
              },         // end of Weather group

        ],  // end of groups on Main page
      },    // end of Main page





      // ---------- page 2 is Hue Lights -----------------

      {
         title: 'Hue Lights',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-lightbulb-on', // home icon
         groups: [

            {
               title: 'Lights',
               width: 2,
               height: 4,
               items: [
                  {
                     position: [0, 0],
                     title: 'Lightstrip',
                     subtitle: 'FR',
                     id: 'light.hue_lightstrip',
                     type: TYPES.LIGHT,
                     states: { on: "On", off: "Off" },
                     icons: { on: "mdi-lightbulb-on", off: "mdi-lightbulb", },
                     colorpicker: false,
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'off') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#708090',};}
                    }
                  },
                  
                  {
                     position: [1, 0],
                     title: 'Desk',
                     subtitle: 'Office',
                     id: 'light.desk',
                     type: TYPES.LIGHT,
                     states: { on: "On", off: "Off" },
                     icons: { on: "mdi-lightbulb-on", off: "mdi-lightbulb", },
                     colorpicker: false,
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'off') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#708090',};}
                    }
                  },
                  
                  {
                     position: [0, 1],
                     title: 'Overhead',
                     subtitle: 'Baseball Room',
                     id: 'light.overhead',
                     type: TYPES.LIGHT,
                     states: { on: "On", off: "Off" },
                     icons: { on: "mdi-lightbulb-on", off: "mdi-lightbulb", },
                     colorpicker: false,
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'off') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#708090',};}
                    }
                  },
                  
                  {
                     position: [1, 1],
                     title: 'Corner',
                     subtitle: 'Master Bedroom',
                     id: 'light.big_lamp',
                     type: TYPES.LIGHT,
                     states: { on: "On", off: "Off" },
                     icons: { on: "mdi-lightbulb-on", off: "mdi-lightbulb", },
                     colorpicker: false,
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'off') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#708090',};}
                    }
                  },
                  
                  {
                     position: [0, 2],
                     title: 'Living Room',
                     subtitle: 'Corner',
                     id: 'light.corner',
                     type: TYPES.LIGHT,
                     states: { on: "On", off: "Off" },
                     icons: { on: "mdi-lightbulb-on", off: "mdi-lightbulb", },
                     colorpicker: false,
                     customStyles: function(item, entity){
                        if (entity.state === 'on') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'off') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#708090',};}
                    }
                  },

                ]        // end of items for Lights group
            },           // end of Lights group on Lights page

         ]               // end of groups on Main page
      },                  // end of Lights Page


      // -------------- page 3 is battery status ------------------

      {
         title: 'Battery Status',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-battery', // home icon
         groups: [

            {
               title: 'Battery State',
               width: 2,
               height: 3,
               items: [
 
                {
                   position: [0, 0],
                   type: TYPES.SENSOR,
                   title: 'Slider',
                   id: 'sensor.ecolink_door_window_sensor_battery_level',
                   state: false, // hiding state
                   filter: function (value) { // optional
                      var num = parseFloat(value);
                      return num && !isNaN(num) ? num.toFixed(1) : value;
                   },
                   customStyles: function(item, entity){
                     if (entity.state > 80) {return {'backgroundColor': '#2E8B57',  };}
                     else if (entity.state > 50) {return {'backgroundColor': 'blue',     };}
                     else if (entity.state > 25) {return {'backgroundColor': 'darkblue', };}
                     else if (entity.state < 25) {return {'backgroundColor': '#B80D0D',  };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                {
                   position: [0, 1],
                   type: TYPES.SENSOR,
                   title: 'Laundry',
                   id: 'sensor.ecolink_door_window_sensor_battery_level_2',
                   state: false, // hiding state
                   filter: function (value) { // optional
                      var num = parseFloat(value);
                      return num && !isNaN(num) ? num.toFixed(1) : value;
                   },
                   customStyles: function(item, entity){
                     if (entity.state > 80) {return {'backgroundColor': '#2E8B57',  };}
                     else if (entity.state > 50) {return {'backgroundColor': 'blue',     };}
                     else if (entity.state > 25) {return {'backgroundColor': 'darkblue', };}
                     else if (entity.state < 25) {return {'backgroundColor': '#B80D0D',  };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                {
                   position: [1, 0],
                   type: TYPES.SENSOR,
                   title: 'Front Door',
                   id: 'sensor.ecolink_door_window_sensor_battery_level_3',
                   state: false, // hiding state
                   filter: function (value) { // optional
                      var num = parseFloat(value);
                      return num && !isNaN(num) ? num.toFixed(1) : value;
                   },
                   customStyles: function(item, entity){
                     if (entity.state > 80) {return {'backgroundColor': '#2E8B57',  };}
                     else if (entity.state > 50) {return {'backgroundColor': 'blue',     };}
                     else if (entity.state > 25) {return {'backgroundColor': 'darkblue', };}
                     else if (entity.state < 25) {return {'backgroundColor': '#B80D0D',  };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                {
                   position: [1, 1],
                   type: TYPES.SENSOR,
                   title: 'Kitchen Window',
                   id: 'sensor.ecolink_door_window_sensor_battery_level_4',
                   state: false, // hiding state
                   filter: function (value) { // optional
                      var num = parseFloat(value);
                      return num && !isNaN(num) ? num.toFixed(1) : value;
                   },
                   customStyles: function(item, entity){
                     if (entity.state > 80) {return {'backgroundColor': '#2E8B57',  };}
                     else if (entity.state > 50) {return {'backgroundColor': 'blue',     };}
                     else if (entity.state > 25) {return {'backgroundColor': 'darkblue', };}
                     else if (entity.state < 25) {return {'backgroundColor': '#B80D0D',  };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                {
                   position: [0, 2],
                   type: TYPES.SENSOR,
                   title: 'FR Left',
                   id: 'sensor.ecolink_door_window_sensor_battery_level_5',
                   state: false, // hiding state
                   filter: function (value) { // optional
                      var num = parseFloat(value);
                      return num && !isNaN(num) ? num.toFixed(1) : value;
                   },
                   customStyles: function(item, entity){
                     if (entity.state > 80) {return {'backgroundColor': '#2E8B57',  };}
                     else if (entity.state > 50) {return {'backgroundColor': 'blue',     };}
                     else if (entity.state > 25) {return {'backgroundColor': 'darkblue', };}
                     else if (entity.state < 25) {return {'backgroundColor': '#B80D0D',  };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                {
                   position: [1, 2],
                   type: TYPES.SENSOR,
                   title: 'FR Mid',
                   id: 'sensor.ecolink_door_window_sensor_battery_level_6',
                   state: false, // hiding state
                   filter: function (value) { // optional
                      var num = parseFloat(value);
                      return num && !isNaN(num) ? num.toFixed(1) : value;
                   },
                   customStyles: function(item, entity){
                     if (entity.state > 80) {return {'backgroundColor': '#2E8B57',  };}
                     else if (entity.state > 50) {return {'backgroundColor': 'blue',     };}
                     else if (entity.state > 25) {return {'backgroundColor': 'darkblue', };}
                     else if (entity.state < 25) {return {'backgroundColor': '#B80D0D',  };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                {
                   position: [0, 3],
                   type: TYPES.SENSOR,
                   title: 'FR Right',
                   id: 'sensor.ecolink_door_window_sensor_battery_level_7',
                   state: false, // hiding state
                   filter: function (value) { // optional
                      var num = parseFloat(value);
                      return num && !isNaN(num) ? num.toFixed(1) : value;
                   },
                   customStyles: function(item, entity){
                     if (entity.state > 80) {return {'backgroundColor': '#2E8B57',  };}
                     else if (entity.state > 50) {return {'backgroundColor': 'blue',     };}
                     else if (entity.state > 25) {return {'backgroundColor': 'darkblue', };}
                     else if (entity.state < 25) {return {'backgroundColor': '#B80D0D',  };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                ]        // end of items 
              },        // end of group

            ],           // end of groups
         },              // end of page


//-- cut here ---

   ]                    // end of pages
}                       // end of CONFIG
