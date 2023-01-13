import ApplicationError from '../errors';
import { StatusCodes } from '../httpServer/constants';
import { ErrorMessages } from '../errors/constants';

const checkId = (id: string, entries: unknown[]) => {
  const entry = entries.find((item) => (item as { id: string }).id === id);

  if (!entry) {
    throw new ApplicationError(StatusCodes.NOT_FOUND, ErrorMessages.NOT_EXISTING_ID);
  }
};

export default checkId;
