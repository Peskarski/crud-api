const isUrlMatch = (requestUrl: string, routeUrl: string) => {
  const requestUrlSegments = requestUrl.split('/');
  const routeUrlSegments = routeUrl.split('/');

  let isMatch = false;

  if (requestUrlSegments.length === 4) {
    isMatch = requestUrlSegments.length === routeUrlSegments.length
    && requestUrl.startsWith(routeUrl);
  } else {
    isMatch = requestUrl === routeUrl;
  }

  return isMatch;
};

export default isUrlMatch;
