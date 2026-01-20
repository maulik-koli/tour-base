"use client"
import React, { useMemo } from 'react'
import { GetActivityDetailsResponse } from '@modules/activities/api/types'

import Icon from '@/components/icons'
import HtmlRichText from '@modules/tours/components/html-rich-text'
import ActivityImageSlider from '../activity-image-slider'
import HelpBlock from '@/components/help-black'
import { Typography } from '@ui/typography'
import { Button } from '@ui/button'

interface ActivityDetailContentProps {
    activity: GetActivityDetailsResponse;
}

const ActivityDetailContent: React.FC<ActivityDetailContentProps> = ({ activity }) => {
    const allImages = useMemo(() => {
        return [activity.thumbnailImage, ...activity.images];
    }, [activity.thumbnailImage, activity.images]);

    return (
        <div className='flex flex-col'>
            <div className='px-4 md:px-12 lg:px-20 py-6 md:py-8'>
                <div className='flex items-center gap-1.5 mb-3'>
                    <Icon name='MapPin' className='w-5 h-5 text-accent' />
                    <Typography variant="p" className='text-muted-foreground uppercase tracking-wide font-semibold'>
                        {activity.city}
                    </Typography>
                </div>

                <Typography variant="h1" className='font-bold mb-2'>
                    {activity.title}
                </Typography>

                <Typography variant="lead" className='text-muted-foreground mb-6'>
                    {activity.subtitle}
                </Typography>

                <ActivityImageSlider
                    images={allImages}
                    title={activity.title}
                    pricePerPerson={activity.pricePerPerson}
                />
            </div>

            <div className='w-full py-6 md:py-8 lg:py-12 px-4 md:px-12 lg:px-20 bg-muted/30'>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                    <div className="lg:col-span-2 flex flex-col space-y-6 md:space-y-8">
                        <div className='bg-card rounded-xl border border-border p-5 md:p-6 lg:p-8'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                                    <Icon name='FileText' className='w-5 h-5 text-primary' />
                                </div>
                                <Typography variant="h3">About This Activity</Typography>
                            </div>
                            <HtmlRichText 
                                html={activity.description} 
                                className='text-muted-foreground leading-relaxed'
                            />
                        </div>

                        {activity.extraNote && (
                            <div className='bg-accent/10 border border-accent/30 rounded-xl p-5 md:p-6'>
                                <div className='flex items-start gap-3'>
                                    <div className='w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0'>
                                        <Icon name='Info' className='w-5 h-5 text-accent' />
                                    </div>
                                    <div>
                                        <Typography variant="h4" className='mb-2 text-accent-foreground'>
                                            Note
                                        </Typography>
                                        <HtmlRichText 
                                            html={activity.extraNote} 
                                            className='text-accent-foreground/80'
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className='sticky top-22 self-start'>
                            <div className='flex flex-col space-y-4 md:space-y-6'>
                                <div className='bg-card rounded-xl border border-border p-5 md:p-6 shadow-sm'>
                                    <div className='flex items-center justify-between mb-4 pb-4 border-b border-border'>
                                        <Typography variant="muted">Price per person</Typography>
                                        <Typography variant="h2" className='text-primary font-bold'>
                                            ₹{activity.pricePerPerson.toLocaleString('en-IN')}
                                        </Typography>
                                    </div>

                                    <div className='mb-6 bg-primary/5 rounded-lg p-4 border border-primary/10'>
                                        <div className='flex items-center gap-2 mb-3'>
                                            <Icon name='Sparkles' className='w-4 h-4 text-primary' />
                                            <Typography variant="small" className='font-semibold text-primary'>
                                                Why Book With Us
                                            </Typography>
                                        </div>
                                        <div className='space-y-2'>
                                            <div className='flex items-start gap-2'>
                                                <Icon name='CheckCircle' className='w-3.5 h-3.5 text-primary mt-0.5 shrink-0' />
                                                <Typography variant="small" className='text-xs'>Best price guarantee</Typography>
                                            </div>
                                            <div className='flex items-start gap-2'>
                                                <Icon name='CheckCircle' className='w-3.5 h-3.5 text-primary mt-0.5 shrink-0' />
                                                <Typography variant="small" className='text-xs'>24/7 customer support</Typography>
                                            </div>
                                            <div className='flex items-start gap-2'>
                                                <Icon name='CheckCircle' className='w-3.5 h-3.5 text-primary mt-0.5 shrink-0' />
                                                <Typography variant="small" className='text-xs'>Trusted by thousands</Typography>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className='w-full' size="lg">
                                        Book Now
                                    </Button>

                                    <Button variant="secondary" className='w-full mt-3' size="lg">
                                        <Icon name='whatspp' className='w-5 h-5' fill='currentColor' />
                                        Enquire on WhatsApp
                                    </Button>
                                    
                                    <Typography variant="small" className='text-center text-muted-foreground mt-3 block'>
                                        Our team will respond within 2 hours
                                    </Typography>
                                </div>

                                <HelpBlock />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityDetailContent
