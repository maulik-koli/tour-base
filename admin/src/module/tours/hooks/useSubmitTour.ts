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
    } = useUpdateTour();


    const onCreateSubmit = (data: CreateTourFormType) => {
        logger("data onSumbit", data);
        createTour(data, {
            onSuccess: (res) => {
                toast.success("Tour created successfully!");
                router.push(`/tours`);
            },
        })
    }


    const onUpdateSubmit = (data: CreateTourFormType) => {
        const payload = {
            slug: tourSlug,
            data: data.tour
        };
        
        updateTour(payload, {
            onSuccess: (res) => {
                toast.success("Tour updated successfully!");
                logger("Update Tour Response", res);
                router.push(`/tours`);
            },
        });
    }

    toast.isLoading(isCreatingTour, "Creating Tour...");
    toast.isLoading(isUpdatingTour, "Updating Tour...");

    return { onCreateSubmit, onUpdateSubmit, isCreatingTour, isUpdatingTour };
}