"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGetCategories } from '@module/category/api/queries'
import { useCategoryStore } from '@/store'

import Icon from '@/components/icons'
import ErrorBlock from '@/components/error-block'
import FallbackImage from '@/components/fallback-image'
import { Button } from '@ui/button'
import { Typography } from '@ui/typography'
import { Card, CardContent, CardHeader } from '@ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CustomSpinner } from '@ui/spinner'


const CategoryTable: React.FC = () => {
    const router = useRouter();
    const setCategories = useCategoryStore(s => s.setCategories);
    const { data, isLoading, error } = useGetCategories();

    useEffect(() => {
        if(isLoading && error) return;
        
        if(data && data.data) {
            setCategories(data.data);
        }
    }, [data, setCategories, isLoading, error])
    

    const getContent = () => {
        if (isLoading) {
            return (
                <TableRow>
                    <TableCell colSpan={4}>
                        <CustomSpinner className='w-full h-30 flex items-center justify-center' />
                    </TableCell>
                </TableRow>
            )
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan={4}>
                        <ErrorBlock
                            type='error' 
                            message={error?.message} 
                            description='Please try again later.'
                            className='min-h-30'
                        />
                    </TableCell>
                </TableRow>
            )
        }

        if(!data || (data && data.data?.length === 0)) {
            return (
                <TableRow>
                    <TableCell colSpan={4}>
                        <ErrorBlock 
                            type='no-data'
                            message='No tours found.'
                            description='Please change your search criteria or create a new tour.'
                            className='min-h-30'
                        />
                    </TableCell>
                </TableRow>
            )
        }

        return (
            <>
                {data.data?.map((category) => (
                    <TableRow key={category._id}>
                        <TableCell>
                            <div className='relative w-15 aspect-square bg-muted rounded-xl overflow-hidden'>
                                <FallbackImage 
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    crop="fill"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className='rounded-xl'
                                />
                            </div>
                        </TableCell>
                        <TableCell className='max-w-70 truncate font-medium'>{category.name}</TableCell>
                        <TableCell className='max-w-30 truncate'>{category.value}</TableCell>
                        <TableCell>
                            <Button 
                                variant="outline"
                                size="icon"
                                type='button'
                                onClick={() => router.push(`/category/${category.value}`)}
                            >
                                <Icon name="Pencil" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </>
        )
    }


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
                            {getContent()}
                        </TableBody>
                        </Table>
                </CardContent>
            </CardContent>
        </Card>
    )
}

export default CategoryTable
