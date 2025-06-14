type TCookieKeys = "accessToken" | "refreshToken";

export const setCookie = (
  key: TCookieKeys,
  value: string,
  expirationDays: number
) => {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000); // установка срока действия в днях
  const expires = "expires=" + date.toUTCString();
  document.cookie = key + "=" + value + ";" + expires + ";path=/"; // запись значения в Cookie
};

export const getCookie = (key: TCookieKeys): string => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(key + "=") == 0) {
      return cookie.substring(key.length + 1, cookie.length);
    }
  }
  return "";
};
