const isUrlMatch = (requestUrl: string, routeUrl: string) => {
  const requestUrlSegments = requestUrl.split('/');
  const routeUrlSegments = routeUrl.split('/');

  const isMatch = requestUrlSegments.length === routeUrlSegments.length
    && requestUrl.startsWith(routeUrl);

  return isMatch;
};

export default isUrlMatch;
