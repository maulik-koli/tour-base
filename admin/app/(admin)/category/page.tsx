import { Metadata } from 'next'
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Categories',
    description: 'Manage tour categories',
}

export default function CategoryPage() {
    redirect('/');
}