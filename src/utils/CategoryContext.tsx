import React, { createContext, useContext, useState } from 'react';

type CategoryContextType = {
    categoryNames: { [key: string]: string },
    updateCategoryNames: (categoryNames: { [key: string]: string }) => void,
    getCategoryNames: () => { [key: string]: string },
    getNameForCategory: (category: string) => string
}

export const CategoryContext = createContext<CategoryContextType>({
    categoryNames: {},
    updateCategoryNames: (categoryNames: { [key: string]: string }) => { },
    getCategoryNames: () => ({}),
    getNameForCategory: (category: string) => ""
});

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [categoryNames, setCategoryNames] = useState<{ [key: string]: string }>({
        beige: 'beige',
        accent: 'accent',
        green: 'green',
        grey: 'grey',
    });

    const updateCategoryNames = (newNames: { [key: string]: string }) => {
        setCategoryNames(newNames)
    }

    const getCategoryNames = () => {
        return categoryNames
    }

    const getNameForCategory = (category: string) => {
        return categoryNames[category]
    }

    return <CategoryContext.Provider value={{ categoryNames, updateCategoryNames, getCategoryNames, getNameForCategory }}>
        {children}
    </CategoryContext.Provider>
};

export const useCategoryContext = () => {
    return useContext(CategoryContext);
};

