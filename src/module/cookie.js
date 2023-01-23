export const setCookie = (name, value, exp) => {
  var date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

export const getCookie = (cookieName) => {
  const value = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');
  return value ? value[2] : null;
}

export const deleteCookie = (cookieName) => {
  setCookie(cookieName, "", 0 , 0);
}
