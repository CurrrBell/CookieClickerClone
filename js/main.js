var cookieTotal = 0;
var cookiesPerFrame = 0;
var cookiesPerClick = 1;
var componentStats = [
  {
    name: 'cursor',
    cost: 10,
    number: 0,
    CPS: 0.1 * (1/60),
  }
];
var bankLabel = $('#bank');
var rateLabel = $('#rate');

$(document).ready(function(){
  updateLabel(bankLabel, cookieTotal);
});

function cookieClick(){
  cookieTotal += cookiesPerClick;
  updateLabel(bankLabel, cookieTotal);
}

function updateLabel(label, val){
  if(label == bankLabel){
    val = Math.round(val);
  }
  label.html(val);
}

function addCursor(){
  if(cookieTotal >= componentStats[0].cost){
    componentStats[0].number++;
    updateLabel($('#numCursors'), componentStats[0].number);
    updateCPS();
    cookieTotal -= componentStats[0].cost;
    componentStats[0].cost = Math.round(componentStats[0].cost * 1.1);
    updateLabel($('#cursorCost'), componentStats[0].cost);
  }
}

function updateCPS(){
  cookiesPerFrame = 0;
  for(var i = 0; i < componentStats.length; i++){
    var thisCPF = componentStats[i].number * componentStats[i].CPS;
    cookiesPerFrame += thisCPF;
  }
  updateLabel(rateLabel, cookiesPerFrame * 60);
}

;(function(){
  function main(){
    window.requestAnimationFrame(main);

    cookieTotal += cookiesPerFrame;
    updateLabel(bankLabel, cookieTotal);
  }

  main();
})();
