
//
// color codes - https://www.rapidtables.com/web/color/green-color.html
//               https://www.rapidtables.com/web/color/red-color.html
//

var CONFIG = {
   customTheme: null, // CUSTOM_THEMES.TRANSPARENT, CUSTOM_THEMES.MATERIAL, CUSTOM_THEMES.MOBILE, CUSTOM_THEMES.COMPACT, CUSTOM_THEMES.HOMEKIT, CUSTOM_THEMES.WINPHONE, CUSTOM_THEMES.WIN95
   transition: TRANSITIONS.ANIMATED_GPU, //ANIMATED or SIMPLE (better perfomance)
   entitySize: ENTITY_SIZES.BIG,  //SMALL, BIG, NORMAL  are available
   tileSize: 250,
   tileMargin: 3,
   serverUrl: 'http://' + location.hostname + ':8123',
   wsUrl: 'ws://' + location.hostname + ':8123/api/websocket',
   authToken: null, // optional long-lived token (CAUTION: only if TileBoard is not exposed to the internet)
   debug: false, // Prints entities and state change info to the console.
   pingConnection: true, //ping connection to prevent silent disconnections

   // next fields are optional
   events: [],
   timeFormat: 24,
   menuPosition: MENU_POSITIONS.BOTTOM, // or BOTTOM
   //menuPosition: MENU_POSITIONS.LEFT, // or BOTTOM
   hideScrollbar: false, // horizontal scrollbar
   groupsAlign: GROUP_ALIGNS.HORIZONTALLY, // or VERTICALLY
   onReady: function () {},

   header: { // https://github.com/resoai/TileBoard/wiki/Header-configuration
      styles: {
         padding: '5px 80px 0',
         fontSize: '20px'
      },
      right: [],
      left: [
         {
            type: HEADER_ITEMS.DATETIME,
            dateFormat: 'EEEE LLLL dd', //https://docs.angularjs.org/api/ng/filter/date
         }
      ],
   },

   pages: [

      // ------------ page-1 is the home page ---------------
      {
         title: 'Main page',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-home',
         groups: [

            {
               width: 8,
               height: 6,
               items: [
		
		{
		   position: [0, 0.5],
		   width: 1.5,
		   height: 1,
		   title: 'Outside Temp',
		   subtitle: '',
		   type: TYPES.GAUGE,
		   id: 'sensor.outtemp',
		   value: function(item, entity){
		      return entity.state;
		   },
		   settings: {
		      size: 300,
		      type: 'semi',
		      min: 0,
		      max: 100,
		      cap: 'round',
		      thick: 20,
		      label: 'Outside Temp',
		      append: '@attributes.unit_of_measurement',
		      duration: 1500, // Defaults to 1500ms
		      thresholds: { 0: { color: 'blue'},  40: { color: 'cyan' }, 60: { color: 'lightgreen' }, 80: { color: 'red' } },  // Defaults to undefined
		      labelOnly: false, // Defaults to false
		      foregroundColor: 'rgba(0, 150, 136, 1)', // Defaults to rgba(0, 150, 136, 1)
		      backgroundColor: 'black',                // Defaults to rgba(0, 0, 0, 0.1)
		      //customStyles: function(item, entity){
		                      //if (entity.state > 85)      {return {'backgroundColor': '#B80D0D',  };}
		                      //else if (entity.state > 60) {return {'backgroundColor': '#2E8B57',  };}
		                      //else if (entity.state > 32) {return {'backgroundColor': 'darkblue', };}
		                      //else if (entity.state < 32) {return {'backgroundColor': 'blue',     };}
		                      //else {return { 'backgroundColor': '#708090',};}
		                   //},
		      fractionSize: 0, // Number of decimal places to round the number to. Defaults to current locale formatting
		   },
		},
		
		{
		   position: [1.55, 0.5],
		   width: 1.5,
		   height: 1,
		   title: 'Wind',
		   subtitle: '',
		   type: TYPES.GAUGE,
		   id: 'sensor.wind',
		   value: function(item, entity){
		      return entity.state;
		   },
		   settings: {
		      size: 300,
		      type: 'semi',
		      min: 0,
		      max: 100,
		      cap: 'round',
		      thick: 20,
		      label: 'Wind',
		      append: '@attributes.unit_of_measurement',
		      duration: 1500, // Defaults to 1500ms
		      thresholds: { 0: { color: 'lightgreen'},  10: { color: 'cyan' }, 20: { color: 'orange' }, 30: { color: 'red' } },  // Defaults to undefined
		      labelOnly: false, // Defaults to false
		      foregroundColor: 'rgba(0, 150, 136, 1)', // Defaults to rgba(0, 150, 136, 1)
		      backgroundColor: 'black',                // Defaults to rgba(0, 0, 0, 0.1)
		      fractionSize: 0, // Number of decimal places to round the number to. Defaults to current locale formatting
		   },
		},
		
		{
		   position: [3.1, 0.5],
		   width: 1.5,
		   height: 1,
		   title: 'Rain',
		   subtitle: '',
		   type: TYPES.GAUGE,
		   id: 'sensor.dayrain',
		   value: function(item, entity){
		      return entity.state;
		   },
		   settings: {
		      size: 300,
		      type: 'semi',
		      min: 0,
		      max: 100,
		      cap: 'round',
		      thick: 20,
		      label: 'Wind',
		      append: '@attributes.unit_of_measurement',
		      duration: 1500, // Defaults to 1500ms
		      thresholds: { 0: { color: 'lightgreen'},  0.5: { color: 'cyan' }, 1: { color: 'orange' }, 2: { color: 'red' } },  // Defaults to undefined
		      labelOnly: false, // Defaults to false
		      foregroundColor: 'rgba(0, 150, 136, 1)', // Defaults to rgba(0, 150, 136, 1)
		      backgroundColor: 'black',                // Defaults to rgba(0, 0, 0, 0.1)
		      fractionSize: 0, // Number of decimal places to round the number to. Defaults to current locale formatting
		   },
		},
		

        //----- row 2 when displayed ----------

                  {
                     position: [0.15, 1.6],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'Front Door',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_2',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-door-open',
                        off: 'mdi-door-closed',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [0.55, 1.6],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'Slider',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-door-open',
                        off: 'mdi-door-closed',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [0.95, 1.6],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'Laundry Door',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_3',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-door-open',
                        off: 'mdi-door-closed',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [1.7, 1.6],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'Kitchen',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_4',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [2.2, 1.6],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'FR Left',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_5',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [2.6, 1.6],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'FR Middle',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_6',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [3.0, 1.6],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'FR Right',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_7',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [3.6, 1.6],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'Laundry Window',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_3',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

        //----- row 3 when displayed ----------

                  {
                     position: [1.5, 2.0],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'DR Left',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_2',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [1.9, 2.0],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'DR Right',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_2',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [2.4, 2.0],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'Office Left',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_2',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [2.8, 2.0],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'Office Right',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_2',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [3.3, 2.0],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'LR Left',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_2',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [3.7, 2.0],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'LR Middle',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_2',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                  {
                     position: [4.1, 2.0],
                     type: TYPES.SENSOR_ICON,
                     width: 0.4,
                     height: 0.4,
                     title: 'LR Right',
                     id: 'binary_sensor.ecolink_door_window_sensor_sensor_2',
                     states: {
                        on: "OPEN",
                        off: "closed",
                     },
                     icons: {
                        on: 'mdi-window-closed',
                        off: 'mdi-window-open',
                     },
                     customStyles: function(item, entity){
                        if (entity.state === 'off') {return {'backgroundColor': '#2E8B57',};}
                        else if (entity.state === 'on') {return {'backgroundColor': '#B80D0D',};}
                        else {return { 'backgroundColor': '#FFA100',};}
                    }
                  },

                ]        // end of items for Weather
              },         // end of Weather group
         ],        // end of items for Weather

       },         // end of Weather group

//-- cut here ---

   ]                    // end of pages
}                       // end of CONFIG
