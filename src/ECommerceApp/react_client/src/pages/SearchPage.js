import { useEffect, useState } from "react";
import useStateWithCallback from 'use-state-with-callback';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import ProductListItem from "../components/ProductListItem";
import CategoryMenuSide from "../components/CategoryMenuSide";

export default function SearchPage() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [sortOption, setSortOption] = useState('highest-rate');
    const [categoryId, setCategoryId] = useState(0);

    useEffect(() => {
        console.log('effect')
    }, [])

    useEffect(() => {
        setSearchInput(state);
        setSortOption('no-sort')
        setCategoryId(0)
    }, [state])

    useEffect(() => {
        loadSearchResults();
    }, [searchInput, sortOption, categoryId])
    

    async function loadSearchResults() {
        if(searchInput === undefined) return;

        setSearching(true);
        let url = `https://localhost:7077/Product/Search/${categoryId}/${sortOption}/${searchInput}`;

        console.log(url);
        await axios.get(url)
        .then((response) => {
            console.log(response.data);
            setSearchResults(response.data);
        })
        .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) { console.log(error.request);
        } else { console.log('Error', error.message); }
        console.log(error.config);
        });
        setSearching(false);
    }

    function handleSortChange(e) {
        if(e.target.value !== '') {
            setSortOption(e.target.value);
            loadSearchResults();
        }
    }

    function handleCategoryChange(categoryId) {
        setCategoryId(categoryId);
        loadSearchResults();
    }

    function handleItemClick(product) {
        console.log(product)
        navigate(`/Product/${product.productId}`, {state: product.productId});
    }


    return (
        <>
        <div>
            <Header/>
        </div>
        <div className="bg-slate-100 py-12">
            <div className="container mx-auto py-6 flex flex-row gap-x-2 items-start">
                <div className="w-1/4 min-w-[1/4] flex flex-col bg-white">
                    <CategoryMenuSide onCategoryChoose={handleCategoryChange}/>
                </div>

                <div className="grow border bg-white py-4 px-6">
                {searching ? <h2>Searching...</h2> : (
                    searchResults.length > 0 ? (
                        <>
                        <div className="flex flex-col gap-2 mb-4">
                            <h2 className="text-xl font-semibold">Search: "{searchInput}"</h2>
                            <h2 className="text">Found {searchResults.length} products.</h2>
                            <div className="flex gap-2">
                                <span>Sorted by</span>
                                <select value={sortOption} onChange={handleSortChange}
                                className="px-2 py-1">
                                    <option value={'oldest'}>Oldest first</option>
                                    <option value={'newest'}>Newest first</option>
                                    <option value={'lowest-price'}>Price: Low to High</option>
                                    <option value={'hishest-price'}>Price: High to Low</option>
                                    <option value={'highest-rate'}>Highest Rating</option>
                                </select>
                            </div>
                        </div>
                        {searchResults.map((item) => {
                            return (<ProductListItem key={item.productId} product={item} handleItemClick={() => handleItemClick(item)}/>);
                        })}
                        </>
                    ) : (
                        <>
                        <h2 className="text-xl font-semibold mb-4">Search: "{searchInput}"</h2>
                        <h2>No results</h2>
                        </>
                    )
                )}
                </div>
            </div>
        </div>
        </>
    );
}