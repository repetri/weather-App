dataStore.warnings = {
    alerts: [],
    text:''
};

Vue.component('warnings',{
    template:'\
    <div class="page">\
        <f7-card title="Weerswaarschuwing" v-for="warning in warnings.alerts">\
            <f7-list>\
                <f7-list-item title="Weerswaarschuwing: ">{{warnings.wtype_meteoalarm_name}}</f7-list-item>\
                <f7-list-item title="TEXT CODE: ">{{warnings.type}}</f7-list-item>\
                <f7-list-item title="Kleur CODE:">{{warnings.level_meteoalarm_name}}</f7-list-item>\
                <f7-list-item title=\"Weer omschrijving: \">{{warnings.message.split(\" \",5).join().replace(\/,\/g,\" \")}}</f7-list-item>\
                <f7-list-item title="waarschuwing geldig tot: ">{{warnings.expires}}</f7-list-item>\
                <f7-list-item title="Omschrijving waarschuwing: "></f7-list-item>\
                <f7-list-item>{{warnings.level_meteoalarm_description}}</f7-list-item>\
            </f7-list>\
        </f7-card>\
        <f7-card title="Weerswaarschuwing" v-if="warnings.text !== undefined">\
            <f7-list>\
                <f7-list-item>{{warnings.text}}</f7-list-item>\
            </f7-list>\
        </f7-card>\
    </div>\
',

data: function(){
    return dataStore
},

mounted: function(){
    this.loadWeatherWarnings();
    setInterval(this.loadWeatherWarnings, 600000);
},

methods:{
loadWeatherWarnings: function(){
    App.$f7.request.get('http://api.wunderground.com/api/c6e1c7dd478fbb42/alerts/lang:NL/q/NL/ijsselstein.json', function(data){
    data = JSON.parse(data);
    if(data.alerts.length === 0){
        dataStore.warnings.text = 'No weather warninings are currently issued. This may change so keep updated via local infromation sources ';
        }
    else{
        dataStore.warnings.alerts = data.alerts;
        }
     });
   }
 }
});