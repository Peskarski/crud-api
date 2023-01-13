import { v4 as uuidv4, validate } from 'uuid';

const provideUuid = () => {
  const uuid = uuidv4();

  return uuid;
};

export const isUuid = (id: string) => validate(id);

export default provideUuid;
