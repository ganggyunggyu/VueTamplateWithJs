const IOS_CHROME_MARKET_URL = 'https://apps.apple.com/app/id535886823';

export const changeBrowser = () => {
  let targetUrl =
    window.location.host + window.location.pathname + window.location.hash;

  if (navigator.userAgent.match(/iPhone|iPad/i)) {
    // iOS
    const visitedAt = new Date().getTime();
    setTimeout(() => {
      if (new Date().getTime() - visitedAt < 2000) {
        location.href = IOS_CHROME_MARKET_URL;
      }
    }, 500); // 1.5초 후에도 크롬이 실행되지 않았다면 App Store로 리디렉션

    setTimeout(() => {
      location.href = 'googlechromes://' + targetUrl;
    }, 0);
  } else {
    location.href =
      'intent://' +
      targetUrl +
      '#Intent;scheme=https;package=com.android.chrome;end';
  }
};
