import React from 'react';
import { ShoppingCart, Package, Box, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardStats = () => {
    const stats = [
        {
            title: 'Today Order',
            amount: 'Rs. 300',
            bgColor: 'bg-teal-600',
        },
        {
            title: 'This Month',
            amount: 'Rs.5000',
            bgColor: 'bg-blue-500',
        },
        {
            title: 'Total Order',
            amount: 'Rs. 95000',
            bgColor: 'bg-green-600',
        },
    ];

    const orderStats = [
        {
            label: 'Total Order',
            value: '169',
            icon: ShoppingCart,
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-500',
        },
        {
            label: 'Order Pending',
            value: '34',
            icon: Package,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-500',
        },
        {
            label: 'Order Processing',
            value: '59',
            icon: Box,
            bgColor: 'bg-teal-50',
            iconColor: 'text-teal-500',
        },
        {
            label: 'Order Delivered',
            value: '65',
            icon: Check,
            bgColor: 'bg-green-50',
            iconColor: 'text-green-500',
        },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className={`${stat.bgColor} text-white`}>
                        <CardContent className="p-6">
                            <h3 className="text-sm font-medium opacity-80">{stat.title}</h3>
                            <p className="text-2xl font-bold mt-2">{stat.amount}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Order Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {orderStats.map((stat, index) => (
                    <Card key={index} className="border">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className={`${stat.bgColor} p-3 rounded-full`}>
                                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <p className="text-xl font-bold">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;