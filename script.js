const firebaseConfig = {
    apiKey: "AIzaSyDxBP43uCeNGmeKOSDcouJd7HNRdkyz7rQ",
    authDomain: "foosball-26a5c.firebaseapp.com",
    projectId: "foosball-26a5c",
    storageBucket: "foosball-26a5c.appspot.com",
    messagingSenderId: "540502855447",
    appId: "1:540502855447:web:fadf721cb01fc80ab9f152",
};
firebase.initializeApp(firebaseConfig);
var firebaseDatabase = firebase.firestore();
var scoresDoc = firebaseDatabase.collection("scores").doc("fVrdOakjOxeEX1lCQpPr");

scoresDoc
    .get()
    .then((doc) => {
        if (doc.exists) {
            window.local
            window.localStorage.setItem('scores', doc.data()['allscores'])
            console.log("Fetched document!", doc.data());
            init()
        } else {
            console.log("No such document!");
        }
    })
    .catch((error) => {
        console.log("Error getting document:", error);
    });

function init() {
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
            name: 'Michael C K',
            id: 9,
        },
        {
            name: 'Ditte',
            id: 10,
        },
        {
            name: 'Frederik',
            id: 11,
        },
        {
            name: 'Line',
            id: 12,
        },
        {
            name: 'Semir',
            id: 13,
        },
        {
            name: 'Jacob K H',
            id: 14,
        },
        {
            name: 'Anton',
            id: 15,
        },
        {
            name: 'Oliver',
            id: 16,
        },
        {
            name: 'Mikhail',
            id: 17,
        },
        {
            name: 'Sofie',
            id: 18,
        },
        {
            name: 'Xavier',
            id: 19,
        },
        {
            name: 'Ignacio',
            id: 20,
        },
        {
            name: 'Mussa',
            id: 21,
        },
        {
            name: 'Mikolaj',
            id: 22,
        },
        {
            name: 'Tonny',
            id: 23,
        },
        {
            name: 'Sofus',
            id: 24,
        },
        {
            name: 'Jacob H',
            id: 24,
        },
        {
            name: 'Nicolaj P',
            id: 25,
        },
        {
            name: 'Anders Hartmann',
            id: 26,
        },
    ]
    const now = new Date();
    const oneMonthAgo = new Date(new Date(now).setDate(now.getDate() - 29));

    const DOM = {
        team1Score: document.querySelector('#team1Score'),
        team2Score: document.querySelector('#team2Score'),
        buttons: {
            randomizeTeams: document.querySelector('.randomizeTeams'),
        },
        statsInfo: {
            statsInfoButton: document.querySelector('.stats-info-button'),
            statsInfoText: document.querySelector('.stats-info-text'),
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
        DOM.statsInfo.statsInfoButton.addEventListener('click', (e) => {
            DOM.statsInfo.statsInfoText.classList.toggle('is-visible')
        });
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
        const optionsMarkup = players.sort((a, b) => a.name > b.name ? 1 : -1).map(player => {
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

    function registerGame(e) {
        e.preventDefault();
        const team1Score = parseInt(DOM.team1Score.value);
        const team2Score = parseInt(DOM.team2Score.value);
        DOM.team1Score.value = null
        DOM.team2Score.value = null
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
            scoresDoc.set({
                allscores: JSON.stringify(scores)
            })
        } else {

            const oldScores = JSON.parse(window.localStorage.getItem('scores'));
            const newScores = [
                ...scores,
                ...oldScores
            ]
            window.localStorage.setItem('scores', JSON.stringify(newScores))
            scoresDoc.set({
                allscores: JSON.stringify(newScores)
            })
        }


        setTimeout(showStats, 500)

    }

    function calcRoundScore(win, loose, goalDiff, playerScore = 0) {
        return win - loose + (goalDiff / 2)
    }

    function calcForm(score) {
        switch (true) {
            case score > 6:
                return 'hot';
            case score > 3:
                return 'warmer';
            case score > 0:
                return 'warm';
            case score > -3:
                return 'cold';
            case score > -6:
                return 'colder';
            default:
                return 'freezing'
        }
    }

    function calcPositionPercentage(table, team1, team2) {
        const player1Pos = Math.max(table.indexOf(table.find(item => item.id == team1[0].id)), 0) + 1
        const player2Pos = Math.max(table.indexOf(table.find(item => item.id == team1[1].id)), 0) + 1
        const player3Pos = Math.max(table.indexOf(table.find(item => item.id == team2[0].id)), 0) + 1
        const player4Pos = Math.max(table.indexOf(table.find(item => item.id == team2[1].id)), 0) + 1
        let team1PositionAverage = (player1Pos + player2Pos) / 2
        let team2PositionAverage = (player3Pos + player4Pos) / 2
        let diff = (team1PositionAverage - team2PositionAverage) * 0.1
        return Math.max(diff, 0)
    }

    function calcTable() {
        if (!window.localStorage.getItem('scores')) return
        const scores = JSON.parse(window.localStorage.getItem('scores'));
        scores.reverse()
        let table = [];
        scores.forEach(score => {
            if (!score.timestamp) return
            const scoreDate = new Date(score.timestamp)
            if (scoreDate > oneMonthAgo) {
                const didTeam1Win = score.score.team1 > score.score.team2;
                const didTeam2Win = score.score.team1 < score.score.team2;
                const team1Percentage = didTeam1Win ? calcPositionPercentage(table, score.team1, score.team2) : calcPositionPercentage(table, score.team1, score.team2) / 2
                const team2Percentage = didTeam2Win ? calcPositionPercentage(table, score.team2, score.team1) : calcPositionPercentage(table, score.team2, score.team1) / 2

                score.team1.forEach(player => {
                    const existingPlayer = table.find(entry => entry.id === player.id)
                    if (existingPlayer) {
                        const win = didTeam1Win ? 1 : 0
                        const loose = !didTeam1Win ? 1 : 0
                        const roundScore = calcRoundScore(win, loose, score.score.team1 - score.score.team2, existingPlayer.score)
                        const rankedScore = parseFloat(roundScore + (Math.abs(roundScore) * team1Percentage))

                        existingPlayer.wins += win
                        existingPlayer.losses += loose
                        existingPlayer.goalsFor += score.score.team1
                        existingPlayer.goalsAgainst += score.score.team2
                        existingPlayer.goalDifference += score.score.team1 - score.score.team2
                        existingPlayer.score = existingPlayer.score + rankedScore
                        existingPlayer.scoreHistory.push(rankedScore)
                        if (score.score.team1 === 0) {
                            existingPlayer.hasBeenEgged = true
                        }
                    } else {
                        const win = didTeam1Win ? 1 : 0
                        const loose = !didTeam1Win ? 1 : 0
                        const roundScore = calcRoundScore(win, loose, score.score.team1 - score.score.team2)
                        const rankedScore = parseFloat(roundScore + (Math.abs(roundScore) * team1Percentage))
                        const playerEntry = {
                            name: player.player,
                            id: player.id,
                            wins: win,
                            losses: loose,
                            goalsFor: score.score.team1,
                            goalsAgainst: score.score.team2,
                            goalDifference: score.score.team1 - score.score.team2,
                            score: rankedScore,
                            scoreHistory: [rankedScore]
                        }
                        if (score.score.team1 === 0) {
                            playerEntry.hasBeenEgged = true
                        }
                        table.push(playerEntry)
                    }

                });
                score.team2.forEach(player => {
                    const existingPlayer = table.find(entry => entry.id === player.id)
                    if (existingPlayer) {
                        const win = didTeam2Win ? 1 : 0
                        const loose = !didTeam2Win ? 1 : 0
                        const roundScore = parseFloat(calcRoundScore(win, loose, score.score.team2 - score.score.team1, existingPlayer.score))
                        const rankedScore = roundScore + (Math.abs(roundScore) * team2Percentage)
                        existingPlayer.wins += win
                        existingPlayer.losses += loose
                        existingPlayer.goalsFor += score.score.team2
                        existingPlayer.goalsAgainst += score.score.team1
                        existingPlayer.goalDifference += score.score.team2 - score.score.team1
                        existingPlayer.score = existingPlayer.score + rankedScore
                        existingPlayer.scoreHistory.push(rankedScore)
                        if (score.score.team2 === 0) {
                            existingPlayer.hasBeenEgged = true
                        }
                    } else {
                        const win = didTeam2Win ? 1 : 0
                        const loose = !didTeam2Win ? 1 : 0
                        const roundScore = calcRoundScore(win, loose, score.score.team2 - score.score.team1)
                        const rankedScore = parseFloat(roundScore + (Math.abs(roundScore) * team2Percentage))
                        const playerEntry = {
                            name: player.player,
                            id: player.id,
                            wins: win,
                            losses: loose,
                            goalsFor: score.score.team2,
                            goalsAgainst: score.score.team1,
                            goalDifference: score.score.team2 - score.score.team1,
                            score: rankedScore,
                            scoreHistory: [rankedScore]
                        }
                        if (score.score.team2 === 0) {
                            playerEntry.hasBeenEgged = true
                        }
                        table.push(playerEntry)
                    }
                });
            }
            table.sort((a, b) => {
                if (b.score == a.score) {
                    return b.form - a.form
                } else {
                    return b.score - a.score
                }
            })
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
                <th>Date</th>
                <th>Score</th>
            </tr>
        `;
        scores.forEach(game => {

            if (!game.timestamp) return
            const scoreDate = new Date(game.timestamp)
            if (scoreDate > oneMonthAgo) {

                const winner = game.score.team1 > game.score.team2 ? 1 : 2;
                const markup = `
                    <tr>
                        <td class="${game.score.team1 === 0 && 'egg'} ${winner == 1 ? 'bold' : ''}">${game.team1[0].player} - ${game.team1[1].player}</td>
                        <td class="${game.score.team2 === 0 && 'egg'} ${winner == 2 ? 'bold' : ''}">${game.team2[0].player} - ${game.team2[1].player}</td>
                        <td>${scoreDate.getDate()}/${scoreDate.getMonth() + 1}</td>
                        <td>${game.score.team1} - ${game.score.team2}</td>
                    </tr>
                `
                DOM.scoresContainer.insertAdjacentHTML('beforeend', markup);
            }
        });
    }

    function renderStandings() {
        const standings = calcTable();
        if (!standings) return;
        if (window.innerWidth > 600) {
            DOM.standingsContainer.innerHTML = `
                <tr>
                    <th>Position</th>
                    <th>Player</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Goal +/-</th>
                    <th>Form</th>
                    <th>Last 5</th>
                    <th>Score</th>
                </tr>
            `;
        } else {

            DOM.standingsContainer.innerHTML = `
                <tr>
                    <th>Player</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Goal +/-</th>
                    <th>Form</th>
                    <th>Last 5</th>
                    <th>Score</th>
                </tr>
            `;
        }
        const sortedStandings = standings.sort((a, b) => {
            if (b.score == a.score) {
                return b.form - a.form
            } else {
                return b.score - a.score
            }
        })
        if (window.innerWidth > 600) {
            sortedStandings.forEach(player => {

                const lastFive = player.scoreHistory.reverse().filter((score, index) => index < 5 && score).reduce((a, b) => a + b)
                const position = sortedStandings.indexOf(player) + 1
                const markup = `
                    <tr>
                        <td>${position}</td>
                        <td class="${player.hasBeenEgged && 'egg'}">${player.name}</td>
                        <td>${player.wins}</td>
                        <td>${player.losses}</td>
                        <td>${player.goalDifference}</td>
                        <td><span class="form ${calcForm(lastFive.toFixed(2))}" ></span></td>
                        <td >${lastFive.toFixed(2)}</td>
                        <td class="bold">${player.score.toFixed(2)}</td>
                    </tr>
                `
                DOM.standingsContainer.insertAdjacentHTML('beforeend', markup);
            });

        } else {
            sortedStandings.forEach(player => {
                const lastFive = player.scoreHistory.reverse().filter((score, index) => index < 5 && score).reduce((a, b) => a + b)

                const markup = `
                    <tr>
                        <td>${player.name}</td>
                        <td>${player.wins}</td>
                        <td>${player.losses}</td>
                        <td>${player.goalDifference}</td>
                        <td><span class="form ${calcForm(lastFive.toFixed(2))}" ></span></td>
                        <td >${lastFive.toFixed(2)}</td>
                        <td class="bold">${player.score.toFixed(2)}</td>
                    </tr>
                `
                DOM.standingsContainer.insertAdjacentHTML('beforeend', markup);
            });

        }
    }

    renderOptions();
    bindEvents();
    showStats()
}
