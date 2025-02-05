'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Save,
    X,
    ChevronDown,
    Calendar,
    Truck
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/Loader';

const SIZE_OPTIONS = [
    'XS', 'S', 'M', 'L', 'XL',
    '2XL', '3XL',
    '28', '30', '32', '34', '36', '38', '40',
    'Free Size'
];

const COLOR_OPTIONS = [
    'Red', 'Blue', 'Green', 'Black', 'White',
    'Navy Blue', 'Gray', 'Maroon', 'Purple',
    'Yellow', 'Pink', 'Orange'
];

interface ProductData {
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
    features: string[];
    description: string;
    chartData: { month: string; revenue: number }[];
}

const ProductUpdateForm: React.FC = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [productData, setProductData] = useState<ProductData>({
        name: '',
        price: 0,
        rating: 0,
        reviews: 0,
        inStock: 0,
        delivery: '',
        deliveryDate: '',
        seller: '',
        color: [],
        category: '',
        model: '',
        size: [],
        features: [],
        description: '',
        chartData: []
    });

    const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
    const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // Extract the product ID from the URL pathname
                const pathname = window.location.pathname;
                const productId = pathname.split('/').pop();

                if (!productId) {
                    throw new Error('Product ID not found');
                }

                const response = await fetch(`/api/product/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }

                const data = await response.json();
                setProductData(data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                alert('Failed to load product data');
                router.push('/admin/dashboard/manageproduct');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductData();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleSize = (size: string) => {
        setProductData(prev => ({
            ...prev,
            size: (prev.size || []).includes(size)
                ? (prev.size || []).filter(s => s !== size)
                : [...(prev.size || []), size]
        }));
    };

    const toggleColor = (color: string) => {
        setProductData(prev => ({
            ...prev,
            color: prev.color.includes(color)
                ? prev.color.filter(c => c !== color)
                : [...prev.color, color]
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const pathname = window.location.pathname;
        const productId = pathname.split('/').pop();

        try {
            const response = await fetch(`/api/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });
            console.log(response);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            toast.success('Product Updated Successfully');
            router.push('/admin/dashboard/manageproducts');
        } catch (error) {
            console.error('Product update failed:', error);
            toast.error('Some error occur');
        }
    };

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-6"
        >
            <Toaster position="top-right" />
            <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">
                Update Product
            </h1>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                        className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                        required
                    />
                    <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                </div>
                <div className="relative">
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                        required
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500">₹</span>
                </div>
            </div>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                    className="w-full p-3 border rounded-lg flex items-center justify-between 
                    focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    <span>
                        {productData.size?.length > 0
                            ? productData.size.join(', ')
                            : 'Select Sizes'}
                    </span>
                    <ChevronDown className="text-red-500" />
                </button>

                {isSizeDropdownOpen && (
                    <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                        {SIZE_OPTIONS.map((size) => (
                            <div
                                key={size}
                                onClick={() => toggleSize(size)}
                                className={`p-2 cursor-pointer hover:bg-red-50 
                                ${productData.size?.includes(size) ? 'bg-red-100' : ''}`}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                    className="w-full p-3 border rounded-lg flex items-center justify-between 
                    focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    <span>
                        {productData.color.length > 0
                            ? productData.color.join(', ')
                            : 'Select Colors'}
                    </span>
                    <ChevronDown className="text-red-500" />
                </button>

                {isColorDropdownOpen && (
                    <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                        {COLOR_OPTIONS.map((color) => (
                            <div
                                key={color}
                                onClick={() => toggleColor(color)}
                                className={`p-2 cursor-pointer hover:bg-red-50 
                                ${productData.color.includes(color) ? 'bg-red-100' : ''}`}
                            >
                                {color}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                    <input
                        type="text"
                        name="delivery"
                        value={productData.delivery}
                        onChange={handleInputChange}
                        placeholder="Delivery Type"
                        className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                </div>
                <div className="relative">
                    <input
                        type="date"
                        name="deliveryDate"
                        value={productData.deliveryDate}
                        onChange={handleInputChange}
                        className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300
                        text-gray-600 appearance-none"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                </div>
            </div>

            <div className="relative">
                <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                    className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 min-h-[150px]"
                />
                <Plus className="absolute left-3 top-4 text-red-500" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                    <input
                        type="number"
                        name="inStock"
                        value={productData.inStock}
                        onChange={handleInputChange}
                        placeholder="Stock Quantity"
                        className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500">#</span>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        placeholder="Category"
                        className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                    <input
                        type="text"
                        name="model"
                        value={productData.model}
                        onChange={handleInputChange}
                        placeholder="Model Number"
                        className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                </div>
                <div className="relative">
                    <input
                        type="text"
                        name="seller"
                        value={productData.seller}
                        onChange={handleInputChange}
                        placeholder="Seller Name"
                        className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                </div>
            </div>

            <div className="flex space-x-4">
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                    <Save className="mr-2" /> Update Product
                </motion.button>

                <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/admin/dashboard/manageproducts')}
                    className="flex items-center justify-center bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    <X className="mr-2" /> Cancel
                </motion.button>
            </div>
        </motion.form>
    );
};

export default ProductUpdateForm;