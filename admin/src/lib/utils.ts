import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc';

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const logger = (text: string, data: any): void => {
  const style = `
    font-size: 16px;
    padding: 4px;
    background-color: blue;
    color: white;
    font-weight: bold;
  `

  console.log(`%c${text}`, style, data)
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

dayjs.extend(utc);

export const formatDate = (time: string, isTime = false) => {
  const date = dayjs.utc(time);
  if (!isTime) {
    return date.format('DD MMM YYYY');
  }
  return date.format('DD MMM YYYY, hh:mm A');
}