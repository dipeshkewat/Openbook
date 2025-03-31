import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ChapterList } from "../models/chapterList.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const chapterList = asyncHandler(async (req, res) => {
    const { chapterName, subject, semester, ytLink, notes } = req.body;
    console.log("chapterName, subject, semester, ytLink, notes===", chapterName, subject, semester, ytLink, notes);

    if (!chapterName || !subject || !semester || !ytLink || !notes) {
        throw new ApiError(400, "All fields are required");
    }

    const existsChapterList = await ChapterList.findOne({
        $and: [{ chapterName }, { subject }, { semester }, { ytLink }, { notes }]
    });

    if (existsChapterList) {
        throw new ApiError(409, "Chapter List already exists");
    }

    const chapterList = await ChapterList.create({
        chapterName: chapterName.toLowerCase(),
        subject,
        semester,
        ytLink,
        notes
    });

    const createChapterList = await ChapterList.findById(chapterList._id).select("-password -refreshToken");

    if (!createChapterList) {
        throw new ApiError(500, "Something went wrong registering Chapter List");
    }

    return res.status(201).json(
        new ApiResponse(200, createChapterList, "Chapter List registered successfully")
    );
})

const getChapters = asyncHandler(async (req, res) => {
    try {
        const sem= req.query.sem
        const result = await ChapterList.find({ semester: sem });
        if (!result) {
            return res.status(404).json({ message: "No data found" });
        }
        return res.status(200).json({ data: result });
    } catch (error) {
      console.error(error)  
    }
})
export { 
    chapterList,
    getChapters,
};