var main_button = document.getElementById("main_button");
var progress_cell = document.getElementById("progressCell");
var progress_bar = document.getElementById("myBar");
var play_button = document.getElementById("play_button");

var time_current  = 0;
var time_verse    = 0;
var time_chorus   = 1000 * 19.5;
var time_bridge   = 1000 * 41.22;
var time_end      = 1000 * 66.715588;
var time_interval = 10;
var start = null;
var playing = false;
var diff = 0;
var timer;

checkboxes = [];
objAuds_list = [];

var json_data = `{
    "verses": [
        "Clean.Rhythm.Verse",
        "Clean.Lead.Verse",
        "Distorted.Rhythm.Verse",
        "Distorted.Lead.Verse"
    ],
    "choruses": [
        "Clean.Rhythm.Chorus",
        "Clean.Lead.Chorus",
        "Distorted.Rhythm.Chorus",
        "Distorted.Lead.Chorus"
    ],
    "bridges": [
        "Clean.Rhythm.Bridge",
        "Clean.Lead.Bridge",
        "Distorted.Rhythm.Bridge",
        "Distorted.Lead.Bridge"
    ],
    "crs": [
        "Clean.Rhythm.Verse",
        "Clean.Rhythm.Chorus",
        "Clean.Rhythm.Bridge"
    ],
    "cls": [
        "Clean.Lead.Verse",
        "Clean.Lead.Chorus",
        "Clean.Lead.Bridge"
    ],
    "drs": [
        "Distorted.Rhythm.Verse",
        "Distorted.Rhythm.Chorus",
        "Distorted.Rhythm.Bridge"
    ],
    "dls": [
        "Distorted.Lead.Verse",
        "Distorted.Lead.Chorus",
        "Distorted.Lead.Bridge"
    ]
}`;
var groups = JSON.parse(json_data);
//////////////////////////////////////////////
//////////////////////////////////////////////
function objAud (media_id) {
    this.name = media_id;
    this.song = document.getElementById(media_id);
    this.outer_td = document.getElementById("outer_td_" + media_id);

    this.v = false;
    this.c = false;
    this.b = false;

    this.v_chk = document.getElementById(media_id + ".Verse");
    this.c_chk = document.getElementById(media_id + ".Chorus");
    this.b_chk = document.getElementById(media_id + ".Bridge");
};

objAud.prototype.play_inst = function () {
    this.song.currentTime = time_current;
    this.song.muted = false;
    this.song.play();
//    this.outer_td.style.backgroundColor = "green";
};

objAud.prototype.pause_inst = function () {
    time_current = this.song.currentTime;
    this.song.pause();
//    this.outer_td.style.backgroundColor = "red";
};

objAud.prototype.stop_inst = function () {
    this.song.pause();
    time_current = 0;
//    this.outer_td.style.backgroundColor = "red";
};

//////////////////////////////////////////////
//////////////////////////////////////////////
function* loop_list(){
    for (i = 0; i < objAuds_list.length; i++) {
        yield objAuds_list[i];
    };
};

//////////////////////////////////////////////
//////////////////////////////////////////////
function main_toggle() {
    if (main_button.innerHTML.includes("Uncheck")) {
        main_button.innerHTML = main_button.innerHTML.replace("Uncheck", "Check");
        inner_toggle(groups['verses'][0],   false);
        inner_toggle(groups['verses'][1],   false);
        inner_toggle(groups['verses'][2],   false);
        inner_toggle(groups['verses'][3],   false);
        inner_toggle(groups['choruses'][0], false);
        inner_toggle(groups['choruses'][1], false);
        inner_toggle(groups['choruses'][2], false);
        inner_toggle(groups['choruses'][3], false);
        inner_toggle(groups['bridges'][0],  false);
        inner_toggle(groups['bridges'][1],  false);
        inner_toggle(groups['bridges'][2],  false);
        inner_toggle(groups['bridges'][3],  false);
    } else {
        main_button.innerHTML = main_button.innerHTML.replace("Check", "Uncheck");
        inner_toggle(groups['verses'][0],   true);
        inner_toggle(groups['verses'][1],   true);
        inner_toggle(groups['verses'][2],   true);
        inner_toggle(groups['verses'][3],   true);
        inner_toggle(groups['choruses'][0], true);
        inner_toggle(groups['choruses'][1], true);
        inner_toggle(groups['choruses'][2], true);
        inner_toggle(groups['choruses'][3], true);
        inner_toggle(groups['bridges'][0],  true);
        inner_toggle(groups['bridges'][1],  true);
        inner_toggle(groups['bridges'][2],  true);
        inner_toggle(groups['bridges'][3],  true);
    };
};

function start_over() {
    clearInterval(timer);
    diff = 0;
    progress_bar.style.width = '0%';
    time_current = 0;
    start = Date.now();
    play_all();
    clearInterval(timer);
    timer = setInterval(Timer, time_interval);
};

function play_all() {
    if (!playing) {
        start = Date.now();
        time_current = 0;
    }
    timer = setInterval(Timer, time_interval);
    for (i = 0; i < objAuds_list.length; i++) {
        objAuds_list[i].play_inst();
    };
    playing = true;
};

function pause_all() {
    for (i = 0; i < objAuds_list.length; i++) {
        objAuds_list[i].pause_inst();
    };
    clearInterval(timer);
    playing = true;
};

function stop_all() {
    for (i = 0; i < objAuds_list.length; i++) {
        objAuds_list[i].stop_inst();
    };
    clearInterval(timer);
    progress_bar.style.width = '0%';
    playing = false;
};

//function find_time() {
//    mouseX = event.clientX + document.body.scrollLeft;
//    var perc = mouseX / progress_cell.offsetWidth * 98;
//    if (perc < 30) {perc -= 4;} else
//    if (perc < 30) {perc -= 2;} else
//    if (perc > 90) {perc += 1;};
//    progress_bar.style.width = perc + '%';
//    time_current = time_end * perc / 100
//};

/////////////////////////////////////////////////////
///////////////////// Timer /////////////////////////
function Timer() {
    let it = loop_list();
    let result = it.next();
    time_current = Date.now() - start;
    if (time_current >= time_end)    {
        start_over();
        return;

    } else if (time_current >= time_bridge) {
        while (!result.done) {
            result.value.song.muted = result.value.b;
            result = it.next();
        };

    } else if (time_current >= time_chorus) {
        while (!result.done) {
            result.value.song.muted = result.value.c;
            result = it.next();
        };

    } else if (time_current >= time_verse)  {
        while (!result.done) {
            result.value.song.muted = result.value.v;
            result = it.next();
        };

    };
    diff = time_current / time_end;
    progress_bar.style.width = diff * 100 + '%';
};

function begin_again() {
    start = Date.now() - diff;
    timer = setInterval(Timer, time_interval);
};

//////////////////////////////////////////////
//////////////////////////////////////////////
function outer_toggle(media_id) {
    let it = loop_list();
    let result = it.next();
    var tf = one_was_checked(media_id);
    if (media_id == "Verse") {
        inner_toggle(groups['verses'][0], tf);
        inner_toggle(groups['verses'][1], tf);
        inner_toggle(groups['verses'][2], tf);
        inner_toggle(groups['verses'][3], tf);
    } else if (media_id == "Chorus") {
        inner_toggle(groups['choruses'][0], tf);
        inner_toggle(groups['choruses'][1], tf);
        inner_toggle(groups['choruses'][2], tf);
        inner_toggle(groups['choruses'][3], tf);
    } else if (media_id == "Bridge") {
        inner_toggle(groups['bridges'][0], tf);
        inner_toggle(groups['bridges'][1], tf);
        inner_toggle(groups['bridges'][2], tf);
        inner_toggle(groups['bridges'][3], tf);
    }

     else if (media_id == "Clean.Rhythm") {
        inner_toggle(groups['crs'][0], tf);
        inner_toggle(groups['crs'][1], tf);
        inner_toggle(groups['crs'][2], tf);
    } else if (media_id == "Clean.Lead") {
        inner_toggle(groups['cls'][0], tf);
        inner_toggle(groups['cls'][1], tf);
        inner_toggle(groups['cls'][2], tf);
    } else if (media_id == "Distorted.Rhythm") {
        inner_toggle(groups['drs'][0], tf);
        inner_toggle(groups['drs'][1], tf);
        inner_toggle(groups['drs'][2], tf);
    } else if (media_id == "Distorted.Lead") {
        inner_toggle(groups['dls'][0], tf);
        inner_toggle(groups['dls'][1], tf);
        inner_toggle(groups['dls'][2], tf);
    }
};

function inner_toggle(media_id, check_or_not="optional") {
    let it = loop_list();
    let result = it.next();
    while (!result.done) {
        if (media_id.includes(result.value.name)) {
            elem = document.getElementById(media_id);
            if (check_or_not != "optional") {
                elem.checked = check_or_not;
            };

            if (media_id.includes("Verse"))  {result.value.v = !elem.checked;} else
            if (media_id.includes("Chorus")) {result.value.c = !elem.checked;} else
            if (media_id.includes("Bridge")) {result.value.b = !elem.checked;};
        };
        result = it.next();
    };
};

function one_was_checked (media_id) {
    result = false;
    for (let elem of checkboxes) {
        if (elem.value.includes(media_id)) {
            if (elem.checked) {
                result = false;
            } else {
                result = true;
                break;  // favor checks over unchecks
            };
        };
    };
    return result;
}
//////////////////////////////////////////////
//////////////////////////////////////////////
var audio_elements = document.getElementsByTagName("audio");
for (let elem of audio_elements) {
    // create & save objects for use later
    temp_obj = new objAud(elem.id);
    if (elem.id == "Clean.Rhythm")     { elem.volume=0.98; } else;
    if (elem.id == "Clean.Lead")       { elem.volume=1.0;  } else;
    if (elem.id == "Distorted.Rhythm") { elem.volume=0.94; } else;
    if (elem.id == "Distorted.Lead")   { elem.volume=0.97; } ;
    objAuds_list.push(temp_obj);
};

var input_elements = document.getElementsByTagName("input");
for (let elem of input_elements) {
    checkboxes.push(elem);
    elem.checked = true;
};

main_button.innerHTML                                           = "<br/>Uncheck<br/>All<br/><p></p>";
document.getElementById("outer_btn_Clean.Rhythm").innerHTML     = "<br/><br/>Clean<br/>Rhythm<br/><br/><p></p>";
document.getElementById("outer_btn_Clean.Lead").innerHTML       = "<br/><br/>Clean<br/>Lead<br/><br/><p></p>";
document.getElementById("outer_btn_Distorted.Rhythm").innerHTML = "<br/><br/>Distorted<br/>Rhythm<br/><br/><p></p>";
document.getElementById("outer_btn_Distorted.Lead").innerHTML   = "<br/><br/>Distorted<br/>Lead<br/><br/><p></p>";
