// Colin's Firebase
  // var fff = {
  //   apiKey: "AIzaSyB8TqG5FuYXornV5pOfov-IRbGJH3y-epw",
  //   authDomain: "mypolity-temp.firebaseapp.com",
  //   databaseURL: "https://mypolity-temp.firebaseio.com",
  //   storageBucket: "mypolity-temp.appspot.com",
  // };
  // firebase.initializeApp(fff);

 
// Spencer's Firebase
var config = {
apiKey: "AIzaSyA6P8YWzzxROrGRStOxa1kEFbDau5SVzW8",
authDomain: "mypolity-4808b.firebaseapp.com",
databaseURL: "https://mypolity-4808b.firebaseio.com",
storageBucket: "mypolity-4808b.appspot.com",
};

firebase.initializeApp(config);

//Gary firebase

// var config = {
//   apiKey: "AIzaSyDo0YPqvSLALkV93436vn8Qj8s1AoBBmow",
//   authDomain: "mypolity-d8c63.firebaseapp.com",
//   databaseURL: "https://mypolity-d8c63.firebaseio.com",
//   storageBucket: "mypolity-d8c63.appspot.com",
// };

// firebase.initializeApp(config);

var openStatesURL = "http://openstates.org/api/v1/"
var openStatesKey = "&apikey=f58d2e11ccbe4471bdb7485c4fee0058"

var googleGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?address="
var googleGeoKey = "&key=AIzaSyBV2UtJ0s2yvwvJQl7wDajnuzCnGevAnE0"

var firebaseUser = firebase.auth().currentUser;
var database = firebase.database();
var userRef = database.ref("usernames");
var representative;

var dummyVars = [
  {
    name: 'Bernie \'Feel the Bern\' Sanders',
    title: 'US Senator',
    party: 'Democrat',
    phone: '1-888-555-5555',
    email: 'example@example.com',
    address: '111 School St., Burlington, VT',
    currentProjects: 'Yup'
  },
  {
    name: 'Ted \'I might be the Zodiac\' Cruz',
    title: 'Governor?',
    party: 'Republican',
    phone: '1-999-555-5555',
    email: 'testing@example.com',
    address: 'Texas',
    currentProjects: 'Stuff'
  }
]


var apiKey= "b99e520ffe6d47598d080c2ffafd1b3e";


//for now this will pull up the latest articles
var queryURL = "https://newsapi.org/v1/articles?source=cnn&sortByAvailable=latest&apiKey=" +apiKey;

// FUNCTIONS

// This runQuery function expects two parameters (the number of articles to show and the final URL to download data from)
function runQuery(queryURL){

    // The AJAX function uses the URL and Gets the JSON data associated with it. The data then gets stored in the variable called: "NYTData"
     $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var results = response.articles;

                for (var i = 0; i < results.length; i++) {
                  $('.slides').empty();

                    //making div for each article - includes title, image & description
                    var slidesDiv = $('<div class="recentArticles">')

                    //referencing the articles
                    var article = results[i].articles;
                    var articleURL = results[i].url;

                    //references the articles images
                    var articleImg = results[i].urlToImage;

                    //turns the images into buttons <a href = "' +articleURL+ '"></a>'
                    var articleImg = $('<img width= "150px" height = "100px" src="' +articleImg+'"</img>');
                    articleImg.attr('class', 'articleSlides');

                    //getting the articles titles
                    var articleTitle = $('<p>');
                    articleTitle.text(results[i].title);

                    //appending the title and the image button to the new div
                    slidesDiv.append(articleTitle);
                    slidesDiv.append(articleImg);

                    //appending our new div into our div class '.slides' on the HTML file
                    $('.slides').prepend(slidesDiv);
                }

            });
    }

            // Loop through articles on JSON and we want 5 articles in slick track. here we run the previous function 5 times. creates 5 divs(?)
            for (var i=0; i <= 5; i++) {
                runQuery(queryURL);
            }

    // On Click button associated with the Search Button
    $('.articleSlides').on('click', function(){

        // Empties the region associated with the articles
        $(".slides").empty();

        
        return false;
    }); 

$(document).on('click', '#submit-button', function() {
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var Street = $('#street').val().trim();
    var City = $('#city').val().trim();
    var State = $('#state').val();
    var Zip = $('#zip').val().trim();
    var email = $('#email').val();
    var pass = $('#pwd').val();
    var postAddress = Street.toLowerCase().split(' ').join('+');
    postAddress += "+" + City.toLowerCase() + "+" + State.toLowerCase();
    postAddress += "+" + Zip;
    var topic = 'metadata/ca';
    // var queryURL = siteURL + topic + "/?" + "&apikey=" + APIkey;

    // var queryURL = googleGeoURL + postAddress + googleGeoKey;
    // var user = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     street: Street,
    //     city: City,
    //     state: State,
    //     zip: Zip,
    //     email: email,
    // };

    // $.ajax({
    //         url: queryURL,
    //         method: 'GET'
    //     })
    //     .then(function(response) {
    //         console.log(response);
    //     }).then(function(result) {

    //     });


    // Google API
    var baseURL =  "https://www.googleapis.com/civicinfo/v2/representatives?";
    var testAddress = "address=10824+Lindbrook+Drive%2C+Los+Angeles%2C+CA+90024";
    var apiKey = "&key=AIzaSyAGOn6GB2DgRCJcXoVc_48c09LmbL7l_pk";
    var queryURLtest = baseURL + testAddress + apiKey;

    $.ajax({
            url: queryURLtest,
            method: 'GET'
        })
        .done(function(response) {
            
            console.log(response);

            console.log(response.divisions["ocd-division/country:us"].name);







        });



    //creat firebase auth account
    // sfirebase.auth().createUserWithEmailAndPassword(user.email, pass).catch(function(error) {
    // Handle Errors here.
    // console.log('Error');
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // $('#modalText').text(error.message);
    // $('#myModal').show();
    // });

    // $('#modalClose').on('click', function(){
    //   $('#myModal').hide();
    // });

    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     window.location = 'federal.html';
    //   }
    // });
    return false;
});

$(document).on('click', '#login-button', function(){

  var email = $('#login-email').val();
  var pass = $('#login-pass').val();

  firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  $('#modalText').text(error.message);
  $('#myModal').show();
  });

  $('#modalClose').on('click', function(){
    $('#myModal').hide();
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location = 'federal.html';
    }
  });
  return false;
});

$(document).on('click', '#logout-link', function(){

  firebase.auth().signOut().then(function() {
    window.location = 'index.html';
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('#login-link').css('display', 'none');
    $('#logout-link').css('display', 'block');
    user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: "+profile.providerId);
    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
    console.log("  Email: "+profile.email);
    console.log("  Photo URL: "+profile.photoURL);
  });
  } else {
    $('#logout-link').css('display', 'none');
    $('#login-link').css('display', 'block');
    $('#sign-up').show();
  }
});

$(document).ready(function() {
  $('#representative-name').text(sessionStorage.getItem('representative'));
    $('.slides').slick({
        arrows: true,
        dots: true,
        slidesToShow: 2,
        infinite: true,
        responsive: [
    {
      breakpoint: 769,
      settings: {
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
    });

$("#federal-link").on("click",function(){
    for(var i = 0; i < dummyVars.length; i++){
      drawTableRow(dummyVars[i]);
    }
});

    function drawTableRow(representative){
      var tr = $('<tr>');
      tr.append($('<td class="text-center">').text(representative.name));
      tr.attr('data-name', representative.name);
      tr.addClass('representative');
      tr.append($('<td class="text-center">').text(representative.title));
      tr.append($('<td class="text-center">').text(representative.party));
      tr.append($('<td class="text-center">').append('<a href="tel:' + representative.phone + '">' + representative.phone + '</a><br><a href="mailto:' + representative.email + '">' + representative.email + '</a>'));
      tr.append($('<td class="text-center">').text(representative.currentProjects));
      if(representative.party == 'Democrat'){
        tr.addClass('info');
      } else if(representative.party == 'Republican'){
        tr.addClass('danger')
      }

      $('#table-body').append(tr);
    }

    $(document).on('click', '.representative', function(){
      representative = $(this).attr('data-name');
      sessionStorage.setItem('representative', representative);
      window.location = 'details.html';
    });
});
