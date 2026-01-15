import { asyncWrapper } from "@/api/utils/apiHelper";
import { successResponse } from "@/api/utils/response";
import { 
    closeRequest, 
    createOtpRequest, 
    deleteRequest, 
    getAllRequests, 
    getRequestBySessionId, 
    verifyOtp 
} from "./request.service";
import { GenerateOtpPayload, VerifyOtpPayload } from "./request.schema";


// ==================== Admin Controllers ====================

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


// ==================== User Controllers ====================

export const generateOtpController = asyncWrapper(async (req, res) => {
    const payload = req.body as GenerateOtpPayload;

    const result = await createOtpRequest({
        phone: payload.phone,
        travelDate: payload.travelDate,
        requestType: payload.requestType,
    });

    successResponse(res, {
        message: "OTP sent successfully",
        status: 200,
        data: result,
    });
});


export const getSessionController = asyncWrapper(async (req, res) => {
    const sessionId = req.params.sessionId;

    const result = await getRequestBySessionId(sessionId);

    successResponse(res, {
        message: "Session fetched successfully",
        status: 200,
        data: result,
    });
});


export const verifyOtpController = asyncWrapper(async (req, res) => {
    const payload = req.body as VerifyOtpPayload;

    const result = await verifyOtp(payload.sessionId, payload.otp);

    successResponse(res, {
        message: "OTP verified successfully",
        status: 200,
        data: result,
    });
});
