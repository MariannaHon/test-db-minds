
import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/Contact.js';

export const checkUser = async (req, res, next) => {

    const { _id: userId } = req.user;

    const { contactId } = req.params;

    if (!userId) {
        next(createHttpError(401, 'User not authenticated'));
        return;
    }

    const contact = await ContactsCollection.findOne({ _id: contactId, userId });

    if (!contact) {
        return next(createHttpError(404, 'Contact not found'));
    }

    next(createHttpError(403, 'Forbidden: You don`t have access to this contact'));
};
