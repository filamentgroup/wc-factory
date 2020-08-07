// // a couple example classes
function log(text){
  document.querySelector("#log").innerHTML += '<p>' + text + '</p>';
}
document.addEventListener("create.one",function(e){
  log(e.type + " event fired on " + e.target.nodeName );
})
document.addEventListener("destroy.one",function(e){
  log(e.type + " event fired on " + e.target.nodeName );
})
export class one {
  create(){
    log("create one")   
  }
  destroy(){
    log("destroy one") 
  }
}