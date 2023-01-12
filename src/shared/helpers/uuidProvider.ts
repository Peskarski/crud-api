import { v4 as uuidv4 } from 'uuid';

const provideUuid = () => {
  const uuid = uuidv4();

  return uuid;
};

export default provideUuid;
