import { IncomingMessage } from 'http';

const resolveBody = async (request: IncomingMessage) => {
  const buffers = [];

  /* eslint-disable no-restricted-syntax */
  for await (const chunk of request) {
    buffers.push(chunk);
  }

  const rawBody = Buffer.concat(buffers);

  if (rawBody.length === 0) {
    return undefined;
  }

  const body = JSON.parse(rawBody.toString());

  return body;
};

export default resolveBody;
