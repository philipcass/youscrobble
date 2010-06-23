/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
var regex = /.+ - .+\n(?=.+Subscribe)/;

// Test the text of the body element against our regular expression.
if (regex.test(document.body.innerText)) {
   window.onbeforeunload = confirmScrobble;

  // The regular expression produced a match, so notify the background page.
  var songTitle = document.body.innerText.match(regex);
  chrome.extension.sendRequest({songCallback: songTitle[0]}, function(response) {
	  console.log(response.songCallback);
  });
} else {
  // No match was found.
}
var player = getId("movie_player",document);

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {

	if (request.arg == "runtime"){
		//Yes I know, dirty hack
			var returnVar = (player.getDuration());
	}
	if (request.arg == "CurrentTime")
		var returnVar = player.getCurrentTime();
	
	sendResponse({result:returnVar});
  });

  function confirmScrobble()
  {
	  chrome.extension.sendRequest({pageMove: true, runtime : player.getDuration(), currentTime : player.getCurrentTime()}, function(response) {
		  console.log(response.songCallback);
	  });

  }
function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}