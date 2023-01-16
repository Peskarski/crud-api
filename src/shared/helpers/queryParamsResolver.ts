const resolveQueryParams = (url: string) => {
  const segments = url.split('/');
  const id = segments[3];

  return id;
};

export default resolveQueryParams;
