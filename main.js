var prediction_1 = "";
prediction_2 = "";

Webcam.set({
height : 300,
width :350,
image_format : 'png',
png_quality : 100
});

Webcam.attach("#camera");
camera = document.getElementById("camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML ="<img id='captured_image' src='"+ data_uri+"'/>";
    });
}

console.log('ml5 version: ',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/u3DmD4Trq/model.json',modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "the first prdiction is"+ prediction_1;
    speak_data_2 = "the second prdiction is"+ prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        document.getElementById("result_prediction1").innerHTML = results[0].label;
        document.getElementById("result_prediction2").innerHTML = results[1].label;

        if(results[0].label == "ok"){
            document.getElementById("result_emoji1").innerHTML = "&#128077;";
        }
        if(results[0].label == "superb"){
            document.getElementById("result_emoji1").innerHTML = "&#128076;";
        }
        if(results[0].label == "peace"){
            document.getElementById("result_emoji1").innerHTML = "&#9996;";
        }
        
        if(results[1].label == "ok"){
            document.getElementById("result_emoji2").innerHTML = "&#128077;";
        }
        if(results[1].label == "superb"){
            document.getElementById("result_emoji2").innerHTML = "&#128076;";
        }
        if(results[1].label == "peace"){
            document.getElementById("result_emoji2").innerHTML = "&#9996;";
        }
    }
}