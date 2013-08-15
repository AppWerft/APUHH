exports.create = function() {
	var gmapmodule = require('ui/dynamic_gmap.window');
	Ti.UI.setBackgroundImage('Default.png');
	var self = Ti.UI.createWindow({
		exitOnClose : true,
		backgroundColor : 'red',
		barColor : 'black',
		fullscreen : false,
		orientationModes : [Ti.UI.PORTRAIT],
		title : 'All Access Points @ UHH'
	});
	self.open();
	setTimeout(function() {
		self.listView = Ti.UI.createListView({
			templates : {
				'template' : require('ui/templates').myTemplate
			},
			defaultItemTemplate : 'template',
		});
		self.add(self.listView);

		var apoints = [];

		Ti.App.UHHAP.getList({
			onload : function(_apoints) {
				apoints = _apoints;
				var rows = [];
				for (var i = 0; i < apoints.length; i++) {
					rows.push({
						properties : {
							itemId : JSON.stringify(_apoints[i].LookAt),
							accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL,
							backgroundColor : 'white'
						},
						title : {
							text : _apoints[i].title
						},
						room : {
							text : _apoints[i].room
						},
						street : {
							text : _apoints[i].street
						},
						apname : {
							text : _apoints[i].name
						},
						dist : {
							text : (!isNaN(_apoints[i].dist)) ? Math.round(_apoints[i].dist / 1000) + ' m' : ''
						}
					});
				}
				self.listView.setSections([Ti.UI.createListSection({
					items : rows
				})]);
			}
		});
		var GMap = new gmapmodule();

		self.listView.addEventListener('itemclick', function(e) {
			Ti.Media.vibrate();
			var gmapwindow = GMap.getView();
			gmapwindow.open();
			GMap.addPins();
			GMap.setLocation(e.itemId);

		});
	}, 100);
	return self;
}
