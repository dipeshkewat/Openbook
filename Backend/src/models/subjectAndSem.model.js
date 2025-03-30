import mongoose, { model, Schema }from "mongoose";

const subjectAndSemSchema = new Schema(
    {
        subject:{
            type: String,
            required: true,
            unique: true,
            lowercase:true,
            trim: true,
            index:true
        },
        semester:{
            type: Number,
            required: true
        }

    },
    {
        timestamps:true
    }
)

export const SubjectAndSem = mongoose.model("SubjectAndSem", subjectAndSemSchema);