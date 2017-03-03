
var getDepPC;
var getArrPC;

var myList;
var journeyDuration;
var hours;
var minutes;
var choiceOption; //this is to use for my choice option

/*var submit = document.getElementById("mySubmit");
submit.addEventListener("click", submitButton, false);

var switch1 = document.getElementById("mySwitch");
switch1.addEventListener("click", switchButton, false);*/


document.getElementById("depPC").focus();


document.getElementById("googleMap").style.display = "none";


//event listeners

var getJourneyData = document.getElementById("mySubmit").addEventListener("click", loadMyData, false);

var postCodeSwitch = document.getElementById("mySwitch").addEventListener("click", switchMyPostCode, false);

var routeOption1 = document.getElementById("option1").addEventListener("click", loadMyData, false);

var routeOption2 = document.getElementById("option2").addEventListener("click", option2Data, false);

var routeOption3 = document.getElementById("option3").addEventListener("click", option3Data, false);










function loadMyData(){
    //I will go and get the values of the postcodes from the users
    
    getDepPC = document.getElementById("depPC").value;
    getArrPC = document.getElementById("arrPC").value;

    
    if(getDepPC === ""){
        
        document.getElementById("depPC").focus();
        document.getElementById("messageD").innerHTML ="please enter a valid postcode";
        
        
    } else if(getArrPC === "")
        {
            
            document.getElementById("arrPC").focus();
            document.getElementById("messageD").innerHTML = "please enter a valid postcode";
            
            
        } else {
        
        //calling Ajax
        
        document.getElementById("messageA").style.display = "none";
        
        document.getElementById("messageD").style.display = "none";
        
        var myRequest = new XMLHttpRequest;
        myRequest.open("GET", "https://api.tfl.gov.uk/journey/journeyresults/"+getDepPC+"/to/"+getArrPC ,true);
        
        myRequest.onload= function(){
            
            if(myRequest.readyState ==4 && myRequest.status==200){
                
                var myData = JSON.parse(myRequest.responseText);
                
               
                myList = document.getElementById("stepsD");
                myList.innerHTML = "";
                
                
                switch(choiceOption){
                        
                        case(1):
                                        
                        //js notation to get the data
                        
                        document.getElementById("startDT").innerHTML = "Date: " + myData.journeys[1].startDateTime.replace("T", "| Time: ");
                        
                        document.getElementById("arrivalDT").innerHTML = "Date: " + myData.journeys[1].arrivalDateTime.replace("T", "| Time: ");
                       
                        journeyDuration = myData.journeys[1].duration;
                        
                        journeyD(journeyDuration);
                        
                        for(var i = 0; i< myData.journeys[1].legs.length; i++){
                            
                            myList.innerHTML += "- " +
                                myData.journeys[1].legs[i].instruction.summary + "<br />";
                            
                            
                        }
                        
                        choiceOption = 0;
                        
                        break;
                        
                        
                        case(2):
                        
                        
                            
                        document.getElementById("startDT").innerHTML = "Date: " + myData.journeys[2].startDateTime.replace("T", "| Time: ");
                        
                        document.getElementById("arrivalDT").innerHTML = "Date: " + myData.journeys[2].arrivalDateTime.replace("T", "| Time: ");
                       
                        journeyDuration = myData.journeys[2].duration;
                        
                        journeyD(journeyDuration);
                        
                        for(var i = 0; i< myData.journeys[2].legs.length; i++){
                            
                            myList.innerHTML += "- " +
                                myData.journeys[2].legs[i].instruction.summary + "<br />";
                            
                            
                        }
                        
                        choiceOption = 0;
                        break;
                        
                        
                        default:
                        
                            
                        document.getElementById("startDT").innerHTML = "Date: " + myData.journeys[0].startDateTime.replace("T", "| Time: ");
                        
                        document.getElementById("arrivalDT").innerHTML = "Date: " + myData.journeys[0].arrivalDateTime.replace("T", "| Time: ");
                       
                        journeyDuration = myData.journeys[0].duration;
                        
                        journeyD(journeyDuration);
                        
                       for(var i = 0; i< myData.journeys[0].legs.length; i++){
                            
                            myList.innerHTML += "- " +
                                myData.journeys[0].legs[i].instruction.summary + "<br />";
                            
                            
                        }
                        
                        //choiceOption = 0;
                        
                        break;
                        
                         //console.log(myData);
                        
                }
                
                document.getElementById("googleMap").style.display = "block";
            
                    document.getElementById("myGoogleMap").setAttribute("src", "https://www.google.com/maps/embed/v1/directions?key=AIzaSyDqwEMrYspWHOIjkw2EIX9vGwpb8IsL_o8&origin="+getDepPC+"&destination="+getArrPC+"&mode=driving");
                
            }
        }
        
        myRequest.send();
    }
    
}


//This is my Switch function to change postcodes

function switchMyPostCode(){
    getDepPC = document.getElementById("depPC").value;
    getArrPC = document.getElementById("arrPC").value;
    
    
    document.getElementById("depPC").value = getArrPC;
    document.getElementById("arrPC").value = getDepPC;
}


function option2Data(){
    
    choiceOption = 1;
    loadMyData();
}



function option3Data(){
    
    choiceOption = 2;
    loadMyData();
}


function journeyD(journeyDuration){
    
    hours = Math.trunc(journeyDuration/60);
    minutes = journeyDuration % 60;
    document.getElementById("journeyD").innerHTML = + hours + ":" + minutes + ":" + " h/ m";
}
//switchMyPostCode();

/*var getData = document. getElementById("depPC");
getData.addEventListener("click", inputData, false);

var getData1 = document. getElementById("arrPC");
getData1.addEventListener("click", inputData, false);

function inputData(){
    
    if(getData === "" || getData1 === "")
        {
            
            document.getElementById("messageA").innerHTML = "enter value";
        }
}*/


























