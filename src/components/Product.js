import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

export default function Product() {
    const params = useParams();
    //Mutation

    const mutation = useMutation({
        mutationFn: (newProduct) => {
            return axios.put(`https://dummyjson.com/products/${params.productId}`, newProduct)
        },
    })

    const fetchProduct = async () => {
        const response = await fetch(`https://dummyjson.com/products/${params.productId}`)
        const data = await response.json();
        return data;
    };
    const { isLoading, error, data: product } = useQuery({
        queryKey: ['product', params.productId],
        queryFn: fetchProduct,
        //staleTime: 10000 
    })


    if (isLoading) {
        return (
            <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}
            >
                <CircularProgress />
            </Box>
        )

    }

    if (error) {
        return <h3>Error:{error.message}</h3>
    }

    if (mutation.isPending) {
        return (
            <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}
            >
                <CircularProgress />
            </Box>
        )

    }

    if (mutation.isError) {
        return <h3>Error While Updating:{mutation.error.message}</h3>
    }

    return (
        <>
            <div>Product :{product.title}</div>
            <button
                onClick={() => {
                    mutation.mutate({ title: 'Updated Product' })
                }}
            >
                Update Product
            </button>
        </>
    )
}
