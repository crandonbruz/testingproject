// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_CHECKLIST } from '../utils/queries';

const SingleCheckList = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { checkListId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_CHECKLIST, {
    // pass URL parameter
    variables: { checkListId: checkListId },
  });

  const checkList = data?.checkList || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3"
    style={{backgroundColor:"#edede9", opacity:"0.8", borderRadius:"65px"}}>
      <h3 className="card-header p-2 m-0">
        {checkList.checkListAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          made this list on {checkList.createdAt}
        </span>
      </h3>
      <div className= "py-4"
      style={{
        backgroundColor:"#10527b"
      }}>
        <blockquote
          className="p-4"
          style={{
            color:"#e3f2fd",
            fontSize: '1.5rem',
            fontWeight:"bold",
            lineHeight: '1.5',
          }}
        >
          {checkList.checkListText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={checkList.comments} />
      </div>
      <div className="m-3 p-4">
        <CommentForm checkListId={checkList._id} />
      </div>
    </div>
  );
};

export default SingleCheckList;
