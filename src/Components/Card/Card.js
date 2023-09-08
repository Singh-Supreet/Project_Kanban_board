import React from 'react';
import './Card.css';
import UserAvatar from '../UserAvatar/UserAvatar';
import { MoreHorizontal } from 'react-feather';
import circle from '../../assets/circle.png';
import Logo from '../Logo/Logo';
import userimg from "../../assets/user.avif";
const Card = (props) => {
  const { ticket, groupBy } = props;
  const isUserGrouping = groupBy === 'user';
  const isPriorityGrouping = groupBy === 'priority';
  const isStatusGrouping =groupBy ==='status';
  return (
    <div className='card'>
      <div className='card-top'>
        <p className='card-title'>{ticket.id}</p>
        {!isUserGrouping && <UserAvatar src={userimg} />}
      </div>
      <div className='card-middle'>
        {!isStatusGrouping && <Logo status={ticket.status} />}
        <p className='card-desc bold'>{ticket.title}</p>
      </div>
      <div className='card-bottom'>
        {!isPriorityGrouping && (
          <div className='component-1 pointer'>
            <MoreHorizontal className='Icon' />
          </div>
        )}
        <div className='component-2 pointer'>
          <img src={circle} alt="" className='Icon' />
          <p>{ticket.tag[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
