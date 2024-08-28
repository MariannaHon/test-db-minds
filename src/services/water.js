
import { WaterCollection } from '../db/models/water.js';

export const getAllRecords = async (userId) => {

    const records = await WaterCollection.find({ userId });
    return records;
};

export const createRecord = async (payload) => {
    const record = await WaterCollection.create(payload);
    return record;
};

export const patchRecord = async (recordId, userId, payload, options = {}) => {
    const rawResult = await WaterCollection.findOneAndUpdate(
        { _id: recordId, userId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        });

    if (!rawResult || !rawResult.value) return null;

    return {
        record: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteWater = async (recordId, userId) => {
    const record = await WaterCollection.findOneAndDelete({ _id: recordId, userId });
    return record;
};
