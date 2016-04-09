// Default offset
var offsetNum = 12;
// Some variables which i will use later, save them to not call $ function everytime i need them
var poceElement = $('.pokemons');
var clearBtn = $('.clear-btn');
var loadmoreBtn = $('.loadmore-btn');

// Objects for filtering data
var pokeNormal = {objects: []};
var pokeFire = {objects: []};
var pokeWater = {objects: []};
var pokeGrass = {objects: []};
var pokeElectric = {objects: []};
var pokeIce = {objects: []};
var pokeGround = {objects: []};
var pokeFlying = {objects: []};
var pokePoison = {objects: []};
var pokeFighting = {objects: []};
var pokePsychic = {objects: []};
var pokeDark = {objects: []};
var pokeRock = {objects: []};
var pokeBug = {objects: []};
var pokeGhost = {objects: []};
var pokeSteel = {objects: []};
var pokeDragon = {objects: []};
var pokeFairy = {objects: []};

var pokeAll = {objects: []};

// Bind preloader
$('#se-pre-con').bind('ajaxStart', function(){
  $(this).show();
}).bind('ajaxStop', function(){
  $(this).hide();
});

//load first batch from api
$(document).ready(function(){
  $.getJSON('http://pokeapi.co/api/v1/pokemon/?limit=12', function(data){
    //console.log(data);
    processData(data);
    //turnoff preloader
    $(".se-pre-con").fadeOut(200);
    $(".loadmore-btn-preloader").hide();

  })
});

// Show blocks of 12 pokemons, with onclick to show details about each also does data filling for filters
function processData(data){
  for (var i=0; i<data.objects.length; i++){
   var link = $('<a href="#'+data.objects[i].name+'"></a>');
   var img = $('<img src="http://toloshny.com/pokeimg/'+getNormalizedNumber(data.objects[i].pkdx_id)+'.png" class="pokepic">');
   var poceblock = $('<div class="col-sm-4 col-xs-12 col-md-3 pokenames text-center"></div>');
   var poceblocktext = $('<br><span class="poke-name">'+data.objects[i].name+'</span><br><span class="types">'+getPoceTypesWithStyling(data.objects[i])+'</span>');
   pokeAll.objects.push(data.objects[i]);
   //console.log(pokeAll);
   var type1 = data.objects[i].types[0].name;
   var type2="";
   if (typeof data.objects[i].types[1] !== 'undefined') {
    // the variable is defined
    var type2 = data.objects[i].types[1].name;
  }

   // Now that's what i call monkey-code. But it's the best solution i've got. 
   // Basicly it's filling filter-objects with data asssosiated with those pokemon types.
   // I know i know, 2x memory (or even more, object itself consumes memory) just for the filters. 
   fillFilterObjects(type1, data.objects[i]);
   fillFilterObjects(type2, data.objects[i]);

   link.append(img); 
   link.click((function(e){
    var poceObject = data.objects[i];
    //  console.log(pokeFire);
    return function() {
      var img = '<img src="http://toloshny.com/pokeimg/'+getNormalizedNumber(poceObject.pkdx_id)+'.png" class="poce-details-image">';
      var pokedetails = $('<div class="">'+img+'<br><span class="bold">'+poceObject.name+' #'+getNormalizedNumber(poceObject.pkdx_id)+'</span><br> Type: '+getPoceTypes(poceObject)+
       '<br> Attack: '+poceObject.attack+'<br> Defence: '+poceObject.defense+'<br> Health: '+poceObject.hp+'<br> SP Attack:  '+poceObject.sp_atk+'<br> SP Defense:  '+poceObject.sp_def+'<br> Speed:  '+poceObject.speed+'<br> Weight:  '+poceObject.weight+'<br> Total moves:  '+poceObject.moves.length+'<br></div>');
      $('.pokedetails').hide().html(pokedetails).addClass('pokedetails-border').fadeIn(300);

      return false;
    }
  })());

   poceblock.append(link);
   poceblock.append(poceblocktext);
   poceElement.append(poceblock.hide().fadeIn(100));

   $('.loadmore-btn').fadeIn(400);
 }
}

// Weird switch for 18 cases for filling filter-objects
function fillFilterObjects(type,pokemonObject){

 switch (type){
  case "normal":
  pokeNormal.objects.push(pokemonObject);
  break;  
  case "fire":
  pokeFire.objects.push(pokemonObject);
  break;  
  case "water":
  pokeWater.objects.push(pokemonObject);
  break;
  case "grass":
  pokeGrass.objects.push(pokemonObject);
  break;
  case "electric":
  pokeElectric.objects.push(pokemonObject);
  break;
  case "ice":
  pokeIce.objects.push(pokemonObject);
  break;
  case "ground":
  pokeGround.objects.push(pokemonObject);
  break;
  case "flying":
  pokeFlying.objects.push(pokemonObject);
  break;
  case "poison":
  pokePoison.objects.push(pokemonObject);
  break;
  case "fighting":
  pokeFighting.objects.push(pokemonObject);
  break;
  case "psychic":
  pokePsychic.objects.push(pokemonObject);
  break;
  case "dark":
  pokeDark.objects.push(pokemonObject);
  break;
  case "rock":
  pokeRock.objects.push(pokemonObject);
  break;
  case "bug":
  pokeBug.objects.push(pokemonObject);
  break;
  case "ghost":
  pokeGhost.objects.push(pokemonObject);
  break;
  case "steel":
  pokeSteel.objects.push(pokemonObject);
  break;
  case "dragon":
  pokeDragon.objects.push(pokemonObject);
  break;
  case "fairy":
  pokeFairy.objects.push(pokemonObject);
  break; 
}

}

//Shows blocks of pokemons, works with stored data
function processDataNoJSON(data){
 poceElement.empty();

 for (var i=0; i<data.objects.length; i++){
   var link = $('<a href="#'+data.objects[i].name+'"></a>');
   var img = $('<img src="http://toloshny.com/pokeimg/'+getNormalizedNumber(data.objects[i].pkdx_id)+'.png" class="pokepic">');
   var poceblock = $('<div class="col-sm-4 col-xs-12 col-md-3 pokenames text-center"></div>');
   var poceblocktext = $('<br>'+data.objects[i].name+'<br><span class="types">'+getPoceTypesWithStyling(data.objects[i])+'</span>');
   
   link.append(img); 
   link.click((function(e){
    var poceObject = data.objects[i];
    return function() {
      var img = '<img src="http://toloshny.com/pokeimg/'+getNormalizedNumber(poceObject.pkdx_id)+'.png" class="poce-details-image">';
      var pokedetails = $('<div class="">'+img+'<br><span class="bold">'+poceObject.name+' #'+getNormalizedNumber(poceObject.pkdx_id)+'</span><br> Type: '+getPoceTypes(poceObject)+
       '<br> Attack: '+poceObject.attack+'<br> Defence: '+poceObject.defense+'<br> Health: '+poceObject.hp+'<br> SP Attack:  '+poceObject.sp_atk+'<br> SP Defense:  '+poceObject.sp_def+'<br> Speed:  '+poceObject.speed+'<br> Weight:  '+poceObject.weight+'<br> Total moves:  '+poceObject.moves.length+'<br></div>');
      $('.pokedetails').hide().html(pokedetails).addClass('pokedetails-border').fadeIn(300);
      return false;
    }
  })());
   poceblock.append(link);
   poceblock.append(poceblocktext);
   poceElement.append(poceblock.hide().fadeIn(100));
 }
}


//Find types of current poceObject (fire,normal,etc) and add styling to it (for block with image)
function getPoceTypesWithStyling(poceObject){
  var poceTypes = "";
  for (var count=0;count<poceObject.types.length; count++){
    var typeName=poceObject.types[count].name;
    poceTypes+="<span class='"+typeName+"-color "+typeName+"-filter type-padding' >"+typeName+" </span>";
  }
  return poceTypes;
}

//Same but for the detalis block - no styling
function getPoceTypes(poceObject){
  var poceTypes = "";
  for (var count=0;count<poceObject.types.length; count++){
    poceTypes+=poceObject.types[count].name+" ";
  } 
  return poceTypes;
}

//Load new bunch of poceapi by buttonclick and process it
$('.loadmore-btn').click(function(){
  //add preloader for Show more pokemons button
  $(".loadmore-btn-preloader").show();

  $.getJSON('http://pokeapi.co/api/v1/pokemon/?limit=12&offset='+offsetNum, function(data2){
    //console.log(data2)
    processData(data2);
    //stop preloader
    $(".loadmore-btn-preloader").fadeOut(300);

  })  
  offsetNum +=12;
});

//Logic of clerafilters button - clear filters, show all loaded pokemons
$('.clear-btn').click(function(){
  // console.log(pokeAll);
  clearBtn.hide();
  processDataNoJSON(pokeAll);
  loadmoreBtn.fadeIn(300).show();
});

//Logic of filter buttons (the type button) for every poketype
$('body').on('click', '.normal-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeNormal);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.fire-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeFire);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.water-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeWater);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.grass-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeGrass);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.electric-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeElectric);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.ice-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeIce);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.ground-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeGround);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.flying-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeFlying);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.poison-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokePoison);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.fighting-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeFighting);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.psychic-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokePsychic);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.dark-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeDark);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.rock-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeRock);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.bug-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeBug);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.ghost-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeGhost);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.steel-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeSteel);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.dragon-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeDragon);
 clearBtn.fadeIn(400);
});
$('body').on('click', '.fairy-filter', function(){
 loadmoreBtn.hide();
 processDataNoJSON(pokeFairy);
 clearBtn.fadeIn(400);
});

// Normalize ID pockemon number to make it 3 digits starting with zeroes - like "000.png"
function getNormalizedNumber(num){
  var res;
  if (num < 10) {
    res="00"+num;
  } else if (num<100){
    res="0"+num;
  } else res=num;
  return res;
}