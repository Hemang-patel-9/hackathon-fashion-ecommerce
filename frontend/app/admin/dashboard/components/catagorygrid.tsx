import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const CategoryGrid = () => {
    // Extract all categories into a single array with their full paths
    const categories = [
        { title: "Latest Collections", path: "/new-arrival/latest-collection" },
        { title: "Lounge Wear", path: "/new-arrival/lounge-wear" },
        { title: "Solid Wear Clothing", path: "/new-arrival/solid-wear-clothing" },
        { title: "Plus Size Suits", path: "/new-arrival/plus-size" },
        { title: "Indian Sarees", path: "/new-arrival/indian-sarees" },
        { title: "Bedsheets", path: "/new-arrival/bedsheets" },
        { title: "Traditional Suits", path: "/ethnic-wear/traditional-suits" },
        { title: "Kurta Sets", path: "/ethnic-wear/kurta-sets" },
        { title: "Indian Wear", path: "/ethnic-wear/indian" },
        { title: "Western Wear", path: "/ethnic-wear/western" },
        { title: "Festive Collection", path: "/ethnic-wear/festive" },
        { title: "Traditional Sarees", path: "/ethnic-wear/traditional-sarees" },
        { title: "Most Popular", path: "/bestsellers/popular" },
        { title: "Trending Now", path: "/bestsellers/trending" },
        { title: "Top Rated", path: "/bestsellers/top-rated" },
        { title: "Customer Favorites", path: "/bestsellers/favorites" },
        { title: "Premium Collection", path: "/bestsellers/premium" },
        { title: "Cotton", path: "/fabrics/cotton" },
        { title: "Silk", path: "/fabrics/silk" },
        { title: "Chiffon", path: "/fabrics/chiffon" },
        { title: "Georgette", path: "/fabrics/georgette" },
        { title: "Premium Fabrics", path: "/fabrics/premium" },
        { title: "Clearance Sale", path: "/sale/clearance" },
        { title: "Season End", path: "/sale/season-end" },
        { title: "Bundle Deals", path: "/sale/bundles" },
        { title: "First Order Discount", path: "/sale/first-order" }
    ];

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">All Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <Link href={category.path} key={index} className="transform transition-transform hover:scale-105">
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