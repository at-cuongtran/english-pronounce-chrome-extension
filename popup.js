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

var popup = document.getElementById('popup');
var error = document.getElementById('error');
var selection;

function getDictionary(word) {
  console.log('dict url: ', END_POINT.dictionary + (word && word.trim().split(' ').join('-')));
  return fetch(END_POINT.dictionary + (word && word.trim().split(' ').join('-'))).then(v => v.json());
}

function renderDefinitions(dict) {
  
}

function handleSelection(word) {
  if (!word) {
    popup.innerHTML = '<h4>Please select a word and try again!</h4>';
    return;
  }
  selection = word;
  dictionary.word.innerHTML = selection;
  getDictionary(selection)
    .then(v => {
      console.log('result ', v);
      var phonetics;
      if (v instanceof Array) {
        phonetics = v[0].phonetics;
      } else {
        phonetics = v.phonetics;
      }
      dictionary.phonetic.innerHTML = phonetics.length && phonetics[0].text || '/ ? /';
    })
    .catch(e => {
      dictionary.phonetic.innerHTML = '';
      error.innerHTML = 'No exact match found for ' + selection;
      console.log(e);
    })
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
    handleSelection(s && s[0]);
  });
});

btn.howjsay.addEventListener('click', function() {
  new Audio(audioURL(END_POINT, selection && selection.trim().toLowerCase(), ACCENT.howjsay)).play();
});
btn.oxuk.addEventListener('click', function() {
  new Audio(audioURL(END_POINT, selection && selection.trim().toLowerCase(), ACCENT.ox_uk)).play();
});
btn.oxus.addEventListener('click', function() {
  new Audio(audioURL(END_POINT, selection && selection.trim().toLowerCase(), ACCENT.ox_us)).play();
});
