var getDistance = function(lat1, lon1, lat2, lon2) {
	var R = 6371000000;
	// m (change this constant to get miles)
	var dLat = (lat2 - lat1) * Math.PI / 180;
	var dLon = (lon2 - lon1) * Math.PI / 180;
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return Math.round(d);
};

/*  INIT       */
var UHHAccessPoints = function() {
	this.initGPS();
	this.points = require('depot/apoints').apoints.kml.Document.Placemark;
	this.locales = {};
	for (var i = 0; i < this.points.length; i++) {
		var p = this.points[i];
		var parts = p.description.split('<br>');
		if (parts.length > 4) {
			p.title = parts[0].replace(/<b>/g, '').replace(/<\/b>/g, '');
			p.room = parts[1].replace(/Hs\./g, 'Hörsaal').replace(/Bib\./g, 'Bibliothek').replace(/r\./g, 'raum').replace(/Sem\./g, 'Seminarraum');
			p.street = parts[2];
			delete p.description;
		}
		var k = p.LookAt.latitude + p.LookAt.longitude;
		if (!this.locales[k]) {
			this.locales[k] = {
				count : 1,
				title : p.title,
				name : p.name,
				room : p.room,
				street : p.street,
				lat : p.LookAt.latitude,
				lon : p.LookAt.longitude
			}
		} else
			this.locales[k].count++;
	}
	return this;
}
UHHAccessPoints.prototype.getLocales = function(_args) {
	return this.locales;
}

UHHAccessPoints.prototype.initGPS = function(_args) {
	Ti.App.GMap = (Ti.Platform.osname == 'android') ? require('ti.map') : Ti.Map;
	if (Ti.Platform.osname == 'android') {
		if (Ti.App.GMap.isGooglePlayServicesAvailable() != Ti.App.GMap.SUCCESS) {
			alert("Google Play Services is not installed/updated/available");
		}
		Ti.Geolocation.Android.addLocationRule(Ti.Geolocation.Android.createLocationRule({
			provider : Ti.Geolocation.PROVIDER_GPS,
			accuracy : 5,
			maxAge : 30,
			minAge : 5
		}));
		Ti.Geolocation.Android.addLocationProvider(Ti.Geolocation.Android.createLocationProvider({
			name : Ti.Geolocation.PROVIDER_GPS,
			minUpdateTime : 600,
			minUpdateDistance : 100
		}));
	}
	Ti.Geolocation.purpose = "Recieve User Location";
}
UHHAccessPoints.prototype.getList = function(_args) {
	_args.onload(this.points);
	var self = this;
	Ti.Geolocation.addEventListener('location', function(_position) {
		if (_position.success)
			for (var i = 0; i < self.points.length; i++) {
				self.points[i].dist = getDistance(self.points[i].LookAt.latitude, self.points[i].LookAt.longitude, _position.coords.latitude, _position.coords.longitude)
			}
		self.points.sort(function(a, b) {
			if (a.dist < b.dist) {
				return -1;
			}
			if (a.dist > b.dist) {
				return 1;
			}
			return 0;
		});
		_args.onload(self.points);
	});
}

UHHAccessPoints.prototype.getUserLocation = function(_args) {
	if (_args.log)
		_args.logsetText('Retrieving your position …');
	Ti.Geolocation.getCurrentPosition(function(_e) {
		if (_e.success == true) {
			_args.onload(_e.coords);
			if (_args.log)
				_args.log.setText('lat:' + _e.coords.latitude, +', lon:' + _e.coords.longitude);
		} else {
			if (_args.log) {
				_args.log.setText("Localisation doesn't work");
				console.log('no GPS');
			}
		}

	});
}
module.exports = UHHAccessPoints;
