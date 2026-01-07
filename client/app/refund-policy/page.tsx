import React from 'react'
import { Typography } from '@ui/typography'

export const metadata = {
    title: "Refund Policy",
    description: "Understand the refund and cancellation policy for tour bookings.",
    alternates: {
        canonical: "/refund-policy",
    },
};


const RefundPolicy: React.FC = () => {
    return (
        <div className='min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-20'>
            <div className='max-w-5xl mx-auto'>
                {/* Header Section */}
                <div className='mb-12 pb-8 border-b border-border'>
                    <Typography variant="h1" className='mb-4'>
                        Refund Policy
                    </Typography>
                    <Typography variant="muted" className='text-base'>
                        Understanding our cancellation and refund terms to help you make informed booking decisions.
                    </Typography>
                </div>

                {/* Cancellation Timeline */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Cancellation Timeline & Refund Percentage
                    </Typography>
                    <div className='bg-muted/30 rounded-lg p-6 space-y-5'>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                30 Days or More Before Travel
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Full refund (100%) of the booking amount
                            </Typography>
                        </div>

                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Within 25 Days of Travel
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                50% refund of the booking amount
                            </Typography>
                        </div>

                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Within 20 Days of Travel
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                30% refund of the booking amount
                            </Typography>
                        </div>

                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Within 10 Days of Travel
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                No refund applicable
                            </Typography>
                        </div>
                    </div>
                </section>

                {/* General Refund Terms */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        General Refund Terms
                    </Typography>
                    <div className='bg-muted/30 rounded-lg p-6 space-y-4'>
                        <div className='space-y-3'>
                            <div className='flex gap-3'>
                                <span className='text-primary mt-1'>•</span>
                                <Typography variant="p" className='flex-1 leading-relaxed'>
                                    Traveller should communicate any correspondence towards cancellation from their registered email-Id on our official email.
                                </Typography>
                            </div>
                            <div className='flex gap-3'>
                                <span className='text-primary mt-1'>•</span>
                                <Typography variant="p" className='flex-1 leading-relaxed'>
                                    Applicable refund as per cancellation policy will be paid within 30 to 45 working days from the date of cancellation in INR only.
                                </Typography>
                            </div>
                            <div className='flex gap-3'>
                                <span className='text-primary mt-1'>•</span>
                                <Typography variant="p" className='flex-1 leading-relaxed'>
                                    Refunds are subject to supplier (airlines, hotels, transport, cruise) policies.
                                </Typography>
                            </div>
                            <div className='flex gap-3'>
                                <span className='text-primary mt-1'>•</span>
                                <Typography variant="p" className='flex-1 leading-relaxed'>
                                    Cancellation charges will be calculated on the published tour cost.
                                </Typography>
                            </div>
                            <div className='flex gap-3'>
                                <span className='text-primary mt-1'>•</span>
                                <Typography variant="p" className='flex-1 leading-relaxed'>
                                    When one decides to vacate the accommodation earlier, no refund is permissible for the remaining days of non-occupation from the entire confirmed paid period of reservation.
                                </Typography>
                            </div>
                        </div>
                    </div>
                </section>

                {/* No Refund Scenarios */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        No Refund Scenarios
                    </Typography>
                    <div className='bg-destructive/5 border border-destructive/20 rounded-lg p-6'>
                        <Typography variant="p" className='mb-4 font-medium'>
                            No refunds will be provided in the following situations:
                        </Typography>
                        <div className='space-y-3 pl-4'>
                            <div className='flex gap-3'>
                                <span className='text-primary mt-1'>•</span>
                                <Typography variant="p" className='flex-1 leading-relaxed'>
                                    Itinerary disruptions due to bad weather, natural disasters, civil unrest, governmental orders, or suspension/interruption of services.
                                </Typography>
                            </div>
                            <div className='flex gap-3'>
                                <span className='text-primary mt-1'>•</span>
                                <Typography variant="p" className='flex-1 leading-relaxed'>
                                    Cancellations made within 10 days of travel date.
                                </Typography>
                            </div>
                            <div className='flex gap-3'>
                                <span className='text-primary mt-1'>•</span>
                                <Typography variant="p" className='flex-1 leading-relaxed'>
                                    Peak season bookings (refund not available during peak travel periods).
                                </Typography>
                            </div>
                            <div className='flex gap-3'>
                                <span className='text-primary mt-1'>•</span>
                                <Typography variant="p" className='flex-1 leading-relaxed'>
                                    Non-refundable international/domestic air tickets and sectors where date changes are not allowed.
                                </Typography>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Air Ticket Refunds */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Air Ticket Cancellation
                    </Typography>
                    <div className='bg-secondary/20 rounded-lg p-6'>
                        <Typography variant="p" className='leading-relaxed mb-3'>
                            Air ticket cancellation and deposit forfeit charges are applicable as per the rules of the concerned airline and are additional cancellation charges to be paid by travellers immediately.
                        </Typography>
                        <div className='bg-accent/10 border-l-4 border-accent px-4 py-3 rounded mt-4'>
                            <Typography variant="small" className='font-medium text-accent-foreground'>
                                Important: Refund is not applicable for international/domestic sectors where air tickets are non-refundable and date changes are not allowed.
                            </Typography>
                        </div>
                    </div>
                </section>

                {/* Train Ticket Refunds */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Train Ticket Cancellation
                    </Typography>
                    <div className='bg-muted/30 rounded-lg p-6'>
                        <Typography variant="p" className='leading-relaxed'>
                            If your ticket has been cancelled, you will receive a refund code as an OTP from IRCTC Railway. After providing that code to us, your refund process will begin, and you will receive your amount within 15-20 working days.
                        </Typography>
                    </div>
                </section>

                {/* Additional Services */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Additional Services & Group Tours
                    </Typography>
                    <div className='space-y-4'>
                        <Typography variant="p" className='leading-relaxed'>
                            For any services booked over and above group tours by the guest, additional cancellation charges in addition to the standard cancellation policy will be applicable.
                        </Typography>
                        <Typography variant="p" className='leading-relaxed'>
                            Eklavya Tourism does not have any responsibility towards additional expenses relating to any arrangement made by travellers themselves relating to any tour.
                        </Typography>
                    </div>
                </section>

                {/* Refund Processing */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Refund Processing
                    </Typography>
                    <div className='bg-primary/5 rounded-lg p-6 space-y-5'>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Processing Time
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Refunds are processed within 30-45 working days from the date of cancellation request.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Currency
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                All refunds will be processed in INR (Indian Rupees) only.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Communication
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Use your registered email ID for all cancellation requests.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Bank Transfer
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Refunds will be credited to the original payment method or bank account.
                            </Typography>
                        </div>
                    </div>
                </section>

                {/* Important Notes */}
                <section className='mb-10 pb-8'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Important Notes
                    </Typography>
                    <div className='bg-accent/10 border-l-4 border-accent rounded-lg p-6 space-y-3'>
                        <Typography variant="p" className='leading-relaxed font-medium'>
                            Please note:
                        </Typography>
                        <ul className='space-y-2 pl-4'>
                            <li>
                                <Typography variant="p" className='leading-relaxed'>
                                    Dynamic pricing may affect the final refund amount based on fuel costs, peak seasons, or currency fluctuations.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="p" className='leading-relaxed'>
                                    All refund calculations are based on the date we receive your cancellation request via email.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="p" className='leading-relaxed'>
                                    Third-party supplier policies (airlines, hotels, etc.) may impose additional restrictions on refunds.
                                </Typography>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Footer Note */}
                <div className='pt-8 flex flex-col border-t border-border text-center'>
                    <Typography variant="small">
                        Last updated: January 2026
                    </Typography>
                    <Typography variant="small" className='mt-2'>
                        For cancellation requests or refund inquiries, please contact our customer support.
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default RefundPolicy