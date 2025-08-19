function renderPlayer(player, isConfirmed) {
  const li = document.createElement('li');
  li.textContent = player;
  li.className = isConfirmed ? 'player-confirmed' : 'player-unconfirmed';
  return li;
}

// TODO: Move function to utils/time.js
function formatCustomPortugueseDate(isoString) {
	let startDate;
	let endDate;
	let options;
	let formatter;
	let parts;
	let datePartsMap;
	let weekday;
	let month;
	let startTime;
	let endTime;
	let endHour;
	let endMinute;

  monthNames = [
		'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
		'jul', 'ago', 'set', 'out', 'nov', 'dez'
	];

	startDate = new Date(isoString);
	endDate = new Date(startDate.getTime());
	endDate.setUTCHours(endDate.getUTCHours() + 1);

	options = {
		weekday: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'UTC'
	};
	formatter = new Intl.DateTimeFormat('pt-PT', options);
	parts = formatter.formatToParts(startDate);
	datePartsMap = {};
	parts.forEach(function (part) {
		datePartsMap[part.type] = part.value;
	});
	weekday = datePartsMap.weekday.replace('-feira', '');
	month = monthNames[startDate.getUTCMonth()];
	startTime = `${datePartsMap.hour}h${datePartsMap.minute}`;
	endHour = String(endDate.getUTCHours()).padStart(2, '0');
	endMinute = String(endDate.getUTCMinutes()).padStart(2, '0');
	endTime = `${endHour}h${endMinute}`;
	return `${weekday}, ${datePartsMap.day} ${month} - ${startTime} às ${endTime}`;
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
    document.getElementById('price').textContent = `${match.pricePerPlayer}€ p/ pessoa`;
    document.getElementById('match-location').textContent = match.location.name;
    document.getElementById('match-location').href = match.location.mapsUrl;
    document.getElementById('date-and-time').textContent = formatCustomPortugueseDate(match.date);

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