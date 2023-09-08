import React, { useEffect, useState } from "react";
import './App.css';
import mid from "./assets/middle.jpeg";
import low from "./assets/low.jpeg";
import high from "./assets/high.jpeg";
import nopriority from "./assets/Nopriority.png";
import urgent from "./assets/urgent.png";
import Navbar from "./Components/Navbar/Navbar";
import Board from "./Components/kBoard/KBoard";
import axios from "axios"; 

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(localStorage.getItem('groupBy') || "status");
  const [sortingOption, setSortingOption] = useState(localStorage.getItem('sortBy') || "priority");

  const priorityLabels = genPriorityLabels();
  const userLabels = genUserLabels();

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupingOption);
    localStorage.setItem('sortBy', sortingOption);
  }, [groupingOption, sortingOption]);

  async function getDetails() {
    try {
      const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
      const updatedTickets = data.tickets.map((ticket) => {
        if (ticket.priority === 1) {
          ticket.priority = 2;
        } else if (ticket.priority === 2) {
          ticket.priority = 3;
        } else if (ticket.priority === 3) {
          ticket.priority = 4;
        } else if (ticket.priority === 4) {
          ticket.priority = 1;
        }
        return ticket;
      });
      setTickets(updatedTickets); 
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function genPriorityLabels() {
    const priorityLabels = {};
    for (let i = 0; i <= 4; i++) {
      priorityLabels[i] = (
        <div className="user-label" key={i}>
          <img src={i === 0 ? nopriority : i === 2 ? low : i === 3 ? mid : i === 4 ? high : urgent} className='user-pic' alt={getPriorityLabel(i)} />
          {getPriorityLabel(i)}
        </div>
      );
    }
    return priorityLabels;
  }

  function getPriorityLabel(priority) {
    switch (priority) {
      case 0: return "No Priority";
      case 2: return "Low";
      case 3: return "Medium";
      case 4: return "High";
      case 1: return "Urgent";
      default: return "";
    }
  }

  function genUserLabels() {
    const userLabels = {};
    users.forEach((user) => {
      userLabels[user.id] = (
        <div className="user-label" key={user.id}>
          <img
            src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1694073291~exp=1694073891~hmac=75453a297eb80aadfa68f238f70825147d88f09eaceacec2a6e2bcc90445705e"
            className='user-pic'
            alt='profile-pic'
          />
          {user.name}
        </div>
      );
    });
    return userLabels;
  }

  const organizeTickets = () => {
    const organizedData = {};

    if (groupingOption === 'status') {
      const ticketStatus = {
        "Backlog": [],
        "Todo": [],
        "In progress": [],
        "Done": [],
        "Cancelled": []
      };

      tickets.forEach(ticket => {
        if (ticketStatus[ticket.status]) {
          ticketStatus[ticket.status].push(ticket);
        }
      });

      return ticketStatus;
    } else if (groupingOption === 'priority') {
      const priorityStatus = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: []
      };

      tickets.forEach(ticket => {
        if (priorityStatus[ticket.priority]) {
          priorityStatus[ticket.priority].push(ticket);
        }
      });

      return priorityStatus;
    } else if (groupingOption === 'user') {
      const userStatus = {};
      users.forEach(user => {
        userStatus[user.id] = [];
      });

      tickets.forEach(ticket => {
        if (userStatus[ticket.userId]) {
          userStatus[ticket.userId].push(ticket);
        }
      });

      return userStatus;
    }

    return organizedData;
  };

  const sortByPriority = (tickets) => {
    return [...tickets].sort((a, b) => b.priority - a.priority);
  };

  const sortByTitle = (tickets) => {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const handleGroupingChange = (event) => {
    setGroupingOption(event.target.value);
  };

  const sortedTickets = (tickets) => {
    if (sortingOption === 'priority') {
      return sortByPriority(tickets);
    } else if (sortingOption === 'title') {
      return sortByTitle(tickets);
    }
    return tickets;
  };

  const boards = organizeTickets();

  return (
    <div className="app-container">
      <div className="app-navbar">
        <nav>
          <Navbar 
            sortingOption={sortingOption}
            onSortingChange={handleSortingChange}
            groupingOption={groupingOption}
            onGroupingChange={handleGroupingChange}
          />
        </nav>
      </div>
      <div className="app-outer-container">
        <div className="app-boards">
        {Object.keys(boards).map(boardKey => (
            <Board 
              key={boardKey} 
              title={groupingOption === 'priority' ? priorityLabels[boardKey] : groupingOption === "user" ? userLabels[boardKey] : boardKey}
              count={boards[boardKey].length}
              tickets={sortedTickets(boards[boardKey])}
              sortingOption={sortingOption}
              groupingOption={groupingOption} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
