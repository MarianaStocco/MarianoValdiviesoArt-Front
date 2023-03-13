// From React
import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
// Components
import Card2 from '../Card/Card2';
import Card from "../Card/Card"
// Actions
import {
    activeLoading,
    artFilterByBack,
    getAllProducts
} from '../../redux/actions/productActionsTest';
import InfiniteScroll from "react-infinite-scroll-component";
// Custom Styles
import './home.css'
import CoffeeIcon from '../../assets/bmc.png';
import Paypal from '../../assets/paypal.png';
//MUI COMPONENTS
import Chip from "@mui/material/Chip";
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';

function tagPrice(tagPrices) {
    return tagPrices.split("/").map(tag => "$" + tag).join("/")
}

export const Home = ({ handleAdded, handleNotAdded }) => {

    const [favProducts, setFavProducts] = useState(
        JSON.parse(localStorage.getItem("favList"))
    );
    //HOOKS
    const [currentPage, setCurrentPage] = useState(1)
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allPaints = useSelector((state) => state.testReducer.allProducts);
    const classic = useSelector((state) => state.testReducer.classic);
    const [paint, setPaint] = useState([])
    const [hasMore, setHasMore] = useState(true)
    console.log(currentPage, 'PAG')

    //SEARCH PARAMS
    const [searchParams] = useSearchParams();
    const searchName = searchParams.get('name');
    const filters = []
    searchParams.forEach((value, key) => {
        filters.push([key, value]);
    });

    useEffect(() => {
        dispatch(activeLoading());

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        if (searchParams.toString()) {
            dispatch(artFilterByBack(searchParams.toString()));
            setCurrentPage(1)
        } else {
            dispatch(getAllProducts());
        }
    }, [dispatch, searchParams])

    //Clear filters
    function clearFilter(filter) {
        if (filter === "price") {
            dispatch(activeLoading)
        }
        searchParams.delete(filter);
        location.search = `?${searchParams.toString()}`;
        setCurrentPage(1)
        navigate(location);
    }

    //Paginate functions----------------------------------------------------------------------------------
    const itemsToRender = () => {
        const start = 0;
        let end = currentPage * 15;
        if (start + 15 > allPaints.length) end = allPaints.length;
        return allPaints.slice(start, end);
    };

    return (
        <div className="min-h-full">
            <div className='w-full bg-white mb-5 shadow-md'>
                {
                    filters.length ? searchName && filters.length === 1 ? null :
                        <div className="w-full h-10 bg-red-200 flex flex-initial items-center ">
                            {
                                filters.length ? searchName && filters.length === 1 ? null :
                                    <>
                                        {
                                            filters.map(filter => {
                                                return filter[0] === 'name' ?
                                                    null :
                                                    (
                                                        <div className='inline-block ml-2' key={filter[0]} >
                                                            <Chip label={filter && (filter[0] === "price" ? tagPrice(filter[1]) : filter[1])} onDelete={() => { clearFilter(filter[0]) }} />
                                                        </div>
                                                    )
                                            })
                                        }
                                    </> : null
                            }
                        </div> : null
                }
            </div>
            <nav className='flex md:order-2'>
            <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' >
                                    <span>
                                        <h1  className='mt-6 text-2xl'>
                                            Mis obras son tuyas! Agradecería mucho que apoyes mi trabajo!
                                        </h1>
                                    </span>
                                <div className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                                    <a href="https://www.buymeacoffee.com/amhiank">
                                        <Button >
                                            <img
                                                src={CoffeeIcon}
                                                alt="buymeacoffee"
                                                className='mt-2 w-15 h-10  md:rounded-none  mx-auto'
                                            />
                                        </Button>
                                    </a>
                                </div>
                                <div className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                                    <a href="https://www.paypal.com/donate/?hosted_button_id=KJ687YP5RMRZC">
                                        <Button >
                                            <img
                                                src={Paypal}
                                                alt="paypaldonate"
                                                className='w-15 h-20  md:rounded-none  mx-auto'
                                            />
                                        </Button>
                                    </a>
                                </div>
                                <div className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                                    <a href='https://cafecito.app/amhiank'
                                        rel='noopener'
                                        target='_blank'>
                                        <Button >
                                            <img
                                                srcset='https://cdn.cafecito.app/imgs/buttons/button_1.png 1x, https://cdn.cafecito.app/imgs/buttons/button_1_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png 3.75x'
                                                src='https://cdn.cafecito.app/imgs/buttons/button_1.png'
                                                alt='Invitame un café en cafecito.app'
                                                className='w-25 h-15  md:rounded-none  mx-auto'
                                            />
                                        </Button>
                                    </a>
                                </div>
                                </div>
            </nav>

            <div id='scrollableDiv'>
                <InfiniteScroll
                    className='mx-4'
                    dataLength={itemsToRender().length}
                    next={() => setCurrentPage((prevPage) => prevPage + 1)}
                    hasMore={hasMore}
                    loader={<LinearProgress className='flex mt-auto' />}
                    endMessage={
                        <p className='text-bold text-center text-lg'>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    
                    { classic ? <div className='pin_container'>
                        {(itemsToRender()).map((e) => {
                                    return (
                                        <div className='inner2 my-2 ' key={e._id}>
                                            <Card
                                                className="img"
                                                img={e.img}
                                                userName={e.user.userName}
                                                userImage={e.user.userImage}
                                                stock={e.stock}
                                                title={e.title}
                                                price={e.price}
                                                _id={e._id}
                                                cardLikes={e.likes.length}
                                                handleAdded={handleAdded}
                                                handleNotAdded={handleNotAdded}
                                                setFavProducts={setFavProducts}
                                            >
                                            </Card>
                                        </div>
                                    );
                                })
                        }
                    </div> : 
                    <div className='flex flex-wrap justify-evenly w-full'>
                    {(itemsToRender()).map((e) => {
                                return (
                                    <div className='inner2 w-80 h-100 my-2 ' key={e._id}>
                                        <Card2
                                            className=""
                                            img={e.img}
                                            userName={e.user.userName}
                                            userImage={e.user.userImage}
                                            stock={e.stock}
                                            title={e.title}
                                            price={e.price}
                                            _id={e._id}
                                            cardLikes={e.likes.length}
                                            handleAdded={handleAdded}
                                            handleNotAdded={handleNotAdded}
                                            setFavProducts={setFavProducts}
                                        >
                                        </Card2>
                                    </div>
                                );
                            })
                    }
                </div>}
                </InfiniteScroll>
            </div>
        </div>
    );
};