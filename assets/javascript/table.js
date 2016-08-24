
function drawRep(representative){
  var tr = $('<tr>');
  tr.addClass('trRep')
  if(representative.level == 'federal'){
    tr.append($('<td class="text-center">').text(representative.name));
    tr.attr('data-name', representative.name);;
    tr.append($('<td class="text-center">').text(representative.officeTitle));
    tr.append($('<td class="text-center">').text(representative.party));
    if(representative.party == 'Democratic'){
      tr.addClass('info');
    } else if(representative.party == 'Republican'){
      tr.addClass('danger');
    }
    $('#federal').append(tr);
  }
  if(representative.level == 'state'){
    tr.append($('<td class="text-center">').text(representative.name));
    tr.attr('data-name', representative.name);
    tr.append($('<td class="text-center">').text(representative.officeTitle));
    tr.append($('<td class="text-center">').text(representative.party));
    if(representative.party == 'Democratic'){
      tr.addClass('info');
    } else if(representative.party == 'Republican'){
      tr.addClass('danger');
    }
    $('#state').append(tr);
  }
  if(representative.level == 'local'){
    tr.append($('<td class="text-center">').text(representative.name));
    tr.attr('data-name', representative.name);
    tr.append($('<td class="text-center">').text(representative.officeTitle));
    tr.append($('<td class="text-center">').text(representative.party));
    if(representative.party == 'Democratic'){
      tr.addClass('info');
    } else if(representative.party == 'Republican'){
      tr.addClass('danger');
    }
    $('#local').append(tr);
  }
}
function repInfo(representative){
  $('#rep-office').empty();
  $('#rep-phone').empty();
  $('#rep-email').empty();
  $('#rep-website').empty();
  var rep;
  for(var i = 0; i < Representitives.length; i++){
    if(representative == Representitives[i].name){
      rep = Representitives[i];
    }
  }
  $('#rep-name').text(rep.name);
  for(var k = 0; k < rep.addresses.length; k++){
    $('#rep-office').append('<h4>' + rep.addresses[k].replace(/\b[a-z]/g,function(f){return f.toUpperCase();}) + '</h4>');
  }
  for(var j = 0; j < rep.phones.length; j++){
    $('#rep-phone').append('<h4><a href="tel:' + rep.phones[j] + '">' + rep.phones[j] + '</a></h4>');
  }
  for(var l = 0; l < rep.emails.length; l++){
    $('#rep-email').append('<h4><a href="mailto:' + rep.emails[l] + '">' + rep.emails[l] + '</a></h4>');
  }
  for(var m = 0; m < rep.urls.length; m++){
    $('#rep-website').append('<h4><a href="' + rep.urls[m] + '">' + rep.urls[m] + '</a></h4>');
  }
}


function getNews(query) {
  $('#news').empty();
  var params = {
      // Request parameters
      "q": query, // this is where we need to put in matching representatives for users
      "count": "10",
      "offset": "0",
      "mkt": "en-us",
      "safeSearch": "Moderate",
  };
  $.ajax({
      url: "https://api.cognitive.microsoft.com/bing/v5.0/news/search?" + $.param(params),
      beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","20955a84ab464f1db98a498c8e5a8bbd");
      },
      type: "GET",
      // Request body
      data: "{body}",
  }).done(function(data) {
      var response = data.value;
      var div = $('<div class="owl-carousel" id="repNews"></div>');
      for(var i = 0; i < response.length; i++){

        var headline = response[i].name;
        // var thumbnail = response[i].image.thumbnail.contentUrl;
        var description = response[i].description;
        var articleURL = response[i].url;

        var slidesDiv = $('<div class="recentArticles">');
        slidesDiv.attr("class", "slidesDivClass");

        var articleHeadline = $('<h4>');
        // var articleThumbnail = $('<img height="120" width="120" src="' + thumbnail + '"</img>');
        var articleDescription = $('<p>');
        articleHeadline.text(headline);
        // articleThumbnail.attr('class', 'articleSlides');
        articleDescription.text(description);
        slidesDiv.append(articleHeadline);
        // slidesDiv.append(articleThumbnail);
        slidesDiv.append(articleDescription);
        slidesDiv.attr('data-url', articleURL);
        div.append(slidesDiv);
        $('#news').append(div);
        $(".slidesDivClass").on("click", function(){
            var url = $(this).attr('data-url');
            window.open(url);
        });
      }
      owl(query);
  })
  .fail(function() {
      console.log('News API Error');
  });
}

function owl(){
  $("#repNews").owlCarousel();
}

$(document).on('click', '.trRep', function(){
  var rep = $(this).attr('data-name');
  repInfo(rep);
  getNews(rep);
});

$(document).ready(function(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    database.ref('users').child(user.uid).once('value', function(snapshot){
      Street = snapshot.val().street;
      City = snapshot.val().city;
      State = snapshot.val().state;
      Zip = snapshot.val().zip;
      postAddress = "?&address=";
      postAddress += Street.toLowerCase().split(' ').join('+');
      postAddress += "+" + City.toLowerCase() + "+" + State.toLowerCase();
      postAddress += "+" + Zip;

      queryOptions = "representatives/";
      queryURL = googleCivicURL + queryOptions + postAddress + googleCivicKey;
      getReps();
    });
  } else {
    // No user is signed in.
  }
});
});
