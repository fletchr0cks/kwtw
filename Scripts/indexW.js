
var g1;
document.addEventListener("DOMContentLoaded", function (event) {
    g1 = new JustGage({
        id: "g1",
        min: 0,
        max: 5,
       // donut: true,
        gaugeWidthScale: 1.3,
        counter: true,
        hideInnerShadow: true,
        titlePosition: "above",
        valueFontColor: "#8bc7eb",
        titleFontColor: "#8bc7eb",
        titleFontSize: "30px",
        title: "KOMability Rating",
        startAnimationTime: 5000,
        startAnimationType: ">",
        refreshAnimationTime: 1000,
        refreshAnimationType: "bounce",
        levelColors: ["#ffca4a"],
        gaugeColor: "#333333",
    });

});

function checkLoc() {

    navigator.geolocation.getCurrentPosition(function (position) {
        loc = position.coords.latitude + "," + position.coords.longitude;
        console.log(loc);
        return 1;
    }, function () {
        console.log("no location");
        return 0;
    });



}


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


function communityToptemp(type) {
    $('#comStarcanvas').hide();
    if (type = 'h') {
        $('#comHead').html("<h1>Hottest Segments</h1>");
    } else {
        $('#comHead').html("<h1>Coldest Segments</h1>");
    }

}

function communityUsers() {
    $('#comHead').html("<h1>KOM With The Wind Users</h1>");
    var canvas = document.getElementById('top_wind_canvas');
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 360, 560);

    $.ajax({
        type: "GET",
        url: "/Home/AllUsers",
        data: "dayosag=" + daysago,
        dataType: "json",
        success: function (data) {
            var parsed_json = eval(data);
            head = "<h3>" + parsed_json.topw[0].Timest + "</h3>";
            $.each(parsed_json.allusers, function (i, wd) {
                var name = wd.Name;
                var acts = wd.Act;
                var segs = wd.Seg;
                ctx2d.font = '14px Arial';
                ctx2d.fillStyle = "#fff";
                //  ctx2d.font = '12px Arial';
                ctx2d.fillText(name, 20, posy);
                ctx2d.fillStyle = "#2fb4c8";
                ctx2d.fillText("Activities: " + acts, 20, posy + 22);
                ctx2d.fillText("Segments: " + segd, 20, posy + 38);
                //cond
                
            })
            posy + 60;
            
        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        }
    });
    return false;

}

function getWindiest(daysago) {
    $('#comHead').html("<h1>Highest Star Rated Segments</h1>");
    $('#comStarcanvas').show();
    var canvas = document.getElementById('top_wind_canvas');
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 360, 560);
    ctx2d.font = '14px Arial';
    ctx2d.strokeStyle = "#2fb4c8";
    ctx2d.save();
    var posy = 22;
    var stars = 4
    var name = "first last        n";
    var wspd = 45;
    var timestamp = "4:27pm on Monday 25th March 2016";
    var loc = "London and some more, UK"
    ctx2d.fillStyle = "#ffca4a";
    drawStarsF(ctx2d, stars, posy, 10);
    ctx2d.font = '16px Arial';
    ctx2d.fillStyle = "#ffca4a";
    ctx2d.fillText(wspd + "mph wind", 120, posy + 6);
    //  ctx2d.font = '12px Arial';
    ctx2d.font = '14px Arial';
    ctx2d.fillStyle = "#fff";
    ctx2d.fillText(loc, 5, posy + 22);
    ctx2d.fillText(timestamp, 5, posy + 38);
    ctx2d.fillStyle = "#2fb4c8";
    ctx2d.fillText("Viewed by " + name, 5, posy + 56);
    //cond
    

    
    var html = "";
    var head = "";
    $.ajax({
        type: "GET",
        url: "/Home/TopW",
        data: "dayosag=" + daysago,
        dataType: "json",
        success: function (data) {
            var parsed_json = eval(data);
            head = "<h3>" + parsed_json.topw[0].Timest + "</h3>";
            $.each(parsed_json.topw, function (i, wd) {
                //console.log(wd.Wspd);
                var stars = wd.Stars;
                var name = wd.UserID;
                var wspd = wd.Wspd;
                var timestamp = wd.TS_pretty;
                var loc = wd.Location;
                ctx2d.font = '14px Arial';
                ctx2d.fillStyle = "#fff";
                //  ctx2d.font = '12px Arial';
                ctx2d.fillText(loc, 20, posy);
                ctx2d.fillText(timestamp, 20, posy + 20);
                ctx2d.fillStyle = "#2fb4c8";
                ctx2d.fillText("Viewed by " + name, 20, posy + 40);
                //cond
                drawStarsF(ctx2d, stars, posy + 30, 90);

               html = html + "<div class=\"msg_sml\">" + wd.UserID + " " + wd.Wspd + " mph " + wd.Stars + " stars></div>";
            })
            posy + 60;
            $('#windSeg').html(html);
            $('#windhead').html(head);
        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        }
    });
    return false;
}


function saveTW(segID, wspd, loc, stars, epoch, timestamp) {
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var UserID = user.deets[0]['stravaID'];

    $.ajax({
        type: "POST",
        url: "/Home/SaveTopWeather",
        data: "UserID=" + UserID + "&segID=" + segID + "&wspd=" + wspd + "&loc=" + loc + "&stars=" + stars + "&epoch=" + epoch + "&timestamp=" + timestamp,
        //tring segname, int segID, string array, string polyline, string latlng
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        }
    });
    return false;
}
  

function saveSegment(name, ID, polyline, array, latlng, priv, locstr) {
    var privseg;
    if (priv == true) {
        privseg = 1;
    } else {
        privseg = 0;
    }
    $.ajax({
        type: "POST",
        url: "/Home/SaveSegment",
        data: "segname=" + name + "&segID=" + ID + "&array=" + array + "&polyline=" + polyline + "&latlng=" + latlng + "&priv=" + privseg + "&location=" + locstr,
        //tring segname, int segID, string array, string polyline, string latlng
        dataType: "html",
        success: function (data) {

        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        }
    });
    return false;
}

function updateUser(firstname, lastname, stravaID) {
    var NumSeg = countSegs();
    var NumAct = localStorage.getItem('actct');
    console.log(NumSeg);
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

function SignOut() {
     for (var i = 0; i < localStorage.length; i++) {
        //  if (localStorage.key(i) == 'weatherdata') {
         localStorage.removeItem(localStorage.key(i));
         console.log(localStorage.key(i));
     }
     $('#UnAuthApp').show();
     $('#menu_buttons').show();
     $('#deets_tile').hide();
     $('#status_area').hide();


}

function checkData() {
    $('#info').hide();
    $('#status_area').hide();
    hideW();
    if (localStorage.getItem("userdata") == null) {
        $('#status_msgs').show();
        $('#status_msgs').append("Not connected");
        $('#UnAuthApp').show();
        $('#pic_header').hide();
        $('#logo_header').hide();
        $('#menu_buttons').hide();
        $('#deets_tile').hide();
       // $('#menubtns').html("Not connected to Strava");
        // initBtns();
        // alert("no data");
    } else {
        // alert("data");
        //clearCache();
        //$('#table_calc_back2').height(200);
       
        $('#menu_buttons').show();
        $('#status_msgs').hide();
        $('#status_area').hide();
       // $('#deets_tile').hide();
        $('#rem_info').show();
        $('#info').hide();
        $('#table_calc_area2').hide();
      //  $('#info').show();
        //$('#hr1a').button('active');
        countWdata();
        var data = localStorage.getItem("userdata");
        var wdata = localStorage.getItem("weatherdata");

       // var ct = localStorage.getItem(ct);
        //  var firstname = 
        //$('#settings').hide();
        //initBtns();
        //parse(ct,"act");
        //  getAct();
        if (wdata != null) {
           // drawTable(); bkk1
            $('#act_table').show();
          //  var timer = setInterval(function () { startDecode() }, 4000); bkk1
            function startDecode() {
                clearInterval(timer);
                dispStarsChk();
            }
           // dispStarsChk();
        }
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
        var pic = "<img style=\"width:80px;height:auto\" src=\"" + user.deets[0]['profile'] + "\">";
        var pic_header = "<img class=\"circular_pfl\" src=\"" + user.deets[0]['profile'] + "\">";
        $('#user_details').html("<h1>" + name + "</h1><h3>" + loc + "</h3>");
        $('#userimg').html(pic);
        $('#pic_header').html(pic_header);
        $('#status_msgs').hide();
     //   $('#status_msgs').append(userdata);
        //  var name = 
      //  updateUser(user.deets[0]['firstname'], user.deets[0]['lastname'], user.deets[0]['stravaID']);
        $('#footerMsgS').html("Authenticated with Strava as " + name);
        $('#get_activities').show();
    }

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
    var hrs = localStorage.getItem("Hrs");
    if (hrs == null) {
        $('#refreshStarsbtn').html("Show Stars");
    } else {
        displayStars(hrs);
    }
    var fh = hrs - 2;
    var lh = hrs;
    fh = fh.toString();
    lh = lh.toString();
    //alert(fh + lh);
    if (hrs == 24) {
        var hrstxt = "Best (24 hrs)";
    } else {
        var hrstxt = fh + " - " + lh + " Hrs";
    }
    var ddtext = "<div class=\"btn-group\"><button class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
                  hrstxt + "<span class=\"caret\"></span></button><ul class=\"dropdown-menu\">" +
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
  //  $('#status_msgs').hide();
    $('#profile_tile').hide();
    $('#comty_tile').hide();
    drawTable();
    var timer = setInterval(function () { startDecode() }, 1000);
    function startDecode() {
        clearInterval(timer);
        dispStarsChk();
    }
}

function sw2() {
  //  console.log("sw 2");

    //document.getElementById('topHeader').innerHTML
   // var groupname = document.getElementById("weeks").value;
  //  console.log(groupname);

}

//$('#seg_weather').hide();

function Settings() {
    $('#act_table').hide();
    $('#my_activities').hide();
    $('#profile_tile').show();
    $('#pills_row').hide();
    $('#seg_nearby').hide();
    $('#seg_weather').hide();
    $('#seg_leaderboard').hide();
    $('#deets_tile').hide();
    $('#menubtns').hide();
    $('#comty_tile').hide();
}

function showCmty() {
    $('#act_table').hide();
    $('#my_activities').hide();
    $('#profile_tile').hide();
    $('#pills_row').hide();
    $('#seg_nearby').hide();
    $('#seg_weather').hide();
    $('#seg_leaderboard').hide();
    $('#deets_tile').hide();
    $('#menubtns').hide();
    $('#comty_tile').show();
    getWindiest(0);
}

function getNearby() {
    //   alert("map")
    checkLoc();
    $('#profile_tile').hide();
    $('#deets_tile').hide();
    $('#seg_leaderboard').hide();
    $('#pills_row').hide();
    $('#act_table_header').hide();
    $('#act_table').hide();
    $('#my_activities').hide();
    $('#seg_nearby').show();
    $('#seg_weather').hide();
    $('#comty_tile').hide();
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
    $('#deets_tile').show();
    $('#menubtns').show();
   
  //  $('#seg_data').hide();
  //  $('#seg_weather').hide();
   // $('#seg_details').hide();
    //var json = localStorage.getItem('all_seg_efforts');
    //$('#location').append(json + "</br>");
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\" id=\"ultop\">";
    var json = localStorage.getItem('segdata');
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    var act_ct = 0;
    //get count from storage, update with seg efforts
    var LB = false;
    var firstID;
    var n;
    var name;
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
            n = i;
            name = seg.name;
            midhtml = midhtml + "<li class=\"polylink\" onclick=\"poly2(" + seg.ID + "," + i + ",'" + seg.name + "', true)\"><i class=\"read\"></i><p id=\"trow_" + seg.ID + "\" class=\"sel\">" + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
        "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div><div class=\"actions_b\" id=\"stars_best_" + seg.ID + "\"></div></li><div id=\"segs_" + seg.ID + "\"></div>";

        } else {
            midhtml = midhtml + "<li class=\"polylink\" onclick=\"poly2(" + seg.ID + "," + i + ",'" + seg.name + "', true)\"><i class=\"read\"></i><p id=\"trow_" + seg.ID + "\" class=\"un_sel\">" + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
        "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div><div class=\"actions_b\" id=\"stars_best_" + seg.ID + "\"></div></li><div id=\"segs_" + seg.ID + "\"></div>";

        }
        act_ct++;
        var wdata = localStorage.getItem(wdata);
        if (wdata == null) {
           // getW(seg.latlng,seg.ID); //only if no weather data
        }
           
           
    });
    
    var segct = countSegs();
    var ht = parseInt(((act_ct + segct) * 48) + 80); //56
    $('#tableback').height(ht);
   // alert(firstID)
    poly2(firstID, n, name, false);
    var ref_btn = "<div class=\"minihead\"><button class=\"btn btn-primary\" onclick=\"stAct()\">Refresh My Activities</button></div>";
    $('#actMsgs').html(act_ct + " Activities loaded.");
   $('#act_table2').html(top + midhtml + "</ul></div></div>");
    
    
    var timer = setInterval(function () { startDecode() }, 1000);     
    function startDecode() {
    clearInterval(timer);
    getSegs();
    $('#menubtns').show();
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
    if (json != null) {

        var jact = eval('(' + json + ')');

        var parents = [];

        function check_array(parents, parentID) {
            return jQuery.inArray(parentID, parents);
        }
        var ct = 0;
        $.each(jact.segs, function (i, seg) {
            var pbrank = seg.pb_rank;
            var pb = "";
            if (pbrank == "1") {
                // pb= "<i class=\"fa fa-shield\"></i>&nbsp;&nbsp;&nbsp;"
            }
            var seghtml = "";
            
            seghtml = seghtml + "<li onclick=\"polySegs(" + seg.ID + "," + i + ",'" + seg.name + "')\"><i class=\"read\"></i><p id=\"trow_" + seg.ID + "\" class=\"seg_row\"><i class=\"fa fa-trophy\"></i>&nbsp;&nbsp;&nbsp;" + pb + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
            "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div><div class=\"actions_b\" id=\"stars_best_" + seg.ID + "\"></div></li>";
            if (check_array(parents, seg.ID) == -1) {
                $('#segs_' + seg.parentID).append(seghtml);
                ct++;
                }
            parents.push(seg.ID);
        });
        localStorage.setItem("segct", ct);
    }
  
}

function convertTime(secs) {
    
   var timestr = moment(secs).seconds(secs).format('H:mm:ss');

    return timestr;


}

function formatTime(time) {
    var timestr = moment(time).format("MMM Do YYYY, h:mm:ss a");
    return timestr;
}

function drawLeaderboard(ID, type) {
    
    
    $('#seg_leaderboard').show();
    $('#lb_table').show();
    $('#eff_table').hide();
    $('#seg_weather').hide();
    $('#seg_efforts').hide();
    $('#komability').html("");
    var lbhistchk = localStorage.getItem(ID + '_0_hist');

    if (lbhistchk != null) {
        //have historical data, just show
        $('#g1').show()
        g1.refresh(0);

        var btnhtml = ""; //"<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"refHistweather(" + ID + ",'" + type + "')\">" +
                       //"Refresh historical wind conditions</i></a></div>";
        var hdata = localStorage.getItem(ID + '_0_hist');
        var bearing_store = ID + "_array";
        var j3 = eval('(' + hdata + ')');
        var komwspd = j3.hdata[0].wspeed;
        var kombrg = j3.hdata[0].wbrg;
        var hist = true;
        var brg = kombrg;
        var komf;
        var bdata = localStorage.getItem(bearing_store);
       
//var komf = Math.floor(1 / (numstars / 5));
       // $('#komability').html("KOMabilty Factor: " + komf);

     
    } else {
        $('#lbBtn').show();
        var btnhtml = "<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"showHistweather(" + ID + ",'" + type + "',true)\">" +
                       "Show historical wind conditions</i></a></div>";
        $('#g1').hide();
        
    }
    //style=\"position:absolute;right:18px;top:40px;z-index:400\"
    $('#lbBtn').html(btnhtml);
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('lb_data_' + ID);
    var j2 = eval('(' + json + ')');
    var timestr = j2.timestamp[0].now;
    var refstr = "Data as of " + timestr;
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
        var mov_time = convertTime(seg.mov_time);
        var date = seg.time;
        var timef = formatTime(date);
        //convert seconds
        var hour_bg_bk = "9F9F9F";
        var border = "2fb4c8";
        var wind_bg = "51D251";
        var temp_bg = "FFB336";
        var wind_txt = "2f3e46";
        var temp_txt = "FFF";
        // var ampm = zone.FCTTIME.ampm;

        //moving time
        ctx2d.font = '14px Arial';
        ctx2d.fillStyle = '#8bc7eb';
        ctx2d.fillText(timef, 5, posyt);
        ctx2d.fillStyle = '#FFF';
        ctx2d.fillText(seg.name, 5, posyt + 16);
       
        ctx2d.fillText(mov_time, 5, posyt + 32);
        
        ctx2d.font = '14px Arial';
        var wspd = 0;
        if (hist == true) {
            var hdata = localStorage.getItem(ID + '_' + i + '_hist');
            var j3 = eval('(' + hdata + ')');
            var brg2 = j3.hdata[0].wbrg;
            var wspd2 = j3.hdata[0].wspeed;
            var brg = brg2;
           
            ctx2d.fillStyle = "#2fb4c8";
            ctx2d.fillRect(165, posy + 18, wspd2 + 25, 22);

            ctx2d.font = '14px Arial';
            ctx2d.fillStyle = "#fff";
            ctx2d.font = '12px Arial';
            ctx2d.fillText("mph", 179, posyt + 22);
            ctx2d.fillText(Math.round(wspd2), 166, posyt + 22);

            ctx2d.save();
            ctx2d.strokeStyle = "#2fb4c8";
            ctx2d.translate(150, posy + 30);
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
            var windspeed = wspd2;
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
           // var canvas = document.getElementById('komcanvas');
          //  canvas.width = 300;
          //  canvas.height = 25;
          //  canvas.style.width = '300px';
          //  canvas.style.height = '25px';
        //    var ctx2d = canvas.getContext('2d');
        //    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
            ctx2d.fillStyle = "#ffca4a";

          
          
            //numstars = 5
            //    $('#hkomdata').html("<h3>" + wspd + " " + starval + "  " + numstars + "</h3>");
           
           
                //komstarsn = numstars;
                if (starval <= 0) {
                    drawStarsO(ctx2d, 5, posy + 20, 240);
                } else {
                    numstars = calcStars(starval);
                    drawStarsF(ctx2d, numstars, posy + 20, 240);
                }
                komf = Math.floor(6 - (numstars + 1));
                console.log(komf);
            
            
        }

        posy = posy + 60
        posyt = posyt + 60
        i++;
    })


    var ht = parseInt((ct * 100) + 30);
    $('#leaderback').height(ht);

    timerG = setTimeout(function () { drawG() }, 1000);

    function drawG() {
        clearTimeout(timerG);
        g1.refresh(komf);

    }

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

function drawSegEffort(ID,type2) {
    $('#seg_leaderboard').hide();
    $('#lb_table').hide();
    $('#eff_table').show();
     $('#seg_weather').hide();
     $('#seg_efforts').show();
    console.log("efforts " + ID);
    var type = 'segs';
    var lbhistchk = localStorage.getItem(ID + '_0_hist_user');
    //type2 = hist
    if (lbhistchk != null) {
        //have historical data, just show


        var btnhtml = ""; //"<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"refHistweather(" + ID + ",'" + type + "')\">" +
        //"Refresh historical wind conditions</i></a></div>";
        var hdata = localStorage.getItem(ID + '_0_hist_user');
        var bearing_store = ID + "_array";
        var j3 = eval('(' + hdata + ')');
        var komwspd = j3.hdata[0].wspeed;
        var kombrg = j3.hdata[0].wbrg;
        var hist = true;
        var brg = kombrg;
        var komf;
        var bdata = localStorage.getItem(bearing_store);

        //var komf = Math.floor(1 / (numstars / 5));
        // $('#komability').html("KOMabilty Factor: " + komf);


    } else {
        var btnhtml = "<div id=\"cont\"><a class=\"btn btn-success btn-sm\" href=\"#leaderback\" onclick=\"showHistweather(" + ID + ",'" + type + "',false)\">" +
                       "Show historical wind conditions</i></a></div>";
    }
    //style=\"position:absolute;right:18px;top:40px;z-index:400\"
    $('#sgBtn').html(btnhtml);
  //  var json = localStorage.getItem('eff_data_' + ID);
    var json = localStorage.getItem('eff_data_' + ID);
    var j2 = eval('(' + json + ')');
    var timestr = j2.timestamp[0].now;
    var refstr = "Data as of " + timestr;
    $('#sgdata').html(refstr);
    var act_ct = 0;
    var posy = 4; //54;
    var posyt = 15; //65;
    var canvas = document.getElementById('segeff');
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
        var mov_time = convertTime(seg.mov_time);
        var date = seg.time;
        var timef = formatTime(date);
        //convert seconds
        var hour_bg_bk = "9F9F9F";
        var border = "2fb4c8";
        var wind_bg = "51D251";
        var temp_bg = "FFB336";
        var wind_txt = "2f3e46";
        var temp_txt = "FFF";
        // var ampm = zone.FCTTIME.ampm;

        //moving time
        ctx2d.font = '14px Arial';
        ctx2d.fillStyle = '#8bc7eb';
        ctx2d.fillText(timef, 5, posyt);
        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '16px Arial';
        //ctx2d.fillText(seg.name, 5, posyt + 16);
        ctx2d.fillText(mov_time, 5, posyt + 20);
        //alert(hour);

        ctx2d.font = '14px Arial';

        // var imgi = new Image();
        // imgi.src = "http://icons.wxug.com/i/c/a/nt_snow.gif"; //seg.profile;
        //  imgi.addEventListener("load", function () {
        //      ctx2d.drawImage(imgi, 6, posyt + 10);
        // }, false);
        //    ctx2d.fillStyle = "#2fb4c8";
        //   ctx2d.fillRect(0, posy - 5, 350, 1);

        var wspd = 0;
        if (hist == true) {
            var hdata = localStorage.getItem(ID + '_' + i + '_hist_user');
            var j3 = eval('(' + hdata + ')');
            var brg2 = j3.hdata[0].wbrg;
            var wspd2 = j3.hdata[0].wspeed;
            var brg = brg2;

            ctx2d.fillStyle = "#2fb4c8";
            ctx2d.fillRect(165, posy + 18, wspd2 + 25, 22);

            ctx2d.font = '14px Arial';
            ctx2d.fillStyle = "#fff";
            ctx2d.font = '12px Arial';
            ctx2d.fillText("mph", 179, posyt + 22);
            ctx2d.fillText(Math.round(wspd2), 166, posyt + 22);

            ctx2d.save();
            ctx2d.strokeStyle = "#2fb4c8";
            ctx2d.translate(150, posy + 30);
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
            var windspeed = wspd2;
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
            // var canvas = document.getElementById('komcanvas');
            //  canvas.width = 300;
            //  canvas.height = 25;
            //  canvas.style.width = '300px';
            //  canvas.style.height = '25px';
            //    var ctx2d = canvas.getContext('2d');
            //    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
            ctx2d.fillStyle = "#ffca4a";



            //numstars = 5
            //    $('#hkomdata').html("<h3>" + wspd + " " + starval + "  " + numstars + "</h3>");

         //   if (i == 0) {
                //komstarsn = numstars;
                if (starval <= 0) {
                    drawStarsO(ctx2d, 5, posy + 20, 240);
                } else {
                    numstars = calcStars(starval);
                    drawStarsF(ctx2d, numstars, posy + 20, 240);
                }
                komf = Math.floor(6 - (numstars + 1));
                console.log(komf);
       //     }

        }

        posy = posy + 60
        posyt = posyt + 60
        i++;
    })


    var ht = parseInt((ct * 48) + 120);
    $('#effortback').height(ht);

    
}
var hc = -1;;

function showHistweather(SegID,type,lb) {
    //make an array of the first three
    //find out if seg is private or not
    $('#sgdata').html("Retrieving historical data ...");
    $('#lbBtn').hide();
    $('#lbdata').html("Retrieving historical data ...");
    var lbhistchk = "";
    var count = null;
    if (lb == true) {
        var json = localStorage.getItem('lb_data_' + SegID);
        var j2 = eval('(' + json + ')');
        count = (j2.count[0].num - 1);
        lbhistchk = localStorage.getItem(SegID + '_0_hist');
    } else {
        var json = localStorage.getItem('eff_data_' + SegID);
        var j2 = eval('(' + json + ')');
        count = (j2.count[0].num - 1);
        lbhistchk = localStorage.getItem(SegID + '_0_hist_user');
    }
    //alert(type);
    console.log("count" + count);
   
    
   //use this

    if (lbhistchk != null) {
        //have historical data, just show
        if (lb == true) {
            drawLeaderboard(SegID, "hist");
        } else {
            drawSegEffort(SegID, "hist");
        }
    
    } else {
        var done = false;
        var latlng = getLatlng(SegID, type);
        console.log("latlng" + latlng);
        var time = 0;
        $.each(j2.segs, function (i, seg) {
            var date = j2.segs[i].time;
            setTimeout(function() {
                //alert('paused');
                CallHistWeather(latlng, date, SegID, i, type, lb); 
                if (i == count) {
                    var timerAA = setTimeout(function () { showdata() }, 2000);
                    function showdata() {
                        clearTimeout(timerAA);
                        if (lb == true) {
                            console.log("finished" + count + " " + i);
                            drawLeaderboard(SegID, "segs");
                        } else {
                            console.log("finished" + count + " " + i);
                            showEfforts(SegID);
                        }
                    }
                }
            }, time);
            time += 2000;
        });                   

       

    //    var timer2 = setTimeout(function () { startGethist2(SegID, 0) }, 500);
    //    var timer1 = setTimeout(function () { startGethist(SegID, 1) }, 1500);
   //     var timer3 = setTimeout(function () { startGethist1(SegID, 2) }, 3000);
        function startGethist2(SegID, i) {
            clearInterval(timer2);
            if (j2.segs[i].time != undefined) {
                var date = j2.segs[i].time;
                CallHistWeather(latlng, date, SegID, i, type, lb)
                hc++;
            }
        }
        function startGethist(SegID, i) {
            clearInterval(timer1);
            if (j2.segs[i] != undefined) {
                var date = j2.segs[i].time;
                CallHistWeather(latlng, date, SegID, i, type, lb)
                hc++;
            }
        }
        function startGethist1(SegID, i) {
            clearInterval(timer3);
            if (j2.segs[i] != undefined) {
                var date = j2.segs[i].time;
                CallHistWeather(latlng, date, SegID, i, type, lb)
                hc++;
            }
        }
    }
}

function CallHistWeather(latlng,date,SegID,i,type,lb) {
    var hist_deets = {
        hdata: []
    };
    console.log("i=" + i);
    var j = i + 1;
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
            console.log("Got hist data for " + SegID + " " + i + " " + hc);
            console.log(json.currently.windSpeed);
            $('#lbdata').html("Retrieving historical data ..." + j);
            var hist_deets_json = JSON.stringify(hist_deets);
            if (lb == true) {
                localStorage.setItem(SegID + "_" + i + "_hist", hist_deets_json);
               
            } else {
                localStorage.setItem(SegID + "_" + i + "_hist_user", hist_deets_json);
              
            }
            //currently.windSpeed
            //currently.windBearing
            $('#location').append(jsontext + "</br>");
         //   if (i == hc) {
              
            
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


function refreshWeather(type,ct) {

    if (type == 'map') {
        $('#winfomap').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
                        "<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Retrieving weather ...</div>");
        weatherMap(ct);
        $('#refreshBtnmap').fadeOut();
     } else {


        var timenow = Math.round(new Date().getTime() / 1000);
        var wdata = localStorage.getItem("weatherdata");
        if (wdata != null) {
            var wdatap = eval('(' + wdata + ')');
            var epochw = wdatap.wdata[0].timestamp;
            var diff = timenow - epochw;
            //alert(diff);


            function revertText() {
                clearInterval(timer1);
                $('#winfo').fadeOut();
                dispStarsChk();
                $('#refreshBtn').fadeIn();
                // $('#winfo').fadeIn();

            }
            console.log(diff);
            if (diff > 600) { //10800
                var timer1 = setInterval(function () { revertText() }, 5000);
                $('#refreshBtn').fadeOut();
                $('#winfo').fadeOut('slow', function () {
                    // will be called when the element finishes fading out
                    $('#winfo').html("Weather data retrieved less than 3 hours ago.</br>Refresh not available");
                    // if selector matches multiple elements it will be called once for each
                    $('#winfo').fadeIn();
                });
                // $('#winfo').fadeOut('slow').html("Weather data retrieved less than 3 hours ago.</br>Refresh not available").fadeIn('slow');
                //$('#winfo').html("Weather data retrieved less than 3 hours ago.</br>Refresh not available");
                // $('#winfo').fadeIn();
            } else {
                $('#refreshBtn').fadeOut('slow');
                var timex = 20000;
                var actct = localStorage.getItem("actct");
                var segct = localStorage.getItem("segct");
                var total = parseInt(actct) + parseInt(segct);
                timex = (total * 2000)
                var timer2 = setInterval(function () { getSegWeather() }, timex); //timer = weatherct * 2s
                //timer = weatherct * 2s

                console.log(timex);
                $('#winfo').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
                             "<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Refreshing weather ...</div>");
                $('*[id*=stars_]:visible').each(function () {
                    $(this).html("wait");
                });
                deleteOldweather(type);
                weatherAct();
                function getSegWeather() {
                    clearInterval(timer2);
                    weatherSeg();

                    var timer3 = setInterval(function () { finishedW() }, 2000);
                    function finishedW() {
                        clearInterval(timer3);
                        dispStarsChk();
                        countWdata();
                        $('#refreshBtn').fadeIn('slow');
                    }
                    //  dispStarsChk();
                }


            }
        } else {
            $('#refreshBtn').fadeOut('slow');
            var timex = 20000;
            var actct = localStorage.getItem("actct");
            var segct = localStorage.getItem("segct");
            var total = parseInt(actct) + parseInt(segct);
            timex = (total * 2000)
            var timer2 = setInterval(function () { getSegWeather() }, timex); //timer = weatherct * 2s
            //timer = weatherct * 2s

            console.log(timex);
            $('#winfo').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
                         "<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Refreshing weather ...</div>");
            $('*[id*=stars_]:visible').each(function () {
                $(this).html("wait");
            });
            deleteOldweather(type);
            weatherAct();
            function getSegWeather() {
                clearInterval(timer2);
                weatherSeg();

                var timer3 = setInterval(function () { finishedW() }, 2000);
                function finishedW() {
                    clearInterval(timer3);
                    dispStarsChk();
                    countWdata();
                    $('#refreshBtn').fadeIn('slow');
                }
                //  dispStarsChk();
            }
        }
    }
}

function hideW() {
    $('#wbtns').hide();
}

function checkSegisAct(ID) {          //  create a loop function
    var json = localStorage.getItem('segdata');
    var j2 = eval('(' + json + ')');
    var priv = false;
    $.each(j2.segs, function (i, seg) { //if (i < 10) {            //  if the counter < 10, call the loop function
        if (seg.ID == ID) {
            priv = true;
        }
            
    });                       //  ..  setTimeout()

    return priv;
}

function weatherAct() {          //  create a loop function
var json = localStorage.getItem('segdata');
var j2 = eval('(' + json + ')');
$('#status_msgs').append("Retrieving weather data for Activities and Segments</br>");
    //$('#location').show();
var wct = 1;
var time = 0;
var ct = localStorage.getItem('weatherdata_ct');
var timerw = ct * 4000;
    //var ct = localStorage.getItem('weatherdata_ct');
    //var timerw = ct * 4000;
var actct = localStorage.getItem("actct");
timex = (actct * 4000)
console.log(timex + " estimated time for weather in wAct");
var timerst = setInterval(function () { closeStatus() }, timex);
function closeStatus() {
    clearInterval(timerst);
    $('#status_msgs').append("</br>Done .... stand by");

    console.log(timex + " seconds up")
    weatherSeg();
    drawTable();


    var timerst2 = setInterval(function () { dispstarst() }, 2000);
    function dispstarst() {
        clearInterval(timerst2);
        $('#status_msgs').hide();
        $('#status_area').hide();
        $('#UnAuthApp').hide();
        $('#menu_buttons').show();

        displayStars(3);
        updateUser(data.firstname, data.lastname, data.id);
    }


}
$.each(j2.segs, function (i, seg) { //if (i < 10) {            //  if the counter < 10, call the loop function
        
        setTimeout(function() {
//alert('paused');
getW(seg.latlng,seg.ID,"act");
$('#winfo').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
"<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Refreshing weather ... " + wct + "</div>");
//$('#status_msgs').html("Retrieving weather data for Activities and Segments ... " + wct + "</br>");
wct++;
    }, time);
    time += 4000;
    });                       //  ..  setTimeout()


}

function weatherMap(ct) {          //  create a loop function
var json = localStorage.getItem('seg_loc_data');
var j2 = eval('(' + json + ')');
console.log(ct);
var wct = 1;
//$('#winfomap').html("Retrieving weather data ...");
//$('#location').show();
var time = 0;

    $.each(j2.points, function (i, seg) { //if (i < 10) {            //  if the counter < 10, call the loop function
        
        setTimeout(function() {
//alert('paused');
getW(seg.endlatlong,seg.PID,"map");
ct--;
console.log(ct);

$('#winfomap').html("<div style=\"height:26px;width:30px;text-align:center;margin-top:9px;margin-left:2px\" class=\"fa fa-2x fa-cog fa-spin\"></div>" +
            "<div style=\"display:inline-block;margin-bottom:8px\">&nbsp;Refreshing weather ... " + wct + "</div>");
wct++;
 if (ct == 0) {
     var timer1 = setInterval(function () { startDecode() }, 1000);
     function startDecode() {
         clearTimeout(timer1);
         displayStarsmap(3);
         $('#refreshBtnmap').fadeIn('slow');
     }
            
        }
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
   //  $('#status_msgs').append("Retrieving weather data </br>");
      var timer1 = setInterval(function () { startDecode(seg.ID,seg.parentID) }, 1000);
    index++;
    //alert(poly);
      //startDecode(poly,ID,i);      
     function startDecode(toID,fromID) {
    clearInterval(timer1);
    copyWeather(fromID, toID);

        
     }
     console.log("copying seg weather")
    });
    
    }

}

function displayStarsmap(hrs) { //get seg weather
    //1-3 = 3
    //4-6 = 6
//tryMapWeatherStars(ID);
    var wdata = localStorage.getItem("weatherdata");
    var wdataj = eval('(' + wdata + ')');
    var jsonact = localStorage.getItem('seg_loc_data');
    var j2s = eval('(' + jsonact + ')');
    if (j2s != null) {
        var ID = j2s.points[0].PID;      //"469475975";
        var jsondata = localStorage.getItem(ID + "_weather_map");
        $('#refreshStarsmapbtn').html("Refresh Stars Ratings");
        //  var Hrs = localStorage.getItem("Hrs");
        localStorage.setItem("Hrs_map", hrs);

        var parsed_json = eval('(' + jsondata + ')');

        var fh = hrs - 2;
        var lh = hrs;
        fh = fh.toString();
        lh = lh.toString();
        //alert(fh + lh);
        var hrstxt = fh + " - " + lh + " Hrs";
        var ddtext = "<div class=\"btn-group\"><button class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
                  hrstxt + "<span class=\"caret\"></span></button><ul class=\"dropdown-menu\">" +
                                "<li><a href=\"#\" onclick=\"displayStarsmap(3)\">1 - 3 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStarsmap(6)\">4 - 6 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStarsmap(9)\">7 - 9 Hrs</a></li>" +
                                "<li><a href=\"#\" onclick=\"displayStarsmap(12)\">10 - 12 Hrs</a></li></ul></div>";

        $('#Hrsddmap').html(ddtext);
        if (parsed_json != null) {
            var firsthour = parsed_json.hourly_forecast[fh].FCTTIME.civil;
            var lasthour = parsed_json.hourly_forecast[lh].FCTTIME.civil;
            $('#location').append("Calculating activity ratings for selected wind conditions");
            var timediff = getTimediff(ID);
            var timeago = getTimeW(ID); //moment(getTimeW(ID)).fromNow;
            $('#winfomap').html("Showing star ratings from " + firsthour + " to " + lasthour + "</br>Weather data retrieved: " + timeago);
        }
        $.each(j2s.points, function (i, seg) {
            $('#stars_' + seg.PID).html("<p>Not yet retrieved</p>");
            calcStarsInline(seg.PID, hrs, 'map');
        });

    }
    //save hrs val and also info that stars are showing
}

function tryMapWeatherStars(SegID) {
    console.log("try " + SegID);
    var wdata = localStorage.getItem(SegID + "_weather_map");
    var hrs = localStorage.getItem("Hrs_map");
    if (wdata == null) {
       // calcStarsInline(seg.PID, hrs);
    } else {
        console.log("found weather for " + SegID);
        calcStarsInline(SegID, hrs, 'map');
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
    var jsondata = localStorage.getItem(ID + "_weather_act");
 //   $('#refreshStarsbtn').html("Refresh Stars Ratings");
  //  var Hrs = localStorage.getItem("Hrs");
    localStorage.setItem("Hrs", hrs);
    
    var parsed_json = eval('(' + jsondata + ')');

    var j2s = eval('(' + jsonseg + ')');
    var j2a = eval('(' + jsonact + ')');
    var fh = hrs - 2;
    var lh = hrs;
    fh = fh.toString();
    lh = lh.toString();
    //alert(fh + lh);
    if (hrs == 24) {
        var hrstxt = "Best (24 hrs)";
    } else {
        var hrstxt = fh + " - " + lh + " Hrs";
    }

    var ddtext = "<div class=\"btn-group\"><button class=\"btn btn-success btn-sm dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
              hrstxt + "<span class=\"caret\"></span></button><ul class=\"dropdown-menu\">" +
                            "<li><a href=\"#\" onclick=\"displayStars(3)\">1 - 3 Hrs</a></li>" +
                            "<li><a href=\"#\" onclick=\"displayStars(6)\">4 - 6 Hrs</a></li>" +
                            "<li><a href=\"#\" onclick=\"displayStars(9)\">7 - 9 Hrs</a></li>" +
                            "<li><a href=\"#\" onclick=\"displayStars(12)\">10 - 12 Hrs</a></li>" +
                            "<li><a href=\"#\" onclick=\"displayStars(24)\">Best (24 Hrs)</a></li></ul></div>";

    $('#Hrsdd').html(ddtext);


    var firsthour = parsed_json.hourly_forecast[fh].FCTTIME.civil;
    var lasthour = parsed_json.hourly_forecast[lh].FCTTIME.civil;
    $('#location').append("Calculating activity ratings for selected wind conditions");
    var timediff = getTimediff(ID);
    var timeago = prettify(timediff);
    if (hrs == 24) {
        $('#winfo').html("Showing the best star ratings for the next 24 hours of retrieved weather");
    } else {

}
    $('#winfo').html("Showing star ratings from " + firsthour + " to " + lasthour + "</br>Weather data retrieved: " + timeago).fadeIn('slow');
    $.each(j2s.segs, function (i, seg) {
        $('#stars_' + seg.ID).html("<p>Calculating ... </p>");
        calcStarsInline(seg.ID,hrs, 'act');
    });
    
    $.each(j2a.segs, function (i, seg) {
        $('#stars_' + seg.ID).html("<p>Calculating ... </p>");
        calcStarsInline(seg.ID,hrs, 'act');
    });
    
    //save hrs val and also info that stars are showing
}

function stConn2() {
    var strava_deets = {
        deets: []
    };
    //alert("connect");
    $('#status_msgs').show();
    $('#status_area').show();
    $('#status_msgs').html("Connecting to Strava ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8')
    OAuth.popup('strava', { cache: true }).done(function (result) {
       // alert(result);
       // console.log(result)
     
        localStorage.removeItem('userdata');
        // result.me().done(function (data) {
        result.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            // do something with `data`, e.g. print data.name
            $('#location').append("</br > " + JSON.stringify(data));
            strava_deets.deets.push({
                "firstname": data.firstname,
                "profile": data.profile,
                "lastname": data.lastname,
                "stravaID": data.id,
                "city": data.city,
                "state": data.state
            });
            
            var jsondeets = JSON.stringify(strava_deets);
            localStorage.setItem('userdata', jsondeets);
            localStorage.setItem('fulluserdata', JSON.stringify(result));
            localStorage.setItem('Hrs', "3");
            saveUser(data.firstname, data.lastname, data.id, 0, 0);
            var timex = 30000;
            //var ct = localStorage.getItem('weatherdata_ct');
            //var timerw = ct * 4000;
            //var actct = localStorage.getItem("actct");
           // var segct = localStorage.getItem("segct");
            //var total = parseInt(actct);// + parseInt(segct);
            //timex = (total * 2000)
            //console.log(timex);
            //var timerst = setInterval(function () { closeStatus() }, timex); //rem bkk2
            function closeStatus() {
                clearInterval(timerst);
                $('#status_msgs').append("</br>Done .... stand by");
             
                console.log(timex + " seconds up")
                weatherSeg();
                drawTable();
               
                
                var timerst2 = setInterval(function () { dispstarst() }, 2000);
                function dispstarst() {
                    clearInterval(timerst2);
                    $('#status_msgs').hide();
                    $('#status_area').hide();
                    $('#UnAuthApp').hide();
                    $('#menu_buttons').show();
                    
                    displayStars(3);
                    updateUser(data.firstname, data.lastname, data.id);
                }

              
            }
            $('#status_msgs').append("</br >Retrieving Activities and Segments for </br>" + data.firstname + " " + data.lastname + "</br >");
            
            
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
    var all_seg_data = localStorage.getItem('all_seg_efforts');
    if (all_seg_data != null) {
        var j2 = eval('(' + all_seg_data + ')');
        //alert(all_seg_data);
        if (all_seg_data.length > 80) {
            var index = 0;
            $.each(j2.segs, function (i, seg) {
                //alert("hi");
                var name = i;
                var poly = localStorage.getItem(seg.ID + "_poly");
                //  alert(poly);
                var ID = seg.ID
                var parentID = seg.parentID
                var timer1 = setInterval(function () { startDecode(poly, ID, parentID, i, index) }, 5000);
                index++;
                //alert(poly);
                //startDecode(poly,ID,i);      
                function startDecode(poly, ID, parentID, i, index) {
                    clearInterval(timer1);
                    decodepoly(poly, ID, parentID);

                }
            });

            var timer2 = setTimeout(function () { startDecode() }, 1000);
            function startDecode() {
                clearTimeout(timer2);
                //  drawTable();
                saveSegmentsDB();
                weatherAct();
               
            }


        } else {

            var timer3 = setTimeout(function () { startDecode() }, 1000);
            function startDecode() {
                clearTimeout(timer3);
               // $('#AuthApp').show();
           //     $('#status_msgs').hide();
                //drawTable();
                weatherAct();
            }

        }
    } else {
        $('#AuthApp').show();
    }
}


function saveSegmentsDB() {
    var all_seg_data = localStorage.getItem('all_seg_efforts');
    if (all_seg_data != null) {
        var j2 = eval('(' + all_seg_data + ')');
        //alert(all_seg_data);
        if (all_seg_data.length > 80) {
            var index = 0;
            $.each(j2.segs, function (i, seg) {
                //alert("hi");
                var name = seg.name;
                var latlng = seg.latlng;
                var poly = localStorage.getItem(seg.ID + "_poly");
                var array = localStorage.getItem(seg.ID + "_array");
                //  alert(poly);
                var ID = seg.ID
                var priv = seg.private
                var parentID = seg.parentID
                saveSegment(name, ID, poly, array, latlng, priv, null);
            });

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
 //   alert("start decode" + poly + " " + ID);
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
 
          decodepoly(poly, ID, parentID);
          

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
    //stAct();
    stConn2();
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
           // $('#status_msgs').append(jsontext);
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
            $('#status_msgs').append('Found ' + ct + ' activities </br>');
            var userdata = localStorage.getItem('userdata');
            var user = eval('(' + userdata + ')');
            var firstname = user.deets[0]['firstname'];
            var lastname = +user.deets[0]['lastname'];
            var stravaID = user.deets[0]['ID'];
            //updateUser(firstname, lastname, stravaID, ct, 0);
           // alert(jsontext);
            //alert("Retrieved " + ct + " Activities.");
            //drawTable();
          parse("act"); 
          var timer = setInterval(function () { startDecode() }, 5000);
            console.log("analyse segs in 5 seconds")
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
        timestamp: [],
        count: []
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
                
                ct++;
            });
            strava_segs.timestamp.push({
                "epoch": timenow,
                "now": moment().format("MMM Do YYYY, h:mm:ss a")
            });
            strava_segs.count.push({
                "num": ct
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
            console.log(data);
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
                   "parentID" : seg.activity.id,
                   "private" : seg.segment.private
                });
                
                strava_all_segs.segs.push({
                   "name": seg.name,
                   "latlng": seg.segment.end_latlng,
                   "dist": seg.segment.distance,
                   "ID" : seg.segment.id,
                   "parentID" : seg.activity.id,
                   "pb_rank" : seg.pr_rank,
                   "kom_rank": seg.kom_rank,
                   "elev_h": seg.segment.elevation_high,
                   "elev_l": seg.segment.elevation_low,
                   "private": seg.segment.private
                });//has it more than once
        
            seg_details(seg.segment.id);
                    ct++;
               
            });
            if (ct > 0) {
            strava_segs.count.push(ct);
           var jsonsegs = JSON.stringify(strava_segs);
            var jsonsegsall = JSON.stringify(strava_all_segs);
            $('#status_msgs').append('Found ' + ct + ' segment efforts for activity ' + ID + '</br>');
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
    var userdata = localStorage.getItem('userdata');
    var user = eval('(' + userdata + ')');
    var athID = user.deets[0]['stravaID'];
    var timenow = Math.round(new Date().getTime() / 1000);
    var strava_segs = {
        segs: [],
        timestamp: [],
        count: []
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

                strava_segs.timestamp.push({
                    "epoch": timenow,
                    "now": moment().format("MMM Do YYYY, h:mm:ss a")
                });
                
               ct++;
            });
            strava_segs.count.push({
                "num": ct
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('eff_data_'+ID, jsonsegs);
            //localStorage.setItem('actct',ct);
            
           //alert("Retrieved " + jsonsegs);
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

function deleteOldweather(type) {
    var str = "weather_act";
    $('#status_msgs').show();
    localStorage.removeItem("weatherdata");
    localStorage.removeItem("weatherdata_ct");
    for (var i = 0; i < localStorage.length; i++) {
        //  if (localStorage.key(i) == 'weatherdata') {
        if (localStorage.key(i).indexOf(str) > -1) {
            $('#status_msgs').append("Removing " + localStorage.key(i) + "</br >");
            // }
            localStorage.removeItem(localStorage.key(i));
        }
        // do something with localStorage.getItem(localStorage.key(i));
    }

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

    $('#weeks').on('onchange', function (e) {
        var name = getElementById(e.target).value;
        console.log(name);
    });


    $('.polylinkx').on('click', function (e) {
        // get clicked item
        $(e.target).find('p').removeClass('un_sel');
        $(e.target).find('p').addClass('sel');
        // remove all active classes
   //     alert(clickedItem);
  //      $('.mail p').removeClass('sel')
  //      $('.mail p').removeClass('un_sel')
       
        // find the ul inside the clicked item
       
    });
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
           // $('#status_msgs').append("</br > Not connected to Strava");
            $('#strava_login').show();
            $('#status_area').show();
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
     //       alert(token);
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
