import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Box, Truck, Calendar, Store, CircleDot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface ProductCardProps {
  id: number;
  name: string | "";
  sale?: string;
  price: number;
  rating: number;
  reviews: number;
  answers: number;
  inStock: boolean;
  delivery: string;
  deliveryDate: string;
  seller: string;
  color?: string[];
  category: string;
  video?: string;
  model: string;
  size?: string[];
  images: string[];
  features: string[];
  description: string;

}


export function ProductCard({
  id,
  name,
  sale,
  price,
  rating,
  reviews,
  inStock,
  delivery,
  deliveryDate,
  seller,
  color,
  category,
  images
}: ProductCardProps) {

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < Math.floor(rating)
          ? "text-yellow-400 fill-yellow-400"
          : "text-gray-300"
          }`}
      />
    ));
  };

  return (
    <Link href={`/product/${id}`}>
      <div className="group relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          {sale && (
            <Badge className="absolute top-3 left-3 bg-red-500">
              {sale}
            </Badge>
          )}
          <div className="absolute top-3 right-3">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/90 hover:bg-white"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col gap-2">
          {/* Category */}
          <Badge variant="secondary" className="w-fit">
            {category}
          </Badge>

          {/* Title */}
          <h3 className="font-medium text-base text-gray-900 line-clamp-2">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-600">
              ({reviews} reviews)
            </span>
          </div>

          {/* Price and Stock */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{price.toLocaleString()}
            </span>
            {inStock ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                In Stock
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Delivery Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="h-4 w-4" />
            <span>{delivery}</span>
          </div>

          {/* Seller Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Store className="h-4 w-4" />
            <span>{seller}</span>
          </div>

          {/* Buy Button */}
          <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;