
import { WaterCollection } from '../db/models/water.js';
import { startOfMonth, endOfMonth, addDays, format, startOfDay, endOfDay } from 'date-fns';
import { calculateWaterPercentage } from '../utils/calculateWaterPercentage.js';

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

export const today = async (userId) => {
    const start = '00:00';
    const end = '23:59';

    const records = await WaterCollection.find({
        userId,
        time: {
            $gte: start,
            $lte: end,
        },
    });

    return records;
};


export const getWaterStatsForMonth = async (userId, month, year, waterRate) => {
    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(new Date(year, month - 1));

    let currentDate = start;
    const results = [];

    while (currentDate <= end) {

        const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));



        const { percentage, records } = await calculateWaterPercentage(userId, waterRate, currentDate);

        results.push({
            date: format(currentDate, 'd MMMM'),
            dailyWaterGoal: `${waterRate} L`,
            percentage: `${percentage}%`,
            count: records.length,
        });

        currentDate = addDays(currentDate, 1);
    }

    return results;
};
