"use client"
import React from 'react'
import Icon from '@/components/icons'
import { Button } from '@ui/button'
import { Card, CardContent, CardHeader } from '@ui/card'
import { Typography } from '@ui/typography'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import FallbackImage from '@/components/fallback-image'
import { useRouter } from 'next/navigation'

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid  foasubfaoufb asoufb asoubf fasubfoasubf aoufb fsaubfoasu bfou",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card a0usfoausb foausbf oausb fo",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

const CategoryTable: React.FC = () => {
    const router = useRouter();

    return (
        <Card className='w-full col-span-8'>
            <CardHeader className='flex items-center justify-between'>
                <Typography variant="lead">Categories</Typography>
                <Button onClick={() => router.push('/category/create')}>
                    <Icon name="Plus" className="w-4 h-4" />
                    Add Category
                </Button>
            </CardHeader>
            <CardContent>
                <CardContent className='px-0'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Images</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell>
                                        <div className='relative w-15 aspect-square bg-muted rounded-xl overflow-hidden'>
                                            <FallbackImage 
                                                src="randomg url"
                                                fill
                                                crop="fill"
                                                alt=""
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className='rounded-xl'
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className='max-w-70 truncate font-medium'>{invoice.paymentStatus}</TableCell>
                                    <TableCell className='max-w-30 truncate'>{invoice.paymentMethod}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="outline"
                                            size="icon"
                                            type='button'
                                            onClick={() => router.push(`/category/${invoice.invoice}`)}
                                        >
                                            <Icon name="Pencil" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                </CardContent>
            </CardContent>
        </Card>
    )
}

export default CategoryTable
