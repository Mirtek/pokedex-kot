var offsetNum = 12;
$('#se-pre-con').bind('ajaxStart', function(){
    $(this).show();
}).bind('ajaxStop', function(){
    $(this).hide();
});

$(window).load(function() {
		// Animate loader off screen
		$(".se-pre-con").fadeOut("slow");;
	});
$(document).ready(function(){
        
$.getJSON('http://pokeapi.co/api/v1/pokemon/?limit=12', function(data){
  console.log(data)
  processData(data);  
})        
});

function processData(data){
    for (var i=0; i<data.objects.length; i++){
     var poceElement = $('.pokemons');
     var poceTypes =  getPoceTypes(data.objects[i]);
     
     var link = $('<a href="#'+data.objects[i].name+'"></a>');
     var img = $('<img src="http://toloshny.com/pokeimg/'+normalizeNumber(data.objects[i].pkdx_id)+'.png">');
     var poceblock = $('<div class="col-sm-4 col-xs-12 col-md-3 pokenames animated text-center"></div>');
     var poceblocktext =$('<br>'+data.objects[i].name+'<br><span class="types">'+poceTypes+'</span>'); 
     
     link.append(img); 
     link.click((function(e){
          var poceObject = data.objects[i];
    

          return function() {
            var img = '<img src="http://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+normalizeNumber(poceObject.pkdx_id)+'.png">';
            var pokedetails = $('<div class="">'+img+'<br><span class="bold">'+poceObject.name+'</span><br> Type: '+getPoceTypes(poceObject)+
 '<br> Attack: '+poceObject.attack+'<br> Defence: '+poceObject.defense+'<br> Health: '+poceObject.hp+'<br> SP Attack:  '+poceObject.sp_atk+'<br> SP Defense:  '+poceObject.sp_def+'<br> Speed:  '+poceObject.speed+'<br> Weight:  '+poceObject.weight+'<br> Total moves:  '+poceObject.moves.length+'<br></div>');
$('.pokedetails').hide().html(pokedetails).addClass('pokedetails-border').fadeIn(300);
            
            
            return false;
          }
     })());
      
     poceblock.append(link);
     poceblock.append(poceblocktext);
     poceElement.append(poceblock);
     $('.loadmore-btn').show();
  }
      
}

function getPoceTypes(poceObject){
var poceTypes = "";
   for (var count=0;count<poceObject.types.length; count++){
         poceTypes+=poceObject.types[count].name+" ";
    
     }
 
 return poceTypes;
}

$('.loadmore-btn').click(function(){
  $.getJSON('http://pokeapi.co/api/v1/pokemon/?limit=12&offset='+offsetNum, function(data2){
  console.log(data2)
  processData(data2); 
    })  
  offsetNum +=12; 
});
//????
$('img').click(function(){
     document.getElementById('img').hide();
});
   
function normalizeNumber(num){
  var res;
  if (num < 10) {
    res="00"+num;
  } else if (num<100){
    res="0"+num;
  } else res=num;
  return res;
}