//================================================================
// Variáveis globais
//================================================================
let gameboard = ['', '', '', '', '', '', '', '', '']; // 3x3 vazio
let currentPlayer = 'X'; // Jogador atual
let gameactive = true; // Jogo ativo
let modoJogo = ''; // Modo de jogo selecionado
let dificuldade = ''; // Dificuldade do modo solo
let playerXWins = 0, playerOWins = 0;//placar de vitórias

// Elementos html
const telas = {
    menu: document.getElementById('.tela-menu'),
    dificuldade: document.getElementById('.tela-dificuldade'),
    jogo: document.getElementById('.tela-jogo')
};
const elementos = {
    celulas: document.querySelectorAll('.cell'),
    mensagemTurno: document.getElementById('turn-mensage'),
    mensagemResultado: document.getelementById('result-mensage'),
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

//================================================================
//  Iniciar jogo
//================================================================
function iniciarJogo(modo) {
    modoJogo = modo;

    //configurar título e badge de dificuldade
    if (modo === 'solo'){ 
        elementos.tituloJogo.textContent = `solo - ${dificuldade.charAt(0).toUpperCase() + dificuldade.slice(1)}`;
        const badges = {
            Facil: '🐣 Fácil',
            medio: '🐥 Médio',
            dificil: '🦅 Imbatível'
        };
        elementos.badgeDificuldade.textContent = badges[dificuldade];
        elementos.badgeDificuldade.style.display = 'none';
    }
    mostrarTela('jogo');
    resetarJogo();
}
//================================================================
//  Lógica do jogo
//================================================================
elementos.celulas.forEach(celula=>{
    celula.addEventListener('click', handleclickcelula);
});
function handleclickcelula(e){
    const position = parseInt(e.targuet.dataset.pos);

    // ignorar se já ocupada ou jogo inativo
    if (tabuleiro [position] !== '' || !gameactive) return;

    // jogador joga
    tabuleiro[position] = currentPlayer;
    e.targuet.classList.add(currentPlayer.toLowerCase());

    if (verificarVitoria()) {
        finalizarjogo(`${currentPlayer} venceu!`);
        atualizarPlacar(currentPlayer);
        return;
    }
    // troca de jogador 
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    atualizarMensagemTurno();

    // se modo solo e vez do bot, o bot joga

    if (modoJogo === 'solo' && currentPlayer === 'O' && gameactive) {
        setTimeout(() => jogadaBot(), 500); // delay para simular pensamento do bot
    }
}