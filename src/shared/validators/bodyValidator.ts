import ApplicationError from '../errors';
import { StatusCodes } from '../httpServer/constants';
import { ErrorMessages } from '../errors/constants';

const validateBody = (body: any, requiredFields: string[]) => {
  requiredFields.forEach((field) => {
    if (!body[field]) {
      throw new ApplicationError(StatusCodes.BAD_REQUEST, ErrorMessages.REQUIRED_FILED_MISSING);
    }
  });
};

export default validateBody;
