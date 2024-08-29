
import { model, Schema } from 'mongoose';

const waterSchema = new Schema(
    {
        amount: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const WaterCollection = model('waters', waterSchema);
