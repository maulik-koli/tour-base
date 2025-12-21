import { useParams, useRouter } from "next/navigation";
import { useCreateTour, useUpdateTour } from "@module/tours/api/mutations";
import { useToast } from "@/hooks/useToast";
import { CreateTourFormType } from "@module/tours/utils/schema";
import { logger } from "@/lib/utils";


export const useSubmitTour = () => {
    const tour = useParams().tour;
    const router = useRouter();
    const toast = useToast();
    
    const { 
        mutate: createTour, 
        isPending: isCreatingTour 
    } = useCreateTour();

    const tourSlug: string = tour ? (tour as string) : "default-slug";

    const { 
        mutate: updateTour, 
        isPending: isUpdatingTour
    } = useUpdateTour({ slug: tourSlug });


    const onCreateSubmit = (data: CreateTourFormType) => {
        logger("data onSumbit", data);
        createTour(data, {
            onSuccess: (res) => {
                toast.success("Tour created successfully!");
                router.push(`/tours`);
            },
            onError: (err) => {
                toast.error(err.message || "Failed to create tour. Please try again.");
                logger("Create Tour Error", err);
            }
        })
    }


    const onUpdateSubmit = (data: CreateTourFormType) => {
        logger("data onSumbit", data);
        updateTour(data.tour, {
            onSuccess: (res) => {
                toast.success("Tour updated successfully!");
                logger("Update Tour Response", res);
                router.push(`/tours`);
            },
            onError: (err) => {
                toast.error(err.message || "Failed to update tour. Please try again.");
                logger("Update Tour Error", err);
            }
        });
    }

    toast.isLoading(isCreatingTour, "Creating Tour...");
    toast.isLoading(isUpdatingTour, "Updating Tour...");

    return { onCreateSubmit, onUpdateSubmit };
}