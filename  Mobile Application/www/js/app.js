// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db = null;
var tagList = document.getElementsByClassName("tag-list");
var siteList = document.getElementsByClassName("site-list");
var mainBar = document.getElementsByClassName("left-menu-list");
var screenName = 'nebulatechies7';
var currentConceptId = '';
var currentConcept = '';


var airlines = null;


angular.module('ionicApp', ['ionic', 'ngMessages'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
    .state('newsfeed', {
      url: '/newsfeed',
      templateUrl: 'newsfeed.html'
    })
    .state('newsConceptfeed', {
      url: '/newsConceptfeed',
      templateUrl: 'newsConceptfeed.html',
      controller: 'NewsConceptFeedCtrl'
    })
    .state('addTags', {
      url: '/addTags',
      templateUrl: 'addTags.html',
      controller: 'AddTagsCtrl'
    })
    .state('addSites', {
      url: '/addSites',
      templateUrl: 'addSites.html',
      controller: 'AddSitesCtrl'
    })
    .state('showTagsMain', {
      cache: false,
      url: '/showTagsMain',
      templateUrl: 'showTagsMain.html',
      controller: 'ShowTagsMainCtrl'
    })
    .state('showSitesMain', {
      url: '/showSitesMain',
      templateUrl: 'showSitesMain.html',
      controller: 'ShowSitesMainCtrl'
    })
    .state('showSimilarNews', {
      url: '/showSimilarNews',
      templateUrl: 'showSimilarNews.html',
      controller: 'ShowSimilarNewsCtrl'
    })
    .state('positive', {
      url: '/positive',
      templateUrl: 'positive.html',
      controller: 'PositiveNewsCtrl'
    })
    .state('negative', {
      url: '/negative',
      templateUrl: 'negative.html',
      controller: 'NegativeNewsCtrl'
    })
    .state('neutral', {
      url: '/neutral',
      templateUrl: 'neutral.html',
      controller: 'NeutralNewsCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'LoginCtrl'
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html"
    })
    .state('tabs.trending', {
      url: "/trending",
      views: {
        'trending-tab': {
          templateUrl: "trending.html",
          controller: 'TrendingTabCtrl'
        }
      }
    })
    .state('tabs.latest', {
      url: "/latest",
      views: {
        'latest-tab': {
          templateUrl: "latest.html",
          controller: 'LatestTabCtrl'
        }
      }
    })
    .state('tabs.location', {
      url: "/location",
      views: {
        'location-tab': {
          templateUrl: "location.html",
          controller: 'LocationTabCtrl'
        }
      }
    });


   $urlRouterProvider.otherwise("/login");
   $ionicConfigProvider.tabs.position('top'); 

})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate, $http, $state) {
    $scope.showMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
      /*if(tagList.length > 0 && mainBar.length >0 ){
          tagList[0].classList.remove("swipe");
          siteList[0].classList.remove("swipe");
          mainBar[0].classList.remove("swipe");
        }*/
    };

    $scope.fbShare= function(id){
    //function(url, title, descr, image, winWidth, winHeight) {
          //var winTop = (screen.height / 2) - (winHeight / 2);
          //var winLeft = (screen.width / 2) - (winWidth / 2);
          //navigator.app.loadUrl('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight, {openExternal : true});
          var image=document.querySelectorAll("#"+id+" .n-image-url")[0].innerHTML.trim();
          var title=encodeURIComponent(document.querySelectorAll("#"+id+" .n-title")[0].innerHTML.trim().replace(/'/g,"\\'"));
          var descr=encodeURIComponent(document.querySelectorAll("#"+id+" .n-content")[0].innerHTML.trim().replace(/'/g,"\\'"));
          var url=document.querySelectorAll("#"+id+" .n-site-url")[0].innerHTML.trim();
          console.log("url"+url);
          if(url.length == 0){
            url="http://twitter.com";
          }
        //  window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer'+',toolbar=0,status=0', "_blank", 'location=no');
        //alert('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image + 'sharer'+',toolbar=0,status=0');
       // navigator.app.loadUrl('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image + 'sharer'+',toolbar=0,status=0', {openExternal : true});
      navigator.app.loadUrl('http://m.facebook.com/sharer.php?u='+url,{openExternal : true});

    };
    $scope.tweet=function(id){
       var title=encodeURIComponent(document.querySelectorAll("#"+id+" .n-title")[0].innerHTML.trim().replace(/'/g,""));
        navigator.app.loadUrl("http://twitter.com/intent/tweet?text="+title, {openExternal : true});
     //window.open("http://twitter.com/intent/tweet?text="+title);
    };
    $scope.goTo=function(url){
        navigator.app.loadUrl(url, {openExternal : true});
    };
    $scope.goToHome = function(){
      $state.go('tabs.trending');
    }  

    $scope.removeLocalStorage = function(){
      window.localStorage.clear();
    } 

    
    var url = "http://newsintagsv2.eu-gb.mybluemix.net/GetTwitterUserDetails?callback=JSON_CALLBACK&userName=nebulatechies7";
    $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          $scope.profilePhotoSrc = d.profileUrl;
          $scope.profileName = d.profileName;
          $scope.screenName = d.screenName;
          $scope.profileBackgroundImageUrl = d.profileBackgroundImageUrl;
    });

   
    var url = "http://newsintagsv2.eu-gb.mybluemix.net/GetAllConcepts?callback=JSON_CALLBACK";
    $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          

         airlines = d.conceptDetails;
         airlines = airlines.sort(function(a, b) {

          var airlineA = a.concept.toLowerCase();
          var airlineB = b.concept.toLowerCase();

          if(airlineA > airlineB) return 1;
          if(airlineA < airlineB) return -1;
          return 0;
        });
    });

    $scope.showTags = function(){
      if(tagList.length > 0 && mainBar.length >0 ){
        tagList[0].classList.add("swipe");
        mainBar[0].classList.add("swipe");
      }
    };
    $scope.showTagsMain = function(){
      //to hide menu.
      $scope.showMenu();
      $state.go('showTagsMain');
    };
    $scope.showSitesMain = function(){
      //to hide menu.
      $scope.showMenu();
      $state.go('showSitesMain');
    };
    $scope.showSimilarNews = function(newsId){

      console.log(newsId);
      var url="http://newsintagsv2.eu-gb.mybluemix.net/GetSimilarNews?callback=JSON_CALLBACK&newsId="+newsId;
      console.log(url);
       var loading= document.getElementsByClassName("similarNewsloading");
       var similarNewsContent = document.getElementsByClassName("similarNewsContent");
       if(loading.length >0){
          loading[0].style.display = "block";
        }
        if(similarNewsContent.length >0){
          similarNewsContent[0].style.display = "none";
        }
        

 if(window.localStorage['similar_'+newsId] == undefined){
        $http.jsonp(url)
          .success(function(data){
              console.log(d=data);
              $scope.similarNews =data;
              $scope.actualNews = data.newsDetails;
              window.localStorage['similar_'+newsId] = JSON.stringify($scope.similarNews);
              window.localStorage['actual_'+newsId] = JSON.stringify($scope.actualNews);
              if(loading.length >0){
                loading[0].style.display = "none";
              }
              if(similarNewsContent.length >0){
                similarNewsContent[0].style.display = "block";
              }
          });

          } else {
          $scope.similarNews= JSON.parse(window.localStorage['similar_'+newsId]);
          $scope.actualNews = JSON.parse(window.localStorage['actual_'+newsId]);
           if(loading.length >0){
                loading[0].style.display = "none";
              }
              if(similarNewsContent.length >0){
                similarNewsContent[0].style.display = "block";
              }
    }


      $state.go('showSimilarNews');
    };

    $scope.hideTags = function(){
      if(tagList.length > 0 && mainBar.length >0 ){
        tagList[0].classList.remove("swipe");
        mainBar[0].classList.remove("swipe");
      }
    };
    $scope.showSites = function(){
      if(siteList.length > 0 && mainBar.length >0 ){
        siteList[0].classList.add("swipe");
        mainBar[0].classList.add("swipe");
      }
    };
    $scope.hideSites = function(){
      if(siteList.length > 0 && mainBar.length >0 ){
        siteList[0].classList.remove("swipe");
        mainBar[0].classList.remove("swipe");
      }
    };

    $scope.addTags= function(){
      //to hide menu.
    //  $scope.showMenu();
      $state.go('addTags');
    };
     $scope.addSites= function(){
      //to hide menu.
    //  $scope.showMenu();
      $state.go('addSites');
    };
    $scope.showPositiveNews = function(){
      //to hide menu.
      $scope.showMenu();
      $state.go('positive');
    };
    $scope.showNegativeNews = function(){
      //to hide menu.
      $scope.showMenu();
      $state.go('negative');
    };
    $scope.showNeutralNews = function(){
      //to hide menu.
      $scope.showMenu();
      $state.go('neutral');
    };
     $scope.showNewsFeed = function(siteId, siteName){
      //to hide menu.
      //$scope.showMenu();

      var url="http://newsintagsv2.eu-gb.mybluemix.net/GetNewsForSite?callback=JSON_CALLBACK&siteId="+siteId;
      console.log(url);
       var loading= document.getElementsByClassName("conceptNewsloading");
       if(loading.length >0){
          loading[0].style.display = "block";
        }
        $scope.currentSiteName = siteName;
        $http.jsonp(url)
          .success(function(data){
              console.log(d=data);
              $scope.siteNewsResponse =data;
              if(loading.length >0){
                loading[0].style.display = "none";
              }
          });


      $state.go('newsfeed');
    };

    $scope.removeTag = function(event){ 
      event.stopPropagation();
      event.preventDefault();
      //event.taget.parentElement.remove();
      event.target.parentElement.remove();
     
      console.log(ev=event);
    };
    $scope.showConceptNews = function(id,name){
      //to hide menu.
     // $scope.showMenu();
      currentConcept= name;
      currentConceptId= id;

      var url="http://newsintagsv2.eu-gb.mybluemix.net/GetNewsForConcept?callback=JSON_CALLBACK&conceptId="+currentConceptId;
      console.log(url);
       var loading= document.getElementsByClassName("conceptNewsloading");
       if(loading.length >0){
          loading[0].style.display = "block";
        }
        console.log(name);
        $scope.currentConceptName = name;
        $http.jsonp(url)
          .success(function(data){
              console.log(d=data);
              $scope.conceptNewsResponse =data;
              $scope.currentConceptName1 = name;
              if(loading.length >0){
                loading[0].style.display = "none";
              }
          });

      $state.go('newsConceptfeed');
    };

    var url = "http://newsintagsv2.eu-gb.mybluemix.net/GetAllSiteForUser?callback=JSON_CALLBACK&screenName="+screenName;
    $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          $scope.userSiteDetails = d.UserFollowedSites.siteDetails; 
          $scope.allSites = d.ListOfAllSites;
    });
    
    $scope.addUserTag = function(event, conceptId, concept){
      event.stopPropagation();
      event.preventDefault();
      $scope.tagList = document.getElementsByClassName("tag-suggest");
        if($scope.tagList.length >0){
          $scope.tagList[0].style.display = "none";
        }
        

        var url = "http://newsintagsv2.eu-gb.mybluemix.net/AddNewConceptUser?callback=JSON_CALLBACK&conceptId="+conceptId+"&screenName="+screenName;
        console.log(url);
         $http.jsonp(url)
            .success(function(data){
                console.log(d=data);
                console.log("SUCCEEESSS");
                document.getElementById("addTagResult").innerHTML = concept+" successfully Added.";
                var url = "http://newsintagsv2.eu-gb.mybluemix.net/GetNewsConceptForUser?callback=JSON_CALLBACK&screenName="+screenName;
                $http.jsonp(url)
                  .success(function(data){
                      console.log(d=data);
                      $scope.userConceptDetails = d.conceptDetails;  
                });
                setTimeout(function(){document.getElementById("addTagResult").innerHTML="";},5000);
            });
      
        console.log(conceptId);
    };

})
.controller('TrendingTabCtrl', function($scope, $http) {
   var loading= document.getElementsByClassName("trendingloading");
    if(loading.length >0){
      loading[0].style.display = "block";
    }
   var url = "http://newsintagsv2.eu-gb.mybluemix.net/GetTrendingNews?callback=JSON_CALLBACK";


if(window.localStorage['trendingNews'] == undefined){
   $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          data.trendingNews.sort(function(a, b) {
              if (a.conceptCount < b.conceptCount) {
                  return 1;
              } else if (a.conceptCount > b.conceptCount) {
                  return -1;
              }
              return 0;
          });
          $scope.trendingResponse =data;
          window.localStorage['trendingNews'] = JSON.stringify($scope.trendingResponse);
          if(loading.length >0){
            loading[0].style.display = "none";
          }
      });
      
     // var name = window.localStorage['trendingNews'];
    } else {
      $scope.trendingResponse= JSON.parse(window.localStorage['trendingNews']);
      if(loading.length >0){
            loading[0].style.display = "none";
          }
    }



  //resp = '{"status":"success","trendingNews":[{"newsDetails":{"sentiment":"neutral","time":"5h","title":"India, Thailand to sign double taxation avoidance treaty ","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58310b2a7c0078a34915"},"description":"\nExternal Affairs Minister Sushma Swaraj will be the guest of honour on Sunday at the inaugural ceremony of the 16th World Sanskrit Conference, where she will deliver her speech in Sanskrit. \n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/india-thailand-to-sign-double-taxation-avoidance-treaty/article7361846.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Sushma Swaraj","_id":{"$oid":"558f58320b2a7c0078a34916"},"relevance":0.866882,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Andy Murray Credits Amelie Mauresmo and Kim Sears for His Renaissance","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583c0b2a7c0078a3494c"},"description":"Andy Murray, who endured the frustrations of an unexpected split with coach Ivan Lendl, drew strength from his French coach Amelie Mauresmo and his wife Kim Sears.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a18517/sc/14/l/0Lsports0Bndtv0N0Ctennis0Cnews0C2445480Eandy0Emurray0Ecredits0Eamelie0Emauresmo0Eand0Ekim0Esears0Efor0Ehis0Erenaissance0Dpfrom0Fhome0Esports/story01.htm"},"conceptDetails":{"concept":"Amelie Mauresmo","_id":{"$oid":"558f583d0b2a7c0078a3494d"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"positive","time":"6h","title":"Now NCP Says Lalit Modi a Victim, Not a Fugitive","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583e0b2a7c0078a34953"},"description":"Former union minister Sharad Pawar\'s party, the Nationalist Congress Party (NCP) has come out in support of beleaguered former IPL Commissioner Lalit Modi. This comes at a time when the BJP continues ...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a0ac5b/sc/7/l/0L0Sndtv0N0Cindia0Enews0Cnow0Encp0Esays0Elalit0Emodi0Ea0Evictim0Enot0Ea0Efugitive0E775936/story01.htm"},"conceptDetails":{"concept":"Commissioner Lalit Modi","_id":{"$oid":"558f583e0b2a7c0078a34954"},"relevance":0.964483,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"4h","title":"Roger Federer Still in the Mix at Wimbledon, His Lawn of Dreams","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583a0b2a7c0078a34940"},"description":"Wimbledon in 2012 was Federer\'s 17th Grand Slam singles title. Since that victory, he has reached only one other major final, also at Wimbledon, where he lost to Novak Djokovic in five sets last year.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a16afc/sc/13/l/0Lsports0Bndtv0N0Ctennis0Cnews0C2444930Eroger0Efederer0Estill0Ein0Ethe0Emix0Eat0Ewimbledon0Ehis0Elawn0Eof0Edreams/story01.htm"},"conceptDetails":{"concept":"Roger Federer","_id":{"$oid":"558f583a0b2a7c0078a34941"},"relevance":0.837829,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"neutral","time":"8h","title":"MS Dhoni and Virat Kohli Have no Rift Between Them: Mohammed Shami","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58410b2a7c0078a34965"},"description":"Mohammed Shami also requested media not to highlight \"baseless\" stories of disunity and rift between Virat Kohli and MS Dhoni, and instead write about the team's ad players' performance.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a0f095/sc/15/l/0Lsports0Bndtv0N0Ccricket0Cnews0C2445320Ems0Edhoni0Eand0Evirat0Ekohli0Ehave0Eno0Erift0Ebetween0Ethem0Emohammed0Eshami0Dpfrom0Fhome0Ecricket/story01.htm"},"conceptDetails":{"concept":"MS Dhoni","_id":{"$oid":"558f58410b2a7c0078a34966"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"positive","time":"8h","title":"Today at 2pm ET: @Space_Station update briefing previewing Sunday\'s @SpaceX flight. Watch: ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584a0b2a7c0078a34993"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/KX5g7zfYQe http://t.co/Ie433ISZJm"},"conceptDetails":{"concept":"@SpaceX","_id":{"$oid":"558f58460b2a7c0078a3497f"},"relevance":0.01,"type":"TwitterHandle"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":"Two killed in Nagaland blast","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58340b2a7c0078a34921"},"description":"\nA man and a woman were killed and two were critically injured in a blast on the premises of Christian Institute of Health Sciences &#38; Research (CIHSR) at Dimapur in Nagaland on Saturday. The po...\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/other-states/two-killed-in-nagaland-blast/article7361826.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Nagaland","_id":{"$oid":"558f58340b2a7c0078a34922"},"relevance":0.883672,"type":"Country"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"negative","time":"9h","title":"Weather remains 90% \u2018go\u2019 for Sunday\'s 10:21am ET @SpaceX #ISScargo launch: ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584c0b2a7c0078a3499b"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"https://t.co/EGRrLlohza http://t.co/6SW0bqW6Yt"},"conceptDetails":{"concept":"90%","_id":{"$oid":"558f584d0b2a7c0078a3499c"},"relevance":0.01,"type":"Quantity"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":" Olive Ridley turtle rescued in Mumbai","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582e0b2a7c0078a348fe"},"description":"\nIt is said to have been injured by fishing trawler on Mumbai suburb\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/cities/mumbai/olive-ridley-turtle-rescued-in-mumbai/article7361824.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Mumbai","_id":{"$oid":"558f582e0b2a7c0078a348ff"},"relevance":0.964357,"type":"City"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Major fire at Arun Gawli\'s hub in Mumbai","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58350b2a7c0078a34928"},"description":"\nA major fire was reported from Dagdi Chawl, Mumbai underworld don Arun Gawli\'s hideout, in Byculla I central Mumbai shortly before midnight on Saturday.\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/cities/mumbai/major-fire-at-arun-gawlis-hub-in-mumbai/article7361802.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Arun Gawli","_id":{"$oid":"558f58360b2a7c0078a34929"},"relevance":0.797609,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"negative","time":"8h","title":"ICC Makes ODI Rules Changes to Strike Balance Between Bat and Ball","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58420b2a7c0078a3496e"},"description":"International Cricket Council have announced that, from July 5, five fielders will be allowed outside the 30-yard circle between the 41st and 50th overs, rather than the current four.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a0ea5c/sc/24/l/0Lsports0Bndtv0N0Ccricket0Cnews0C24450A0A0Einternational0Ecricket0Ecouncil0Emakes0Eodi0Erules0Echanges0Eto0Estrike0Ebalance0Ebetween0Ebat0Eand0Eball/story01.htm"},"conceptDetails":{"concept":"ICC","_id":{"$oid":"558f58430b2a7c0078a3496f"},"relevance":0.33,"type":"Organization"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"38m","title":"Sangakkara to Quit International Cricket After Second Test vs India","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58380b2a7c0078a34938"},"description":"Kumar Sangakkara, the Sri Lankan ace batsman and wicket-keeper, confirmed that he would hang up his boots after the second Test of the upcoming India series. Sri Lanka is currently facing Pakistan in ...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/479fddb1/sc/13/l/0Lsports0Bndtv0N0Ccricket0Cnews0C2445290Ekumar0Esangakkara0Eto0Eretire0Efrom0Einternational0Ecricket0Eafter0Esecond0Etest0Eagainst0Eindia0Dpfrom0Fhome0Ecricket/story01.htm"},"conceptDetails":{"concept":"India","_id":{"$oid":"558f58320b2a7c0078a34918"},"relevance":0.257829,"type":"Country"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":"Tackling water crisis, the Maharashtra way","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582d0b2a7c0078a348fb"},"description":"\nNovel scheme fires farmers\u2019 imagination in perennially drought-hit areas\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/tackling-water-crisis-the-maharashtra-way/article7362047.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Maharashtra","_id":{"$oid":"558f582d0b2a7c0078a348fc"},"relevance":0.974189,"type":"StateOrCounty"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Chhota Bheem goes to Africa, West Asia","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582b0b2a7c0078a348f4"},"description":"\nAfter conquering South-East Asia, animated hero Chhota Bheem is soon to venture into countries in Africa and West Asia. \n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/entertainment/animated-hero-chhota-bheem-soon-to-venture-into-africa-and-west-asia/article7362049.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"West Asia","_id":{"$oid":"558f582c0b2a7c0078a348f5"},"relevance":0.880974,"type":"Region"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"positive","time":"8h","title":"Raje\'s Delhi Visit Only to Attend NITI Aayog Meet, Says Her Office","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58430b2a7c0078a34975"},"description":"As opposition clamour continues for her resignation over links with tainted cricket boss Lalit Modi, embattled Rajasthan Chief Minister Vasundhara Raje today visited Delhi to attend a meeting of the N...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/479e5820/sc/31/l/0L0Sndtv0N0Cindia0Enews0Crajasthan0Echief0Eminister0Evasundhara0Eraje0Eto0Eattend0Eniti0Eaayog0Emeeting0Ein0Edelhi0Etoday0E775766/story01.htm"},"conceptDetails":{"concept":"Chief Minister Vasundhara Raje","_id":{"$oid":"558f58440b2a7c0078a34976"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"4h","title":"No audience with PM, Shah for Raje","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582a0b2a7c0078a348e9"},"description":"\nWith TV channels reporting that Mr. Modi and Mr. Shah had refused to give her an appointment, Ms. Raje\u2019s office in Jaipur put out an official statement denying these reports.\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/lalitgate-rajastham-cm-returns-to-jaipur-without-meeting-modi/article7361822.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Ms. Raje","_id":{"$oid":"558f582a0b2a7c0078a348ea"},"relevance":0.928356,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"positive","time":"40m","title":"RT @StationCDRKelly: Day 92. #Aurora is back in town. Good night from @space_station! #YearInSpace ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58460b2a7c0078a34981"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/UmZhTOlfZJ"},"conceptDetails":{"concept":"@StationCDRKelly","_id":{"$oid":"558f58460b2a7c0078a34982"},"relevance":0.01,"type":"TwitterHandle"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"positive","time":"9h","title":"Great day..my 6th filmfare nd #maari trailer 1 million views in 2 days!!Thank u nd Luv u all.#tharalocal #senjuruven ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584b0b2a7c0078a34994"},"userImageUrl":"http://pbs.twimg.com/profile_images/579237414368976896/9A0rX5YG_mini.jpg","userScreenName":"dhanushkraja","url":"http://t.co/f3n38Tflf3"},"conceptDetails":{"concept":"#senjuruven","_id":{"$oid":"558f584c0b2a7c0078a34995"},"relevance":0.01,"type":"Hashtag"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"negative","time":"7h","title":"\'Need to Maintain Probity in Public Life, I Resigned After Hawala Scam,\' Says LK Advani","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583f0b2a7c0078a3495e"},"description":"In a veiled message to the Modi government in the wake of the controversy over Sushma Swaraj and Vasundhara Raje, BJP patriarch LK Advani on Saturday said there is a need to maintain probity in public...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a16029/sc/33/l/0L0Sndtv0N0Cindia0Enews0Cneed0Eto0Emaintain0Eprobity0Ein0Epublic0Elife0Ei0Eresigned0Eafter0Ehawala0Escam0Esays0Elk0Eadvani0E775977/story01.htm"},"conceptDetails":{"concept":"LK Advani","_id":{"$oid":"558f58400b2a7c0078a3495f"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":"Pappu wants CBI probe into Anant Singh case ","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58300b2a7c0078a3490a"},"description":"\nThe expelled RJD MP led a march to Raj Bhavan as he was denied permission to hold rally\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/other-states/pappu-yadav-wants-cbi-probe-into-anant-singh-case/article7362046.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Anant Singh","_id":{"$oid":"558f58300b2a7c0078a3490b"},"relevance":0.978036,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"22m","title":"5.6-Magnitude Earthquake Hits Assam, No Damage Reported","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58360b2a7c0078a3492f"},"description":"A 5.6-magnitude earthquake of moderate intensity hit Assam this morning. The epicentre of the quake is in Kokrajhar according to the Indian Meteorological Department.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a25a69/sc/7/l/0L0Sndtv0N0Cindia0Enews0C50E60Emagnitude0Eearthquake0Ehits0Eassam0Eno0Edamage0Ereported0E7760A0A3/story01.htm"},"conceptDetails":{"concept":"Assam","_id":{"$oid":"558f58370b2a7c0078a34930"},"relevance":0.927847,"type":"Country"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Rashtrapati Bhavan to get an AYUSH centre","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582f0b2a7c0078a34903"},"description":"\nPrime Minister Narendra Modi\u2019s message to popularise ancient Indian medicine practices has found resonance with Rashtrapati Bhavan.\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/rashtrapati-bhavan-to-get-an-ayush-centre/article7361823.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Prime Minister Narendra Modi","_id":{"$oid":"558f582f0b2a7c0078a34904"},"relevance":0.950664,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"8h","title":"LIVE Now: Future of @Space_Station briefing in preview of Sunday\'s @SpaceX launch. Q? #askNASA ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58480b2a7c0078a34990"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/KX5g7yYnYG http://t.co/LrO7uazv7M"},"conceptDetails":{"concept":"#askNASA","_id":{"$oid":"558f58490b2a7c0078a34991"},"relevance":0.01,"type":"Hashtag"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"PM Modi to Visit Varanasi Today, Launch Rs 57 Crore Power Supply Project","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583b0b2a7c0078a34945"},"description":"Prime Minister Narendra Modi has a packed schedule on Sunday starting with an address to the nation on radio, to visiting Jharkhand and Uttar Pradesh where he will inaugurate a number of developmental...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a18edd/sc/28/l/0L0Sndtv0N0Ccheat0Esheet0Cpm0Emodi0Eto0Evisit0Evaranasi0Etoday0Elaunch0Ers0E570Ecrore0Epower0Esupply0Eproject0E775989/story01.htm"},"conceptDetails":{"concept":"Visit Varanasi","_id":{"$oid":"558f583b0b2a7c0078a34946"},"relevance":0.33,"type":"City"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"10h","title":"Tuesday will be a bit longer than usual. An extra second, or leap second, will be added. Why? ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584e0b2a7c0078a3499e"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/Txt5pm8SIt http://t.co/QWYRBSBOYJ"},"conceptDetails":{"concept":"leap second","_id":{"$oid":"558f584e0b2a7c0078a3499f"},"relevance":0.987046,"type":"FieldTerminology"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"neutral","time":"1h","title":"Today marks the 70th anniversary of the first launch ever from @NASA_Wallops on the Eastern Shore of Virginia.\n","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58470b2a7c0078a3498a"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"https://t.co/6VKbPlva87"},"conceptDetails":{"concept":"Virginia","_id":{"$oid":"558f58480b2a7c0078a3498b"},"relevance":0.33,"type":"StateOrCounty"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Manipur village in troubled waters ","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58330b2a7c0078a3491c"},"description":"\nTribals hit as Mapithel dam waters submerge hamlet \n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/manipur-village-in-troubled-waters/article7361825.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Manipur","_id":{"$oid":"558f58330b2a7c0078a3491d"},"relevance":0.927732,"type":"StateOrCounty"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"negative","time":"6m","title":"Don't miss Sunday's 10:21am ET @SpaceX #ISScargo launch. TV coverage starts at 9am: ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58450b2a7c0078a3497c"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"https://t.co/EGRrLlohza http://t.co/fupnRo7Rrk"},"conceptDetails":{"concept":"#ISScargo","_id":{"$oid":"558f58460b2a7c0078a3497d"},"relevance":0.01,"type":"Hashtag"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}}]}';
  resp={"status":"success","trendingNews":[{"newsDetails":{"sentiment":"neutral","time":"5h","title":"India, Thailand to sign double taxation avoidance treaty ","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58310b2a7c0078a34915"},"description":"\nExternal Affairs Minister Sushma Swaraj will be the guest of honour on Sunday at the inaugural ceremony of the 16th World Sanskrit Conference, where she will deliver her speech in Sanskrit. \n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/india-thailand-to-sign-double-taxation-avoidance-treaty/article7361846.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Sushma Swaraj","_id":{"$oid":"558f58320b2a7c0078a34916"},"relevance":0.866882,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}}]};
 // $scope.trendingResponse =resp;
 /*$scope.doRefresh =function(){
    console.log("RRREFFFREESHH");
     var url = "http://newsintags.eu-gb.mybluemix.net/RefreshCollections?callback=JSON_CALLBACK";
    $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          url = "http://newsintags.eu-gb.mybluemix.net/GetTrendingNews?callback=JSON_CALLBACK";
          $http.jsonp(url)
            .success(function(data){
                console.log(d=data);
                $scope.trendingResponse =data;
                $scope.$broadcast('scroll.refreshComplete');
            });
      });
  };*/

})
.controller('LatestTabCtrl', function($scope, $http) {
var loading= document.getElementsByClassName("latestloading");
var url = "http://newsintagsv2.eu-gb.mybluemix.net/GetLatestNews?callback=JSON_CALLBACK";
   
   if(loading.length >0){
      loading[0].style.display = "block";
    }

if(window.localStorage['latestNews'] == undefined){
  $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          $scope.latestResponse=data;
          window.localStorage['latestNews'] = JSON.stringify($scope.latestResponse);
          if(loading.length >0){
            loading[0].style.display = "none";
          }
      }); 
    } else {
       $scope.latestResponse= JSON.parse(window.localStorage['latestNews']);
       if(loading.length >0){
            loading[0].style.display = "none";
          }
    }
  //resp = '{"status":"success","trendingNews":[{"newsDetails":{"sentiment":"neutral","time":"5h","title":"India, Thailand to sign double taxation avoidance treaty ","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58310b2a7c0078a34915"},"description":"\nExternal Affairs Minister Sushma Swaraj will be the guest of honour on Sunday at the inaugural ceremony of the 16th World Sanskrit Conference, where she will deliver her speech in Sanskrit. \n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/india-thailand-to-sign-double-taxation-avoidance-treaty/article7361846.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Sushma Swaraj","_id":{"$oid":"558f58320b2a7c0078a34916"},"relevance":0.866882,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Andy Murray Credits Amelie Mauresmo and Kim Sears for His Renaissance","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583c0b2a7c0078a3494c"},"description":"Andy Murray, who endured the frustrations of an unexpected split with coach Ivan Lendl, drew strength from his French coach Amelie Mauresmo and his wife Kim Sears.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a18517/sc/14/l/0Lsports0Bndtv0N0Ctennis0Cnews0C2445480Eandy0Emurray0Ecredits0Eamelie0Emauresmo0Eand0Ekim0Esears0Efor0Ehis0Erenaissance0Dpfrom0Fhome0Esports/story01.htm"},"conceptDetails":{"concept":"Amelie Mauresmo","_id":{"$oid":"558f583d0b2a7c0078a3494d"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"positive","time":"6h","title":"Now NCP Says Lalit Modi a Victim, Not a Fugitive","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583e0b2a7c0078a34953"},"description":"Former union minister Sharad Pawar\'s party, the Nationalist Congress Party (NCP) has come out in support of beleaguered former IPL Commissioner Lalit Modi. This comes at a time when the BJP continues ...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a0ac5b/sc/7/l/0L0Sndtv0N0Cindia0Enews0Cnow0Encp0Esays0Elalit0Emodi0Ea0Evictim0Enot0Ea0Efugitive0E775936/story01.htm"},"conceptDetails":{"concept":"Commissioner Lalit Modi","_id":{"$oid":"558f583e0b2a7c0078a34954"},"relevance":0.964483,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"4h","title":"Roger Federer Still in the Mix at Wimbledon, His Lawn of Dreams","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583a0b2a7c0078a34940"},"description":"Wimbledon in 2012 was Federer\'s 17th Grand Slam singles title. Since that victory, he has reached only one other major final, also at Wimbledon, where he lost to Novak Djokovic in five sets last year.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a16afc/sc/13/l/0Lsports0Bndtv0N0Ctennis0Cnews0C2444930Eroger0Efederer0Estill0Ein0Ethe0Emix0Eat0Ewimbledon0Ehis0Elawn0Eof0Edreams/story01.htm"},"conceptDetails":{"concept":"Roger Federer","_id":{"$oid":"558f583a0b2a7c0078a34941"},"relevance":0.837829,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"neutral","time":"8h","title":"MS Dhoni and Virat Kohli Have no Rift Between Them: Mohammed Shami","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58410b2a7c0078a34965"},"description":"Mohammed Shami also requested media not to highlight \"baseless\" stories of disunity and rift between Virat Kohli and MS Dhoni, and instead write about the team's ad players' performance.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a0f095/sc/15/l/0Lsports0Bndtv0N0Ccricket0Cnews0C2445320Ems0Edhoni0Eand0Evirat0Ekohli0Ehave0Eno0Erift0Ebetween0Ethem0Emohammed0Eshami0Dpfrom0Fhome0Ecricket/story01.htm"},"conceptDetails":{"concept":"MS Dhoni","_id":{"$oid":"558f58410b2a7c0078a34966"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"positive","time":"8h","title":"Today at 2pm ET: @Space_Station update briefing previewing Sunday\'s @SpaceX flight. Watch: ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584a0b2a7c0078a34993"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/KX5g7zfYQe http://t.co/Ie433ISZJm"},"conceptDetails":{"concept":"@SpaceX","_id":{"$oid":"558f58460b2a7c0078a3497f"},"relevance":0.01,"type":"TwitterHandle"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":"Two killed in Nagaland blast","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58340b2a7c0078a34921"},"description":"\nA man and a woman were killed and two were critically injured in a blast on the premises of Christian Institute of Health Sciences &#38; Research (CIHSR) at Dimapur in Nagaland on Saturday. The po...\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/other-states/two-killed-in-nagaland-blast/article7361826.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Nagaland","_id":{"$oid":"558f58340b2a7c0078a34922"},"relevance":0.883672,"type":"Country"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"negative","time":"9h","title":"Weather remains 90% \u2018go\u2019 for Sunday\'s 10:21am ET @SpaceX #ISScargo launch: ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584c0b2a7c0078a3499b"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"https://t.co/EGRrLlohza http://t.co/6SW0bqW6Yt"},"conceptDetails":{"concept":"90%","_id":{"$oid":"558f584d0b2a7c0078a3499c"},"relevance":0.01,"type":"Quantity"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":" Olive Ridley turtle rescued in Mumbai","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582e0b2a7c0078a348fe"},"description":"\nIt is said to have been injured by fishing trawler on Mumbai suburb\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/cities/mumbai/olive-ridley-turtle-rescued-in-mumbai/article7361824.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Mumbai","_id":{"$oid":"558f582e0b2a7c0078a348ff"},"relevance":0.964357,"type":"City"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Major fire at Arun Gawli\'s hub in Mumbai","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58350b2a7c0078a34928"},"description":"\nA major fire was reported from Dagdi Chawl, Mumbai underworld don Arun Gawli\'s hideout, in Byculla I central Mumbai shortly before midnight on Saturday.\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/cities/mumbai/major-fire-at-arun-gawlis-hub-in-mumbai/article7361802.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Arun Gawli","_id":{"$oid":"558f58360b2a7c0078a34929"},"relevance":0.797609,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"negative","time":"8h","title":"ICC Makes ODI Rules Changes to Strike Balance Between Bat and Ball","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58420b2a7c0078a3496e"},"description":"International Cricket Council have announced that, from July 5, five fielders will be allowed outside the 30-yard circle between the 41st and 50th overs, rather than the current four.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a0ea5c/sc/24/l/0Lsports0Bndtv0N0Ccricket0Cnews0C24450A0A0Einternational0Ecricket0Ecouncil0Emakes0Eodi0Erules0Echanges0Eto0Estrike0Ebalance0Ebetween0Ebat0Eand0Eball/story01.htm"},"conceptDetails":{"concept":"ICC","_id":{"$oid":"558f58430b2a7c0078a3496f"},"relevance":0.33,"type":"Organization"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"38m","title":"Sangakkara to Quit International Cricket After Second Test vs India","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58380b2a7c0078a34938"},"description":"Kumar Sangakkara, the Sri Lankan ace batsman and wicket-keeper, confirmed that he would hang up his boots after the second Test of the upcoming India series. Sri Lanka is currently facing Pakistan in ...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/479fddb1/sc/13/l/0Lsports0Bndtv0N0Ccricket0Cnews0C2445290Ekumar0Esangakkara0Eto0Eretire0Efrom0Einternational0Ecricket0Eafter0Esecond0Etest0Eagainst0Eindia0Dpfrom0Fhome0Ecricket/story01.htm"},"conceptDetails":{"concept":"India","_id":{"$oid":"558f58320b2a7c0078a34918"},"relevance":0.257829,"type":"Country"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":"Tackling water crisis, the Maharashtra way","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582d0b2a7c0078a348fb"},"description":"\nNovel scheme fires farmers\u2019 imagination in perennially drought-hit areas\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/tackling-water-crisis-the-maharashtra-way/article7362047.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Maharashtra","_id":{"$oid":"558f582d0b2a7c0078a348fc"},"relevance":0.974189,"type":"StateOrCounty"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Chhota Bheem goes to Africa, West Asia","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582b0b2a7c0078a348f4"},"description":"\nAfter conquering South-East Asia, animated hero Chhota Bheem is soon to venture into countries in Africa and West Asia. \n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/entertainment/animated-hero-chhota-bheem-soon-to-venture-into-africa-and-west-asia/article7362049.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"West Asia","_id":{"$oid":"558f582c0b2a7c0078a348f5"},"relevance":0.880974,"type":"Region"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"positive","time":"8h","title":"Raje\'s Delhi Visit Only to Attend NITI Aayog Meet, Says Her Office","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58430b2a7c0078a34975"},"description":"As opposition clamour continues for her resignation over links with tainted cricket boss Lalit Modi, embattled Rajasthan Chief Minister Vasundhara Raje today visited Delhi to attend a meeting of the N...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/479e5820/sc/31/l/0L0Sndtv0N0Cindia0Enews0Crajasthan0Echief0Eminister0Evasundhara0Eraje0Eto0Eattend0Eniti0Eaayog0Emeeting0Ein0Edelhi0Etoday0E775766/story01.htm"},"conceptDetails":{"concept":"Chief Minister Vasundhara Raje","_id":{"$oid":"558f58440b2a7c0078a34976"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"4h","title":"No audience with PM, Shah for Raje","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582a0b2a7c0078a348e9"},"description":"\nWith TV channels reporting that Mr. Modi and Mr. Shah had refused to give her an appointment, Ms. Raje\u2019s office in Jaipur put out an official statement denying these reports.\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/lalitgate-rajastham-cm-returns-to-jaipur-without-meeting-modi/article7361822.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Ms. Raje","_id":{"$oid":"558f582a0b2a7c0078a348ea"},"relevance":0.928356,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"positive","time":"40m","title":"RT @StationCDRKelly: Day 92. #Aurora is back in town. Good night from @space_station! #YearInSpace ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58460b2a7c0078a34981"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/UmZhTOlfZJ"},"conceptDetails":{"concept":"@StationCDRKelly","_id":{"$oid":"558f58460b2a7c0078a34982"},"relevance":0.01,"type":"TwitterHandle"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"positive","time":"9h","title":"Great day..my 6th filmfare nd #maari trailer 1 million views in 2 days!!Thank u nd Luv u all.#tharalocal #senjuruven ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584b0b2a7c0078a34994"},"userImageUrl":"http://pbs.twimg.com/profile_images/579237414368976896/9A0rX5YG_mini.jpg","userScreenName":"dhanushkraja","url":"http://t.co/f3n38Tflf3"},"conceptDetails":{"concept":"#senjuruven","_id":{"$oid":"558f584c0b2a7c0078a34995"},"relevance":0.01,"type":"Hashtag"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"negative","time":"7h","title":"\'Need to Maintain Probity in Public Life, I Resigned After Hawala Scam,\' Says LK Advani","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583f0b2a7c0078a3495e"},"description":"In a veiled message to the Modi government in the wake of the controversy over Sushma Swaraj and Vasundhara Raje, BJP patriarch LK Advani on Saturday said there is a need to maintain probity in public...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a16029/sc/33/l/0L0Sndtv0N0Cindia0Enews0Cneed0Eto0Emaintain0Eprobity0Ein0Epublic0Elife0Ei0Eresigned0Eafter0Ehawala0Escam0Esays0Elk0Eadvani0E775977/story01.htm"},"conceptDetails":{"concept":"LK Advani","_id":{"$oid":"558f58400b2a7c0078a3495f"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":"Pappu wants CBI probe into Anant Singh case ","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58300b2a7c0078a3490a"},"description":"\nThe expelled RJD MP led a march to Raj Bhavan as he was denied permission to hold rally\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/other-states/pappu-yadav-wants-cbi-probe-into-anant-singh-case/article7362046.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Anant Singh","_id":{"$oid":"558f58300b2a7c0078a3490b"},"relevance":0.978036,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"22m","title":"5.6-Magnitude Earthquake Hits Assam, No Damage Reported","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58360b2a7c0078a3492f"},"description":"A 5.6-magnitude earthquake of moderate intensity hit Assam this morning. The epicentre of the quake is in Kokrajhar according to the Indian Meteorological Department.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a25a69/sc/7/l/0L0Sndtv0N0Cindia0Enews0C50E60Emagnitude0Eearthquake0Ehits0Eassam0Eno0Edamage0Ereported0E7760A0A3/story01.htm"},"conceptDetails":{"concept":"Assam","_id":{"$oid":"558f58370b2a7c0078a34930"},"relevance":0.927847,"type":"Country"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Rashtrapati Bhavan to get an AYUSH centre","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582f0b2a7c0078a34903"},"description":"\nPrime Minister Narendra Modi\u2019s message to popularise ancient Indian medicine practices has found resonance with Rashtrapati Bhavan.\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/rashtrapati-bhavan-to-get-an-ayush-centre/article7361823.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Prime Minister Narendra Modi","_id":{"$oid":"558f582f0b2a7c0078a34904"},"relevance":0.950664,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"8h","title":"LIVE Now: Future of @Space_Station briefing in preview of Sunday\'s @SpaceX launch. Q? #askNASA ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58480b2a7c0078a34990"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/KX5g7yYnYG http://t.co/LrO7uazv7M"},"conceptDetails":{"concept":"#askNASA","_id":{"$oid":"558f58490b2a7c0078a34991"},"relevance":0.01,"type":"Hashtag"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"PM Modi to Visit Varanasi Today, Launch Rs 57 Crore Power Supply Project","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583b0b2a7c0078a34945"},"description":"Prime Minister Narendra Modi has a packed schedule on Sunday starting with an address to the nation on radio, to visiting Jharkhand and Uttar Pradesh where he will inaugurate a number of developmental...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a18edd/sc/28/l/0L0Sndtv0N0Ccheat0Esheet0Cpm0Emodi0Eto0Evisit0Evaranasi0Etoday0Elaunch0Ers0E570Ecrore0Epower0Esupply0Eproject0E775989/story01.htm"},"conceptDetails":{"concept":"Visit Varanasi","_id":{"$oid":"558f583b0b2a7c0078a34946"},"relevance":0.33,"type":"City"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"10h","title":"Tuesday will be a bit longer than usual. An extra second, or leap second, will be added. Why? ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584e0b2a7c0078a3499e"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/Txt5pm8SIt http://t.co/QWYRBSBOYJ"},"conceptDetails":{"concept":"leap second","_id":{"$oid":"558f584e0b2a7c0078a3499f"},"relevance":0.987046,"type":"FieldTerminology"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"neutral","time":"1h","title":"Today marks the 70th anniversary of the first launch ever from @NASA_Wallops on the Eastern Shore of Virginia.\n","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58470b2a7c0078a3498a"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"https://t.co/6VKbPlva87"},"conceptDetails":{"concept":"Virginia","_id":{"$oid":"558f58480b2a7c0078a3498b"},"relevance":0.33,"type":"StateOrCounty"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Manipur village in troubled waters ","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58330b2a7c0078a3491c"},"description":"\nTribals hit as Mapithel dam waters submerge hamlet \n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/manipur-village-in-troubled-waters/article7361825.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Manipur","_id":{"$oid":"558f58330b2a7c0078a3491d"},"relevance":0.927732,"type":"StateOrCounty"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"negative","time":"6m","title":"Don't miss Sunday's 10:21am ET @SpaceX #ISScargo launch. TV coverage starts at 9am: ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58450b2a7c0078a3497c"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"https://t.co/EGRrLlohza http://t.co/fupnRo7Rrk"},"conceptDetails":{"concept":"#ISScargo","_id":{"$oid":"558f58460b2a7c0078a3497d"},"relevance":0.01,"type":"Hashtag"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}}]}';
 

})
.controller('LocationTabCtrl', function($scope, $http) {
var loading= document.getElementsByClassName("locationloading");
var url = "http://newsintagsv2.eu-gb.mybluemix.net/GetFollowingDetails?callback=JSON_CALLBACK";
   
   if(loading.length >0){
      loading[0].style.display = "block";
    }

if(window.localStorage['locationResponse'] == undefined){
  $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          $scope.locationResponse =data;
          window.localStorage['locationResponse'] = JSON.stringify($scope.locationResponse);
          if(loading.length >0){
            loading[0].style.display = "none";
          }
      }); 
  } else {
    $scope.locationResponse= JSON.parse(window.localStorage['locationResponse']);
      if(loading.length >0){
            loading[0].style.display = "none";
          }
  }
  //resp = '{"status":"success","trendingNews":[{"newsDetails":{"sentiment":"neutral","time":"5h","title":"India, Thailand to sign double taxation avoidance treaty ","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58310b2a7c0078a34915"},"description":"\nExternal Affairs Minister Sushma Swaraj will be the guest of honour on Sunday at the inaugural ceremony of the 16th World Sanskrit Conference, where she will deliver her speech in Sanskrit. \n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/india-thailand-to-sign-double-taxation-avoidance-treaty/article7361846.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Sushma Swaraj","_id":{"$oid":"558f58320b2a7c0078a34916"},"relevance":0.866882,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Andy Murray Credits Amelie Mauresmo and Kim Sears for His Renaissance","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583c0b2a7c0078a3494c"},"description":"Andy Murray, who endured the frustrations of an unexpected split with coach Ivan Lendl, drew strength from his French coach Amelie Mauresmo and his wife Kim Sears.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a18517/sc/14/l/0Lsports0Bndtv0N0Ctennis0Cnews0C2445480Eandy0Emurray0Ecredits0Eamelie0Emauresmo0Eand0Ekim0Esears0Efor0Ehis0Erenaissance0Dpfrom0Fhome0Esports/story01.htm"},"conceptDetails":{"concept":"Amelie Mauresmo","_id":{"$oid":"558f583d0b2a7c0078a3494d"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"positive","time":"6h","title":"Now NCP Says Lalit Modi a Victim, Not a Fugitive","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583e0b2a7c0078a34953"},"description":"Former union minister Sharad Pawar\'s party, the Nationalist Congress Party (NCP) has come out in support of beleaguered former IPL Commissioner Lalit Modi. This comes at a time when the BJP continues ...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a0ac5b/sc/7/l/0L0Sndtv0N0Cindia0Enews0Cnow0Encp0Esays0Elalit0Emodi0Ea0Evictim0Enot0Ea0Efugitive0E775936/story01.htm"},"conceptDetails":{"concept":"Commissioner Lalit Modi","_id":{"$oid":"558f583e0b2a7c0078a34954"},"relevance":0.964483,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"4h","title":"Roger Federer Still in the Mix at Wimbledon, His Lawn of Dreams","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583a0b2a7c0078a34940"},"description":"Wimbledon in 2012 was Federer\'s 17th Grand Slam singles title. Since that victory, he has reached only one other major final, also at Wimbledon, where he lost to Novak Djokovic in five sets last year.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a16afc/sc/13/l/0Lsports0Bndtv0N0Ctennis0Cnews0C2444930Eroger0Efederer0Estill0Ein0Ethe0Emix0Eat0Ewimbledon0Ehis0Elawn0Eof0Edreams/story01.htm"},"conceptDetails":{"concept":"Roger Federer","_id":{"$oid":"558f583a0b2a7c0078a34941"},"relevance":0.837829,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"neutral","time":"8h","title":"MS Dhoni and Virat Kohli Have no Rift Between Them: Mohammed Shami","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58410b2a7c0078a34965"},"description":"Mohammed Shami also requested media not to highlight \"baseless\" stories of disunity and rift between Virat Kohli and MS Dhoni, and instead write about the team's ad players' performance.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a0f095/sc/15/l/0Lsports0Bndtv0N0Ccricket0Cnews0C2445320Ems0Edhoni0Eand0Evirat0Ekohli0Ehave0Eno0Erift0Ebetween0Ethem0Emohammed0Eshami0Dpfrom0Fhome0Ecricket/story01.htm"},"conceptDetails":{"concept":"MS Dhoni","_id":{"$oid":"558f58410b2a7c0078a34966"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"positive","time":"8h","title":"Today at 2pm ET: @Space_Station update briefing previewing Sunday\'s @SpaceX flight. Watch: ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584a0b2a7c0078a34993"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/KX5g7zfYQe http://t.co/Ie433ISZJm"},"conceptDetails":{"concept":"@SpaceX","_id":{"$oid":"558f58460b2a7c0078a3497f"},"relevance":0.01,"type":"TwitterHandle"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":"Two killed in Nagaland blast","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58340b2a7c0078a34921"},"description":"\nA man and a woman were killed and two were critically injured in a blast on the premises of Christian Institute of Health Sciences &#38; Research (CIHSR) at Dimapur in Nagaland on Saturday. The po...\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/other-states/two-killed-in-nagaland-blast/article7361826.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Nagaland","_id":{"$oid":"558f58340b2a7c0078a34922"},"relevance":0.883672,"type":"Country"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"negative","time":"9h","title":"Weather remains 90% \u2018go\u2019 for Sunday\'s 10:21am ET @SpaceX #ISScargo launch: ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584c0b2a7c0078a3499b"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"https://t.co/EGRrLlohza http://t.co/6SW0bqW6Yt"},"conceptDetails":{"concept":"90%","_id":{"$oid":"558f584d0b2a7c0078a3499c"},"relevance":0.01,"type":"Quantity"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":" Olive Ridley turtle rescued in Mumbai","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582e0b2a7c0078a348fe"},"description":"\nIt is said to have been injured by fishing trawler on Mumbai suburb\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/cities/mumbai/olive-ridley-turtle-rescued-in-mumbai/article7361824.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Mumbai","_id":{"$oid":"558f582e0b2a7c0078a348ff"},"relevance":0.964357,"type":"City"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Major fire at Arun Gawli\'s hub in Mumbai","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58350b2a7c0078a34928"},"description":"\nA major fire was reported from Dagdi Chawl, Mumbai underworld don Arun Gawli\'s hideout, in Byculla I central Mumbai shortly before midnight on Saturday.\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/cities/mumbai/major-fire-at-arun-gawlis-hub-in-mumbai/article7361802.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Arun Gawli","_id":{"$oid":"558f58360b2a7c0078a34929"},"relevance":0.797609,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"negative","time":"8h","title":"ICC Makes ODI Rules Changes to Strike Balance Between Bat and Ball","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58420b2a7c0078a3496e"},"description":"International Cricket Council have announced that, from July 5, five fielders will be allowed outside the 30-yard circle between the 41st and 50th overs, rather than the current four.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a0ea5c/sc/24/l/0Lsports0Bndtv0N0Ccricket0Cnews0C24450A0A0Einternational0Ecricket0Ecouncil0Emakes0Eodi0Erules0Echanges0Eto0Estrike0Ebalance0Ebetween0Ebat0Eand0Eball/story01.htm"},"conceptDetails":{"concept":"ICC","_id":{"$oid":"558f58430b2a7c0078a3496f"},"relevance":0.33,"type":"Organization"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"38m","title":"Sangakkara to Quit International Cricket After Second Test vs India","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58380b2a7c0078a34938"},"description":"Kumar Sangakkara, the Sri Lankan ace batsman and wicket-keeper, confirmed that he would hang up his boots after the second Test of the upcoming India series. Sri Lanka is currently facing Pakistan in ...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/479fddb1/sc/13/l/0Lsports0Bndtv0N0Ccricket0Cnews0C2445290Ekumar0Esangakkara0Eto0Eretire0Efrom0Einternational0Ecricket0Eafter0Esecond0Etest0Eagainst0Eindia0Dpfrom0Fhome0Ecricket/story01.htm"},"conceptDetails":{"concept":"India","_id":{"$oid":"558f58320b2a7c0078a34918"},"relevance":0.257829,"type":"Country"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":"Tackling water crisis, the Maharashtra way","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582d0b2a7c0078a348fb"},"description":"\nNovel scheme fires farmers\u2019 imagination in perennially drought-hit areas\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/tackling-water-crisis-the-maharashtra-way/article7362047.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Maharashtra","_id":{"$oid":"558f582d0b2a7c0078a348fc"},"relevance":0.974189,"type":"StateOrCounty"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Chhota Bheem goes to Africa, West Asia","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582b0b2a7c0078a348f4"},"description":"\nAfter conquering South-East Asia, animated hero Chhota Bheem is soon to venture into countries in Africa and West Asia. \n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/entertainment/animated-hero-chhota-bheem-soon-to-venture-into-africa-and-west-asia/article7362049.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"West Asia","_id":{"$oid":"558f582c0b2a7c0078a348f5"},"relevance":0.880974,"type":"Region"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"positive","time":"8h","title":"Raje\'s Delhi Visit Only to Attend NITI Aayog Meet, Says Her Office","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58430b2a7c0078a34975"},"description":"As opposition clamour continues for her resignation over links with tainted cricket boss Lalit Modi, embattled Rajasthan Chief Minister Vasundhara Raje today visited Delhi to attend a meeting of the N...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/479e5820/sc/31/l/0L0Sndtv0N0Cindia0Enews0Crajasthan0Echief0Eminister0Evasundhara0Eraje0Eto0Eattend0Eniti0Eaayog0Emeeting0Ein0Edelhi0Etoday0E775766/story01.htm"},"conceptDetails":{"concept":"Chief Minister Vasundhara Raje","_id":{"$oid":"558f58440b2a7c0078a34976"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"4h","title":"No audience with PM, Shah for Raje","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582a0b2a7c0078a348e9"},"description":"\nWith TV channels reporting that Mr. Modi and Mr. Shah had refused to give her an appointment, Ms. Raje\u2019s office in Jaipur put out an official statement denying these reports.\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/lalitgate-rajastham-cm-returns-to-jaipur-without-meeting-modi/article7361822.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Ms. Raje","_id":{"$oid":"558f582a0b2a7c0078a348ea"},"relevance":0.928356,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"positive","time":"40m","title":"RT @StationCDRKelly: Day 92. #Aurora is back in town. Good night from @space_station! #YearInSpace ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58460b2a7c0078a34981"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/UmZhTOlfZJ"},"conceptDetails":{"concept":"@StationCDRKelly","_id":{"$oid":"558f58460b2a7c0078a34982"},"relevance":0.01,"type":"TwitterHandle"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"positive","time":"9h","title":"Great day..my 6th filmfare nd #maari trailer 1 million views in 2 days!!Thank u nd Luv u all.#tharalocal #senjuruven ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584b0b2a7c0078a34994"},"userImageUrl":"http://pbs.twimg.com/profile_images/579237414368976896/9A0rX5YG_mini.jpg","userScreenName":"dhanushkraja","url":"http://t.co/f3n38Tflf3"},"conceptDetails":{"concept":"#senjuruven","_id":{"$oid":"558f584c0b2a7c0078a34995"},"relevance":0.01,"type":"Hashtag"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"negative","time":"7h","title":"\'Need to Maintain Probity in Public Life, I Resigned After Hawala Scam,\' Says LK Advani","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583f0b2a7c0078a3495e"},"description":"In a veiled message to the Modi government in the wake of the controversy over Sushma Swaraj and Vasundhara Raje, BJP patriarch LK Advani on Saturday said there is a need to maintain probity in public...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a16029/sc/33/l/0L0Sndtv0N0Cindia0Enews0Cneed0Eto0Emaintain0Eprobity0Ein0Epublic0Elife0Ei0Eresigned0Eafter0Ehawala0Escam0Esays0Elk0Eadvani0E775977/story01.htm"},"conceptDetails":{"concept":"LK Advani","_id":{"$oid":"558f58400b2a7c0078a3495f"},"relevance":0.33,"type":"Person"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"6h","title":"Pappu wants CBI probe into Anant Singh case ","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58300b2a7c0078a3490a"},"description":"\nThe expelled RJD MP led a march to Raj Bhavan as he was denied permission to hold rally\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/other-states/pappu-yadav-wants-cbi-probe-into-anant-singh-case/article7362046.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Anant Singh","_id":{"$oid":"558f58300b2a7c0078a3490b"},"relevance":0.978036,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"22m","title":"5.6-Magnitude Earthquake Hits Assam, No Damage Reported","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f58360b2a7c0078a3492f"},"description":"A 5.6-magnitude earthquake of moderate intensity hit Assam this morning. The epicentre of the quake is in Kokrajhar according to the Indian Meteorological Department.","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a25a69/sc/7/l/0L0Sndtv0N0Cindia0Enews0C50E60Emagnitude0Eearthquake0Ehits0Eassam0Eno0Edamage0Ereported0E7760A0A3/story01.htm"},"conceptDetails":{"concept":"Assam","_id":{"$oid":"558f58370b2a7c0078a34930"},"relevance":0.927847,"type":"Country"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Rashtrapati Bhavan to get an AYUSH centre","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f582f0b2a7c0078a34903"},"description":"\nPrime Minister Narendra Modi\u2019s message to popularise ancient Indian medicine practices has found resonance with Rashtrapati Bhavan.\n\n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/rashtrapati-bhavan-to-get-an-ayush-centre/article7361823.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Prime Minister Narendra Modi","_id":{"$oid":"558f582f0b2a7c0078a34904"},"relevance":0.950664,"type":"Person"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"neutral","time":"8h","title":"LIVE Now: Future of @Space_Station briefing in preview of Sunday\'s @SpaceX launch. Q? #askNASA ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58480b2a7c0078a34990"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/KX5g7yYnYG http://t.co/LrO7uazv7M"},"conceptDetails":{"concept":"#askNASA","_id":{"$oid":"558f58490b2a7c0078a34991"},"relevance":0.01,"type":"Hashtag"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"PM Modi to Visit Varanasi Today, Launch Rs 57 Crore Power Supply Project","siteId":"558e9d698fa7180cfcb4f823","_id":{"$oid":"558f583b0b2a7c0078a34945"},"description":"Prime Minister Narendra Modi has a packed schedule on Sunday starting with an address to the nation on radio, to visiting Jharkhand and Uttar Pradesh where he will inaugurate a number of developmental...","userImageUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","userScreenName":"ndtvnews","url":"http://ndtv.com.feedsportal.com/c/33805/f/606696/s/47a18edd/sc/28/l/0L0Sndtv0N0Ccheat0Esheet0Cpm0Emodi0Eto0Evisit0Evaranasi0Etoday0Elaunch0Ers0E570Ecrore0Epower0Esupply0Eproject0E775989/story01.htm"},"conceptDetails":{"concept":"Visit Varanasi","_id":{"$oid":"558f583b0b2a7c0078a34946"},"relevance":0.33,"type":"City"},"siteDetails":{"picUrl":"http://static.dnaindia.com/sites/default/files/2015/06/05/343482-ndtv.png","_id":{"$oid":"558e9d698fa7180cfcb4f823"},"name":"ndtvnews","url":"http://feeds.feedburner.com/NDTV-Trending"}},{"newsDetails":{"sentiment":"negative","time":"10h","title":"Tuesday will be a bit longer than usual. An extra second, or leap second, will be added. Why? ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f584e0b2a7c0078a3499e"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"http://t.co/Txt5pm8SIt http://t.co/QWYRBSBOYJ"},"conceptDetails":{"concept":"leap second","_id":{"$oid":"558f584e0b2a7c0078a3499f"},"relevance":0.987046,"type":"FieldTerminology"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"neutral","time":"1h","title":"Today marks the 70th anniversary of the first launch ever from @NASA_Wallops on the Eastern Shore of Virginia.\n","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58470b2a7c0078a3498a"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"https://t.co/6VKbPlva87"},"conceptDetails":{"concept":"Virginia","_id":{"$oid":"558f58480b2a7c0078a3498b"},"relevance":0.33,"type":"StateOrCounty"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}},{"newsDetails":{"sentiment":"neutral","time":"6h","title":"Manipur village in troubled waters ","siteId":"558e9d628fa7180cfcb4f822","_id":{"$oid":"558f58330b2a7c0078a3491c"},"description":"\nTribals hit as Mapithel dam waters submerge hamlet \n","userImageUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","userScreenName":"thehindu","url":"http://www.thehindu.com/news/national/manipur-village-in-troubled-waters/article7361825.ece?utm_source=RSS_Feed&utm_medium=RSS&utm_campaign=RSS_Syndication"},"conceptDetails":{"concept":"Manipur","_id":{"$oid":"558f58330b2a7c0078a3491d"},"relevance":0.927732,"type":"StateOrCounty"},"siteDetails":{"picUrl":"http://a515.phobos.apple.com/us/r30/Purple/v4/49/c2/b5/49c2b56e-5fc5-0bad-d3cf-210e60d34431/mzl.pturateb.png","_id":{"$oid":"558e9d628fa7180cfcb4f822"},"name":"thehindu","url":"http://www.thehindu.com/news/?service=rss"}},{"newsDetails":{"sentiment":"negative","time":"6m","title":"Don't miss Sunday's 10:21am ET @SpaceX #ISScargo launch. TV coverage starts at 9am: ","siteId":"558e9d6a8fa7180cfcb4f824","_id":{"$oid":"558f58450b2a7c0078a3497c"},"userImageUrl":"http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_mini.jpg","userScreenName":"NASA","url":"https://t.co/EGRrLlohza http://t.co/fupnRo7Rrk"},"conceptDetails":{"concept":"#ISScargo","_id":{"$oid":"558f58460b2a7c0078a3497d"},"relevance":0.01,"type":"Hashtag"},"siteDetails":{"_id":{"$oid":"558e9d6a8fa7180cfcb4f824"},"name":"twitter"}}]}';
 

})


.controller('GlobalCtrl', function($scope, $http) {
 



})

.controller('LoginCtrl', function($scope,  $state, $rootScope, $http) {


    $rootScope.hide_header = true;
      $scope.isLoggedIn = function () {
          return false;
      };

      $scope.menuButtonDisplay = function (display) {
        var navigationBar = document.getElementsByTagName("ion-nav-bar");
        if(navigationBar.length > 0) {
          navigationBar[0].style.display = display;
        }

      };

      $scope.signIn = function(form) {
        if(form.$valid) {
          
           $scope.menuButtonDisplay("block");
           document.getElementsByClassName("home-button")[0].style.display ="block";
            $state.go('tabs.trending');
        }
      };  
    /*$http.jsonp('http://newsintags.eu-gb.mybluemix.net/GetTwitterUserDetails&callback=callba').then(function(resp) {
        console.log('Success', resp);
        // For JSON responses, resp.data contains the result
      }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
      })
    */
    if(!$scope.isLoggedIn()){
          $scope.menuButtonDisplay("none");
          document.getElementsByClassName("home-button")[0].style.display ="none";
         } else {
          $scope.menuButtonDisplay("block");
          document.getElementsByClassName("home-button")[0].style.display ="block";
          $state.go('tabs.trending');
         }

})
.factory('FlightDataService', function($q, $timeout) {

    var searchAirlines = function(searchFilter) {
         
        console.log('Searching airlines for ' + searchFilter);

        var deferred = $q.defer();

      var matches = airlines.filter( function(airline) {
        if(airline.concept.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
      })

        $timeout( function(){
        
           deferred.resolve( matches );

        }, 100);

        return deferred.promise;

    };

    return {

        searchAirlines : searchAirlines

    }
})
.controller('AddTagsCtrl', ['$scope', 'FlightDataService', function($scope, FlightDataService,$http) {
      $scope.data = { "airlines" : [], "search" : '' };
      $scope.tagList = document.getElementsByClassName("tag-suggest");
    $scope.search = function() {

if($scope.tagList.length >0){
          $scope.tagList[0].style.display = "block";
        }
      FlightDataService.searchAirlines($scope.data.search).then(
        function(matches) {
          $scope.data.airlines = matches;
        }
      )
    };
    
}])
.controller('AddSitesCtrl', function($scope, $http, siteListService) {
  
})
.controller('ShowTagsMainCtrl', function($scope, $http) {
  var url = "http://newsintagsv2.eu-gb.mybluemix.net/GetNewsConceptForUser?callback=JSON_CALLBACK&screenName="+screenName;
    $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          $scope.userConceptDetails = d.conceptDetails;  
    });
})
.service('siteListService', function() {

  
  

  
})
.controller('ShowSitesMainCtrl', function($scope, $http, siteListService) {


})

.controller('ShowSimilarNewsCtrl', function($scope) {
})

.controller('PositiveNewsCtrl', function($scope, $http) {
  var url="http://newsintagsv2.eu-gb.mybluemix.net/GetSentimentNews?callback=JSON_CALLBACK&sentiment=positive";
   var loading= document.getElementsByClassName("positiveloading");
   if(loading.length >0){
      loading[0].style.display = "block";
    }

   $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          $scope.positiveResponse =data;
          if(loading.length >0){
            loading[0].style.display = "none";
          }
      });
})
.controller('NegativeNewsCtrl', function($scope, $http) {
  var url="http://newsintagsv2.eu-gb.mybluemix.net/GetSentimentNews?callback=JSON_CALLBACK&sentiment=negative";
   var loading= document.getElementsByClassName("negativeloading");
   if(loading.length >0){
      loading[0].style.display = "block";
    }

   $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          $scope.negativeResponse =data;
          if(loading.length >0){
            loading[0].style.display = "none";
          }
      });
})
.controller('NeutralNewsCtrl', function($scope, $http) {
  var url="http://newsintagsv2.eu-gb.mybluemix.net/GetSentimentNews?callback=JSON_CALLBACK&sentiment=neutral";
   var loading= document.getElementsByClassName("neutralloading");
   if(loading.length >0){
      loading[0].style.display = "block";
    }

   $http.jsonp(url)
      .success(function(data){
          console.log(d=data);
          $scope.neutralResponse =data;
          if(loading.length >0){
            loading[0].style.display = "none";
          }
      });
})
.controller('GetNewsCtrl', function($scope) {
})
.controller('NewsConceptFeedCtrl', function($scope, $http) {
  
})
.controller('GetNewsCtrl', function($scope) {
});



