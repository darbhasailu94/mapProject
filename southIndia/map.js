//american military alphabet notation for easy naming
function Alfa() {
	ko.applyBindings(new Delta());
}
//declaring a global variable for map
var Bravo;
//creating a class to spawn objects
var Charlie = function(Echo) {
	//creating an equivalency of this and self as advised in the knockout documentation
	var self = this;
	//declaring the initial properties the object will have
	this.name = Echo.name;
	this.location = Echo.location;
	this.showCase = ko.observable(true);
	this.information = "";
	//creating url to fetch wikipedia data
	var url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=6&titles="+this.name+"&callback=?";
	//getting wikipedia data in json format
    $.getJSON(url, function (Foxtrot) {
        for(var pageid in Foxtrot.query.pages) {
            var Golf = Foxtrot.query.pages[pageid].extract;
            self.information = Golf;
        }
    }).fail(function() {
		alert("Wikipedia isn't working, Try again tomorrow.");
	});
    //setting the information for display in the infowindow
	this.info = Echo.name + self.information;
	//creating new infowindow and setting content
	this.infoWindow = new google.maps.InfoWindow({content: self.info});
	//creating new marker object
	this.marker = new google.maps.Marker({
			position: Echo.location,
			map: Bravo,
			title: Echo.name,
			animation: google.maps.Animation.DROP,
			icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
	});
	//setting the visibility based on filtering the list
	this.visibleMarker = ko.computed(function() {
		if(this.showCase() === true) {
			this.marker.setMap(Bravo);
		} else {
			this.marker.setMap(null);
		}
		return true;
	}, this);
	//adding a click listener on the marker
	this.marker.addListener('click', function(){
		self.info = Echo.name + self.information;
        self.infoWindow.setContent(self.info);
		self.infoWindow.open(Bravo, this);
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
		self.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      	setTimeout(function() {
      		//closing the infowindow and reverting animations after a certain time
      		self.marker.setAnimation(null);
      		self.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      		self.infoWindow.close(Bravo, this);
     	}, 4900);
	});
	//creating a function for marker animation
	this.Romeo = function(place) {
		google.maps.event.trigger(self.marker, 'click');
	};
};
function Delta() {
	//creating an equivalency of this and self as advised in the knockout documentation
	var self = this;
	//binding search bar
	this.search = ko.observable("");
	//declaring the filtered items array
	this.India = ko.observableArray([]);
	//setting the map on the website
	Bravo = new google.maps.Map(document.getElementById('Bravo'), {
			zoom: 8,
			center: {lat: 13.102141, lng: 77.586371}
	});
	//pushing items from data into the observable array
	Hotel.forEach(function(Juliett){
		self.India.push(new Charlie(Juliett));
	});
	//filtering the list based on search bar text
	this.Zulu = ko.computed(function() {
		//converting the search bar text to lowercase for matching
		var Tango = self.search().toLowerCase();
		if (!Tango) {
			//if search bar is empty then show all
			self.India().forEach(function(Juliett){
				Juliett.showCase(true);
			});
			return self.India();
		} else {
			//else match the alphabets and show results
			return ko.utils.arrayFilter(self.India(), function(Juliett) {
				var Kilo = Juliett.name.toLowerCase();
				var Lima = (Kilo.search(Tango) >= 0);
				Juliett.showCase(Lima);
				return Lima;
			});
		}
	}, self);
}
//delaring the variable holding all the data
var Hotel = [
	{name:'Bangalore', location:{lat: 12.980001, lng: 77.571189}},
	{name:'Shivanasamudra Falls', location:{lat: 12.289706, lng:77.183551}},
	{name:'Savandurga', location:{lat: 12.916436, lng:77.298419}},
	{name:'Makalidurga', location:{lat: 13.425770, lng:77.506003}},
	{name:'Mekedatu', location:{lat: 12.261814, lng:77.447859}},
	{name:'Nandi Hills, India', location:{lat: 13.370690, lng:77.680180}},
	{name:'Mysore Palace', location:{lat: 12.304758, lng:76.659000}},
	{name:'Kodagu district',location:{lat: 12.414176, lng: 75.736949}},
	{name:'Chennai',location:{lat: 13.082680, lng: 80.270718}},
	{name:'Pondicherry',location:{lat: 11.913860, lng: 79.814472}},
	{name:'Tirumala',location:{lat: 13.678184, lng: 79.352188}},
	{name:'Ooty',location:{lat: 11.406414, lng: 76.693244}},
	{name:'Chikmagalur',location:{lat: 13.315258, lng: 75.775402}},
	{name:'Tumkur',location:{lat: 13.339168, lng: 77.113998}}
];
//function that handles error in google maps api
function November() {
	alert("Google Maps isn't working, Try again tomorrow.");
}
