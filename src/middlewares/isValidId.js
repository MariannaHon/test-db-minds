
import { isValidObjectId } from 'mongoose';
import { HttpError } from 'http-errors';

export const isValidId = (req, res, next) => {
    const { recordId } = req.params;
    if (!isValidObjectId(recordId)) {
        throw HttpError(404, 'Not found');
    }

    next();
};
