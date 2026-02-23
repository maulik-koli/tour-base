"use client"
import React from 'react'
import { RequestItem, RequestType } from '@module/request/api/types'
import { formatDate, formatCurrency, cn } from '@/lib/utils'
import { useCloseRequest, useDeleteRequest } from '@module/request/api/mutations'
import { useModelStore } from '@/store'
import { useToast } from '@/hooks/useToast'

import Icon, { IconName } from '@/components/icons'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'

interface RequestCardProps {
    request: RequestItem;
}

const getRequestTypeLabel = (type: RequestType): string => {
    const labels: Record<RequestType, string> = {
        GET_DETAILS: 'Get Details',
        CANCEL_BOOKING: 'Cancel Booking',
    };
    return labels[type] || type;
};

const getRequestTypeIcon = (type: RequestType): IconName => {
    const icons: Record<RequestType, IconName> = {
        GET_DETAILS: 'FileText',
        CANCEL_BOOKING: 'CircleX',
    };
    return icons[type] || 'FileText';
};

const isOtpExpired = (expiresAt: string): boolean => {
    return new Date(expiresAt) < new Date();
};

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
    const { mutate: closeRequest, isPending: isClosing } = useCloseRequest();
    const { mutate: deleteRequest, isPending: isDeleting } = useDeleteRequest();
    const showModel = useModelStore(s => s.showModel);
    const toast = useToast();

    const handleClose = () => {
        closeRequest({ requestId: request._id }, {
            onSuccess: () => {
                toast.success("Request closed successfully");
            },
            onError: (error) => {
                toast.error(error.message || "Failed to close request");
            }
        });
    };

    const handleDelete = () => {
        deleteRequest({ requestId: request._id }, {
            onSuccess: () => {
                toast.success("Request deleted successfully");
            },
            onError: (error) => {
                toast.error(error.message || "Failed to delete request");
            }
        });
    };

    const handleCloseClick = () => {
        showModel(handleClose, {
            title: 'Close Request',
            description: 'Are you sure you want to close this request? This action cannot be undone.',
            actionText: 'Close',
            canclelText: 'Cancel',
        });
    };

    const handleDeleteClick = () => {
        showModel(handleDelete, {
            title: 'Delete Request',
            description: 'Are you sure you want to delete this request? This action cannot be undone.',
            actionText: 'Delete',
            canclelText: 'Cancel',
        });
    };

    toast.isLoading(isClosing, "Closing request...");
    toast.isLoading(isDeleting, "Deleting request...");

    const otpExpired = isOtpExpired(request.otpData.expiresAt);

    return (
        <div className={cn(
            'w-full bg-card border rounded-xl overflow-hidden transition-all duration-300',
            request.isOpen 
                ? 'border-primary/20 shadow-md hover:shadow-lg hover:border-primary/40' 
                : 'border-border opacity-75 hover:opacity-100'
        )}>
            <div className={cn('h-1 w-full', request.isOpen ? 'bg-primary' : 'bg-muted-foreground/30')} />
            
            <div className='p-3 md:p-4'>
                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3 md:mb-4'>
                    <div className='flex items-center gap-2 md:gap-3'>
                        <div className={cn(
                            'w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center',
                            request.isOpen 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-muted text-muted-foreground'
                        )}>
                            <Icon name={getRequestTypeIcon(request.requestType)} className='w-4 h-4 md:w-5 md:h-5' />
                        </div>
                        
                        <div className='flex flex-col gap-0.5'>
                            <div className='flex items-center gap-2'>
                                <Typography variant="p" className='font-semibold text-sm md:text-base'>
                                    {getRequestTypeLabel(request.requestType)}
                                </Typography>
                                <div className={cn(
                                    'px-2 py-0.5 rounded-full text-[10px] md:text-[11px] font-semibold flex items-center gap-1',
                                    request.isOpen 
                                        ? 'bg-green-500/15 text-green-600 dark:text-green-400' 
                                        : 'bg-gray-500/15 text-gray-600 dark:text-gray-400'
                                )}>
                                    <span className={cn('w-1 h-1 rounded-full', request.isOpen ? 'bg-green-500' : 'bg-gray-500')} />
                                    {request.isOpen ? 'Open' : 'Closed'}
                                </div>
                            </div>
                            <Typography variant="muted" className='text-[11px] md:text-xs'>
                                Created {formatDate(request.createdAt, true)}
                            </Typography>
                        </div>
                    </div>

                    <div className='text-right hidden sm:block'>
                        <Typography variant="p" className='font-semibold text-sm md:text-base'>{request.bookingData.customerName}</Typography>
                        <Typography variant="muted" className='text-[11px] md:text-xs'>{request.phone}</Typography>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3'>
                    <div className='bg-muted/50 rounded-lg p-2 md:p-2.5 flex items-center gap-2'>
                        <div className='w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0'>
                            <Icon name="Calendar" className='w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 dark:text-blue-400' />
                        </div>
                        <div className='min-w-0'>
                            <Typography variant="muted" className='text-[10px] md:text-[11px]'>Travel Date</Typography>
                            <Typography variant="p" className='font-medium text-xs truncate'>{formatDate(request.travelDate)}</Typography>
                        </div>
                    </div>

                    <div className='bg-muted/50 rounded-lg p-2 md:p-2.5 flex items-center gap-2'>
                        <div className='w-7 h-7 md:w-8 md:h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0'>
                            <Icon name="IndianRupee" className='w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600 dark:text-emerald-400' />
                        </div>
                        <div className='min-w-0'>
                            <Typography variant="muted" className='text-[10px] md:text-[11px]'>Booking Amount</Typography>
                            <div className='flex items-center gap-1.5'>
                                <Typography variant="p" className='font-semibold text-xs truncate'>
                                    {formatCurrency(request.bookingData.totalAmount)}
                                </Typography>
                                <span className={cn(
                                    'text-[9px] font-semibold px-1 py-0.5 rounded',
                                    request.bookingData.isFullPaid 
                                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                                        : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                )}>
                                    {request.bookingData.isFullPaid ? 'PAID' : 'PARTIAL'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-muted/50 rounded-lg p-2 md:p-2.5 flex items-center gap-2'>
                        <div className={cn('w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shrink-0', otpExpired ? 'bg-red-500/15' : 'bg-green-500/15')}>
                            <Icon 
                                name={otpExpired ? "OctagonX" : "CheckCircle"} 
                                className={cn('w-3.5 h-3.5 md:w-4 md:h-4', otpExpired ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400')}
                            />
                        </div>
                        <div className='min-w-0'>
                            <Typography variant="muted" className='text-[10px] md:text-[11px]'>OTP Session</Typography>
                            <Typography variant="p" className={cn('font-medium text-xs', otpExpired ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400')}>
                                {otpExpired ? 'Expired' : 'Active'}
                            </Typography>
                        </div>
                    </div>

                    <div className='bg-muted/50 rounded-lg p-2 md:p-2.5 flex items-center gap-2'>
                        <div className='w-7 h-7 md:w-8 md:h-8 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0'>
                            <Icon name="TicketCheck" className='w-3.5 h-3.5 md:w-4 md:h-4 text-violet-600 dark:text-violet-400' />
                        </div>
                        <div className='min-w-0'>
                            <Typography variant="muted" className='text-[10px] md:text-[11px]'>Booked On</Typography>
                            <Typography variant="p" className='font-medium text-xs truncate'>{formatDate(request.bookingData.bookedAt)}</Typography>
                        </div>
                    </div>
                </div>

                <div className='bg-muted/30 rounded-lg px-2.5 md:px-3 py-2 mb-3'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2'>
                        <div className='flex items-center gap-2'>
                            <Icon name="Ticket" className='w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground shrink-0' />
                            <Typography variant="muted" className='text-[10px] md:text-[11px] break-all'>
                                Session ID: <span className='font-mono text-foreground'>{request.otpData.sessionId}</span>
                            </Typography>
                        </div>
                        <Typography variant="muted" className='text-[10px] md:text-[11px] sm:text-right'>
                            Started {formatDate(request.otpData.sessionCreatedAt, true)}
                        </Typography>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 pt-3 border-t border-border'>
                    {request.isOpen && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCloseClick}
                            disabled={isClosing || isDeleting}
                            className='gap-1.5 text-xs md:text-sm w-full sm:w-auto'
                        >
                            <Icon name="CheckCircle" className='w-3.5 h-3.5 md:w-4 md:h-4' />
                            <span className='hidden sm:inline'>Mark as Resolved</span>
                            <span className='sm:hidden'>Resolved</span>
                        </Button>
                    )}
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteClick}
                        disabled={isClosing || isDeleting}
                        className='gap-1.5 text-xs md:text-sm w-full sm:w-auto'
                    >
                        <Icon name="Trash2" className='w-3.5 h-3.5 md:w-4 md:h-4' />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
