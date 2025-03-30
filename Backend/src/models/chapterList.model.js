import mongoose, { model, Schema }from "mongoose";

const chapterListSchema = new Schema(
    {
        chapterName:{
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim: true,
            index:true
        },
        subject:{
            type: String,
            required: true,
            unique:true,
            lowercase: true,
            trim:true

        },
        semester:{
            type: Number,
            required: true
        },
        ytLink:{
            type: String,
            required: true,
            unique: true,
        },
        notes:{
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true
    }
)

export const ChapterList = mongoose.model("ChapterList", chapterListSchema);