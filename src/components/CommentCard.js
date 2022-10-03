import { useEffect, useState } from 'react';
import classes from './CommentCard.module.css';

const CommentCard =(props)=>{
    const [comments, setComments] = useState([])

   const createComments =()=>{
    console.log('CREATE COMMENTS');
    console.log('props.comments', props.comments);
    const comments = props.comments.map((comment)=>{
        return <p key={comment.id}>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
    })
    setComments(comments)
   }

    useEffect(()=>{
        // console.log(props.comments);
        if(!props.comments){
            return
        }else {
            console.log('warunek');
            createComments()};
    },[props.comments])

    return(
    <>
    {comments}
    </>
    )
};

export default CommentCard;