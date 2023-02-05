// import { hasPointerEvents } from '@testing-library/user-event/dist/utils';
import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps={
        country: 'IN',
        pageSize: 6,
        category: 'general'
    }
    static propsTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,

    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    constructor(props){
        super(props);
        this.state={
          articles: [],
          loading: false,               //state me hame wo chize set karni rehti hai jo  hame initially render 
          page: 1,
        //   totalResults: 0               //karwani ho isliye empty array initialize karwaye otherewise ham 
        }                               //setstate me direct state set kar sakte hai like i set for totalResult
        document.title=`${this.capitalizeFirstLetter(this.props.category)}: NewsHunt` 
    }        
    
    async componentDidMount(){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd73afd28db5450ab315710553c99cd9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        const data=await fetch(url);
        const jsonData=await data.json();
        this.setState({
            articles:jsonData.articles,
            totalResults:jsonData.totalResults,
            loading:false,
        });
    }
    // handleprev=async()=>{
    //     const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd73afd28db5450ab315710553c99cd9&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true});
    //     const data=await fetch(url);
    //     const jsonData=await data.json();
    //     this.setState({
    //         page: this.state.page - 1,
    //         articles:jsonData.articles,
    //         loading:false,
    //     })
    // }
//     handlenext=async()=>{
//         const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd73afd28db5450ab315710553c99cd9&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
//         this.setState({loading: true});
//         const data=await fetch(url);
//         const jsonData=await data.json();
//         this.setState({
//             page: this.state.page + 1,
//             articles:jsonData.articles,
//             loading:false,
//         })
//     }
//     // map array me se ek ek karke object nikalta has. 
//  render() {
//     return (
//         <div className='container my-2'>
//         <h1 className='text-center my-5'>NewsHunt - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
//         {this.state.loading && <Spinner/>}
//         <div className="row">
//             {!this.state.loading && this.state.articles.map((elem)=>{
//             return <div className="col-md-4" key={elem.url}> 
//             <NewsItems title={elem.title} description={elem.description} imgUrl={elem.urlToImage} url={elem.url} author={elem.author?elem.author:"Unknown"} source={elem.source.name} date={new Date(elem.publishedAt).toGMTString()}/>
//             </div> })}
//         </div>
//         <div className="container d-flex justify-content-between my-3">
//             <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprev}>Previous</button>
//             <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.country)}  type="button"className="btn btn-dark" onClick={this.handlenext}>Next</button>
//         </div>
//         </div>
//     )
//   }
// } 
//if next button rakhna hai then use above logic




//infinite scroll logic
fetchMoreData=async()=>{
    // this.setState({page: this.state.page + 1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c17ff0d99dca40a7a283710edefbfafc&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data=await fetch(url);
        let jsonData=await data.json();
        this.setState({
            page: this.state.page + 1,
            articles:this.state.articles.concat(jsonData.articles),
            totalResults:jsonData.totalResults,
            loading:false,
        })
};

render(){ 
    return(
        <>
        <h1 className='text-center my-5'>NewsHunt - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          >
        <div className="container">
        <div className="row">
            {this.state.articles.map((elem)=>{
                return <div className="col-md-4" key={elem.url}> 
            <NewsItems title={elem.title} description={elem.description} imgUrl={elem.urlToImage} url={elem.url} author={elem.author?elem.author:"Unknown"} source={elem.source.name} date={new Date(elem.publishedAt).toGMTString()}/>
            </div> })}
        </div>
        </div>
        </InfiniteScroll>
        </>
        
    )
 }
}

export default News