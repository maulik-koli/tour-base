import React, { useState } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

interface InputOtpProps {
    onChange: (value: string) => void;
    slots?: number;
}

function isNumericString(str: string): boolean {
    return /^[0-9]+$/.test(str);
}


const InputOtp: React.FC<InputOtpProps> = ({ onChange, slots = 6 }) => {
    const [internalValue, setInternalValue] = useState<string>('');

    const handleChange = (newValue: string) => {
        if (newValue.length > 0 && !isNumericString(newValue.slice(-1))) return;
        
        setInternalValue(newValue);
        onChange(newValue);
    }


    return (
        <InputOTP value={internalValue} onChange={handleChange} maxLength={slots}>
           <InputOTPGroup className="w-full gap-3 justify-between">
                {Array.from({ length: slots }, (_, index) => (
                    <InputOTPSlot 
                        key={index} 
                        index={index} 
                        className="h-12 w-12 text-lg rounded-md" 
                    />
                ))}
            </InputOTPGroup>
        </InputOTP>
    )
}

export default InputOtp