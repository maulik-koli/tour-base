
// Generate price ranges based on price slots
export const generatePriceRanges = (priceSlots: any[], basePrice: number) => {
    if (!priceSlots || priceSlots.length === 0) return [];
    
    // Debug: log the first slot to see the structure
    console.log('Price Slots:', priceSlots);
    
    const sortedSlots = [...priceSlots].sort((a, b) => {
        const aPersons = a.persons || a.person || 0;
        const bPersons = b.persons || b.person || 0;
        return aPersons - bPersons;
    });
    const ranges: { range: string; price: number }[] = [];
    
    sortedSlots.forEach((slot, index) => {
        const currentPerson = slot.persons || slot.person || 0;
        const nextSlot = index < sortedSlots.length - 1 ? sortedSlots[index + 1] : null;
        const nextPerson = nextSlot ? (nextSlot.persons || nextSlot.person || 0) : null;
        
        // Check if consecutive (gap of 1)
        if (nextPerson && nextPerson === currentPerson + 1) {
            // Write individual numbers if consecutive
            ranges.push({
                range: `${currentPerson} ${currentPerson === 1 ? 'Person' : 'Persons'}`,
                price: slot.price
            });
        } else {
            // Write as range
            if (nextPerson) {
                ranges.push({
                    range: `${currentPerson}-${nextPerson - 1} Persons`,
                    price: slot.price
                });
            } else {
                // Last slot - show as range up to 12 or just the number
                if (currentPerson === 12) {
                    ranges.push({
                        range: `${currentPerson} Persons`,
                        price: slot.price
                    });
                } else {
                    ranges.push({
                        range: `${currentPerson}-12 Persons`,
                        price: slot.price
                    });
                }
            }
        }
    });
    
    return ranges;
};