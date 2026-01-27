import React, { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerDetailsFormType, customerDetailsSchema, defaultMember, getDefaultCustomerDetails } from '@modules/booking/utils/schema'
import { GENDER_OPTIONS } from '@/constants/select-options'

import Icon from '@/components/icons'
import { InputField, DatePicker, SelectField } from '@/components/form'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'
import { Separator } from '@ui/separator'
import { SpinnerOverlay } from '@ui/spinner'
import { useCustomerBooking } from '@modules/booking/api/mutations'
import { logger } from '@/lib/utils'
import { flatZodError } from '@/lib/zod/flatZodError'
import { useToast } from '@/hooks/useToast'

interface CustomerDetailsFormProps {
    bookingId: string;
    handleOnSubmit: () => void;
    customerDetails?: CustomerDetailsFormType;
}

const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({ bookingId, customerDetails, handleOnSubmit }) => {
    const form = useForm<CustomerDetailsFormType>({
        resolver: zodResolver(customerDetailsSchema),
        defaultValues: customerDetails || getDefaultCustomerDetails(),
        mode: 'onSubmit',
    })
    const { control } = form

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'members',
    })

    const { isPending, mutate } = useCustomerBooking();
    const toast = useToast();


    const onSubmit = (data: CustomerDetailsFormType) => {
        logger("Submitting Customer Details", { bookingId, data });
        mutate({
            bookingId: bookingId,
            customer: data
        });
        handleOnSubmit();
    }

    useEffect(() => {
        if(Object.keys(form.formState.errors).length > 0) {
            logger("Form data", form.getValues())
            const error = flatZodError(customerDetailsSchema, form.getValues())
            if(error) toast.error(error)
        }
    }, [form.formState.errors]);

    useEffect(() => {
        if (isPending) return;
        
        if (customerDetails) {
            form.reset(customerDetails);
        }
    }, [customerDetails])


    if (isPending) {
        return <div className='h-screen'><SpinnerOverlay /></div>
    }

    return (
        <>
            <form className='w-full px-4 md:px-6 py-3 md:py-4 bg-card rounded-md border border-border flex flex-col gap-4 md:gap-6'>
                <Typography variant="h4">Customer Details</Typography>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                    <Controller
                        control={control}
                        name='fullName'
                        render={({ field, fieldState }) => (
                            <InputField
                                value={field.value}
                                onChange={field.onChange}
                                label='Full Name *'
                                placeholder='name of the things'
                                containerClass='col-span-1 md:col-span-2'
                                errMsg={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='phone1'
                        render={({ field, fieldState }) => (
                            <InputField
                                value={field.value}
                                onChange={field.onChange}
                                type='number'
                                label='Phone Number *'
                                placeholder='Enter phone number'
                                leftIcon='Phone'
                                className='no-counter'
                                containerClass='col-span-1'
                                errMsg={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='phone2'
                        render={({ field, fieldState }) => (
                            <InputField
                                value={field.value}
                                onChange={field.onChange}
                                type='number'
                                label='Emergency Phone Number *'
                                placeholder='Enter phone number'
                                leftIcon='Phone'
                                className='no-counter'
                                containerClass='col-span-1'
                                errMsg={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
                <Controller
                    control={control}
                    name='dateOfTravel'
                    render={({ field }) => (
                        <DatePicker 
                            label='Travel Date *'
                            containerClass='w-full md:max-w-80'
                            value={new Date(field.value).toISOString()}
                            onChange={field.onChange}
                        />
                    )}
                />
                <div className='w-full flex flex-col gap-3'>
                    <div className='w-full flex items-center justify-between gap-6'>
                        <div className='flex items-center gap-6'>
                            <Typography variant="lead" className='text-foreground'>Members</Typography>
                            <Button
                                variant='link'
                                type='button'
                                size='sm'
                                onClick={() => append(defaultMember)}
                            >
                                Add Member
                            </Button>
                        </div>
                        <Typography variant="small">{fields.length} Travel members</Typography>
                    </div>
                    <div className='w-full flex flex-col gap-4'>
                        {fields.length === 0 ? (
                            <div className='w-full bg-muted rounded-md p-4 text-center'>
                                <Typography variant="muted">No members added. Please add at least one member.</Typography>
                            </div>
                        ) : fields.map((members, index) => (
                            <div key={members.id} className='w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4'>
                                <div className='w-full px-3 py-2 bg-background rounded-md border border-border flex flex-col gap-3'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                                        <Controller
                                            control={control}
                                            name={`members.${index}.fullName`}
                                            render={({ field, fieldState }) => (
                                                <InputField
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    label='Full Name'
                                                    placeholder='Enter full name'
                                                    containerClass='col-span-1 md:col-span-2'
                                                    className='bg-card'
                                                    errMsg={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name={`members.${index}.age`}
                                            render={({ field, fieldState }) => (
                                                <InputField
                                                    value={field.value.toString()}
                                                    onChange={(value) => field.onChange(Number(value))}
                                                    type='number'
                                                    label='Age'
                                                    placeholder='Enter age'
                                                    containerClass='col-span-1'
                                                    className='bg-card'
                                                    errMsg={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name={`members.${index}.gender`}
                                            render={({ field}) => (
                                                <SelectField
                                                    label='Gender'
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={GENDER_OPTIONS}
                                                    className='bg-card'
                                                    containerClass='col-span-1'
                                                    selectTriggerClass='bg-card'
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className=' text-destructive'
                                >
                                    <Icon name="Trash2" width={16} height={16} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                <Separator />
                <div className='w-full rounded-md bg-accent/10 border border-accent/10 p-3 md:p-4 text-center text-sm text-muted-foreground'>
                    <div className='flex items-start sm:items-center gap-2'>
                        <Icon name="Info" className='w-4 h-4 md:w-5 md:h-5 text-accent mt-0.5 sm:mt-1 shrink-0' />
                        <Typography variant="p" className='text-accent font-medium'>
                            Important Notes:
                        </Typography>
                    </div>
                    <ul className='flex flex-col gap-2 list-disc mt-2 ml-6 md:ml-10 text-left text-accent-foreground text-xs md:text-sm'>
                        <li>Please add your WhatsApp number to receive booking details and updates</li>
                        <li>Customer details are for booking purposes - actual travelers should be added as members in the next step</li>
                        <li>If you're traveling, please add yourself as a member as well</li>
                    </ul>
                </div>
            </form>
            <div className='w-full flex items-center gap-4 justify-end'>
                <Button type='button' onClick={form.handleSubmit(onSubmit)}>
                    Next
                    <Icon name='ArrowRight' width={10} height={16} />
                </Button>
            </div>
        </>
    )
}

export default CustomerDetailsForm
