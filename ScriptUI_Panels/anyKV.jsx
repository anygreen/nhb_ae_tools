app.beginUndoGroup("change Keyframe Velocity");

try{

  var proj = app.project;
  var activeItem = proj.activeItem;
  var selectedLayers = activeItem.selectedLayers;
  var selectedProps = activeItem.selectedProperties;

  function setKeyInfluences(influenceIn,influenceOut){
    if(influenceOut == ""){
      writeLn("same");
      influenceOut = influenceIn;
    };
    //looping through all selected properties (including groups)
    for (var i = 0; i < selectedProps.length; i++) {
      var currentProp = selectedProps[i]; //defining currently selected property
      if(currentProp.numKeys!=undefined){ //checking if property has keyframes do see if its a group
        //looping through all the selected keys of current property
        for (var a = 0; a < currentProp.selectedKeys.length; a++) {
          var keyIndex = currentProp.selectedKeys[a];
          currentProp.setInterpolationTypeAtKey(keyIndex, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
          var easeIn = new KeyframeEase(0, influenceIn);
          var easeOut = new KeyframeEase(0, influenceOut);
          //checking length of array of property and setting easing accordingly
          if (currentProp.keyInTemporalEase(keyIndex).length == 1) {
            currentProp.setTemporalEaseAtKey(keyIndex, [easeIn], [easeOut]);
          }
          if (currentProp.keyInTemporalEase(keyIndex).length == 2) {
            currentProp.setTemporalEaseAtKey(keyIndex, [easeIn,easeIn], [easeOut,easeOut]);
          }
          if (currentProp.keyInTemporalEase(keyIndex).length== 3) {
            currentProp.setTemporalEaseAtKey(keyIndex, [easeIn,easeIn,easeIn], [easeOut,easeOut,easeOut]);
          }
        }
      }
    }
    //showing successful easing in info panel
    clearOutput();
    writeLn("Easing set to "+influenceIn+"/"+influenceOut);
  }

  var myWin = new Window("palette", "anyKV", undefined);
      myWin.orientation = "row";

  var mainGroup = myWin.add("group", undefined, "MainGroup");
    mainGroup.orientation = "column";
    // mainGroup.add("statictext", undefined, "----------------------------");
    mainGroup.add("statictext", undefined, "anyKeyframeVelocity v0.1");
    // mainGroup.add("statictext", undefined, "----------------------------");

    mainGroup.add("statictext", undefined, "EaseIn:");
    var definedInfluenceIn = mainGroup.add("edittext", [0,0,40,25], "50");
    mainGroup.add("statictext", undefined, "EaseOut:");
    var definedInfluenceOut = mainGroup.add("edittext", [0,0,40,25], "");
    var myButton = mainGroup.add("button", undefined, "Apply");



  myWin.center();
  myWin.show();

  function myApply(e){
    if (e.keyName == "Enter") {
      setKeyInfluences(definedInfluenceIn.text,definedInfluenceOut.text);
      myWin.close();
    }
  };

  myButton.onClick = function () {
    setKeyInfluences(definedInfluenceIn.text,definedInfluenceOut.text);
    myWin.close();
  };

  myWin.addEventListener ("keydown", function (e){myApply(e)});
  alert(app.activeViewer.type);





} catch(err) {
  alert("Error in line: " + err.line + "\n" + err.toString());
}
app.endUndoGroup();
