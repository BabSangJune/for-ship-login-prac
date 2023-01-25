import './login.css'
import '../reset.css'
import background from '../asset/callSignBg.png'
import { deleteCookie, getCookie, setCookie } from "../module/cookie";
import * as setLoginAtt from './setLoginAtt'

console.log('Hello ImoLogin')

const confirmVerifyCode = 1234

const loginBackground = document.querySelector('.login-background')
loginBackground.style.backgroundImage = `url(${ background })`

const delFileCookieBtn = document.querySelector('.del-cookie-btn__file')
delFileCookieBtn.addEventListener('click', () => {
    deleteCookie('fileToken')
})

const delCodeCookieBtn = document.querySelector('.del-cookie-btn__code')
delCodeCookieBtn.addEventListener('click', () => {
    deleteCookie('codeToken')
})

/**
 * 브라우저 실행 시 fileToken이 없으면 index.html로 이동
 * 있으면 input setting
 */
window.onload = () => {
    if (!getCookie('fileToken')) {
        location.href = '../index.html'
    }
    setImoInputEvent()
}

/**
 * imo input에 event 세팅
 */
const setImoInputEvent = () => {
    const imoInput = document.querySelectorAll('.imo-input')
    const loginBtn = document.querySelector('.imo-login-btn')
    
    // 두 값이 falsy값이면 btn disabled
    if (!imoInput[0].value || !imoInput[1].value) {
        loginBtn.disabled = true
    }
    
    // 유사배열 array form
    // console.log('imoInput', imoInput)
    // imoInput.map((input) => {
    //     console.log('input', input)
    // })
    
    // 각 input에 이벤트 세팅
    imoInput.forEach((input) => {
        input.addEventListener('input', (event) => {
            const value = event.target.value
            // 디바운스
            if (debouncingInput) clearTimeout(debouncingInput);
            let debouncingInput = setTimeout(() => {
                // input 길이가 0이면 btn disabled
                if (!value.length) {
                    loginBtn.disabled = true
                }
                
                // 두 값이 다르면 btn disabled
                if (imoInput[0].value !== imoInput[1].value) {
                    loginBtn.disabled = true
                }
                
                // 두 값이 같으면 btn enabled
                // if (imoInput[0].value.length === imoInput[1].value.length) {
                if (imoInput[0].value === imoInput[1].value) {
                    loginBtn.disabled = false
                }
            }, 250);
        })
    })
    
    // 로그인 버튼 클릭 시
    loginBtn.addEventListener('click', (event) => {
        // submit 기본 동작 막기
        event.preventDefault()
        // 두값이 다르면 알림
        if (imoInput[0].value !== imoInput[1].value) {
            alert('비밀번호가 일치하지 않습니다.')
            initInput(imoInput)
            imoInput[0].focus()
            return
        }
        
        // 두값이 같고 codeToken이 있으면 로딩화면으로 없으면 code Input
        if (imoInput[0].value === imoInput[1].value) {
            const codeToken = getCookie('codeToken')
            codeToken ? goLoading() : codeTokenFalse()
            initInput(imoInput)
        }
    })
}

/**
 * 로딩 화면으로 이동
 */
const goLoading = () => {
    const InputWrapper = document.querySelector('.input-wrapper')
    
    removeChild(InputWrapper)
    
    InputWrapper.className = `loading-wrapper`
    let loadingPercentNum = 0
    let loadingPercent = `${ loadingPercentNum }%`
    
    const { loadingValue, loadingBar } = setLoginAtt.setLoadingBar(InputWrapper, loadingPercentNum, loadingPercent)
    
    startLoadingInterval(loadingPercentNum, loadingPercent, loadingValue, loadingBar)
    // loadingPercentNum = setInterval(startLoadingInterval, 150, loadingPercentNum, loadingPercent, loadingValue, loadingBar)
}

// const startLoadingInterval = (loadingPercentNum, loadingPercent, loadingValue, loadingBar) => {
//   console.log('startLoadingInterval')
//   loadingPercentNum += 1
//   loadingPercent = `${ loadingPercentNum }%`
//   loadingValue.textContent = loadingPercent
//   loadingBar.setAttribute('value', `${ loadingPercentNum }`)
//   console.log(loadingPercentNum)
//   if (loadingPercentNum === 100) {
//     // location.href = '../main/main.html'
//     alert('loading complete')
//   }
// }

/**
 * dom 자식 삭제 공통
 * @param parent
 */
const removeChild = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

/**
 * input 초기화
 * @param inputs
 */
const initInput = (inputs) => {
    inputs.forEach((input) => {
        input.value = ''
    })
}

/**
 * 로딩 인터벌 시작
 * 100이 되면 메인으로 이동
 * @param loadingPercentNum 로딩 퍼센트 값
 * @param loadingPercent 로딩 퍼센트 문자열
 * @param loadingValue DOM Loading Value
 * @param loadingBar DOM Loading Bar
 */
const startLoadingInterval = (loadingPercentNum, loadingPercent, loadingValue, loadingBar) => {
    const loadingInterval = setInterval(() => {
        loadingPercentNum += 1
        loadingPercent = `${ loadingPercentNum }%`
        loadingValue.textContent = loadingPercent
        loadingBar.setAttribute('value', `${ loadingPercentNum }`)
        if (loadingPercentNum === 100) {
            clearInterval(loadingInterval)
            location.href = '../main/main.html'
        }
    }, 100)
}

/**
 * codeToken이 없을 때
 * code 입력창으로 변경
 */
const codeTokenFalse = () => {
    const inputWrapper = document.querySelector('.input-wrapper')
    const InputForm = document.querySelector('.login-input-wrapper')
    const inputTitle = document.querySelector('.input-title')
    const inputSubTitle = document.querySelector('.input-title__sub')
    
    inputTitle.textContent = 'Please enter the code.'
    inputSubTitle.textContent = 'Please contact the shipping company for confirmation code to register your new machine and enter the code you received.'
    
    // while (InputForm.firstChild) {
    //   InputForm.removeChild(InputForm.firstChild)
    // }
    removeChild(InputForm)
    changeToInputCode(InputForm)
    setLoginAtt.setContact(inputWrapper)
}

/**
 * code 입력창으로 변경
 * @param InputForm
 */
const changeToInputCode = (InputForm) => {
    for (let i = 0; i < 4; i++) {
        const codeInput = document.createElement('input')
        codeInput.setAttribute('class', `code-input code-input-${ i }`)
        codeInput.setAttribute('type', 'text')
        codeInput.setAttribute('maxlength', '1')
        InputForm.appendChild(codeInput)
        // 4개의 input에 이벤트 리스너 추가
        codeInput.addEventListener('keyup', onInputCode)
    }
}

/**
 * code 입력 이벤트
 * @param event
 */
const onInputCode = (event) => {
    const codeInput = document.querySelectorAll('.code-input')
    let verifyCode = ''
    
    // input max 1자리 => 1자리 다차면 다음 input으로 포커스 이동
    if (event.target.value.length === 1 && event.target.nextElementSibling) {
        event.target.nextElementSibling.focus()
    }
    
    // 백스페이스 이전 input으로 포커스 이동
    if (event.keyCode === 8 && event.target.previousElementSibling) {
        event.target.previousElementSibling.focus()
    }
    
    verifyCode = codeInput[0].value + codeInput[1].value + codeInput[2].value + codeInput[3].value
    
    // 코드가 4자리 다 차고 code가 일치하면 codeToken 생성 후 Loading
    if (verifyCode.length === 4) {
        if (verifyCode !== confirmVerifyCode.toString()) {
            initInput(codeInput)
            codeInput[0].focus()
            alert('인증코드가 일치하지 않습니다.')
            return
        }
        
        setCookie('codeToken', true)
        goLoading()
    }
}
