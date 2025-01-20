import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const CategoryGrid = () => {
    // Extract all categories into a single array with their full paths
    const categories = [
        { title: "Latest Collections", path: "/admin/dashboard/category/latest-collection" },
        { title: "Lounge Wear", path: "/admin/dashboard/category/lounge-wear" },
        { title: "Solid Wear Clothing", path: "/admin/dashboard/category/solid-wear-clothing" },
        { title: "Plus Size Suits", path: "/admin/dashboard/category/plus-size" },
        { title: "Indian Sarees", path: "/admin/dashboard/category/indian-sarees" },
        { title: "Bedsheets", path: "/admin/dashboard/category/bedsheets" },
        { title: "Traditional Suits", path: "/admin/dashboard/category/traditional-suits" },
        { title: "Kurta Sets", path: "/admin/dashboard/category/kurta-sets" },
        { title: "Indian Wear", path: "/admin/dashboard/category/indian" },
        { title: "Western Wear", path: "/admin/dashboard/category/western" },
        { title: "Festive Collection", path: "/admin/dashboard/category/festive" },
        { title: "Traditional Sarees", path: "/admin/dashboard/category/traditional-sarees" },
        { title: "Most Popular", path: "/admin/dashboard/category/popular" },
        { title: "Trending Now", path: "/admin/dashboard/category/trending" },
        { title: "Top Rated", path: "/admin/dashboard/category/top-rated" },
        { title: "Customer Favorites", path: "/admin/dashboard/category/favorites" },
        { title: "Premium Collection", path: "/admin/dashboard/category/premium" },
        { title: "Cotton", path: "/admin/dashboard/category/cotton" },
        { title: "Silk", path: "/admin/dashboard/category/silk" },
        { title: "Chiffon", path: "/admin/dashboard/category/chiffon" },
        { title: "Georgette", path: "/admin/dashboard/category/georgette" },
        { title: "Premium Fabrics", path: "/admin/dashboard/category/premium" },
        { title: "Clearance Sale", path: "/admin/dashboard/category/clearance" },
        { title: "Season End", path: "/admin/dashboard/category/season-end" },
        { title: "Bundle Deals", path: "/admin/dashboard/category/bundles" },
        { title: "First Order Discount", path: "/admin/dashboard/category/first-order" }
    ];

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">All Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <Link
                        href={category.path}
                        key={index}
                        className="transform transition-transform hover:scale-105"
                    >
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-lg text-gray-800">
                                            {category.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Browse Collection
                                        </p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryGrid;