import React from 'react';
import './KBoard.css';
import { MoreHorizontal, Plus } from 'react-feather';
import Card from '../Card/Card';
import Logo from '../Logo/Logo';

const Board = (props) => {
  return (
    <div className='board'>
      <div className='board-top'>
        <div className='board-top-left'>
          {props.groupingOption === "status" && <Logo status={props.title} />}
          <p className='board-title bold'>{props.title}</p>
          <span className='board-count'>{props.count}</span>
        </div>
        <div className='board-top-right'>
          <MoreHorizontal className='Icon' />
          <Plus className='Icon' />
        </div>
      </div>
      <div className='card-container'>
        {props.tickets.map((ticket) => (
          <Card key={ticket.id} ticket={ticket} groupBy={props.groupingOption} />
        ))}
      </div>
    </div>
  );
};

export default Board;
