var cookieTotal = 0;
var cookiesPerMiliSecond = 0;
var cookiesPerClick = 1;
var componentStats = [
  {
    name: 'cursor',
    cost: 10,
    number: 0,
    cpms: 0.0001,
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
  componentStats[0].number++;
  updateLabel($('#numCursors'), componentStats[0].number);
  updateCPMS();
  console.log(cookiesPerMiliSecond);
}

function updateCPMS(){
  cookiesPerMiliSecond = 0;
  for(var i = 0; i < componentStats.length; i++){
    var thisCPMS = componentStats[i].number * componentStats[i].cpms;
    cookiesPerMiliSecond += thisCPMS;
  }
  updateLabel(rateLabel, cookiesPerMiliSecond * 1000);
}

;(function(){
  function main(){
    window.requestAnimationFrame(main);

    cookieTotal += cookiesPerMiliSecond;
    updateLabel(bankLabel, cookieTotal);
  }

  main();
})();
