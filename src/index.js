import './style.css'
import './reset.css'
import { getCookie, setCookie } from "./module/cookie";

console.log('index.js')

/**
 * Check if there is a configuration file
 * @param infoMessageValue {Object} - Object with information login the configuration file
 * @returns {Promise<void>}
 */
// const infoMessage = document.querySelector('.info-message');
const checkConfigFile = async () => {
  const infoMessage = document.querySelector('.info-message');

  const infoMessageValue = {
    init: `<div class="info-value"><p>Validate the data in the database</p></div>`,
    checkRules: `<div class="info-value"><p>The configuration file does not exist</p><p>Try to download rules file</p></div>`,
    checkEventConfig: `<div class="info-value"><p>The configuration file does not exist</p><p>Try to download Event Config file</p></div>`,
    check: `<div class="info-value"><p>Check if there is a configuration file</p></div>`,
  }

  for (let info in infoMessageValue) {
    if (info === 'init') {
      console.log('init')
      infoMessage.insertAdjacentHTML('beforeend', infoMessageValue[info]);
      continue;
    }
    const cookieCheck = getCookie('fileToken');

    if (cookieCheck) {
      location.href = 'login/login.html';
      return;
    }

    await changeInfoMessage(info, infoMessage, infoMessageValue);
  }
}

/**
 * Change the information message
 * @param info {string} - Information message
 * @param infoMessage {HTMLElement} - Information message element
 * @param infoMessageValue {Object} - Object with information login the configuration file
 * @returns {Promise<void>}
 */
const changeInfoMessage = async (info, infoMessage, infoMessageValue) => {
  await new Promise(resolve => {
    setTimeout(() => {
      const infoValue = document.querySelector('.info-value');
      if (infoValue) {
        infoValue.remove()
      }
      infoMessage.insertAdjacentHTML('beforeend', infoMessageValue[info]);
      resolve();
    }, 1500);

    if (info === 'check') {
      setCookie('fileToken', true);
      setTimeout(() => {
        location.href = 'login/login.html';
      }, 2000);
    }
  })
}

checkConfigFile();
