
function saveUser(firstname, lastname, stravaID, NumAct, NumSeg) {

    $.ajax({
        type: "POST",
        url: "/Home/SaveUser",
        data: "firstname=" + firstname + "&lastname=" + lastname + "&StravaID=" + stravaID + "&NumAct=" + NumAct + "&NumSeg=" + NumSeg,
        dataType: "html",
        success: function (data) {
           
        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        }
    });
    return false;
}
    

function checkData() {

    if (localStorage.getItem("userdata") == null) {tn
        $('#status_msgs').append("no data");
        $('#UnAuthApp').show();
        // initBtns();
       // alert("no data");
    } else {
       // alert("data");
       //clearCache();
       //$('#table_calc_back2').height(200);
       $('#rem_info').show();
       $('#info').hide();
       $('#table_calc_area2').hide();
       //$('#hr1a').button('active');
       countWdata();
       var data = localStorage.getItem("userdata");
        var ct = localStorage.getItem(ct);
      //  var firstname = 
        //$('#settings').hide();
        //initBtns();
        //parse(ct,"act");
      //  getAct();
        drawTable();
        $('#act_table').show();
    }

    

    if (localStorage.getItem('oauthio_provider_strava') === null) {
        $('#footerMsgS').html("Not Authenticated with Strava. Tap 'Connect to Strava'");
        $('#UnAuthApp').show();

    } else {
        $('#AuthApp').show();
        var userdata = localStorage.getItem('userdata');
        var user = eval('(' + userdata + ')');
        var name = user.deets[0]['firstname'] + " " + user.deets[0]['lastname']
        var loc = user.deets[0]['city'] + ", " + user.deets[0]['country'];
        $('#user_details').html("<h1>" + name + "</h1><h3>" + loc + "</h3>");

        $('#status_msgs').hide();
        $('#status_msgs').append(userdata);
        //  var name = 
        $('#footerMsgS').html("Authenticated with Strava as " + name);
        $('#get_activities').show();
    }

    //getW();

}

function getPolyx( param1, callbackFunction ) { 
var json = localStorage.getItem('all_seg_efforts');
  var jact = eval('(' + json + ')');
    //alert(json);
    $.each(jact.segs, function (i, seg) {
    //alert(seg.name);
   $('#location').append(seg.name + "</br>");

    });
     return "hi"

}

function dispStarsChk() {
    var Hrs = localStorage.getItem("Hrs");
    if (Hrs == null) {
        $('#refreshStarsbtn').html("Show Stars");
    } else {
        displayStars(Hrs);
    }
    var ddtext = "<div class=\"btn-group\"><button class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
                  " new Hrs " + Hrs + "<span class=\"caret\"></span></button><ul class=\"dropdown-menu\">" +
                                "<li><a href=\"#\" onclick=\"displayStars(3)\">1 - 3 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStars(6)\">4 - 6 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStars(9)\">7 - 9 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStars(12)\">10 - 12 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStars(24)\">Next 24 Hrs</a></li></ul></div>";

    $('#Hrsdd').html(ddtext);
}

//var resp = getPoly ('222');
//$('#location').append(resp + "</br>");
//alert(resp);

function getAct() {
    $('#seg_nearby').hide();
    $('#status_msgs').hide();
    $('#profile_tile').hide();
    drawTable();
}

function sw2() {
    console.log("sw 2");


    var groupname = document.getElementByName("week2").value;
    console.log(groupname);

}

function Settings() {
    $('#act_table').hide();
    $('#my_activities').hide();
    $('#profile_tile').show();
}

function getNearby() {
 //   alert("map")
    $('#profile_tile').hide();
    $('#act_table_header').hide();
    $('#act_table').hide();
    $('#my_activities').hide();
    $('#seg_nearby').show();
    //$('#seg_data').hide();
    // getSegsbyBounds();
    console.log("get nearby");
    showmap();
}

function showRem() {
    $('#table_calc_back2').height(90);
    $('#rem_section').show();
    $('#rem_msg').html("15hrs until next credit");
}

function drawTable() {
    $('#act_table_header').show();
    $('#act_table2').show();
    $('#my_activities').show();
    $('deets_tile').show();
  //  $('#seg_data').hide();
  //  $('#seg_weather').hide();
   // $('#seg_details').hide();
    //var json = localStorage.getItem('all_seg_efforts');
    //$('#location').append(json + "</br>");
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('segdata');
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    var act_ct = 0;
    //get count from storage, update with seg efforts
    var LB = false;
    var firstID;
    $.each(j2.segs, function (i, seg) {
        //poly3(seg.ID,i,seg.name);
        var seg_ct = 0;
      //   $.each(j2.segs.segment_efforts, function (i, seg) {
      //          seg_ct++;
      //      });
        if (seg_ct > 0) { 
            LB = true
        }
        if (act_ct == 0) {
            firstID = seg.ID;
            midhtml = midhtml + "<li onclick=\"poly2(" + seg.ID + "," + i + ",'" + seg.name + "')\"><i class=\"read\"></i><p  id=\"trow_" + seg.ID + "\" class=\"sel\">" + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
                    "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div></li><div id=\"segs_" + seg.ID + "\"></div>";

        } else {
            midhtml = midhtml + "<li onclick=\"poly2(" + seg.ID + "," + i + ",'" + seg.name + "')\"><i class=\"read\"></i><p  id=\"trow_" + seg.ID + "\" class=\"un_sel\">" + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
        "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div></li><div id=\"segs_" + seg.ID + "\"></div>";

        }
            act_ct++;
         //   getW(seg.latlng,seg.ID); //only if no weather data
            
           
           
    });
    var ht = parseInt((act_ct * 48) + 250); //56
    $('#tableback').height(ht);
   // alert(firstID)
   // drawMap(pl);
    drawChart(firstID);
   drawWeather(firstID);

    var ref_btn = "<div class=\"minihead\"><button class=\"btn btn-primary\" onclick=\"stAct()\">Refresh My Activities</button></div>";
    $('#actMsgs').html(act_ct + " Activities loaded.");
    $('#act_table2').html(top + midhtml + "</ul></div></div>");
    
    
    var timer = setInterval(function () { startDecode() }, 1000);     
    function startDecode() {
    clearInterval(timer);
           getSegs();
          // displayStars();
    }
 
    
}

var getSegtimer;

function StartgetSegs() {
    //alert("timer");
    getSegtimer = setTimeout(getSegs, 5000);
    //getSegtimer = setTimeout(function(){ alert("Hello") }, 3000);
}


function showEff() {
    $('#seg_effort').show();

}

function getSegs() {
    clearTimeout(getSegtimer);
    var json = localStorage.getItem('all_seg_efforts');
    var jact = eval('(' + json + ')');
   
    var parents = [];
  
    function check_array(parents,parentID) {
        return jQuery.inArray(parentID, parents);
    }
    $.each(jact.segs, function (i, seg) {
        var pbrank = seg.pb_rank;
        var pb="";
        if (pbrank == "1") {
            pb= "<i class=\"fa fa-shield\"></i>&nbsp;&nbsp;&nbsp;"
        } 
        var seghtml = "";
     
                seghtml = seghtml + "<li onclick=\"polySegs(" + seg.ID + "," + i + ",'" + seg.name + "')\"><i class=\"read\"></i><p class=\"seg_row\"><i class=\"fa fa-trophy\"></i>&nbsp;&nbsp;&nbsp;" + pb + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
                "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div></li>";
                if (check_array(parents, seg.ID) == -1) {
                    $('#segs_' + seg.parentID).html(seghtml);
              //      getW(seg.latlng, seg.ID); //only if no weather data
                }
                parents.push(seg.ID);
    });
    dispStarsChk();
}

function drawLeaderboard(ID,type) {
    $('#seg_leaderboard').show();
    $('#lb_table').show();
    $('#eff_table').hide();
    $('#seg_weather').hide();
    $('#seg_efforts').hide();
    var btnhtml = "<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"showHistweather(" + ID + ",'" + type + "')\">" +
                   "Show historical wind conditions</i></a></div>";
    //style=\"position:absolute;right:18px;top:40px;z-index:400\"
    $('#lbBtn').html(btnhtml);
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('lb_data_' + ID);
    var j2 = eval('(' + json + ')');
    var timestr = j2.timestamp[0].now;
    var refstr = "<h3>Data retrieved " + timestr + "</h3>";
    var kompic = j2.segs[0].profile;
    var komname = j2.segs[0].name;
    var komtime = j2.segs[0].mov_time;
    var komimg = "<img style=\"width:80px;height:auto\" src=\"" + kompic + "\">";
    $('#lbdata').html(refstr);
    $('#komimg').html(komimg);
    $('#komdata').html("<div style=\"font-size:30px\">" + komname + "</div><div style=\"text-align:left\">" + komtime + " seconds</div>");
    var midhtml = "";
    var act_ct = 0;
    var posy = 4; //54;
    var posyt = 15; //65;
    var canvas = document.getElementById('leaderbd');
    canvas.width = 350;
    canvas.height = 1500;
    canvas.style.width = '350px';
    canvas.style.height = '1500px';
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 350, 2000);
    hour_bg_bk = "000";
    ctx2d.fillStyle = '#FFF';
    ctx2d.font = '14px Arial';
    ctx2d.strokeStyle = "#2fb4c8";
    ctx2d.save();
    var ct = 0;

    $.each(j2.segs, function (i, seg) {
        ct++;
        var hour = seg.mov_time;
        var date = seg.time;
        //convert seconds
        var hour_bg_bk = "9F9F9F";
        var border = "2fb4c8";
        var wind_bg = "51D251";
        var temp_bg = "FFB336";
        var wind_txt = "2f3e46";
        var temp_txt = "FFF";
        // var ampm = zone.FCTTIME.ampm;

        //moving time
        ctx2d.font = '20px Arial';
        ctx2d.fillStyle = '#FFF';
        ctx2d.fillText(hour, 5, posyt + 10);
        //alert(hour);
        ctx2d.font = '10px Arial';
        ctx2d.fillText("seconds", 5, posyt + 18);
        ctx2d.font = '14px Arial';
        ctx2d.fillText(seg.name, 75, posyt + 4);
        // var imgi = new Image();
        // imgi.src = "http://icons.wxug.com/i/c/a/nt_snow.gif"; //seg.profile;
        //  imgi.addEventListener("load", function () {
        //      ctx2d.drawImage(imgi, 6, posyt + 10);
        // }, false);
        ctx2d.fillStyle = "#2fb4c8";
        ctx2d.fillRect(0, posy - 5, 350, 1);

        posy = posy + 50
        posyt = posyt + 50
        i++;
    })


 
    var ht = parseInt((ct * 100) + 30);
    $('#leaderback').height(ht);

 

}

function drawLeaderboard_hist(ID,type) {
    $('#seg_leaderboard').show();
    $('#lb_table').show();
    $('#eff_table').hide();
    $('#seg_weather').hide();
    $('#seg_efforts').hide();

    var btnhtml = "<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"showHistweather(" + ID + ",'" + type + "')\">" +
               "Show historical wind conditions</i></a></div>";
    //style=\"position:absolute;right:18px;top:40px;z-index:400\"
    $('#lbBtn').html(btnhtml);
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('lb_data_' + ID);
    var j2 = eval('(' + json + ')');
    var timestr = j2.timestamp[0].now;
    var hdata = localStorage.getItem(ID + '_0_hist');
    var bearing_store = ID + "_array";
    var j3 = eval('(' + hdata + ')');
    var wspd = j3.hdata[0].wspeed;
    var kombrg = j3.hdata[0].wbrg;

    var refstr = "<h3>Data retrieved " + timestr + "</h3>";
    var kompic = j2.segs[0].profile;
    var komname = j2.segs[0].name;
    var komtime = j2.segs[0].mov_time;
    var komimg = "<img style=\"width:80px;height:auto\" src=\"" + kompic + "\">";
    $('#lbdata').html(refstr);
    $('#komimg').html(komimg);
    $('#komdata').html("<div style=\"font-size:30px\">" + komname + "</div><div style=\"text-align:left\">" + komtime + " seconds</div>");

    var hist = true;

    //kom star calc
    var brg = kombrg;
    
    var bdata = localStorage.getItem(bearing_store);
    var pval0f = getP_foll(brg);
   var pval1f = getP_foll(brg - 30);
    var pval2f = getP_foll(brg + 30);
    var pval0h = getP_head(brg);
    var pval1h = getP_head(brg - 30);
    var pval2h = getP_head(brg + 30);
    var pArray = bdata.split(',');
    var arval1f = parseInt(pArray[pval0f - 1]); //brg
    var arval2f = parseInt(pArray[pval1f - 1]);
    var arval3f = parseInt(pArray[pval2f - 1]);
    var arval1h = parseInt(pArray[pval0h - 1]);  //brg
    var arval2h = parseInt(pArray[pval1h - 1]);
    var arval3h = parseInt(pArray[pval2h - 1]);
    //alert(arval3h);
    var windspeed = wspd;
    //windspeed = 20;
    arval1f = cleanPval(arval1f);
    arval2f = cleanPval(arval2f);
    arval3f = cleanPval(arval3f);
    arval1h = cleanPval(arval1h);
    arval2h = cleanPval(arval2h);
    arval3h = cleanPval(arval3h);

    var brgf0 = arval1f * windspeed;
   // alert(brgf0);
    var brgf1 = parseInt(arval2f * windspeed) * 0.75;
    var brgf2 = parseInt(arval3f * windspeed) * 0.75;
    var brgh0 = parseInt(arval1h * windspeed);  //fine 2h //not 1h
    var brgh1 = parseInt(arval2h * windspeed) * 0.75;
    var brgh2 = parseInt(arval3h * windspeed) * 0.75;

    var foll_wind_val = parseInt(brgf0) + parseInt(brgf1) + parseInt(brgf2);  //1000; // ((arval1f * windspeed) + ((arval2f * windspeed) / 0.5) + ((arval3f * windspeed) / 0.5));
    var head_wind_val = parseInt(brgh0) + parseInt(brgh1) + parseInt(brgh2);
    var starval = 500 + (parseInt(foll_wind_val) - parseInt(head_wind_val));
    var numstars = 0;
    var canvas = document.getElementById('komcanvas');
    canvas.width = 300;
    canvas.height = 25;
    canvas.style.width = '300px';
    canvas.style.height = '25px';
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "#ffca4a";


    if (starval <= 0) {
        drawStarsO(ctx2d, 5, 15, 170);
    } else {
        numstars = calcStars(starval);
        drawStarsF(ctx2d, numstars, 15, 170);
    }
    //numstars = 5
//    $('#hkomdata').html("<h3>" + wspd + " " + starval + "  " + numstars + "</h3>");
    var komf = Math.floor(1 / (numstars / 5));
    $('#komability').html("KOMabilty Factor: " + komf);
    var midhtml = "";
    var act_ct = 0;
    var posy = 4; //54;
    var posyt = 15; //65;
    var canvas = document.getElementById('leaderbd');
    canvas.width = 350;
    canvas.height = 1500;
    canvas.style.width = '350px';
    canvas.style.height = '1500px';
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 350, 2000);
    hour_bg_bk = "000";
    ctx2d.fillStyle = '#FFF';
    ctx2d.font = '14px Arial';
    ctx2d.strokeStyle = "#2fb4c8";
    ctx2d.save();
    var ct = 0;

    $.each(j2.segs, function (i, seg) {
        ct++;
        var hour = seg.mov_time;
        var date = seg.time;
      //convert seconds
        var hour_bg_bk = "9F9F9F";
        var border = "2fb4c8";
        var wind_bg = "51D251";
        var temp_bg = "FFB336";
        var wind_txt = "2f3e46";
        var temp_txt = "FFF";
       //moving time
        ctx2d.font = '20px Arial';
        ctx2d.fillStyle = '#FFF';
        ctx2d.fillText(hour, 5, posyt + 10);
        //alert(hour);
        ctx2d.font = '10px Arial';
        ctx2d.fillText("seconds", 5, posyt + 18);
        ctx2d.font = '14px Arial';
        ctx2d.fillText(seg.name, 75, posyt + 4);
       // var imgi = new Image();
       // imgi.src = "http://icons.wxug.com/i/c/a/nt_snow.gif"; //seg.profile;
      //  imgi.addEventListener("load", function () {
      //      ctx2d.drawImage(imgi, 6, posyt + 10);
        // }, false);
        ctx2d.fillStyle = "#2fb4c8";
        ctx2d.fillRect(0, posy - 5, 350, 1);
      
        var wspd = 0;
        if (hist == true && i < 3) {
            var hdata = localStorage.getItem(ID + '_' + i + '_hist');
            var j3 = eval('(' + hdata + ')');
            var brg2 = j3.hdata[0].wbrg;
            var wspd2 = j3.hdata[0].wspeed;
      
            ctx2d.fillStyle = "#2fb4c8";
            ctx2d.fillRect(75, posy + 20, wspd2 + 25, 20);

            ctx2d.font = '14px Arial';
            ctx2d.fillStyle = "#fff";
            ctx2d.font = '12px Arial';
            ctx2d.fillText("mph", 95, posyt + 20);
            ctx2d.fillText(wspd2, 75, posyt + 20);

            ctx2d.save();
            ctx2d.strokeStyle = "#2fb4c8";
            ctx2d.translate(60, posy + 30);
            ctx2d.rotate(90 * Math.PI / 180);
            //ctx2d.save();
            
            ctx2d.rotate(brg2 * Math.PI / 180);

            ctx2d.lineWidth = 1;
            ctx2d.fillStyle = "#2fb4c8";
            //ctx2d.moveTo(60, -15);
            ctx2d.fillRect(-5, -5, 10, 10);
            ctx2d.beginPath();


            ctx2d.lineTo(0, -5);
            ctx2d.lineTo(0, -10);
            ctx2d.lineTo(10, 0);
            ctx2d.lineTo(0, 10);
            ctx2d.lineTo(0, 5);
            ctx2d.lineTo(-10, 5);
            ctx2d.lineTo(-10, -5);

            ctx2d.closePath();
            ctx2d.fill();
            ctx2d.stroke();
            ctx2d.restore();

        }
        
        posy =posy + 50
        posyt = posyt + 50
        i++;
    })
    
    
   var ht = parseInt((ct * 100) + 30);
   $('#leaderback').height(ht);

   
}

function drawSegEffort(ID) {
    $('#seg_leaderboard').hide();
    $('#lb_table').hide();
    $('#eff_table').show();
     $('#seg_weather').hide();
     $('#seg_efforts').show();
     console.log("efforts " + ID);
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('eff_data_'+ID);
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    var act_ct = 0;
    $.each(j2.segs, function (i, seg) {
        //poly3(seg.ID,i,seg.name);
        midhtml = midhtml + "<li><i class=\"read\"></i><p>" + seg.mov_time + "</p><p class=\"message\">" + seg.time + "</p>" +
        "<div class=\"actions\"></div></li>";
            act_ct++;
            //getW(seg.latlng,seg.ID);
    });
    var ht = parseInt((act_ct * 48) + 30);
   $('#effortback').height(ht);

    //$('#actMsgs').html(act_ct + " Activities loaded.");
    $('#eff_table').html(top + midhtml + "</ul></div></div>");
     
    // alert(midhtml);
    
}

function showHistweather(SegID,type) {
    //make an array of the first three
    var json = localStorage.getItem('lb_data_' + SegID);
    var j2 = eval('(' + json + ')');
    //alert(type);
    console.log("showhistw" + type);
    var latlng = getLatlng(SegID,type);
    console.log("latlng" + latlng);
    //var komwjson = localStorage.getItem(SegID + '_0_hist');
    //var j3 = eval('(' + komwjson + ')');
    //var histtime = j3.hdata[0].timestamp_pretty;
    //console.log("hist data from " + histtime);

    var lbhistchk = localStorage.getItem(SegID + '_0_hist');

    if (lbhistchk != null) {
        //have historical data, just show
        drawLeaderboard_hist(SegID,type)
    }
    else {
        var timer2 = setTimeout(function () { startGethist2(SegID, 0) }, 500);
        var timer1 = setTimeout(function () { startGethist(SegID, 1) }, 1500);
        var timer3 = setTimeout(function () { startGethist1(SegID, 2) }, 3000);
        function startGethist2(SegID, i) {
            clearInterval(timer2);
            var date = j2.segs[i].time;
            CallHistWeather(latlng, date, SegID, i,type)
        }
        function startGethist(SegID, i) {
            clearInterval(timer1);
            var date = j2.segs[i].time;
            CallHistWeather(latlng, date, SegID, i, type)
        }
        function startGethist1(SegID, i) {
            clearInterval(timer3);
            var date = j2.segs[i].time;
            CallHistWeather(latlng, date, SegID, i,type)
        }
    }
}

function CallHistWeather(latlng,date,SegID,i,type) {
    var hist_deets = {
        hdata: []
    };

    $.ajax({
        type: "GET",
        //url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + latlng + ".json",
        url: "https://api.forecast.io/forecast/1373a09f8179192ac902765c8b56bae5/" + latlng + "," + date,
        //56.052,-2.732
        //url: "json.txt",
        //dataType: "html",
        dataType: "jsonp",
        success: function (json) {
            //var jsontxt = eval('(' + json + ')');
           
            var jsontext = JSON.stringify(json);
            hist_deets.hdata.push({
                "wspeed": json.currently.windSpeed,
                "i": i,
                "wbrg": json.currently.windBearing,
                "timestamp": Math.round(new Date().getTime() / 1000),
                "timestamp_pretty": moment().format("MMM Do YYYY, h:mm:ss a")

            })
            console.log("Got hist data for " + SegID + " " + i);
            console.log(json.currently.windSpeed);
            var hist_deets_json = JSON.stringify(hist_deets);
            localStorage.setItem(SegID + "_" + i + "_hist",hist_deets_json);
            //currently.windSpeed
            //currently.windBearing
            $('#location').append(jsontext + "</br>");
            if (i == 2) {
                drawLeaderboard_hist(SegID,type);
            }
           // var wspeed = 
           // var direction = 
            //alert(jsontext);
            //var location = json['location']['city'];
          


        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        },
        complete: function () {
            //load weather

        }

    });

}


function startWeather() {

weatherAct();

}

function weatherAct() {          //  create a loop function
var json = localStorage.getItem('segdata');
var j2 = eval('(' + json + ')');

var time = 0;

    $.each(j2.segs, function (i, seg) { //if (i < 10) {            //  if the counter < 10, call the loop function
        
        setTimeout(function() {
//alert('paused');
getW(seg.latlng,seg.ID);
$('#location').append(i + " Paused: " + seg.ID + "</br>");
    }, time);
    time += 2000;
    });                       //  ..  setTimeout()


}

function weatherSeg() {
var all_seg_data =localStorage.getItem('all_seg_efforts');
var j2 = eval('(' + all_seg_data + ')');
//alert(all_seg_data);
if (all_seg_data.length > 80) {
var index = 0;
 $.each(j2.segs, function (i, seg) {
      var name = i;
      var timer1 = setInterval(function () { startDecode(seg.ID,seg.parentID) }, 1000);
    index++;
    //alert(poly);
      //startDecode(poly,ID,i);      
     function startDecode(toID,fromID) {
    clearInterval(timer1);
     copyWeather(fromID,toID)

        
    }
    });
    
    }

}


function displayStars(hrs) { //get seg weather
    //1-3 = 3
    //4-6 = 6
    var wdata = localStorage.getItem("weatherdata");
    var wdataj = eval('(' + wdata + ')');

    var ID = wdataj.wdata[0].ID;      //"469475975";
    var jsonact = localStorage.getItem('segdata');
    var jsonseg = localStorage.getItem('all_seg_efforts');
    var jsondata = localStorage.getItem(ID + "_weather");
    $('#refreshStarsbtn').html("Refresh Stars Ratings");
    var Hrs = localStorage.getItem("Hrs");
    localStorage.setItem("Hrs", hrs);
    
    var parsed_json = eval('(' + jsondata + ')');

    var j2s = eval('(' + jsonseg + ')');
    var j2a = eval('(' + jsonact + ')');
    var fh = hrs - 3;
    var lh = hrs - 1
    var hrstxt = lh + " - " + fh + " Hrs";
    var ddtext = "<div class=\"btn-group\"><button class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
              + hrstxt + "<span class=\"caret\"></span></button><ul class=\"dropdown-menu\">" +
                            "<li><a href=\"#\" onclick=\"displayStars(3)\">1 - 3 Hrs</a></li>" +
                            "<li><a href=\"#\" onclick=\"displayStars(6)\">4 - 6 Hrs</a></li>" +
                            "<li><a href=\"#\" onclick=\"displayStars(9)\">7 - 9 Hrs</a></li>" +
                            "<li><a href=\"#\" onclick=\"displayStars(12)\">10 - 12 Hrs</a></li>" +
                            "<li><a href=\"#\" onclick=\"displayStars(24)\">Next 24 Hrs</a></li></ul></div>";

    $('#Hrsdd').html(ddtext);


    var firsthour = parsed_json.hourly_forecast[fh].FCTTIME.civil;
    var lasthour = parsed_json.hourly_forecast[lh].FCTTIME.civil;
    $('#location').append("Calculating activity ratings for selected wind conditions");
    var timediff = getTimediff(ID);
    var timeago = prettify(timediff);
    $('#winfo').html("<h3>Showing star ratings from " + firsthour + " to " + lasthour + "</h3><h3>Weather data retrieved " + timeago +"</h3>");
    $.each(j2s.segs, function (i, seg) {
        $('#stars_' + seg.ID).html("<p>Calculating ... </p>");
        calcStarsInline(seg.ID,hrs);
    });
    
    $.each(j2a.segs, function (i, seg) {
        $('#stars_' + seg.ID).html("<p>Calculating ... </p>");
        calcStarsInline(seg.ID,hrs);
    });
    
    //save hrs val and also info that stars are showing
}

function stConn2() {
    var strava_deets = {
        deets: []
    };
    //alert("connect");
    $('#status_msgs').show();
    $('#status_msgs').append("</br > Connecting to Strava ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8')
    OAuth.popup('strava', { cache: true }).done(function (result) {
       // alert(result);
       // console.log(result)
        $('#status_msgs').append("</br > " + JSON.stringify(result));
        localStorage.removeItem('userdata');
        result.me().done(function (data) {
            // do something with `data`, e.g. print data.name

            strava_deets.deets.push({
                "firstname": data.firstname,
                "lastname": data.lastname,
                "stravaID": data.ID,
                "city": data.city,
                "state": data.state,
                "profile": data.profile

            });
            
            var jsondeets = JSON.stringify(strava_deets);
            localStorage.setItem('userdata', jsondeets);
            localStorage.setItem('fulluserdata', JSON.stringify(result));
            $('#status_msgs').append("</br > " + data.lastname);
            $('#AuthApp').show();
            $('#UnAuthApp').hide();
            stAct();
            // do some stuff with result
        });

    });
}

function stTest2() {
    $('#status_msgs').show();
    $('#status_msgs').append("</br > testing ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/activities').done(function (data) {
            $('#status_msgs').append("</br > " + result);
            var jsontext = JSON.stringify(data);
            $('#status_msgs').append("</br > " + jsontext);
        })
        // do some stuff with result
    });


}

var timer1
var timer2

function analyseSegs() {
//start timer, then analyse
//getSegtimer = setTimeout(analyseSegs2, 5000);
var all_seg_data =localStorage.getItem('all_seg_efforts');
var j2 = eval('(' + all_seg_data + ')');
//alert(all_seg_data);
if (all_seg_data.length > 80) {
var index = 0;
 $.each(j2.segs, function (i, seg) {
 //alert("hi");
      var name = i;
      var poly = localStorage.getItem(seg.ID+"_poly");
    //  alert(poly);
      var ID = seg.ID
      var parentID = seg.parentID
      var timer1 = setInterval(function () { startDecode(poly,ID,parentID,i,index) }, 5000);
    index++;
    //alert(poly);
      //startDecode(poly,ID,i);      
      function startDecode(poly,ID,parentID,i,index) {
    clearInterval(timer1);
     decodepoly(poly,ID,parentID);
        
    }
    });
    
    var timer2 = setTimeout(function () { startDecode() }, 1000);     
            function startDecode() {
                clearTimeout(timer2);
                drawTable();
                weatherAct();
                var timer4 = setTimeout(function () { startDecode2() }, 2000);
                function startDecode2() {
                    clearTimeout(timer4);
                    //drawTable();
                    weatherSeg();

                }
    }
    
    
    } else {
    
    var timer3 = setTimeout(function () { startDecode() }, 1000);     
            function startDecode() {
                clearTimeout(timer3);
                drawTable();
                weatherAct();
    }
    
    }
}





function parse(type) {
//alert(type);
var parentID = "111";
if (type == "act") {

var seg_data =localStorage.getItem('segdata');
var j2 = eval('(' + seg_data + ')');
var dist = j2.segs[0].dist;
$.each(j2.segs, function (i, seg) {
    var poly = seg.poly;
    var ID = seg.ID;
    var timer2 = setInterval(function () { startDecode(poly,ID,parentID) }, 2000);
   
    //alert(poly);
    //startDecode(poly,ID,i);      
    
    function startDecode(poly, ID, parentID) {
        clearInterval(timer2);
        decodepoly(poly, ID, parentID);
        //copyWeather(fromID, toID)


    }
});
//var index = 0;
  //  $.each(j2.segs, function (i, seg) {
       
    //  var name = i;
      
   //   var poly = seg.poly; //seg[i]['map']['summary_polyline'];
   //   var ID = seg.ID;
      //alert("start " + i);
  //    var timer = setInterval(function () { startDecode(poly,ID,i,index) }, 5000);
  //    index++;
  //    function startDecode(poly,ID,i,index) {
  //  clearInterval(timer);
    //index++;
   // alert(i + " start ... " + ID + " idx=" + index);
   // decodepoly(poly,ID,parentID);
         
    //    }
      
  //  });
    //getAct();
    //drawTable();
    
    //drawTable();
    
    
    } else if (type == "seg") {

var seg_data = localStorage.getItem('segdata');  //not here
//alert(seg_data);
var j2 = eval('(' + seg_data + ')');

var index = 0;
    $.each(j2.segs, function (i, seg) {
    var seg_eff = localStorage.getItem(seg.ID+'_seg_efforts'); //has ID +parent ID
    var j2eff = eval('(' + seg_eff + ')');
    //alert("eff" + seg_eff + seg.ID);  //vf is top onlist
    var name = i;
    var segjson = localStorage.getItem(ID+"_poly");
    var poly = segjson.segs.poly;
    var ID = segjson.segs.ID;
    alert("start decode" + poly + " " + ID);
      var timers = setInterval(function () { startDecode(poly,ID,i,index) }, 5000);
      //var speed = 1000;
      //var timer = setInterval(startDecode(poly,ID,i), speed);
      index++;
      //startDecode(poly,ID,i);      
      function startDecode(poly,ID,i,index) {
    clearInterval(timers);
    //index++;
   // alert(i + " start ... " + ID + " idx=" + index);
   $('#location').append("decode poly for segment: " + ID); //was actmsgs
    decodepoly(poly,ID,parentID);
         
        }
      
    });
    
    getAct();

    
    
    
    } else if (type == "map") {
    
    var seg_data =localStorage.getItem('seg_loc_data');
    var j2 = eval('(' + seg_data + ')');
//console.log("parse " + seg_data);
    var index = 0;
    $.each(j2.points, function (i, seg) {
       
      var name = i;
      //
      var poly = seg.points; //seg[i]['map']['summary_polyline'];
      var ID = seg.PID;
      var chk = localStorage.getItem(ID + '_array');
        //  alert("start " + poly + ID);
        if (chk == null) { 
      var timer = setInterval(function () { startDecode(poly,ID,i,index) }, 1000);
      //var speed = 1000;
      //var timer = setInterval(startDecode(poly,ID,i), speed);
      index++;
      //startDecode(poly,ID,i);      
      function startDecode(poly,ID,i,index) {
          clearInterval(timer);
          //index++;
          //  alert(poly + " start ... " + ID + " idx=" + index);
 
          decodepoly(poly,ID,parentID);
      }
        } else {
            console.log("not prarsing " + ID);
        }
      
    });
    //getAct();
    
    }


}

//getSegpolysTimer();
function ActsSegsRefresh() {
    stAct();
}



function stAct() {
   
    var strava_segs = {
        segs: []
    };
    $('#location').html("Refreshing Activities from Strava..."); //was actmsgs
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        console.log(result)
        result.get('https://www.strava.com/api/v3/activities').done(function (data) {

            var jsontext = JSON.stringify(data);
            $('#status_msgs').append(jsontext);
            var ct = 0;
            $.each(data, function (i, seg) {
            var poly = data[i]['map']['summary_polyline'];
            var ID = data[i]['id'];
            //   $.each(parsed_json.hourly_forecast, function (i, zone) {
 
 //           $.each(data.segment_efforts, function (i, seg_eff) {
               //  alert(seg_eff.name);
   //         });
            
                
                strava_segs.segs.push({
                    "name": data[i]['name'],
                    "ID": data[i]['id'],
                    "poly": data[i]['map']['summary_polyline'],
                    "dist": data[i]['distance'],
                    "egain": data[i]['total_elevation_gain'],
                    "latlng": data[i]['end_latlng'],
                    //"seg_efforts" : data[i]['segment_efforts']
                    
                });
                
                //alert(seg.map);
               
                ct++;
                seg_efforts(seg.id);
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('segdata', jsonsegs);
            localStorage.setItem('actct', ct);
            var userdata = localStorage.getItem('userdata');
            var user = eval('(' + userdata + ')');
            var firstname = user.deets[0]['firstname'];
            var lastname = +user.deets[0]['lastname'];
            var stravaID = user.deets[0]['ID'];
            saveUser(firstname, lastname, stravaID, ct, 0);
           // alert(jsontext);
            //alert("Retrieved " + ct + " Activities.");
            //drawTable();
          parse("act"); 
            var timer = setInterval(function () { startDecode() }, 5000);     
            function startDecode() {
                clearInterval(timer);
                analyseSegs();
            }
             //myFunction();
        });

    });
}

function stLeader(ID,type) {
//alert(ID);
    var strava_segs = {
        segs: [],
        timestamp: []
    };
    var timenow = Math.round(new Date().getTime() / 1000);

     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/segments/'+ID+'/leaderboard').done(function (data) {
            var jsontext = JSON.stringify(data);
            //$('#status_msgs').append(jsontext);
            //alert(jsontext);
            var ct = 0;
            var entries = data['entry_count'];
            $.each(data.entries, function (i, seg) {
            

                strava_segs.segs.push({
                    "name": seg.athlete_name,
                     "time": seg.start_date_local,
                     "profile": seg.athlete_profile,
                     "mov_time": seg.moving_time
                    //alert(poly + "hij" + ID);
                });
                
      //          ct++;
            });
            strava_segs.timestamp.push({
                "epoch": timenow,
                "now": moment().format("MMM Do YYYY, h:mm:ss a")
            });

            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('lb_data_'+ID, jsonsegs);
            //localStorage.setItem('actct',ct);
            
           // alert("Retrieved " + entries + jsonsegs);
            //drawTable();
            drawLeaderboard(ID,type);

        });

    });
}

var strava_all_segs = {
        segs: []
    };
    
//https://www.strava.com/api/v3/segments/:id

function seg_efforts(ID) {
    var strava_segs = {
        segs: [],
        count: []
    };
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        //result.get('https://www.strava.com/api/v3/segments/starred/').done(function (data) {
        result.get('https://www.strava.com/api/v3/activities/' +ID).done(function (data) {
        //https://www.strava.com/api/v3/activities/:id
        
            var jsontext = JSON.stringify(data);
            //$('#status_msgs').append(jsontext);
            var ct = 0;
            //var entries = data['entry_count'];
           $.each(data.segment_efforts, function (i, seg) {
            //get poly here

               strava_segs.segs.push({
                   "name": seg.name,
                   "dist": seg.segment.distance,
                   "latlng": seg.segment.start_latlng,
                   "ID" : seg.segment.id,
                   "parentID" : seg.activity.id
                });
                
                strava_all_segs.segs.push({
                   "name": seg.name,
                   "latlng": seg.segment.end_latlng,
                   "dist": seg.segment.distance,
                   "ID" : seg.segment.id,
                   "parentID" : seg.activity.id,
                   "pb_rank" : seg.pr_rank,
                   "kom_rank" : seg.kom_rank
                });//has it more than once
        
            seg_details(seg.segment.id);
                    ct++;
               
            });
            if (ct > 0) {
            strava_segs.count.push(ct);
           var jsonsegs = JSON.stringify(strava_segs);
            var jsonsegsall = JSON.stringify(strava_all_segs);
            
           // alert(ID+"saving" + jsonsegsall);
            localStorage.setItem(ID+'_seg_efforts', jsonsegs);
            localStorage.setItem('all_seg_efforts', jsonsegsall);
            //var segct = localStorage.getItem('segct');
           // var actct = localStorage.getItem('actct');
           // var cts = parseInt(ct+segct);
           //  localStorage.setItem('segct',cts);
           // alert("h2");
           // localStorage.setItem('actct',7);
           // var ct2 = parseInt(cts+actct);
           
            //get segment details by ID then call decodepoly with poly + ID
            //var poly= "}vculjey0cF{jAjK'A";
            //parse(ct,"seg");  
           // analyseSegs();
            
            } 
           // alert("Retrieved " + entries + jsonsegs);
            //drawTable();
            
          //  drawLeaderboard(ID);
            
        });

    });
   // alert("here");
   // 
}
function seg_details(ID) {
    //alert(ID);
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    var poly = "";
    //var json = localStorage.getItem('all_seg_efforts');
    OAuth.popup('strava', { cache: true }).done(function (result) {
         result.get('https://www.strava.com/api/v3/segments/' +ID).done(function (data) {
            poly = data.map.polyline;
            localStorage.setItem(ID+'_poly',poly);
            $('#location').append(poly + "</br>");
        });

    });
}

function stEffort(ID) {
//alert(ID);
var athID = "10375624";
    var strava_segs = {
        segs: []
    };
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/segments/'+ID+'/all_efforts',{ data: { athlete_id: athID} }).done(function (data) {
            var jsontext = JSON.stringify(data);
            //$('#status_msgs').append(jsontext);
          //  alert(jsontext);
            var ct = 0;
           // var entries = data['entry_count'];
            $.each(data, function (i, seg) {
            

                strava_segs.segs.push({
                    "pr_rank": seg.pr_rank,
                     "time": seg.start_date_local,
                     "kom_rank": seg.kom_rank,
                     "mov_time": seg.moving_time
                    //alert(poly + "hij" + ID);
                });
                
      //          ct++;
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('eff_data_'+ID, jsonsegs);
            //localStorage.setItem('actct',ct);
            
           // alert("Retrieved " + entries + jsonsegs);
            //drawTable();
            drawSegEffort(ID);

        });

    });
}

function clearCache() {
    $('#status_msgs').show();
    $('#status_msgs').append("<br/> clearing ...");
    //  OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    //OAuth.clearCache();
    var str = "weather";
    for (var i = 0; i < localStorage.length; i++) {
      //  if (localStorage.key(i) == 'weatherdata') {
     if (localStorage.key(i).indexOf(str) > -1) {
        $('#status_msgs').append("Removing " + localStorage.key(i) + "</br >");
      // }
         localStorage.removeItem(localStorage.key(i));
      }
        // do something with localStorage.getItem(localStorage.key(i));
    }
    //localStorage.removeItem('weatherdata');
    localStorage.removeItem('weatherdata_ct');
    showLocal();
}

function showLocal() {
    $('#status_msgs').show();
    $('#testBtns').show();
    $('#table_calc_area2').show();
    $('#info').show();
    var str = "efforts";
    var str2= "weather";
    for (var i = 0; i < localStorage.length; i++) {
      //  if (localStorage.key(i) == 'weatherdata') {
     if (localStorage.key(i).indexOf(str) > -1) {
        $('#status_msgs').append("</br > " + localStorage.key(i) + " data: " + localStorage.getItem(localStorage.key(i)));
      // }
      }
      
      if (localStorage.key(i).indexOf(str2) > -1) {
        $('#status_msgs').append("</br > " + localStorage.key(i))// + " data: " + localStorage.getItem(localStorage.key(i)));
      // }
      }
        // do something with localStorage.getItem(localStorage.key(i));
    }
    // var straval = localStorage.getItem('oauthio_provider_strava');
    // var stravl2 = straval.replace('1448', '1555');

    $('#status_msgs').append("</br > st: " + localStorage.getItem('oauthio_provider_strava'));
    //$('#status_msgs').html("</br > seg: " + localStorage.getItem('segdata'));

    //    $('#status_msgs').append("</br > st2: " + stravl2);
    //    localStorage.removeItem('oauthio_provider_strava');
    //    localStorage.setItem('oauthio_provider_strava', stravl2);
    //    $('#status_msgs').append("</br > st3: " + localStorage.getItem('oauthio_provider_strava'));
}

function twitterConn() {
    $('#result').html("");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    OAuth.redirect('twitter','/home/index').done(function (r) {
        // the access_token is available via r.access_token
        // but the http functions automagically wrap the jquery calls
        r.get('/1.1/account/verify_credentials.json')
            .done(function (data) {
                $('#location').html("twitter: Hello, " + data.name + " !");
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                $('#location').html("req error: " + textStatus);
            });
    })
                    .fail(function (e) {
                        $('#result').html('error: ' + e.message);
                    });
}

function initBtns() {

    var strava_segs = {
        segs: []
    };


    var strava_deets = {
        deets: []
    };

    OAuth.initialize("7ZbKkdtjRFA8NVkn00ka1ixaIe8");

    $('#fb-connect').on('click', function () {  //used for get activities
        // alert('Athlet');
        if (res == false) {
            $('#status_msgs').append("</br > Not connected to Strava");
            $('#strava_login').show();
            $('#main_menu').hide();
        } else {
            $('#main_menu').show();
            $('#status_msgs').append("</br > Connected to Strava");
            $('#get_activities').show();

            localStorage.removeItem('segdata');
            res = OAuth.create('strava');
            $('#status_msgs').show();
            $('#status_msgs').append(localStorage.getItem('segdata') + " Retrieving Activities ...");


            //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            res.get('https://www.strava.com/api/v3/activities').done(function (data) {
                //https: //www.strava.com/api/v3/activities
                //todo with data
                //alert('Athlete ' + data.lastname);
                var jsontext = JSON.stringify(data);
                var midhtml = "";
                var ct = 0;
                $.each(data, function (i, seg) {
                    strava_segs.segs.push({
                        "name": data[i]['name'],
                        "poly": data[i]['map']['summary_polyline'],
                        "dist": data[i]['distance'],
                        "egain": data[i]['total_elevation_gain']
                    });
                    ct++;
                    //     var name = data[i]['name'];
                    // alert(name);
                    //       midhtml = midhtml + "<li class=\"table-view-cell\" onclick=\"poly1()\">" + name + "<span class=\"badge\">4</span></li>";
                });
                var jsonsegs = JSON.stringify(strava_segs);
                localStorage.setItem('segdata', jsonsegs);
                $('#status_msgs').append("Retrieved " + ct + " Activities");
                //drawTable();
                //$('#result3').html(eval('(' + strava_segs + ')'));

            }).fail(function (err) {
                //todo with err
                alert("fail");
            });
            //    r.get('').done(function (data2) {
        }
    });

    $('#nearby').on('click', function () { //not used
        var token = localStorage.getItem('st_token');
        res = OAuth.create('strava');
        if (res == false) {
            $('#status_msgs').append("Not connected");
        } else {
            alert(token);
            $('#status_msgs').append("Connecting with: " + token);
            //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            //alert("nb click" + res);
            res.get('https://www.strava.com/api/v3/segments/explore', { data: { access_token: token, bounds: '37.821362,-122.505373,37.842038,-122.465977'} }).done(function (data) {
                var jsondeets = JSON.stringify(data);
                //  localStorage.setItem('segdata', jsondeets);
                //alert(jsondeets);
                //drawTable();
                //$('#result3').html(eval('(' + strava_segs + ')'));
                $('#main_menu').hide();
                $('#seg_nearby').show();
                // getSegsbyBounds();
                showmap();
            }).fail(function (err) {
                //todo with err
                // alert("fail");

            });
            //res.me().done(function (me) {
            //    alert('Hello ' + me.name);
            //}).fail(function (err) {
            //todo when the OAuth flow failed
            // });
            //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            //res.get('https://www.strava.com/api/v3/segments/explore?bounds=37.821362,-122.505373,37.842038,-122.465977').done(function (data) {
            //res.get('https://www.strava.com/api/v3/activities?id=421422146', { data: { id: 421422146} }).done(function (data) {
            //works: res.get('https://www.strava.com/api/v3/segments/explore', { data: { bounds: '37.821362,-122.505373,37.842038,-122.465977'} }).done(function (data) {
            //https: //www.strava.com/api/v3/segments/explore
            //            result.post('/message', {
            //              data: {
            //                user_id: 93,
            //              content: 'Hello Mr. 93 !'
            //        }
            //    })


            // res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            //
            //todo with data

            //   var jsontext = JSON.stringify(data);
            //       var midhtml = "";
            //alert(jsontext);
            //      $.each(data, function (i, seg) {
            //          strava_segs.segs.push({
            //              "name": data[i]['name'],
            //              "poly": data[i]['map']['summary_polyline']
            //          });
            //     var name = data[i]['name'];
            // alert(name);
            //       midhtml = midhtml + "<li class=\"table-view-cell\" onclick=\"poly1()\">" + name + "<span class=\"badge\">4</span></li>";
            //   });
            //   var jsonsegs = JSON.stringify(strava_segs);
            //   localStorage.setItem('segdata', jsonsegs);

            //   drawTable();
            //$('#result3').html(eval('(' + strava_segs + ')'));

            //}).fail(function (err) {
            //todo with err
            //   alert("fail2");
            // });
            //    r.get('').done(function (data2) {
        }
    });


    
    $('#st-connect').on('click', function () {
        $('#result').html("status_msgs ...");
        //OAuth.popup('twitter', {cache: true}).done(function(twitter) {
        OAuth.popup('strava', { cache: true }).done(function (r) {
            // the access_token is available via r.access_token
            // but the http functions automagically wrap the jquery calls
            r.get('/oauth/authorize')
                .done(function (data) {
                    $('#result').html("strava: Hello");
                    $('#get_activities').show();
                    $('#main_menu').show();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    $('#status_msgs').html("req error: " + textStatus + r.access_token);
                    localStorage.setItem('st_token', r.access_token);
                    $('#get_activities').show();
                    $('#main_menu').show();

                });
        })
        .fail(function (e) {
            $('#result').html('error: ' + e.message);
        });
    });

}
