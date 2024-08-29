

import { today } from "../services/water.js";

export const calculateWaterPercentage = async (userId, waterRate) => {
    const records = await today(userId);

    const waterToNumber = parseFloat(waterRate);

    const total = records.reduce((total, record) => total + parseFloat(record.amount), 0);

    const percentage = (total / waterToNumber) * 100;

    return { percentage: percentage.toFixed(2), records };
};

