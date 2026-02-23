import React from 'react'
import { Metadata } from 'next'
import CategoryDetailPageClient from '@module/category/components/category-detail-page-client'

export const metadata: Metadata = {
    title: 'Category Details',
    description: 'View and edit category information',
}

const CategoryDetail: React.FC = () => {
    return <CategoryDetailPageClient />
}

export default CategoryDetail