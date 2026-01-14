import { Types } from "mongoose";
import RequestModel from "./request.model";
import { CustomError } from "@/api/utils/response";


export const getAllRequests = async () => {
    const requests = await RequestModel.find().sort({ createdAt: -1 });
    return requests;
}


export const deleteRequest = async (requestId: string) => {
    const result = await RequestModel.findByIdAndDelete(new Types.ObjectId(requestId));

    if (!result) {
        throw new CustomError(404, "Request not found");
    }

    return result;
}


export const closeRequest = async (requestId: string) => {
    const request = await RequestModel.findByIdAndUpdate(
        new Types.ObjectId(requestId),
        { isOpen: false },
        { new: true }
    );

    if (!request) {
        throw new CustomError(404, "Request not found");
    }

    return request;
}
