import { useParams } from "next/navigation"
import { useAddPackage, useDeletePackage, useUpdatePackage } from "../api/mutations";
import { useToast } from "@/hooks/useToast";
import { PackageFieldType, preparePackagePayload } from "../utils/helper";
import { PackageResponse } from "../api/types";
import { logger } from "@/lib/utils";


export const usePackageActions = () => {
    const tour = useParams().tour;
    const tourSlug: string = tour ? (tour as string) : "default-slug";

    const toast = useToast();

    const { 
        mutateAsync: addPackage, 
        isPending: isAddingPackage
    } = useAddPackage();
    
    const {
        mutateAsync: updatePackage,
        isPending: isUpdatingPackage
    } = useUpdatePackage();

    const {
        mutateAsync: deletePackage,
        isPending: isDeletingPackage
    } = useDeletePackage();


    const handleAddPackage = async (payload: PackageFieldType) => {
        const payloadData = preparePackagePayload(payload);
        let response: PackageResponse | null = null;

        try {
            const res = await addPackage({
                slug: tourSlug,
                payload: payloadData
            });

            if(res?.data) {
                response = res?.data
                toast.success("Package added successfully");
            }
        }
        catch (error: any) {
            logger("Add Package Error", error);
            toast.error(error.message || "Failed to add package. Please try again.");
        }
        finally {
            return response;
        }
    }


    const handleUpdatePackage = async (payload: PackageFieldType) => {
        const payloadData = preparePackagePayload(payload);
        let response: PackageResponse | null = null;

        try {
            const res = await updatePackage({
                _id: payload._id,
                payload: payloadData
            }); 

            if(res?.data) {
                response = res?.data
                toast.success("Package updated successfully");
            }

        }
        catch (error: any) {
            logger("Update Package Error", error);
            toast.error(error.message || "Failed to update package. Please try again.");
        }
        finally {
            return response;
        }
    }


    const handleDeletePackage = async (_id: string) => {
        try {
            await deletePackage({ _id });
        }
        catch (error: any) {
            logger("Delete Package Error", error);
            toast.error(error.message || "Failed to delete package. Please try again.");
        }
    }


    toast.isLoading(isAddingPackage, "Adding package...");
    toast.isLoading(isUpdatingPackage, "Updating package...");
    toast.isLoading(isDeletingPackage, "Deleting package...");

    return {
        handleAddPackage,
        handleUpdatePackage,
        handleDeletePackage,
        isLoading: isAddingPackage || isUpdatingPackage || isDeletingPackage
    }
}