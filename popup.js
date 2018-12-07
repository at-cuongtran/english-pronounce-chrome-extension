//@ts-check
'use strict';

var btn = {
  howjsay: document.getElementById('js-howjsay'),
  oxus: document.getElementById('js-ox-us'),
  oxuk: document.getElementById('js-ox-uk'),
};

var dictionary = {
  word: document.getElementById('word'),
  phonetic: document.getElementById('phonetic'),
}

var selection;

function getDictionary(word) {
  return fetch(END_POINT.dictionary + word).then(v => v.json());
}

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
  }, function(s) {
    selection = s;
    dictionary.word.innerHTML = selection;
    getDictionary(selection)
      .then(v => {
        dictionary.phonetic.innerHTML = v.phonetic || '/?/';
      })
  });
});

btn.howjsay.addEventListener('click', function() {
  console.log('howjsay clicked', selection || 'no selection');
  new Audio(audioURL(END_POINT, selection[0].trim().toLowerCase(), ACCENT.howjsay)).play();
});
btn.oxuk.addEventListener('click', function() {
  console.log('oxuk clicked', selection || 'no selection');
  new Audio(audioURL(END_POINT, selection[0].trim().toLowerCase(), ACCENT.ox_uk)).play();
});
btn.oxus.addEventListener('click', function() {
  console.log('oxus clicked', selection || 'no selection');
  new Audio(audioURL(END_POINT, selection[0].trim().toLowerCase(), ACCENT.ox_us)).play();
});
