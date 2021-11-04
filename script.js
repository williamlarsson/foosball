const players = [
    {
        name: 'William',
        id: 1,
    },
    {
        name: 'Anders',
        id: 2,
    },
    {
        name: 'Asthor',
        id: 3,
    },
    {
        name: 'Nicolai',
        id: 4,
    },
    {
        name: 'Rasmus B',
        id: 5,
    },
    {
        name: 'Mathilde',
        id: 6,
    },
    {
        name: 'Steffi',
        id: 7,
    },
    {
        name: 'Rasmus L',
        id: 8,
    },
    {
        name: 'Michael',
        id: 9,
    },
]

const DOM = {
    team1Score: document.querySelector('#team1Score'),
    team2Score: document.querySelector('#team2Score'),
    buttons: {
        randomizeTeams: document.querySelector('.randomizeTeams')
    },
    form: document.querySelector('form'),
    tabs: {
        game: document.querySelector('.tab.game'),
        stats: document.querySelector('.tab.stats')
    },
    scoresContainer: document.querySelector('.scores'),
    standingsContainer: document.querySelector('.standings'),
    playerSelectors: [
        document.querySelector('#player1'),
        document.querySelector('#player2'),
        document.querySelector('#player3'),
        document.querySelector('#player4')
    ],
}

function bindEvents() {
    DOM.tabs.game.addEventListener('click', onTabClick);
    DOM.tabs.stats.addEventListener('click', onTabClick);
    DOM.buttons.randomizeTeams.addEventListener('click', randomizeTeams)
    DOM.form.addEventListener('submit', registerGame);
}

function onTabClick(e) {
    const tab = e.target.getAttribute('data-tab');
    if (tab == 'game') {
        showGame();
    } else {
        showStats();
    }
}

function showGame() {

    document.body.classList.add('game-is-active');
    document.body.classList.remove('stats-is-active');
    DOM.tabs.game.classList.add('active')
    DOM.tabs.stats.classList.remove('active')
    randomizeTeams()
}

function showStats() {

    document.body.classList.add('stats-is-active');
    document.body.classList.remove('game-is-active');
    DOM.tabs.stats.classList.add('active')
    DOM.tabs.game.classList.remove('active')
    renderScores();
    renderStandings();
}

function renderOptions() {
    const sortedPlayers = players.sort((a, b) => a.name > b.name ? 1 : -1)
    console.log('sortedPlayers', sortedPlayers)
    const optionsMarkup = players.map(player => {
        return `
        <option value="${player.id}">${player.name}</option>
        `
    });
    DOM.playerSelectors.forEach(selector => {
        selector.innerHTML = optionsMarkup
    });
}

function randomizeTeams() {

    let playerIds = [...Object.keys(players).map(i => players[i].id)]
    for (let index = 0; index < DOM.playerSelectors.length; index++) {
        const randomIndex = playerIds.splice(Math.floor(Math.random() * playerIds.length), 1)[0]
        const player = players.find(player => player.id == randomIndex)
        DOM.playerSelectors[index].value = player.id
        DOM.playerSelectors[index].setAttribute('data-player-name', player.name);
    }
}

function calcRank(wins, losses, goalDifference) {
    return (wins - losses) + (goalDifference * 0.5)
}

function registerGame(e) {
    e.preventDefault();
    const team1Score = parseInt(DOM.team1Score.value);
    const team2Score = parseInt(DOM.team2Score.value);
    // const scoreStats = {
    //     wins: [
    //         team1Score > team2Score ? 1 : 0,
    //         team1Score < team2Score ? 1 : 0
    //     ],
    //     losses: [
    //         team1Score < team2Score ? 1 : 0,
    //         team1Score > team2Score ? 1 : 0
    //     ],
    //     goalDifference: [
    //         team1Score - team2Score,
    //         team2Score - team1Score,
    //     ]
    // }

    // const gameStats = [
    //     {
    //         player: players.find(player => player.id == DOM.playerSelectors[0].value).name,
    //         id: DOM.playerSelectors[0].value,
    //         wins: scoreStats.wins[0],
    //         losses: scoreStats.losses[0],
    //         goalsFor: team1Score,
    //         goalsAgainst: team2Score,
    //         goalDifference: scoreStats.goalDifference[0],
    //         score: calcRank(scoreStats.wins[0], scoreStats.losses[0], scoreStats.goalDifference[0])
    //     }, {
    //         player: players.find(player => player.id == DOM.playerSelectors[1].value).name,
    //         id: DOM.playerSelectors[1].value,
    //         wins: scoreStats.wins[0],
    //         losses: scoreStats.losses[0],
    //         goalsFor: team1Score,
    //         goalsAgainst: team2Score,
    //         goalDifference: scoreStats.goalDifference[0],
    //         score: calcRank(scoreStats.wins[0], scoreStats.losses[0], scoreStats.goalDifference[0])
    //     }, {
    //         player: players.find(player => player.id == DOM.playerSelectors[2].value).name,
    //         id: DOM.playerSelectors[2].value,
    //         wins: scoreStats.wins[1],
    //         losses: scoreStats.losses[1],
    //         goalsFor: team2Score,
    //         goalsAgainst: team1Score,
    //         goalDifference: scoreStats.goalDifference[1],
    //         score: calcRank(scoreStats.wins[1], scoreStats.losses[1], scoreStats.goalDifference[1])
    //     }, {
    //         player: players.find(player => player.id == DOM.playerSelectors[3].value).name,
    //         id: DOM.playerSelectors[3].value,
    //         wins: scoreStats.wins[1],
    //         losses: scoreStats.losses[1],
    //         goalsFor: team2Score,
    //         goalsAgainst: team1Score,
    //         goalDifference: scoreStats.goalDifference[1],
    //         score: calcRank(scoreStats.wins[1], scoreStats.losses[1], scoreStats.goalDifference[1])
    //     }
    // ]

    // if (!window.localStorage.getItem('standings')) {
    //     window.localStorage.setItem('standings', JSON.stringify(gameStats))
    // } else {

    //     const oldStandings = JSON.parse(window.localStorage.getItem('standings'));

    //     gameStats.forEach((player, index) => {
    //         const matchedPlayer = oldStandings.find(score => score.id === player.id)
    //         if (matchedPlayer) {
    //             matchedPlayer.wins += player.wins;
    //             matchedPlayer.losses += player.losses;
    //             matchedPlayer.goalsFor += player.goalsFor;
    //             matchedPlayer.goalsAgainst += player.goalsAgainst;
    //             matchedPlayer.goalDifference += player.goalDifference;
    //             matchedPlayer.score = calcRank(matchedPlayer.wins, matchedPlayer.losses, matchedPlayer.goalDifference)

    //         } else {
    //             oldStandings.push(player);
    //         }
    //     })

    //     window.localStorage.setItem('standings', JSON.stringify(oldStandings))
    // }

    const scores = [
        {
            timestamp: new Date(),
            score: {
                team1: team1Score,
                team2: team2Score,
            },
            team1: [
                {
                    player: players.find(player => player.id == DOM.playerSelectors[0].value).name,
                    id: DOM.playerSelectors[0].value,
                }, {
                    player: players.find(player => player.id == DOM.playerSelectors[1].value).name,
                    id: DOM.playerSelectors[1].value,
                }
            ],
            team2: [
                {
                    player: players.find(player => player.id == DOM.playerSelectors[2].value).name,
                    id: DOM.playerSelectors[2].value,
                }, {
                    player: players.find(player => player.id == DOM.playerSelectors[3].value).name,
                    id: DOM.playerSelectors[3].value,
                }
            ]
        }
    ]
    if (!window.localStorage.getItem('scores')) {

        window.localStorage.setItem('scores', JSON.stringify(scores))
    } else {

        const oldScores = JSON.parse(window.localStorage.getItem('scores'));
        const newScores = [
            ...scores,
            ...oldScores
        ]
        window.localStorage.setItem('scores', JSON.stringify(newScores))

    }


    setTimeout(showStats, 500)

}

function calcRoundScore(win, loose, goalDiff) {
    return win - loose + (goalDiff / 2)
}

function calcTable() {
    const scores = JSON.parse(window.localStorage.getItem('scores'));
    let table = [];
    scores.forEach(score => {
        score.team1.forEach(player => {
            const didWin = score.score.team1 > score.score.team2;
            const existingPlayer = table.find(entry => entry.id === player.id)
            if (existingPlayer) {
                const win = didWin ? 1 : 0
                const loose = !didWin ? 1 : 0
                existingPlayer.wins += win,
                    existingPlayer.losses += loose
                existingPlayer.goalsFor += score.score.team1
                existingPlayer.goalsAgainst += score.score.team2
                existingPlayer.goalDifference += score.score.team1 - score.score.team2
                existingPlayer.score = (existingPlayer.score + calcRoundScore(win, loose, score.score.team1 - score.score.team2))

                if (existingPlayer.form.scoreCount < 3) {
                    existingPlayer.form = {
                        score: (existingPlayer.form.score + calcRoundScore(win, loose, score.score.team1 - score.score.team2)),
                        scoreCount: existingPlayer.form.scoreCount + 1
                    }
                }
            } else {
                const win = didWin ? 1 : 0
                const loose = !didWin ? 1 : 0
                const playerEntry = {
                    name: player.player,
                    id: player.id,
                    wins: win,
                    losses: loose,
                    goalsFor: score.score.team1,
                    goalsAgainst: score.score.team2,
                    goalDifference: score.score.team1 - score.score.team2,
                    score: calcRoundScore(win, loose, score.score.team1 - score.score.team2),
                    form: {
                        score: calcRoundScore(win, loose, score.score.team1 - score.score.team2),
                        scoreCount: 1
                    }
                }
                table.push(playerEntry)
            }

        });
        score.team2.forEach(player => {
            const didWin = score.score.team2 > score.score.team1;
            const existingPlayer = table.find(entry => entry.id === player.id)
            if (existingPlayer) {
                const win = didWin ? 1 : 0
                const loose = !didWin ? 1 : 0
                existingPlayer.wins += win
                existingPlayer.losses += loose
                existingPlayer.goalsFor += score.score.team2
                existingPlayer.goalsAgainst += score.score.team1
                existingPlayer.goalDifference += score.score.team2 - score.score.team1
                existingPlayer.score = (existingPlayer.score + calcRoundScore(win, loose, score.score.team2 - score.score.team1))
                if (existingPlayer.form.scoreCount < 3) {
                    existingPlayer.form = {
                        score: (existingPlayer.form.score + calcRoundScore(win, loose, score.score.team2 - score.score.team1)),
                        scoreCount: existingPlayer.form.scoreCount + 1
                    }
                }
            } else {
                const win = didWin ? 1 : 0
                const loose = !didWin ? 1 : 0
                const playerEntry = {
                    name: player.player,
                    id: player.id,
                    wins: win,
                    losses: loose,
                    goalsFor: score.score.team2,
                    goalsAgainst: score.score.team1,
                    goalDifference: score.score.team2 - score.score.team1,
                    score: calcRoundScore(win, loose, score.score.team2 - score.score.team1),
                    form: {
                        score: calcRoundScore(win, loose, score.score.team2 - score.score.team1),
                        scoreCount: 1
                    }
                }
                table.push(playerEntry)
            }
        });
    });
    return table
}
function renderScores() {
    const scores = JSON.parse(window.localStorage.getItem('scores'));

    if (!scores) return
    DOM.scoresContainer.innerHTML = `
        <tr>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Score</th>
        </tr>
    `;
    scores.forEach(game => {
        const winner = game.score.team1 > game.score.team2 ? 1 : 2;
        const markup = `
            <tr>
                <td class="${winner == 1 ? 'bold' : ''}">${game.team1[0].player} - ${game.team1[1].player}</td>
                <td class="${winner == 2 ? 'bold' : ''}">${game.team2[0].player} - ${game.team2[1].player}</td>
                <td>${game.score.team1} - ${game.score.team2}</td>
            </tr>
        `
        DOM.scoresContainer.insertAdjacentHTML('beforeend', markup);
    });
}

function renderStandings() {

    const standings = calcTable();
    if (!standings) return;
    DOM.standingsContainer.innerHTML = `
        <tr>
            <th>Player</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Goals for</th>
            <th>Goals against</th>
            <th>Goal difference</th>
            <th>Score</th>
            <th>Form</th>
        </tr>
    `;
    const sortedStandings = standings.sort((a, b) => {
        if (b.form.score == a.form.score) {
            return b.form - a.form
        } else {
            return b.form.score - a.form.score
        }
    })
    sortedStandings.forEach(player => {
        const markup = `
            <tr>
                <td>${player.name}</td>
                <td>${player.wins}</td>
                <td>${player.losses}</td>
                <td>${player.goalsFor}</td>
                <td>${player.goalsAgainst}</td>
                <td>${player.goalDifference}</td>
                <td>${player.score}</td>
                <td class="bold">${player.form.score}</td>
            </tr>
        `
        DOM.standingsContainer.insertAdjacentHTML('beforeend', markup);
    });
}

renderOptions();
bindEvents();
// showGame()
showStats()