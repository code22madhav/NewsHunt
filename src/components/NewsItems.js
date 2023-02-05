import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title, description, imgUrl, url, author, date, source}= this.props
    return (
      <div>
        <div className="card">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left:"90%", zIndex:'1'}}>{source}</span>
            <img src={imgUrl?imgUrl:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted"></small>By {author} on {date}</p>
                <a href={url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItems