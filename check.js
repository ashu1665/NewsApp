var apikey="b4fbd3b67c244934b36a2d47e245074b";
var option=document.getElementById('option').value;

//function to get response and render to screen
async function display(){
var url;
option=document.getElementById('option').value;
if(option.length<2){
url = 'https://newsapi.org/v2/top-headlines?' +
          'sources=abc-news&'+
          'apiKey='+apikey;}
else{
	option=document.getElementById('option').value;
	url = 'https://newsapi.org/v2/top-headlines?' +
          'sources='+option+'&'+
          'apiKey='+apikey;
}
var req = new Request(url);
var res= await fetch(req);
var json= await res.json();
document.getElementById("main").innerHTML=json.articles.map(html).join('\n');
}

//function to manifest html to print
function html(article){
 return `<div class="container">
      <a href="${article.url}">
        <h2>${article.title}</h2>
        <div class="col-sm-4">
        <div class="thumbnail">
        <img  src="${article.urlToImage}"  alt="${article.title}">
        <p><strong>${article.description}</strong></p>
        </div>
        </div>
      </a></div>`
}

//function to get all sources
async function getSources(){
var url = 'https://newsapi.org/v2/sources?apiKey='+apikey;
var req = new Request(url);
var res= await fetch(req);
var json= await res.json();
document.getElementById('option').innerHTML=json.sources.map(updateSelector).join('\n');
}

//function to populate the select bar
function updateSelector(option){
 return `<option value="${option.id}">${option.name}</option>`
}

//function to render to screen on 1st load
window.onload=function(){
	getSources();
    display();

};
