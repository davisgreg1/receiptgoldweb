'use client';

import { motion } from 'framer-motion';
import { FaReceipt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

// Define the shape of a floating element's data
interface FloatingItem {
    id: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
}

export default function FloatingElements() {
    const [items, setItems] = useState<FloatingItem[]>([]);

    useEffect(() => {
        // Generate random positions only after mount (client-side)
        const newItems = Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 5 + Math.random() * 3,
            delay: Math.random() * 2,
        }));
        setItems(newItems);
    }, []);

    if (items.length === 0) {
        return null; // Don't render anything on the server/first render to match hydration
    }

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute text-6xl opacity-10 text-gold-primary"
                    style={{
                        left: `${item.left}%`,
                        top: `${item.top}%`,
                    }}
                    initial={{ y: 0, rotate: 0, scale: 1 }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut" // Add an easing function for smoother loop
                    }}
                >
                    <FaReceipt />
                </motion.div>
            ))}
        </div>
    );
}
