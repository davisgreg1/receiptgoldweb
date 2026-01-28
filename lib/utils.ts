import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCategoryName(category: string): string {
  const categoryMap: Record<string, string> = {
    groceries: 'Groceries',
    restaurant: 'Restaurant & Dining',
    business_meals: 'Business Meals',
    entertainment: 'Entertainment',
    shopping: 'Shopping',
    travel: 'Travel',
    transportation: 'Transportation',
    utilities: 'Utilities',
    healthcare: 'Healthcare',
    professional_services: 'Professional Services',
    office_supplies: 'Office Supplies',
    equipment_software: 'Equipment & Software',
    other: 'Other'
  };

  return categoryMap[category] || categoryMap[category.toLowerCase()] || category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ');
}
