//================================================================
// Variáveis globais
//================================================================
let gameboard = ['', '', '', '', '', '', '', '', '']; // 3x3 vazio
let currentPlayer = 'X'; // Jogador atual
let gameactive = true; // Jogo ativo
let modoJogo = ''; // Modo de jogo selecionado
let dificuldade = ''; // Dificuldade do modo solo
let playerXWins = 0, playerOWins = 0,;//placar de vitórias

// Elementos html
const telas = {
    menu: document.getElementById('.tela-menu'),
    dificuldade: document.getElementById('.tela-dificuldade'),
    jogo: document.getElementById('.tela-jogo')
};
const elementos = {
    celulas: document.querySelectorAll('.cell'),
    mensagemTurno: document.getElementById('turn-mensage'),
    mensagemResultado: dicument.getelementById('result-mensage'),
    resultText: document.getElementById('result-text'),
    PlacarX: document.getElementById('X-score'),
    PlacarO: document.getElementById('O-score'),
    tituloJogo: document.getElementById('game-title'),
    badgeDificuldade: document.getElementById('dificult-info')
};

//================================================================
//  navegação entre telas
//================================================================
function mostrarTela(telaNome) {
    Object.values(telas).forEach(tela => {
        tela.classList.remove('active');
    });
    telas[telaNome].classList.add('active');
}

document.querySelectorAll('.dificult-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        dificuldade = btn.dataset.dificuldade;
        iniciarJogo('solo');
    });
});
