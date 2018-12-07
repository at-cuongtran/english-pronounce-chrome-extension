// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//@ts-check
'use strict';

chrome.commands.onCommand.addListener(function(command) {
  console.log('Commandasdas:', command);
  chrome.tabs.query({
    currentWindow: true, //Filters tabs in current window
    status: "complete", //The Page is completely loaded
    active: true, // The tab or web page is browsed at this state,
    windowType: "normal"
  }, function(tabs) {
    if (!tabs || tabs.length === 0) {
      return;
    }
    chrome.tabs.executeScript(
      tabs[0].id,
    {
      code: 'window.getSelection().toString();'
    }, function(selection) {
      handleCommand(command, selection[0].trim().toLowerCase());
    });
  });
  
});
