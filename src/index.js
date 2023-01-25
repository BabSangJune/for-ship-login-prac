import './style.css'
import './reset.css'
import entErrImg from './asset/icon/no_network_icon.png'
import { getCookie, setCookie } from "./module/cookie";

console.log('index.js')

/**
 * 브라우저 실행 시 Config File Check
 */
window.onload = () => {
    console.log('errorFlag', errorFlag)
    checkConfigFile();
}

/**
 * Error Flag
 * @type {boolean}
 */
let errorFlag = false;

const errorBtn = document.querySelector('.error-btn')
errorBtn.addEventListener('click', (event) => {
    getError()
})


/**
 * config file을 체크하고 file token이 있으면 로그인 페이지로 이동
 * @returns {Promise<void>}
 */
const checkConfigFile = async () => {
    const errorWrapper = document.querySelector('.error-wrapper')
    const indexWrapper = document.querySelector('.index-wrapper')
    const infoMessage = document.querySelector('.info-message');
    const infoValue = document.querySelector('.info-value');
    const infoMessageValue = {
        init: `<div class="info-value"><p>Validate the data in the database</p></div>`,
        checkRules: `<div class="info-value"><p>The configuration file does not exist</p><p>Try to download rules file</p></div>`,
        checkEventConfig: `<div class="info-value"><p>The configuration file does not exist</p><p>Try to download Event Config file</p></div>`,
        check: `<div class="info-value"><p>Check if there is a configuration file</p></div>`,
    }
    
    if (errorFlag) {
        errorFlag = false;
        errorWrapper.style.display = 'none'
        indexWrapper.style.display = 'flex'
    }
    
    for (let info in infoMessageValue) {
        if (infoValue) {
            infoValue.remove()
        }
        
        if (info === 'init') {
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
 * information message 변경 error flag가 true면 return
 * @param info {string} - Information message
 * @param infoMessage {HTMLElement} - Information message element
 * @param infoMessageValue {Object} - Object with information login the configuration file
 * @returns {Promise<void>}
 */
const changeInfoMessage = async (info, infoMessage, infoMessageValue) => {
    if (errorFlag) {
        return
    }
    await new Promise(resolve => {
        setTimeout(() => {
            const infoValue = document.querySelector('.info-value');
            if (infoValue) {
                infoValue.remove()
            }
            infoMessage.insertAdjacentHTML('beforeend', infoMessageValue[info]);
            resolve();
        }, 1500);
    }).then(() => {
        if (info === 'check') {
            setCookie('fileToken', true);
            setTimeout(() => {
                location.href = 'login/login.html';
            }, 2000);
        }
    }).catch(err => getError())
}

/**
 * 로딩바 숨기고 에러메세지 출력
 * 버튼 클릭 시 checkConfigFile() 실행
 */
const getError = () => {
    errorFlag = true;
    const indexWrapper = document.querySelector('.index-wrapper')
    const errorWrapper = document.querySelector('.error-wrapper')
    const errorImg = document.querySelector('.error-img')
    const retryBtn = document.querySelector('.retry-btn')
    errorImg.src = entErrImg
    indexWrapper.style.display = 'none'
    errorWrapper.style.display = 'flex'
    
    retryBtn.addEventListener('click', (event) => {
        event.preventDefault()
        console.log('retryBtn')
        checkConfigFile();
    })
}


