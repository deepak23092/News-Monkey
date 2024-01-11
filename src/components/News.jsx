import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`

        setLoading(true);
        try {
            let data = await fetch(url);
            props.setProgress(30);
            let parsedData = await data.json();
            props.setProgress(70);
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
            props.setProgress(100);
        }
    };

    useEffect(() => {
        document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)} news`;
        updateNews();
    }, [props.category, page]);

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles([...articles, ...parsedData.articles]);
            setTotalResults(parsedData.totalResults);
        } catch (error) {
            console.error('Error fetching more news:', error);
        }
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: "90px 0 0 0" }}>{`NewsMonkey - Top ${capitalizeFirstLetter(props.category)} Headlines`}</h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles && articles.map((element) => (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title}
                                    description={element.description}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    date={element.publishedAt}
                                    author={element.author}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
            <div className="container d-flex justify-content-between">
                {/* Uncomment the pagination buttons if needed */}
                {/* <button disabled={page <= 1} type="button" className="btn btn-dark btn-sm" onClick={handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark btn-sm" onClick={handleNextClick}>Next &rarr;</button> */}
            </div>
        </>
    );
};

export default News;

News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired, // Assuming setProgress is required
};
