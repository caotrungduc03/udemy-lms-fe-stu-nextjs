"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import course from '../../public/excercise.jpg';

const fakeData = [
    {
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp 1111",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },
    {
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp2222",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },
    {
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp3333",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },
    {
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },
    {
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },
    {
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },{
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },
    {
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },{
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },
    {
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },{
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },
    {
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },{
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },
    {
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },{
        img: course,
        summary: "100 Days of Code: The Complete Python Pro Bootcamp",
        description: "Master by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
        author: "Author",
        price: 299
    },
];


export const Search: React.FC = () => {
    const searchParam = useSearchParams()
    const search = searchParam.get('query') || ""
    const [isHovered, setIsHovered] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    
    
    
    const filteredData = fakeData.filter(course =>
        course.summary.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
    );
    
    const [numberResults, setNumResults] = useState(filteredData.length);

    React.useEffect(() => {
        setNumResults(filteredData.length);
    }, [filteredData]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginationNumbers = () => {
        const pages: (number | string)[] = [];
        const totalPagesToShow = 5; // Số trang hiển thị tối đa (bao gồm cả ... nếu có)
    
        if (totalPages <= totalPagesToShow) {
            // Nếu tổng số trang ít hơn hoặc bằng số trang tối đa hiển thị, hiển thị tất cả các trang
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Luôn hiển thị trang đầu và cuối
            pages.push(1);
            
            // Tính toán các trang ở giữa cần hiển thị
            let leftBound = Math.max(2, currentPage - 1);
            let rightBound = Math.min(totalPages - 1, currentPage + 1);
    
            // Nếu có các trang bị ẩn bên trái
            if (leftBound > 2) {
                pages.push("...");
            }
    
            for (let i = leftBound; i <= rightBound; i++) {
                pages.push(i);
            }
    
            // Nếu có các trang bị ẩn bên phải
            if (rightBound < totalPages - 1) {
                pages.push("...");
            }
    
            pages.push(totalPages);
        }
    
        return pages;
    };
    

    return (
        <>
            <div className='grid grid-cols-12 my-5'>
                <div className='col-span-1'/>
                <h1 className='font-bold text-2xl col-span-11'>{numberResults} result for "{search}"</h1>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-1"/>
                <div className='col-span-10'>
                    <div className='min-w-[800px] grid grid-cols-10 flex'>
                        <div id="filter" className="col-span-2 mr-5">
                            <select
                                name="options"
                                className={`w-full p-2 border border-black mb-4 mt-2 cursor-pointer ${isHovered ? 'bg-gray-200' : ''}`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <option value="old">Oldest</option>
                                <option value="new">Newest</option>
                            </select>
                            <div className='flex flex-col'>
                                <span className='font-bold border-t border-gray-200 pt-2'>Language</span>
                                <div className='text-gray-800 text-sm'>
                                    <input type="checkbox" id="checkbox1" className='m-2'/>English
                                </div>
                                <div className='text-gray-800 text-sm'>
                                    <input type="checkbox" id="checkbox2" className='m-2'/>Tiếng Việt
                                </div>
                            </div>
                            <div className='flex flex-col pt-2'>
                                <span className='font-bold border-t border-gray-200 pt-2'>Topic</span>
                                <div className='text-gray-800 text-sm'>
                                    <input type="checkbox" id="checkbox1" className='m-2'/>Python
                                </div>
                                <div className='text-gray-800 text-sm'>
                                    <input type="checkbox" id="checkbox2" className='m-2'/>C++
                                </div>
                            </div>
                            <div className='flex flex-col pt-2'>
                                <span className='font-bold border-t border-gray-200 pt-2'>Price</span>
                                <div className='text-gray-800 text-sm'>
                                    <input type="checkbox" id="checkbox1" className='m-2'/>Paid
                                </div>
                                <div className='text-gray-800 text-sm'>
                                    <input type="checkbox" id="checkbox2" className='m-2'/>Free
                                </div>
                            </div>
                        </div>
                        <div className='col-span-8'>
                            {currentData.map((course, index) => (
                                <div key={index} id="result" className='flex py-2 border-b border-gray-200'>
                                    <Image src={course.img} alt="course" className='border border-gray-200 mr-5'/>
                                    <div className='space-y-2'>
                                        <Link href="/course" className='font-bold text-sm'>{course.summary}</Link>
                                        <h2 className='text-gray-700 text-sm'>{course.description}</h2>
                                        <h3 className='text-xs text-gray-500'>{course.author}</h3>
                                        <button className='font-bold bg-purple-900 text-white py-2 px-5 mr-2 hover:bg-black hover:opacity-70 '>Add to cart</button>
                                        <button className='font-bold bg-white border border-black p-2 hover:bg-gray-200'>Buy now</button>
                                    </div>
                                    <div className='font-bold text-sm'>{course.price},000vnd</div>
                                </div>
                            ))}
                            <div className='flex justify-center items-center my-5'>
                                <button 
                                    disabled={currentPage === 1} 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                                    className='mx-2'
                                >
                                    <IoIosArrowDropleft size={30} className='cursor-pointer rounded-full hover:bg-gray-200'/>
                                </button>
                                
                                <div className='flex space-x-2'>
                                    {paginationNumbers().map((page, index) => (
                                        typeof page === 'number' ? (
                                            <button 
                                                key={index}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 ${currentPage === page ? 'text-purple-900 underline' : ''}`}
                                            >
                                                {page}
                                            </button>
                                        ) : (
                                            <span key={index} className='px-3 py-1'>...</span>
                                        )
                                    ))}
                                </div>
                                
                                <button 
                                    disabled={currentPage === totalPages} 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                                    className='mx-2'
                                >
                                    <IoIosArrowDropright size={30} className='cursor-pointer rounded-full hover:bg-gray-200'/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1'/>
            </div>
        </>
    );
}

export default Search;
