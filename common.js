//@ts-check
'use strict';

var END_POINT = {
  howjsay: 'https://howjsay.com/mp3/',
  oxford_us: 'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/',
  oxford_uk: 'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/',
  dictionary: 'https://googledictionaryapi.eu-gb.mybluemix.net/?define='
}

var ACCENT = {
  howjsay: 'howjsay',
  ox_us: 'ox_us',
  ox_uk: 'ox_uk'
}

/**
 * Commands should match those in manifest file
 */
var COMMAND = {
  speakhowjsay: 'speak-howjsay',
  speakOX_US: 'speak-ox_us',
  speakOX_UK: 'speak-ox_uk',
  execute_browser_action: '_execute_browser_action'
}

/**
 * Examples:
 * 
 * i/i_1/i_1_g/i_1_gb_1_abbr.mp3 
 * b/be_/be__u/be__us_1.mp3
 * l/low/low__/low__us_1.mp3
 * d/don/done_/done__us_1.mp3
 * g/gre/great/great__gb_1.mp3
 * w/wri/write/writer__gb_1.mp3
 * a/awe/aweso/awesome__gb_1.mp3
 * w/wor/wordl/wordless__gb_1.mp3
 * p/pro/pronu/pronunciation__gb_1.mp3
 * i/ins/insta/instantaneously__gb_1.mp3
 * 
 * @param {*} word 
 * @param {*} accent 
 */
function OxfordURLSegments(word, accent) {
  var acc = accent === ACCENT.ox_uk
    ? 'gb'
    : accent === ACCENT.ox_us
      ? 'us'
      : '';
  if (!acc || !word || word.length <= 1) {
    return;
  }

  var w = word.split(' ').join('_');

  if (w.length === 2) {
    return w.substring(0,1) + '/' + w + '_/' + w + '__' + acc[0] + '/' + w + '__' + acc + '_' + 1 + '.mp3';
  } else if (w.length === 3) {
    return w.substring(0,1) + '/' + w + '/' + w + '__/' + w + '__' + acc + '_' + 1 + '.mp3';
  } else if (w.length === 4) {
    return w.substring(0,1) + '/' + w.substring(0,3) + '/' + w + '_/' + w + '__' + acc + '_' + 1 + '.mp3';
  } else {
    return w.substring(0,1) + '/' + w.substring(0,3) + '/' + w.substring(0,5) + '/' + w + '__' + acc + '_' + 1 + '.mp3';
  }
}

/**
 * return Audio url of a word with specified accent
 */
function audioURL(endPoint, word, accent) {
  switch (accent) {
    case ACCENT.howjsay:
      return endPoint.howjsay + word + '.mp3';
    case ACCENT.ox_us:
      return endPoint.oxford_us + OxfordURLSegments(word, accent);
    case ACCENT.ox_uk:
      return endPoint.oxford_uk + OxfordURLSegments(word, accent);
  }
}

function handleCommand(command, selection) {
  if (!command) {
    return;
  }

  if (command === COMMAND.execute_browser_action) {
    
    // Handle popup... Maybe not???

    return;
  }

  if (!selection || selection.length === 0) {
    return;
  }



  switch(command) {
    case COMMAND.speakhowjsay:
      new Audio(audioURL(END_POINT, selection, ACCENT.howjsay)).play();
      break;
    case COMMAND.speakOX_UK:
      new Audio(audioURL(END_POINT, selection, ACCENT.ox_uk)).play();
      break;
    case COMMAND.speakOX_US:
      new Audio(audioURL(END_POINT, selection, ACCENT.ox_us)).play();
      break;
  }
}