import getSessionUserID from '../../Utility/getSignedInUser_id';

const SingleResolvedWager = (wagerData) => {
  const loggedInUser = getSessionUserID(window.localStorage.getItem('token'))
  const wager = wagerData.wagerData
  const winnerUsername = wager.winner.username;
  const loserUsername = wager.peopleInvolved.find(person => person._id !== wager.winner._id)?.username;

  if (loggedInUser === wager.winner._id ){
    return (
        <div id='resolved-wager-information' className='single-wager-info'>
          <div id='congratulations-message' className='congrats'>
            Nice one, {winnerUsername}!
          </div>
          <>You won the wager that {wager.description}. <br />

          Don't forget to claim {wager.quantity} drink from {loserUsername} next time you hang out.</>
          </div>
      
      )
  } else {
    return (
      <div id='resolved-wager-information' className='single-wager-info'>
        <div id='commiserations-message' className='commiserations'>
          Hard luck, {loserUsername}!</div>
          <>You lost the wager that {wager.description}. <br />
          You owe {winnerUsername} {wager.quantity} drink next time you hang out</>
        </div>
    )
  }
}

export default SingleResolvedWager;
