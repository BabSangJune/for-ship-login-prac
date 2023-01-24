import iconPhone from "../asset/icon/icon_phone_white.png";
import iconMail from "../asset/icon/icon_mail_white.png";

export const setContact = (inputWrapper) => {
  const contactWrapper = document.createElement('div')
  const contactTitle = document.createElement('p')
  const contactDigit = document.createElement('p')
  const phoneNum = document.createElement('span')
  const mailAddress = document.createElement('span')
  const contactIconPhone = document.createElement('img')
  const contactIconMail = document.createElement('img')
  contactIconPhone.setAttribute('src', iconPhone)
  contactIconMail.setAttribute('src', iconMail)
  contactIconPhone.setAttribute('class', 'contact-icon__phone')
  contactIconMail.setAttribute('class', 'contact-icon__mail')
  contactWrapper.setAttribute('class', 'contact-wrapper')
  contactTitle.setAttribute('class', 'contact-title')
  contactDigit.setAttribute('class', 'contact-digit')
  contactTitle.textContent = 'Contact our support team'
  phoneNum.textContent = '070-4196-8907'
  mailAddress.textContent = 'service@lab021.co.kr'
  contactDigit.insertAdjacentElement('beforeend', contactIconPhone)
  contactDigit.insertAdjacentElement('beforeend', phoneNum)
  contactDigit.insertAdjacentElement('beforeend', contactIconMail)
  contactDigit.insertAdjacentElement('beforeend', mailAddress)
  inputWrapper.appendChild(contactWrapper)
  contactWrapper.appendChild(contactTitle)
  contactWrapper.appendChild(contactDigit)
}

export const setLoadingBar = (InputWrapper, loadingPercentNum, loadingPercent) => {
  const loadingTitle = document.createElement('span')
  const loadingValue = document.createElement('span')
  const loadingBar = document.createElement('progress')
  loadingTitle.setAttribute('class', 'loading-title')
  loadingValue.setAttribute('class', 'loading-value')
  loadingBar.setAttribute('class', 'loading-bar')
  loadingBar.setAttribute('max', '100')
  loadingBar.setAttribute('min', '0')
  loadingBar.setAttribute('value', `${ loadingPercentNum }`)
  loadingTitle.textContent = 'Loading...'
  loadingValue.textContent = loadingPercent
  InputWrapper.appendChild(loadingTitle)
  InputWrapper.appendChild(loadingValue)
  InputWrapper.appendChild(loadingBar)

  return { loadingValue, loadingBar }
}
