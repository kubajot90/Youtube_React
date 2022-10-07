import { useEffect, useState } from 'react';
import classes from './CommentCard.module.css';
import DateCounter from './DateCounter';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

const CommentCard =(props)=>{
    const [comments, setComments] = useState([])

   const createComments =()=>{
    const comments = props.comments.map((comment)=>{
        const authorImg = comment.snippet.topLevelComment.snippet.authorProfileImageUrl;
        const author = comment.snippet.topLevelComment.snippet.authorDisplayName;
        const content = comment.snippet.topLevelComment.snippet.textDisplay;
        const date = comment.snippet.topLevelComment.snippet.publishedAt;
        const likesCounter = comment.snippet.topLevelComment.snippet.likeCount;


        return (
        <div key ={comment.id} className={classes.commentCard}>
            <div className={classes.authorImgBox}>
                <img src={authorImg} alt='author profile avatar' className={classes.authorImg}></img>
            </div>
            <div className={classes.commentDetails}>
                <div className={classes.header}>
                    <p className={classes.author}>{author}</p>
                    <DateCounter date={date}/>
                </div>
                <p className={classes.content}>{content}</p>
                <div className={classes.likesBox}>
                <AiOutlineLike className={classes.like}/>
                <span className={classes.likesCounter}>{likesCounter > 0 && likesCounter}</span>
                <AiOutlineDislike className={classes.dislike}/>
                </div>
            </div>
        </div>
        )
        
        // <p key={comment.id}>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
    })
    setComments(comments)
   }

    useEffect(()=>{
        if(!props.comments){
            return
        }else {
            createComments()};
    },[props.comments])

    return(
    <>
    {comments}
    </>
    )
};

export default CommentCard;