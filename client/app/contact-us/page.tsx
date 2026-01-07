import React from "react";
import Icon, { IconName } from "@/components/icons";
import { Typography } from "@ui/typography";

const CONTACT_US_PAGE_DATA: { icon: IconName, title: string, subtitle: string }[] = [
    {
        icon: "TicketCheck",
        title: "Booking Assistance",
        subtitle: "Help with tour bookings, reservations, and special requests"
    },
    {
        icon: "Info",
        title: "Tour Information",
        subtitle: "Inquire about destinations, itineraries, and available packages"
    },
    {
        icon: "Headset",
        title: "Customer Support",
        subtitle: "Resolve issues, track your bookings, or get travel assistance"
    },
] 

export const metadata = {
    title: "Contact Us",
    description: "Get in touch with Eklavya Tourism for bookings, inquiries, and travel assistance.",
    alternates: {
        canonical: "/contact-us",
    },
};

const ContactUsPage: React.FC = () => {
    return (
        <div className='min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-20'>
            <div className='max-w-7xl mx-auto'>
                <div className='mb-12 text-center'>
                    <Typography variant="h1" className='mb-4'>
                        Get In Touch
                    </Typography>
                    <Typography variant="muted" className='text-base max-w-2xl mx-auto'>
                        We're here to help you plan your perfect journey. Reach out to us anytime!
                    </Typography>
                </div>

                <div className='grid lg:grid-cols-2 gap-8 mb-12'>
                    <div className='bg-linear-to-br from-primary/5 via-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-10 h-fit border-2 border-primary/20 shadow-lg'>
                        <Typography variant="h2" className='mb-8 text-primary'>
                            Contact Information
                        </Typography>
                        
                        <div className='space-y-8'>
                            <div className='flex items-start gap-4'>
                                <div className='bg-primary/20 p-3 rounded-lg mt-1'>
                                    <Icon name="Phone" className='w-5 h-5 text-primary' />
                                </div>
                                <div>
                                    <Typography variant="h4" className='mb-2'>
                                        Call Us
                                    </Typography>
                                    <a href="tel:+918000057070" className='block hover:text-primary transition-colors'>
                                        <Typography variant="p" className='font-semibold'>
                                            +91 8000057070
                                        </Typography>
                                    </a>
                                    <Typography variant="small" className='text-muted-foreground mt-1'>
                                        24/7 Support Available
                                    </Typography>
                                </div>
                            </div>

                            <div className='flex items-start gap-4'>
                                <div className='bg-primary/20 p-3 rounded-lg mt-1'>
                                    <Icon name="MessageCircle" className='w-5 h-5 text-primary' />
                                </div>
                                <div>
                                    <Typography variant="h4" className='mb-2'>
                                        Email Us
                                    </Typography>
                                    <a href="mailto:eklavyatourism@gmail.com" className='block hover:text-primary transition-colors'>
                                        <Typography variant="p" className='font-semibold'>
                                            eklavyatourism@gmail.com
                                        </Typography>
                                    </a>
                                    <a href="mailto:eklavyatourism17@gmail.com" className='block hover:text-primary transition-colors mt-1'>
                                        <Typography variant="p" className='font-semibold'>
                                            eklavyatourism17@gmail.com
                                        </Typography>
                                    </a>
                                    <Typography variant="small" className='text-muted-foreground mt-1'>
                                        24/7 Email Support
                                    </Typography>
                                </div>
                            </div>

                            <div className='flex items-start gap-4'>
                                <div className='bg-primary/20 p-3 rounded-lg mt-1'>
                                    <Icon name="MapPinned" className='w-5 h-5 text-primary' />
                                </div>
                                <div>
                                    <Typography variant="h4" className='mb-2'>
                                        Visit Us
                                    </Typography>
                                    <Typography variant="p" className='leading-relaxed'>
                                        EKLAVYA TOURISM<br />
                                        Hanuman Madhi Chowk,<br />
                                        Raiya Road, 150 feet Ring Road,<br />
                                        Rajkot - 360007
                                    </Typography>
                                    <Typography variant="small" className='text-muted-foreground mt-2 block'>
                                        Weekdays Only (9 AM - 1 PM & 4 PM - 8 PM)
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div className='mt-10 pt-8 border-t border-border'>
                            <div className='flex items-center gap-3'>
                                <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                                <Typography variant="p" className='font-medium'>
                                    We're Available 24/7
                                </Typography>
                            </div>
                            <Typography variant="small" className='text-muted-foreground mt-2'>
                                Phone & Email support around the clock
                            </Typography>
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div className='bg-card border border-border rounded-2xl p-8 shadow-sm'>
                            <Typography variant="h3" className='mb-6'>
                                Support Hours
                            </Typography>
                            <div className='space-y-4'>
                                <div className='flex items-start gap-3'>
                                    <Icon name="Phone" className='w-5 h-5 text-primary mt-1' />
                                    <div className='flex-1'>
                                        <Typography variant="h4" className='mb-1'>
                                            Phone Support
                                        </Typography>
                                        <Typography variant="p" className='text-sm text-muted-foreground'>
                                            24 hours a day, 7 days a week
                                        </Typography>
                                    </div>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <Icon name="MessageCircle" className='w-5 h-5 text-primary mt-1' />
                                    <div className='flex-1'>
                                        <Typography variant="h4" className='mb-1'>
                                            Email Support
                                        </Typography>
                                        <Typography variant="p" className='text-sm text-muted-foreground'>
                                            24 hours a day, 7 days a week
                                        </Typography>
                                    </div>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <Icon name="MapPinned" className='w-5 h-5 text-primary mt-1' />
                                    <div className='flex-1'>
                                        <Typography variant="h4" className='mb-1'>
                                            Office Visits
                                        </Typography>
                                        <Typography variant="p" className='text-sm text-muted-foreground'>
                                            Weekdays only during business hours
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-accent/10 border-l-4 border-accent rounded-lg p-6'>
                            <Typography variant="h4" className='mb-2 text-accent-foreground'>
                                Need Immediate Help?
                            </Typography>
                            <Typography variant="p" className='text-sm text-accent-foreground/80 mb-4'>
                                Don't hesitate to reach out. Our team is ready to assist you with your travel plans.
                            </Typography>
                            <div className='flex gap-3 flex-wrap'>
                                <a 
                                    href="tel:+918000057070" 
                                    className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium'
                                >
                                    <Icon name="Phone" className='w-4 h-4' />
                                    Call Now
                                </a>
                                <a 
                                    href="mailto:eklavyatourism@gmail.com" 
                                    className='inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium'
                                >
                                    <Icon name="MessageCircle" className='w-4 h-4' />
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <section className='mt-12 bg-muted/20 rounded-2xl p-8 lg:p-10 border border-border'>
                    <Typography variant="h2" className='mb-2'>
                        How Can We Assist You?
                    </Typography>
                    <Typography variant="muted" className='mb-8'>
                        Our team is here to help with various aspects of your travel planning
                    </Typography>
                    
                    <div className='space-y-2 mt-3'>
                        {CONTACT_US_PAGE_DATA.map((item, index) => (
                            <div 
                                key={index+item.icon}
                                className='flex flex-col gap-2 p-4 rounded-lg hover:bg-background/50 transition-colors hover:border-primary border border-border'
                            >
                                <div className="flex items-start gap-4">
                                    <Icon name={item.icon} className='w-6 h-6 text-primary mt-1.5 shrink-0' />
                                    <Typography variant="h4">
                                        {item.title}
                                    </Typography>
                                </div>
                                <Typography variant="p" className='text-sm text-muted-foreground'>
                                    {item.subtitle}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ContactUsPage;