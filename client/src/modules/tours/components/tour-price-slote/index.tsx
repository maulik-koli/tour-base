import React from 'react'
import Icon from '@/components/icons'
import { Typography } from '@/components/ui/typography'
import { generatePriceRanges } from '@modules/tours/utils/generatePriceRanges';

interface TourPriceSlotProps {
    priceSlots: any[];
    basePrice: number;
}


const TourPriceSlot: React.FC<TourPriceSlotProps> = ({ priceSlots, basePrice }) => {
    const [showPriceDetails, setShowPriceDetails] = React.useState(false);

    // Reset when priceSlots change
    React.useEffect(() => {
        setShowPriceDetails(false);
    }, [priceSlots]);

    const ranges = generatePriceRanges(priceSlots, basePrice);
    const firstRange = ranges[0];


    if (!priceSlots || priceSlots.length === 0) {
        return (
            <div className='flex items-center justify-between py-2 pl-6'>
                <Typography variant="p" className='text-muted-foreground'>Per Person</Typography>
                <Typography variant="p" className='font-semibold text-primary'>
                    ₹{basePrice.toLocaleString('en-IN')}
                    <span className='text-xs text-muted-foreground font-normal'>/person</span>
                </Typography>
            </div>
        );
    }

    return (
        <div className='space-y-2 pl-6'>
            {firstRange && (
                <div className='flex items-center justify-between py-2'>
                    <Typography variant="p" className='text-muted-foreground'>
                        {firstRange.range}
                    </Typography>
                    <Typography variant="p" className='font-semibold text-primary'>
                        ₹{firstRange.price.toLocaleString('en-IN')}
                        <span className='text-xs text-muted-foreground font-normal'>/person</span>
                    </Typography>
                </div>
            )}
            
            {ranges.length > 1 && (
                <button
                    onClick={() => setShowPriceDetails(!showPriceDetails)}
                    className='flex items-center gap-2 text-primary hover:underline text-sm font-medium'
                >
                    <Icon name={showPriceDetails ? "ChevronUpIcon" : "ChevronDownIcon"} width={16} height={16} />
                    {showPriceDetails ? 'Hide Group Discounts' : 'View Group Discounts'}
                </button>
            )}
            
            {showPriceDetails && (
                <div className='space-y-1.5 pt-2 border-t border-border'>
                    {ranges.slice(1).map((range, index) => (
                        <div key={`range-${index}`} className='flex items-center justify-between py-2 border-b border-border last:border-0'>
                            <Typography variant="p" className='text-muted-foreground'>
                                {range.range}
                            </Typography>
                            <Typography variant="p" className='font-semibold text-primary'>
                                ₹{range.price.toLocaleString('en-IN')}
                                <span className='text-xs text-muted-foreground font-normal'>/person</span>
                            </Typography>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TourPriceSlot
