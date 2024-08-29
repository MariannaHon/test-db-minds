import { getAllRecords, createRecord, patchRecord, deleteWater, getWaterStatsForMonth } from "../services/water.js";

import createHttpError from 'http-errors';

import { calculateWaterPercentage } from "../utils/calculateWaterPercentage.js";


export const getWaterController = async (req, res) => {

    const { _id: userId } = req.user;

    const water = await getAllRecords(userId);
    res.json({
        status: 200,
        message: "Successfully found water records!",
        data: water,
    });
};

export const createWaterController = async (req, res) => {

    const waterData = { ...req.body, userId: req.user._id };
    const water = await createRecord(waterData);

    res.status(201).json({
        status: 201,
        message: "Successfully created a record about water!",
        data: water,
    });
};

export const patchWaterController = async (req, res, next) => {
    const { recordId } = req.params;

    const result = await patchRecord(recordId, req.user._id, req.body);

    if (!result) {
        next(createHttpError(404, 'Record not found'));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a record!",
        data: result.record,
    });
};

export const deleteWaterController = async (req, res, next) => {
    const { recordId } = req.params;
    const delWater = await deleteWater(recordId, req.user._id);

    if (!delWater) {
        next(createHttpError(404, 'Record not found'));
        return;
    }

    res.status(204).send();
};


export const getWaterStatsController = async (req, res, next) => {
    try {
        const { _id: userId, waterRate } = req.user;

        const { percentage, records } = await calculateWaterPercentage(userId, waterRate);

        res.json({
            status: 200,
            message: "Successfully get water stats!",
            data: {
                percentage,
                records,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getWaterStatsMonthController = async (req, res, next) => {
    try {
        const { _id: userId, waterRate } = req.user;
        const { month, year } = req.body;

        const stats = await getWaterStatsForMonth(userId, month, year, waterRate);

        res.json({
            status: 200,
            message: "Successfully get water stats for the month!",
            data: stats,
        });

    } catch (error) {
        next(error);
    }
};
