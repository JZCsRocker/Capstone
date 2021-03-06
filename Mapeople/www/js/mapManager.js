var mapField;
var ids = [];	

$(function(){
	$('.modal').modal();
	
	var commentsRef = db.ref('Maps/public');
	var i = 0;
	commentsRef.on('child_added', function(data) {
		$('#mainList').append("<li class='collection-item' onclick='publicMapJump("+i+")'>"+data.val().name+"</li>");
		ids.push(data.key);
		i++;
	});
	
	firebase.auth().onAuthStateChanged(function(user){
		if(!user){//hide logged in only UI
			$('#buttonNewMap').hide();
		}
	});
	
	$('#nav').load('nav.html');
	
	var loadBarNewMap = $('#createMap>.modal-footer>.progress');
	mapField = $('#mapName');
	
	$('.modal').modal();

	$('#buttonNewMap').click(function(){
		loadBarNewMap.hide();
	});
	
	//create new group if input valid
//    $('#buttonCreateMap').click(function(){
//        var mapName = $('#mapName').val();
//        var publicPrivate = $('#isPublic').is(":checked") ? 'public' : 'private';
//
//        if(mapName && firebase.auth().currentUser){
//            //create object with key uid
//            var members = {};
//            members[firebase.auth().currentUser.uid] = owner;
//
//            db.ref('Maps/' + publicPrivate).push().set({
//                'name':mapName,
//                'members': members
//            });
//        }
//        //write to db and hide loadbar
//    });
	
	$("#load").fadeOut();
});

function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
}

function createMap(){
    var uluru = {lat: map.getCenter().lat(), lng: map.getCenter().lng()};
    var publicPrivate = $('#isPublic').is(":checked") ? 'public/' : 'private/';
	var mapName = $('#mapName').val();
	
	if(mapName){// && firebase.auth().currentUser){//don't create map is name is blank or no one is logged in
		//loadBarNewMap.show();
		db.ref('Maps/' + publicPrivate).push().set({
			"name": mapName, 
			"zoom":map.getZoom(), 
			"center":uluru
		});
		//callback hide loadbar
	} else {
		//show blank name error to user
	}
}

var map;

function publicMapJump(index){
    //alert("-"+ids[index]);
    window.localStorage.setItem("mapID",ids[index]);
    window.location.href = 'index.html';
}
