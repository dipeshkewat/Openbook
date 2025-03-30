import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { SubjectAndSem } from "../models/subjectAndSem.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const subjectAndSem = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "ok"
    // })

    const { subject, semester } = req.body;
    console.log("subject, semester===",subject, semester);

    if (!subject|| !semester) {
        throw new ApiError(400, "All fields are required");
    }

    const existsSubjectAndSem = await SubjectAndSem.findOne({
        $and: [{ subject }, { semester }]
    });

    if (existsSubjectAndSem) {
        throw new ApiError(409, "Subject and Semester already exists");
    }

    const subjectAndSem = await SubjectAndSem.create({
        subject: subject.toLowerCase(),
        semester,
    });

    const createSubjectAndSem = await SubjectAndSem.findById(subjectAndSem._id).select("-password -refreshToken");

    if (!createSubjectAndSem) {
        throw new ApiError(500, "Something went wrong registering Subject and Semester");
    }

    return res.status(201).json(
        new ApiResponse(200, createSubjectAndSem, "Subject and Semester registered successfully")
    );
})

const getSubject = asyncHandler(async (req, res) => {
    try {
        const Sem= req.query.sem
        const result = SubjectAndSem.find({ semester: Sem });
        if (!result) {
            return res.status(404).json({ message: "No data found" });
        }
        return res.status(200).json({ data: result });
    } catch (error) {
      console.error(error)  
    }
})

export { 
    subjectAndSem,
    getSubject,
 };