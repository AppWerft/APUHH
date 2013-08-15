exports.myTemplate = {
	properties : {
		height : '120dip',
	},
	childTemplates : [{
		type : 'Ti.UI.View',
		properties : {
			width : Ti.UI.FILL,
			backgroundColor : '#ee0000',
			top : 0,
			height : '30dip'
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'apname',
		properties : {
			color : 'white',
			width : Ti.UI.FILL,
			height : '30dip',
			font : {
				fontSize : '20dip',
				fontWeight : 'bold'
			},
			left : '10dip',
			top : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			color : '#333',
			font : {
				fontSize : '16dp',fontWeight:'bold'
			},
			left : '10dip',
			top : '40dip'
		}
	},{
		type : 'Ti.UI.Label',
		bindId : 'room',
		properties : {
			color : '#333',
			font : {
				fontSize : '16dp'
			},
			left : '10dip',
			top : '60dip'
		}
	},{
		type : 'Ti.UI.Label',
		bindId : 'street',
		properties : {
			color : '#333',
			font : {
				fontSize : '16dp'
			},
			left : '10dip',
			top : '80dip'
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'dist',
		properties : {
			color : '#ccc',
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			font : {
				fontSize : '32dip',
				fontWeight : 'bold'
			},
			right : '10dip',
			bottom : '10dip'
		}
	}]
};

