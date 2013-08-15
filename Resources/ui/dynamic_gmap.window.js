var Map = function() {
	this.annotations = [];
	return this;
}
const START = 0.005;
Map.prototype.getView = function() {
	var self = this;
	this.view = Ti.UI.createWindow({
		fullscreen : false,
		locked : false,
		backgroundColor : 'white',
		barColor : 'black',
		orientationModes : [Ti.UI.PORTRAIT]
	});
	var region = {
		latitude : 53.55,
		longitude : 10,
		latitudeDelta : START,
		longitudeDelta : START
	};
	this.gmap = Ti.App.GMap.createView({
		userLocation : true,
		enableZoomControls : false,
		mapType : Ti.App.GMap.NORMAL_TYPE,
		userLocationButton : true,
		region : region,
		traffic : true,
		animate : true
	});
	this.view.add(this.gmap);
	this.view.addEventListener('close', function() {
		self.view.remove(self.gmap);
		self.gmap = null;
	});
	return this.view;
}

Map.prototype.addPins = function() {
	var locales = Ti.App.UHHAP.getLocales(), pins = [], k,i=0;
	for (k in locales) {
		this.annotations.push(Ti.App.GMap.createAnnotation({
			latitude : locales[k].lat,
			longitude : locales[k].lon,
			name : 'Wifi' +i,
			title : locales[k].name,
			subtitle : locales[k].title + ', (' + locales[k].count + ')',
			image : '/target.png'
		}));i++;
	}
	this.gmap.addAnnotations(this.annotations);
}

Map.prototype.setLocation = function(_latlong) {
	this.gmap.hide();
	this.gmap.setRegion({
		latitude : JSON.parse(_latlong).latitude,
		longitude : JSON.parse(_latlong).longitude,
		latitudeDelta : START,
		longitudeDelta : START
	});
	for (var i = 0; i < this.annotations.length; i++) {
		this.gmap.selectAnnotation('Wifi1');
		this.gmap.fireEvent('click', {
			source : this.annotations[0]
		});
		break;
		console.log(this.annotations[i].latitude + '  ' + JSON.parse(_latlong).latitude);
		if (this.annotations[i].latitude == JSON.parse(_latlong).latitude) {

			break;
		}
	}
	this.gmap.show();
}

module.exports = Map;

