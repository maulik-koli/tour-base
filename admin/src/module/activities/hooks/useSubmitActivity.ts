import { useParams, useRouter } from "next/navigation";
import { useCreateActivity, useUpdateActivity } from "@module/activities/api/mutations";
import { useToast } from "@/hooks/useToast";
import { ActivityPayload } from "@module/activities/utils/schema";
import { logger } from "@/lib/utils";


export const useSubmitActivity = () => {
    const activity = useParams().slug;
    const router = useRouter();
    const toast = useToast();
    
    const { 
        mutate: createActivity, 
        isPending: isCreatingActivity 
    } = useCreateActivity();

    const activitySlug: string = activity ? (activity as string) : "default-slug";

    const { 
        mutate: updateActivity, 
        isPending: isUpdatingActivity
    } = useUpdateActivity();


    const onCreateSubmit = (data: ActivityPayload) => {
        logger("data onSubmit", data);
        createActivity(data, {
            onSuccess: (res) => {
                toast.success("Activity created successfully!");
                router.push(`/activities`);
            },
        })
    }


    const onUpdateSubmit = (data: ActivityPayload) => {
        const payload = {
            slug: activitySlug,
            data: data
        };
        
        updateActivity(payload, {
            onSuccess: (res) => {
                toast.success("Activity updated successfully!");
                logger("Update Activity Response", res);
                router.push(`/activities`);
            },
        });
    }

    toast.isLoading(isCreatingActivity, "Creating Activity...");
    toast.isLoading(isUpdatingActivity, "Updating Activity...");

    return { onCreateSubmit, onUpdateSubmit, isCreatingActivity, isUpdatingActivity };
}
