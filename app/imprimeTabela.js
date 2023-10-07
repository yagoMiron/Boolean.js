function imprimeTabela (entradas, resultado){
    const tabela = document.querySelector(".tabelaVerdade");
    entradas.forEach(element => {
        tabela.innerHTML += `<div class="bloco">${element}</div> \n`;
    });
    if (resultado == '1') {
        tabela.innerHTML += `<div class="bloco resposta1">${resultado}</div> \n \n`;
    }
    if (resultado == '0') {

        tabela.innerHTML += `<div class="bloco resposta0">${resultado}</div> \n \n`;
    }
}