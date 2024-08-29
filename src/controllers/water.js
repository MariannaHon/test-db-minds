import { getAllRecords, createRecord, patchRecord, deleteWater } from "../services/water.js";

import createHttpError from 'http-errors';


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
