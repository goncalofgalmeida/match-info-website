function renderPlayer(player, isConfirmed) {
  const li = document.createElement('li');
  li.textContent = player;
  li.className = isConfirmed ? 'player-confirmed' : 'player-unconfirmed';
  return li;
}

async function renderMatchInfo() {
  const pathParts = window.location.pathname.split('/');
  const matchId = pathParts[2];
  if (!matchId) {
    document.getElementById('match-title').textContent = 'Could not find a match ID in the URL.';
  }

  try {
    const response = await fetch(`/api/matches/${matchId}`);
    if (!response.ok) {
      throw new Error('Match not found!');
    }

    const match = await response.json();

    document.getElementById('match-title').textContent = match.matchTitle;
    document.getElementById('match-location').textContent = match.location.name;
    document.getElementById('match-location').href = match.location.mapsUrl;

    // team A
    const teamAName = document.getElementById('team-a-name');
    const teamAPlayersList = document.getElementById('team-a-players');
    
    teamAName.textContent = match.teamA.name + ` (${match.teamA.kitColor})`;
    teamAPlayersList.innerHTML = '';
    match.teamA.players.forEach(player => {
      teamAPlayersList.appendChild(renderPlayer(player.name, player.confirmed));
    })

    // team B
    const teamBName = document.getElementById('team-b-name')
    const teamBPlayersList = document.getElementById('team-b-players');
    
    teamBName.textContent = match.teamB.name + ` (${match.teamB.kitColor})`;
    teamBPlayersList.innerHTML = '';
    match.teamB.players.forEach(player => {
      teamBPlayersList.appendChild(renderPlayer(player.name, player.confirmed));
    })


  } catch (error) {
    document.getElementById('match-title').textContent = error.message;
  }
}

renderMatchInfo();