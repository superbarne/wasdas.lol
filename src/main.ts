import { Html5QrcodeResult } from 'html5-qrcode/esm/core';
import './style.css'

import { Html5QrcodeScanner } from "html5-qrcode";
import minifiguren from './minifiguren.json'

var resultContainer = document.getElementById('qr-reader-results');
let lastResult: string = ''
let modalShown = false
console.log(minifiguren)
async function onScanSuccess(decodedText: string, _decodedResult: Html5QrcodeResult) {
  if(decodedText !== lastResult && !modalShown) {
    const code = decodedText.split(' ')[0].trim()
    const minifigur = minifiguren.find((minifigur) => minifigur.s.toString() === code || minifigur.r.toString() === code)
    if(minifigur) {
      const img = resultContainer?.getElementsByTagName('img')[0]
      const text = resultContainer?.getElementsByTagName('div')[0]
      if(text) text.innerText = minifigur.title
      const image = await import(`./figures/${minifigur.file}.png`)
      if(img) img.src = image.default
      resultContainer?.style.setProperty('display', 'block')
      modalShown = true
    }
  }
  lastResult = decodedText
}

function onError(errorMessage: string) {
  // Handle on error condition, with error.message.
  console.error(`Error scanning QR code: ${errorMessage}`);
}

var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250, rememberLastUsedCamera: true, supportedScanTypes: [0] }, false);
html5QrcodeScanner.render(onScanSuccess, onError);