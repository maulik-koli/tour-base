
export const getBookingStatusStyles = (status: string) => {
    switch (status) {
        case "PAID_FULL":
            return "bg-green-100 text-green-700"
        case "PAID_PARTIAL":
            return "bg-blue-100 text-blue-700"
        case "DETAILS_FILLED":
            return "bg-yellow-100 text-yellow-700"
        case "DRAFT":
            return "bg-muted text-muted-foreground"
        case "FAILED":
            return "bg-red-100 text-red-700"
        default:
            return "bg-muted text-muted-foreground"
    }
}

export const getPaymentStatusStyles = (status: string) => {
    switch (status) {
        case "PAID":
            return "bg-green-100 text-green-700"
        case "ACTIVE":
            return "bg-yellow-100 text-yellow-700"
        case "EXPIRED":
            return "bg-blue-100 text-blue-700"
        case "CANCELLED":
            return "bg-muted text-muted-foreground"
        default:
            return "bg-muted text-muted-foreground"
    }
}


export const getOrderStatusStyles = (status: string) => {
    switch (status) {
        case "PAID":
            return "bg-green-100 text-green-700"
        case "ACTIVE":
            return "bg-blue-100 text-blue-700"
        case "EXPIRED":
            return "bg-muted text-muted-foreground"
        case "CANCELLED":
            return "bg-red-100 text-red-700"
        default:
            return "bg-muted text-muted-foreground"
    }
}