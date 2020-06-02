/**
 * Copyright (c) 2018 Centroida.AI All rights reserved.
 */

import { model, Model, Schema, Document } from "mongoose";
import { BaseEntity } from "./model";

export interface SampleModel extends BaseEntity, Document { }

const modelSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    }
});

export const ModelSchema: Model<SampleModel> = model<SampleModel>("SampleModel", modelSchema);
