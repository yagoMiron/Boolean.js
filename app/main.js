const botao = document.querySelectorAll('input.botao');
const input = document.querySelector('.input');


for (let i = 0; i < botao.length; i++) {
    botao[i].addEventListener("click", function () {
        let valor = botao[i].id

        if (valor == 'igual') {
            const tabela = document.querySelector(".tabelaVerdade");
            const seta = document.querySelector(".seta");
            tabela.className = "tabelaVerdade";
            seta.className = "seta";
            tabela.innerHTML = '<div class="bloco topo">A</div> \n ' +
                '<div class="bloco topo">B</div> \n ' +
                '<div class="bloco topo">C</div> \n ' +
                '<div class="bloco topo">D</div> \n ' +
                '<div class="bloco topo">S</div> \n \n ';
            resolveExpressao(input.value)
        } else if (valor == 'apagar') {
            input.value = ''
        } else {
            input.value += botao[i].defaultValue;
        }
    });
}