
//
// color codes - https://www.rapidtables.com/web/color/green-color.html
//               https://www.rapidtables.com/web/color/red-color.html
//

var CONFIG = {
   customTheme: null, // CUSTOM_THEMES.TRANSPARENT, CUSTOM_THEMES.MATERIAL, CUSTOM_THEMES.MOBILE, CUSTOM_THEMES.COMPACT, CUSTOM_THEMES.HOMEKIT, CUSTOM_THEMES.WINPHONE, CUSTOM_THEMES.WIN95
   transition: TRANSITIONS.ANIMATED_GPU, //ANIMATED or SIMPLE (better perfomance)
   entitySize: ENTITY_SIZES.SMALL,  //SMALL, BIG, NORMAL  are available
   tileSize: 400,
   tileMargin: 2,
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
         //padding: '30px 130px 0',
         //padding: '10px 130px 0',
         padding: '10px 130px 0',
         fontSize: '16px'
      },
      right: [],
      left: [
         {
            type: HEADER_ITEMS.DATETIME,
            dateFormat: 'EEEE, LLLL dd', //https://docs.angularjs.org/api/ng/filter/date
         }
      ]
   },

   pages: [

      // ------------ page-1 is the home page ---------------
      {
         title: 'Main page',
         bg: 'images/bg1.jpeg',
         icon: 'mdi-home',
         groups: [

            {
               title: 'Summary',
               width: 2,
               height: 3,
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
                   position: [1, 0],
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
                   position: [2, 0],
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
                     else if (entity.state > 0)  {return {'backgroundColor': '#2E8B57',  };}
                     else {return { 'backgroundColor': '#708090',};}
                  },
                },

                ]        // end of items for Weather
              },         // end of Weather group


         ]               // end of groups on Main page
      },                  // end of Lights Page



//-- cut here ---

   ]                    // end of pages
}                       // end of CONFIG
