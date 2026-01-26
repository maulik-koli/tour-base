import React from 'react'
import { Typography } from '@ui/typography';
import PageHeader from '@/components/page-header';

export const metadata = {
    title: "Terms and Conditions",
    description: "Read the terms and conditions for booking tours with Eklavya Tourism.",
    alternates: {
        canonical: "/terms-and-conditions",
    },
};


const TermsAndConditionsPage: React.FC = () => {
    return (
        <div className='min-h-screen bg-background'>
            <PageHeader 
                title="Terms & Conditions"
                subtitle="Please read these terms and conditions carefully before booking any tour with us. By making a booking, you agree to be bound by these terms."
                align="center"
            />
            
            <div className='py-12 px-4 sm:px-6 lg:px-20'>
            <div className='max-w-5xl mx-auto'>
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        General Terms
                    </Typography>
                    <div className='space-y-4 pl-4'>
                        <div className='flex gap-3'>
                            <span className='text-primary mt-1'>•</span>
                            <Typography variant="p" className='flex-1'>
                                All persons are requested to produce photo ID proof (Voter ID card, Driving License, Aadhaar Card, Passport or any other photo ID proof issued by Central or State Govt.) at the time of check in.
                            </Typography>
                        </div>
                        <div className='flex gap-3'>
                            <span className='text-primary mt-1'>•</span>
                            <Typography variant="p" className='flex-1'>
                                Senior citizens, Students, Physically Handicapped Persons are entitled to bring the same ID proof which you have given at the time of booking for verification at the counter.
                            </Typography>
                        </div>
                        <div className='flex gap-3'>
                            <span className='text-primary mt-1'>•</span>
                            <Typography variant="p" className='flex-1'>
                                Age limit for children to be accommodated in a room without any extra charges is 0-6 years. Children above this age will require an extra mattress which will be charged as on cost.
                            </Typography>
                        </div>
                        <div className='flex gap-3'>
                            <span className='text-primary mt-1'>•</span>
                            <Typography variant="p" className='flex-1'>
                                When one decides to vacate the accommodation earlier, no refund is permissible for the remaining days of non-occupation from the entire confirmed paid and period of reservation.
                            </Typography>
                        </div>
                    </div>
                </section>

                {/* Dynamic Pricing */}
                <section className='mb-10'>
                    <Typography variant="h3" className='mb-4 text-primary'>
                        Dynamic Pricing
                    </Typography>
                    <Typography variant="p" className='leading-relaxed'>
                        Prices can change due to fuel costs, peak seasons, or currency fluctuations, with clients paying the difference.
                    </Typography>
                </section>

                {/* Cancellation Policy */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Cancellation Policy
                    </Typography>
                    <div className='bg-muted/30 rounded-lg p-6 space-y-4'>
                        <Typography variant="h4" className='mb-4'>
                            General Terms for All Cancellations
                        </Typography>
                        <div className='space-y-3'>
                            <Typography variant="p" className='leading-relaxed'>
                                Traveller should communicate any correspondence towards cancellation from their registered email-Id with EKLAVYA on email.
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Applicable Refund as per cancellation policy will be paid within 30 to 45 working days from the date of cancellation in INR only.
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Refunds are subject to supplier (airlines, hotels, transport, cruise) policies.
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                No refunds for itinerary disruptions due to bad weather, natural disasters, civil unrest, governmental orders, or suspension/interruption of services.
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Cancellation shall attract the cancellation charges on Published tour cost.
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                For any services over and above Group tours booked by the guest, the additional cancellation in addition to above the cancellation table will be applicable.
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Eklavya Tourism do not have any responsibility towards additional expenses relating to any arrangement made by Traveller themselves relating to any tour.
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Air Ticket Cancellation and deposit forfeit charges are applicable as and when occur under the rules of the concerned Airline are additional cancellation charges to be paid by Travellers immediately.
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Refund is not applicable for International / domestic sectors and on certain conditions which include that such air tickets are non refundable and date change is not allowed.
                            </Typography>
                        </div>
                    </div>

                    <div className='mt-6 bg-secondary/30 rounded-lg p-6'>
                        <Typography variant="h4" className='mb-4'>
                            Train Ticket Cancellation Charges
                        </Typography>
                        <Typography variant="p" className='leading-relaxed'>
                            If at any cost your ticket has been cancelled then you receive a refund code as an OTP from IRCTC Railway, and after giving that code to us, your refund process will starts and you'll have your amount after 15-20 working days.
                        </Typography>
                    </div>
                </section>

                {/* Booking & Payments */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Booking & Payments
                    </Typography>
                    <div className='space-y-5'>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Deposit/Balance
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Details required deposits (e.g., 50%) and final payment deadlines.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Payment Methods
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Accepted forms and any associated bank charges (e.g., 5% for cards).
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Price Changes
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Agency's right to correct errors and adjust prices before confirmation.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Agency Cancellations
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Conditions under which the company might cancel (e.g., minimum numbers) and refund policies.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Refunds
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Policies for unused services, especially during peak seasons or after travel starts.
                            </Typography>
                            <div className='mt-2 bg-accent/10 border-l-4 border-accent px-4 py-3 rounded'>
                                <Typography variant="small" className='font-medium text-accent-foreground'>
                                    Peak season time refund will not be available
                                </Typography>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Agency Responsibilities */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Agency Responsibilities & Limitations
                    </Typography>
                    <div className='space-y-5'>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Exclusions
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Agency generally not liable for personal injury, sickness, loss, or delays caused by third parties (airlines, hotels).
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Acts of God
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Not responsible for unforeseen events (natural disasters, pandemics).
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Documentation
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Role in arranging, but traveler responsible for correct docs (passports, visas).
                            </Typography>
                        </div>
                    </div>
                </section>

                {/* Client Responsibilities */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Client Responsibilities
                    </Typography>
                    <div className='space-y-5'>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Travel Documents
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Ensuring valid passports, visas, and required health certificates.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Travel Insurance
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Requirement to have adequate insurance, often covering pandemics/curtailment.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Conduct
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Punctuality, appropriate behavior, and promptly reporting issues on-site.
                            </Typography>
                        </div>
                    </div>
                </section>

                {/* General Clauses */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        General Clauses
                    </Typography>
                    <div className='space-y-5'>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Use of Images
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Consent for photos/videos to be used for marketing.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Service Quality
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Expectations for accommodation, meals, etc., and potential star rating differences.
                            </Typography>
                        </div>
                    </div>
                </section>

                {/* Payment & Pricing Details */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Payment & Pricing Details
                    </Typography>
                    <div className='space-y-5'>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Prices
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Subject to change until full payment received.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Payment Terms
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Required deposit/full payment; accepted methods.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Extra Charges
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Taxes, incidentals (laundry, phone) charged extra.
                            </Typography>
                        </div>
                    </div>
                </section>

                {/* Check-in/out */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Check-in/Check-out Policy
                    </Typography>
                    <div className='space-y-5'>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Times
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Standard check-in/out times (e.g., 3 PM check-in).
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h4" className='mb-2'>
                                Late Checkout
                            </Typography>
                            <Typography variant="p" className='leading-relaxed'>
                                Fees apply for late departure if not pre-arranged.
                            </Typography>
                        </div>
                    </div>
                </section>

                {/* International Tours */}
                <section className='mb-10'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        International Tour Terms
                    </Typography>
                    <div className='bg-primary/5 rounded-lg p-6 space-y-4'>
                        <Typography variant="p" className='leading-relaxed'>
                            International tour terms and conditions cover passenger responsibilities (valid passport, visa, insurance), company liabilities (unforeseen events, delays), payment/refund policies, itinerary exclusions like personal expenses, with crucial clauses on visa issues, baggage, and force majeure events, all forming a binding contract for your trip.
                        </Typography>
                        <Typography variant="p" className='leading-relaxed'>
                            Conditions apply for all our international Tour products, offers & prices are current at the time of communication & based on existing & often limited availability. Final Pricing & availability of offers/services may vary based on market conditions & prevailing Foreign Exchange Rates. Please confirm all relevant details with our sales.
                        </Typography>
                    </div>
                </section>

                {/* Jurisdiction */}
                <section className='mb-10 pb-8'>
                    <Typography variant="h2" className='mb-6 text-primary'>
                        Jurisdiction
                    </Typography>
                    <div className='bg-destructive/5 border border-destructive/20 rounded-lg p-6'>
                        <Typography variant="p" className='font-medium leading-relaxed'>
                            Subject to Jurisdiction: All disputes pertaining to the tour and any claim arising thereunder shall be subject to the Court of competent jurisdiction at Rajkot only.
                        </Typography>
                    </div>
                </section>

                {/* Footer Note */}
                <div className='pt-8 flex flex-col border-t border-border text-center'>
                    <Typography variant="small">
                        Last updated: January 2026
                    </Typography>
                    <Typography variant="small" className='mt-2'>
                        For any queries regarding these terms and conditions, please contact our customer support.
                    </Typography>
                </div>
            </div>
            </div>
        </div>
    );
}

export default TermsAndConditionsPage
