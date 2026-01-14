import { asyncWrapper } from "@/api/utils/apiHelper";
import { successResponse } from "@/api/utils/response";
import { closeRequest, deleteRequest, getAllRequests } from "./request.service";


export const adminGetRequestsListController = asyncWrapper(async (req, res) => {
    const requests = await getAllRequests();

    successResponse(res, {
        message: "Requests list fetched successfully",
        status: 200,
        data: requests,
    });
});


export const adminDeleteRequestController = asyncWrapper(async (req, res) => {
    const requestId = req.params.requestId;

    await deleteRequest(requestId);

    successResponse(res, {
        message: "Request deleted successfully",
        status: 200,
        data: null,
    });
});


export const adminCloseRequestController = asyncWrapper(async (req, res) => {
    const requestId = req.params.requestId;

    const request = await closeRequest(requestId);

    successResponse(res, {
        message: "Request closed successfully",
        status: 200,
        data: request,
    });
});
