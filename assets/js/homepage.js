
function initMap(origin,destination) {
    
    var originInput = document.getElementById('origin');
    var destinationInput = document.getElementById('destination');
    var origin = "paducah, Kentucky"
    var destination = "nashville, Tenneesee"
    

    var autocomplete = new google.maps.places.Autocomplete(originInput);
    var autocomplete2 = new google.maps.places.Autocomplete(destinationInput);
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);
        autocomplete2.setFields(
            ['address_components', 'geometry', 'icon', 'name']);

    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    }, function(response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } 

      
    });
  }

  

  $(function() {

    function calculateDistance(origin, destination) {
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, callback);
    }
  
    function callback(response, status) {
      if (status != google.maps.DistanceMatrixStatus.OK) {
        $('#result').html(err);
      } else {
        var origin = response.originAddresses[0];
        var destination = response.destinationAddresses[0];
        if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
          $('#result').html("There are no roads between " 
                            + origin + " and " + destination);
        } else {
          var distance = response.rows[0].elements[0].distance;
          var duration = response.rows[0].elements[0].duration;
          var durationTime = duration.text;
          var distanceText = distance.text;
          var durationTimeSec = duration.value;
          var miles = distanceText.substring(0, distanceText.length - 3);
          var seconds = durationTimeSec;
          $('#result').html("It is " + miles + " miles and " + durationTime + " from " + origin + " to " + destination);
        }
      }
    }
      
    $('#travelForm').submit(function(event){
        event.preventDefault();
        var origin = $('#origin').val();
        var destination = $('#destination').val();
        var distanceText = calculateDistance(origin, destination);
    });
   
  });
  
document.getElementById("map").style.display ="none";
$(document).foundation();

const getArtist = () => {
   let artist = Math.floor(Math.random()* 1000)
   return artist;
}

const generatePlaylist = () => {
	var w = document[typeof document.getElementsByClassName === 'function' ? 'getElementsByClassName' : 'querySelectorAll']('deezer-widget-player');
	for (var i = 0, l = w.length; i < l; i++) {
		w[i].innerHTML = '';
		var el = document.createElement('iframe');
		el.src = "https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=radio&id=artist-"+getArtist();+"&app_id=1";
		el.scrolling = w[i].getAttribute('data-scrolling');
		el.frameBorder = w[i].getAttribute('data-frameborder');
		el.setAttribute('frameBorder', w[i].getAttribute('data-frameborder'));
		el.allowTransparency = w[i].getAttribute('data-allowTransparency');
		el.width = w[i].getAttribute('data-width');
		el.height = w[i].getAttribute('data-height');
		w[i].appendChild(el);
    }
};

$('#generator').click(generatePlaylist())

