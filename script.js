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
            // doc.data() will be undefined in this case
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
            name: 'Michael',
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
            name: 'Jakob',
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
    ]
    const now = new Date();
    const oneMonthAgo = new Date(new Date(now).setDate(now.getDate() - 29));

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
        DOM.team1Score.value = null
        DOM.team1Score.value = null
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

    function calcRoundScore(win, loose, goalDiff) {
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

    function calcTable() {
        if (!window.localStorage.getItem('scores')) return
        const scores = JSON.parse(window.localStorage.getItem('scores'));
        let table = [];
        scores.forEach(score => {
            if (!score.timestamp) return
            const scoreDate = new Date(score.timestamp)
            if (scoreDate > oneMonthAgo) {
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

                        if (existingPlayer.form.scoreCount < 5) {
                            existingPlayer.form.score = (existingPlayer.form.score + calcRoundScore(win, loose, score.score.team1 - score.score.team2))
                            existingPlayer.form.scoreCount = existingPlayer.form.scoreCount + 1
                            if (existingPlayer.form.scoreCount < 3) {
                                existingPlayer.form.lastThree = (existingPlayer.form.score + calcRoundScore(win, loose, score.score.team1 - score.score.team2))
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
                                lastThree: calcRoundScore(win, loose, score.score.team1 - score.score.team2),
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
                        if (existingPlayer.form.scoreCount < 5) {
                            existingPlayer.form.score = (existingPlayer.form.score + calcRoundScore(win, loose, score.score.team2 - score.score.team1))
                            existingPlayer.form.scoreCount = existingPlayer.form.scoreCount + 1
                            if (existingPlayer.form.scoreCount < 3) {
                                existingPlayer.form.lastThree = (existingPlayer.form.score + calcRoundScore(win, loose, score.score.team2 - score.score.team1))
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
                                lastThree: calcRoundScore(win, loose, score.score.team2 - score.score.team1),
                                scoreCount: 1
                            }
                        }
                        table.push(playerEntry)
                    }
                });
            }
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
                        <td class="${winner == 1 ? 'bold' : ''}">${game.team1[0].player} - ${game.team1[1].player}</td>
                        <td class="${winner == 2 ? 'bold' : ''}">${game.team2[0].player} - ${game.team2[1].player}</td>
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
                    <th>Player</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Goal difference</th>
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
                    <th>Goal difference</th>
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
                const markup = `
                    <tr>
                        <td>${player.name}</td>
                        <td>${player.wins}</td>
                        <td>${player.losses}</td>
                        <td>${player.goalDifference}</td>
                        <td><span class="form ${calcForm(player.form.score)}" ></span></td>
                        <td >${player.form.score}</td>
                        <td class="bold">${player.score}</td>
                    </tr>
                `
                DOM.standingsContainer.insertAdjacentHTML('beforeend', markup);
            });

        } else {
            sortedStandings.forEach(player => {
                const markup = `
                    <tr>
                        <td>${player.name}</td>
                        <td>${player.wins}</td>
                        <td>${player.losses}</td>
                        <td>${player.goalDifference}</td>
                        <td><span class="form ${calcForm(player.form.score)}" ></span></td>
                        <td >${player.form.score}</td>
                        <td class="bold">${player.score}</td>
                    </tr>
                `
                DOM.standingsContainer.insertAdjacentHTML('beforeend', markup);
            });

        }
    }

    renderOptions();
    bindEvents();
    // showGame()
    showStats()
}
