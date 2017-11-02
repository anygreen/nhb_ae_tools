jasvar filePath = app.project.file.toString();
var cmd = 'osascript -e \'tell\ application\ "Terminal"\ to\ do\ script\ [\"time\ command\ /Applications/Adobe\\\\ After\\\\ Effects\\\\ CC\\\\ 2018/aerender\ -project '+filePath+'\"]\'';
system.callSystem(cmd);
alert("File sent!\nThe current file has been sent to aerender and will now render all active items of your render queue.\nFor more information, check the logs of the Terminal window.");
