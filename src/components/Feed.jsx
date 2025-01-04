import React, { useEffect } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import BASE_URL from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/slice/feedSlice'

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(state=>state.feed);

  const getFeed = async()=>{
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + '/feed',{withCredentials:true});
      dispatch(addFeed(res?.data?.data));
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getFeed();
  },[])

  return (
    feed && (<div>
      <UserCard user={feed[0]} />
    </div>)
  )
}

export default Feed