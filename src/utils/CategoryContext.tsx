import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchData } from './fetchUtils';

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
        const fetchCategories = fetchData<any>(`http://localhost:8080/settings/category`)
        fetchCategories((categories: any) => {
            setCategoryNames(categories)
        })
        return categoryNames
    }

    const getNameForCategory = (category: string) => {
        return categoryNames[category]
    }

    // useEffect(() => {
    //     const fetchCategories = fetchData<any>(`http://localhost:8080/settings/category`)
    //     fetchCategories((categories: any) => {
    //         updateCategoryNames(categories)
    //     })
    //   }, [updateCategoryNames]);


    return <CategoryContext.Provider value={{ categoryNames, updateCategoryNames, getCategoryNames, getNameForCategory }}>
        {children}
    </CategoryContext.Provider>
};

export const useCategoryContext = () => {
    return useContext(CategoryContext);
};

