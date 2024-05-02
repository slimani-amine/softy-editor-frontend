export const parseIframeUrl = (url: string) => {
  if (url.slice(0, 4) !== 'http') {
    const regexMatchSrc = /src=".*?"/;
    const regexGroupQuotes = /"([^"]*)"/;

    const src = url.match(regexMatchSrc)?.[0];
    const returnString = src?.match(regexGroupQuotes)?.[1];

    if (returnString) {
      url = returnString;
    }
  }
  return url;
};
