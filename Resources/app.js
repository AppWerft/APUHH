Ti.include('vendor/prototypes.js');
Ti.UI.backgroundImage= '/Default.png';
var AcPoi = require('model/uhhap');
Ti.App.UHHAP = new AcPoi();

var win = require('ui/start.window').create();

//https://github.com/dan-eyles/sculejs

