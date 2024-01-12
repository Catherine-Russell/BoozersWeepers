import getSessionUserID from "../../Utility/getSignedInUser_id";
import React, { navigate } from 'react';
import { useNavigate } from "react-router-dom";


const SingleOngoingWager = (wagerData) => {
    const navigate = useNavigate()
    const token = window.localStorage.getItem('token');
    const loggedInUser = getSessionUserID(token)
    const wager = wagerData.wagerData
    const user1 = wager.peopleInvolved[0]
    const user2 = wager.peopleInvolved[1]

    const dateParts = wager.deadline.slice(0, 10).split("-");
    const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

    const handleWinner = (WinnerID,LoserID) => {
      if (token) {
        fetch(`/wagers/updateWinner/${wager._id}/${WinnerID}`, {
          method: 'post',
          headers: {'Authorization': `Bearer ${token}`,}
        })
          .then(response => {
            if (response.status === 200) {
              console.log(`Wager winner updated to ${WinnerID}`)
              return response.json();
            } else {console.log("Wager winner failed to be updated")}
          })
          .then(() => {
            return fetch('/pints', {
              method: 'post',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                owner: WinnerID,
                owed_by: LoserID,
                bet: wager._id
              })
            })
          })
          .then(response => {
            if (response.status === 201) {
              console.log(`A Pint for ${WinnerID} has been created`);
              return response.json();
            } else {console.log("Failed to create a pint");}
          })
          .then(() => {
            navigate("/myAccount");
          })
          .catch(error => {
            console.error("Error occurred:", error);
          });
      }
    };


      
    if (user1._id === loggedInUser) {
      return (
        <div className="preamble">
          You bet {user2.username} that {wager.description} would happen before {deadlineDate} <br />
          So...Who won?
          <br/>
          <button onClick={() => handleWinner(user1._id, user2._id)}>I Won</button><span className="button-space"></span>
          <button onClick={() => handleWinner(user2._id, user1._id)}>{user2.username} won</button>

        </div>
      );
  } else if (user2._id === loggedInUser) {
      return (
        <div className="preamble">
        {user1.username} bet you that {wager.description} would happen before {deadlineDate}  <br /><br />
        So...   Who won?
        <br/>
        <br/>
        <button onClick={() => handleWinner(user2._id, user1._id)}>I Won</button><span className="button-space"></span>
        <button onClick={() => handleWinner(user1._id, user2._id)}>{user1.username} Won</button>
        

        </div>
      );
  } else { return (
    <div>
    You Are Not Involved in this bet!
  </div>)}
};

export default SingleOngoingWager;
