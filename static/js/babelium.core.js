//dynamically load video data and subtitle with previous check

var key = "1234";
var secret = "abcd";
var host = "http://babelium-server-dev.irontec.com/api/v3";

window.onload = function() {
    if(window.jQuery === undefined || $ === undefined){
        var script = document.createElement('script');
        document.head.appendChild(script);
        script.type = 'text/javascript';
        script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js";
        script.onload = start;
    }
    else{
        start();
    }
};

function start(){
    var subtitleId = exsubs[0].subtitleId;
    loadSubtitles(subtitleId);
    loadVideo(exinfo.id, subtitleId);
    loadExerciseDescription(exinfo.description);
}

function loadSubtitles(id){
    var onSuccess = function(response){
        console.log("Success: "+response);
    };
    var onError = function(response){
        console.log("Error: "+response);
    };
    rpc("GET", getSubtitlesURL(id), onSuccess, onError);
}

function loadVideo(videoId, subtitleId) {
    var videoStr = "\
    <video style='width:100%' poster='"+getPosterUrl(videoId)+"' controls crossorigin='anonymous'>\
        <source src='"+getMP4video(videoId)+"' type='video/mp4'>\
        <source src='"+getWEBMvideo(videoId)+"' type='video/webm'>\
        <track kind='captions' label='"+getSubtitlesLangCaption(subtitleId)+"' src='"+getSubtitlesURL(subtitleId)+"' srclang='"+getSubtitlesLang(subtitleId)+"' default>\
    </video>";
    //append video element to div
    $('.videocontent').html(videoStr);
}

function loadExerciseDescription(description) {
    $('.exdescription').text(description);
}

function rpc(method, url, onSuccess, onError){
    // Request with custom header
    jQuery.ajax(
        {
            url: url,
            headers:
            {
                'access-key': key,
                'secret': secret
            },
            success: function(xhr, ajaxOptions, thrownError){
                if(onSuccess !== undefined){
                    onSuccess(xhr.responseText);
                }
            },
            error: function(xhr, ajaxOptions, thrownError){
                if(onError !== undefined){
                    onError(xhr.responseText);
                }
            }
        }
    );
}


function getSubtitlesURL(subtitleId){
    return host+"/sub-titles/"+subtitleId+".vtt";
}

function getSubtitlesLang(subtitleId) {
    return "en";
}

function getSubtitlesLangCaption(subtitleId) {
    return "English captions";
}

function getPosterUrl(videoId) {
    return "//babelium-static.irontec.com/_temp/poster.jpg";
}

function getMP4video(videoId) {
    return "//babelium-static.irontec.com/_temp/video.mp4";
}

function getWEBMvideo(videoId) {
    return "//babelium-static.irontec.com/_temp/video.webm";
}