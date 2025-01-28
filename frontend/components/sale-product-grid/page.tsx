'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Package, ImageOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from "sonner";

export interface Product {
    _id: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    inStock: number;
    delivery: string;
    deliveryDate: string;
    seller: string;
    color: string[];
    category: string;
    model: string;
    size: string[];
    images: string[];
    redirectLink: string;
}

const ProductGridComponent: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const [addingToCart, setAddingToCart] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/category');
            if (!response.ok) throw new Error('Failed to fetch products');
            const result = await response.json();
            if (result?.data && Array.isArray(result.data)) {
                setProducts(result.data);
            } else {
                throw new Error('Invalid response format');
            }
            setError(null);
        } catch (err: any) {
            console.error('Fetch Error:', err);
            setError(err.message || 'Failed to fetch data.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = async (product: Product) => {
        try {
            setAddingToCart(prev => ({ ...prev, [product._id]: true }));

            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1,
                    price: product.price,
                    name: product.name,
                    image: product.images[0]
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            const result = await response.json();
            toast.success('Added to cart successfully');

        } catch (error) {
            console.error('Add to cart error:', error);
            toast.error('Failed to add item to cart');
        } finally {
            setAddingToCart(prev => ({ ...prev, [product._id]: false }));
        }
    };

    const handleImageError = (productId: string) => {
        setImageErrors(prev => ({ ...prev, [productId]: true }));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear"
                    }}
                    className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center p-8 bg-red-50 rounded-lg">
                    <h3 className="text-red-600 text-xl font-semibold mb-2">Error Loading Products</h3>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="container mx-auto px-2 sm:px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {products.map((product) => {
                    const redirectLink = product.redirectLink || '/404';
                    const hasValidImage = !imageErrors[product._id];
                    const isAddingToCart = addingToCart[product._id];

                    return (
                        <motion.div
                            key={product._id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-[500px] sm:h-[600px] flex flex-col"
                            whileHover={{ y: -5 }}
                        >
                            <div className="relative h-[250px] sm:h-[300px]">
                                <Link href={redirectLink} className="block h-full">
                                    <div className="relative w-full h-full bg-gray-50">
                                        {hasValidImage ? (
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-cover hover:scale-110 transition-transform duration-500"
                                                onError={() => handleImageError(product._id)}
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                                <ImageOff className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                                            </div>
                                        )}
                                        {product.inStock <= 5 && product.inStock > 0 && (
                                            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs">
                                                Only {product.inStock} left!
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <Link href={redirectLink} className="mb-2">
                                    <h2 className="font-semibold text-gray-800 text-sm sm:text-base hover:text-red-600 transition-colors line-clamp-2">
                                        {product.name}
                                    </h2>
                                </Link>

                                <div className="flex items-center gap-1 my-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                fill={i < Math.floor(product.rating) ? '#ef4444' : 'none'}
                                                className="text-red-500"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-500">({product.reviews})</span>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex flex-col">
                                            <span className="text-sm sm:text-xl font-bold text-gray-900">
                                                ₹{product.price.toLocaleString('en-IN')}
                                            </span>
                                            {product.delivery && (
                                                <span className="text-xs text-gray-500">
                                                    Delivery by {product.deliveryDate}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {product.inStock > 0 ? (
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={isAddingToCart}
                                            className="w-full bg-red-600 text-white py-2.5 rounded-lg text-sm 
                                                     hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2 group
                                                     disabled:bg-red-400 disabled:cursor-not-allowed"
                                        >
                                            <ShoppingCart className={`w-4 h-4 ${isAddingToCart ? 'animate-spin' : 'group-hover:animate-bounce'}`} />
                                            <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
                                        </button>
                                    ) : (
                                        <div className="w-full bg-red-50 text-red-600 text-center py-2.5 rounded-lg text-sm">
                                            Out of Stock
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default ProductGridComponent;