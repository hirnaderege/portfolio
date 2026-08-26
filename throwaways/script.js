/* .js files add interaction to your website */

// var displayName = document.getElementById("nameField");
// var button = document.getElementById("nameButton");

// button.addEventListener("click", displaynameField);

// function displaynameField() {
//   var text = document.getElementById("nameField").value;
//   displayName.innerHTML = "I, "text + ", swear that I will support the save the bees cause!"
// }




/*
KEY FEATURE: Personalize it
https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null
*/

var displayScript = document.getElementById("scriptReturned");
var scriptBtn = document.getElementById("scriptBtn");

//Will need to explain that sometimes the DOM doesn't load all the way, so the browser can't find the element for JavaScript to use

if (scriptBtn) {
  scriptBtn.addEventListener("click", generateScript);
}

/*
REFACTOR ITEM 2: 
Create a separate function for displaying the script.
Be sure to update function names.
*/

function generateScript() {
  //This variable must be in the function or it will not work
  var principal = document.getElementById("principal").value;
  var name = document.getElementById("name").value;
  var school = document.getElementById("school").value;


  displayScript.innerHTML = "I, " + principal + ", live in " + name + " and want to help make a difference. I will do everything in my power to help those around me to understand mental illness and how to approach the topic!";
}

var factList = [
"All sign language is the same around the world",
"All Deaf people are the same",
"Deaf people cannot drive",
"Hearing aids completely restore hearing loss",
"All Deaf people can lip-read",
" The Deaf can’t listen to music",
"Hearing loss only occurs in old people",
"Deafness is genetic",
"Deaf people are not as intelligent as people who can hear",
"Talking louder or shouting at people with hearing loss helps them understand you better"
];

var fact = document.getElementById("fact");
var myButton = document.getElementById("myButton");
var count = 0;

myButton/addEventListener("click", displayFact);

function displayFact() {
  fact.innerHTML = factList[count];
  count++;
  if(count == factList.length){
    count = 0;
  }
}