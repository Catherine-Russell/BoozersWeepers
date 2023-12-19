const SingleOngoingWager = () => {
  return (
    <div id='ongoing-wager-information' className='single-wager-info'>
      <h1>ongoing wager info</h1>
      <p>
          Wager ID: {wagerData.wager._id} <br />
          People Involved[0]: {wagerData.wager.peopleInvolved[0].username} <br />
          People Involved[1]: {wagerData.wager.peopleInvolved[1].username} <br />
          Quantity: {wagerData.wager.quantity} <br />
          Approved: {wagerData.wager.approved} <br />
          {wagerData.wager.winner === null ? (
            // Code to run when winner is null
            <>Winner: No winner yet<br /></>
            ) : (
              // Code to run when winner is not null
              <>Winner: {wagerData.wager.winner.username}<br /></>
              )}
          Description: {wagerData.wager.description} <br />
          Deadline: {wagerData.wager.deadline} <br />
          Date made: {wagerData.wager.datemade} <br />
        </p>
    </div>
  )
}

export default SingleOngoingWager;
