/*
const input = "((A*B)+(A*B))'";

console.log(input)

console.log("---------------------")
console.log("| A | B | C | D | X |")
console.log("---------------------")

resolveExpressao();
console.log("---------------------")
*/





function resolveExpressao(input) {
    for (let index = 0; index < 2; index++) {
        //var expressao = "A+B'*A+B+A'*A"
        var expressaoA = input;
        expressaoA = expressaoA.replace(/A'/g, Number(!index));
        expressaoA = expressaoA.replace(/A/g, Number(index));
        var entradasA = [index];
        for (let index = 0; index < 2; index++) {
            var expressaoB = expressaoA;
            var entradasB = [...entradasA, index];
            expressaoB = expressaoB.replace(/B'/g, Number(!index));
            expressaoB = expressaoB.replace(/B/g, Number(index));

            for (let index = 0; index < 2; index++) {
                var expressaoC = expressaoB;
                var entradasC = [...entradasB, index];
                expressaoC = expressaoC.replace(/C'/g, Number(!index));
                expressaoC = expressaoC.replace(/C/g, Number(index));

                for (let index = 0; index < 2; index++) {
                    var expressaoD = expressaoC;
                    var entradasD = [...entradasC, index];
                    expressaoD = expressaoD.replace(/D'/g, Number(!index));
                    expressaoD = expressaoD.replace(/D/g, Number(index));
                    var resultExpressao = resolveParenteses(expressaoD);
                    imprimeTabela(entradasD, resultExpressao);
                }
            }
        }

    }
}

function calculaResultado(expressao) {
    // 1+0*1+1+0*1
    arrayOr = expressao.split('+');
    arrayOr = arrayOr.map((element) => {
        if (element == Number) {
            return element;
        } else {
            let arrayAnd = element.split('*');
            arrayAnd = arrayAnd.map((element) => {
                if (element == Number) {
                    return element;
                } else {
                    let arrayXOR = element.split('⊕');
                    arrayXOR = arrayXOR.map((element) => {
                        if (element == Number) {
                            return element;
                        } else {
                            let arrayXNOR = element.split('⊙');
                            const result = resolveXNOR(arrayXNOR);
                            return result;

                        }
                    });
                    const result = resolveXOR(arrayXOR);
                    return result;
                }
            });
            const result = multiplicaElementos(arrayAnd);
            return result;
        }
    })
    let arrayResultadoOr = somarElementos(arrayOr);
    let resultado = Boolean(arrayResultadoOr)
    return Number(resultado);
}

function somarElementos(arraySoma) {
    // retorna a soma de todos os elementos de um array
    const result = arraySoma.reduce((acc, element) => {
        return Number(acc) + Number(element);
    });
    return result
}

function multiplicaElementos(arrayMult) {
    // retorna o produto da Multiplicação todos os elementos de um array
    const result = arrayMult.reduce((acc, element) => {
        return Number(acc) * Number(element);
    }, 1);
    return result;
}
function resolveXOR(arrayXOR) {
    if (arrayXOR.length>1) {
        
    
    let contador = 0;
    arrayXOR.forEach(element => {
        if (element == 1) {
            contador++
        }
    });
    if (contador % 2 == 0) {
        return 0;
    } else {
        return 1;
    }
}else{
    return Number(arrayXOR)
}
}
function resolveXNOR(arrayXNOR) {
    if (arrayXNOR.length>1) {
    let contador = 0;
    arrayXNOR.forEach(element => {
        if (element == 1) {
            contador++
        }
    });
    if (contador % 2 == 0) {
        return 1;
    } else {
        return 0;
    }
}else{
    return Number(arrayXNOR)
}
}


function resolveParenteses(expressaoString) {
    expressaoString = expressaoString.replace(/0'/g, 1);
    expressaoString = expressaoString.replace(/1'/g, 0);
    let direcao;
    let arrayString = expressaoString.split('');

    // ()()' (())'
    const indexApostrofo = arrayString.findIndex((element) => element == "'");
    if (indexApostrofo != -1) {
        let arrayCortado = arrayString.slice(0, indexApostrofo);
        arrayCortado.reverse();
        let contador = 0;
        const indexDeCorte = arrayCortado.findIndex((element) => {
            if (element == ')') {
                contador++
                return false;
            }
            if (element == '(') {
                contador--
                if (contador == 0) {
                    return true
                }
                return false;
            } else {
                return false;
            }
        })
        arrayCortado = arrayCortado.slice(1, indexDeCorte);
        arrayCortado.reverse();
        let stringCortada = arrayCortado.join('');
        var resultExpressaoInterna;
        if(arrayCortado.includes('(')){
            resultExpressaoInterna = resolveParenteses(stringCortada);
        }else{
            console.log("StringCortada = "+stringCortada)
            resultExpressaoInterna = calculaResultado(stringCortada);
            resultExpressaoInterna = String(resultExpressaoInterna)
        }
        console.log(typeof(resultExpressaoInterna))
        resultExpressaoInterna = resultExpressaoInterna.replace(/0/g, "0'");
        resultExpressaoInterna = resultExpressaoInterna.replace(/1/g, "1'");
        resultExpressaoInterna = resultExpressaoInterna.replace(/0'/g, 1);
        resultExpressaoInterna = resultExpressaoInterna.replace(/1'/g, 0);
        console.log("array = "+ arrayString)
        console.log("splice1 = "+(arrayString.length - indexDeCorte - 2))
        console.log("splice2 = "+(indexApostrofo + 1))
        console.log("entrada = "+resultExpressaoInterna)
        arrayString.splice((arrayString.length - indexDeCorte - 2), (indexApostrofo + 1), resultExpressaoInterna);
        console.log(arrayString)
    }

    const indexParenteses = arrayString.findIndex((element) => {
        if (element == '(') {
            direcao = 'direita'
            return true
        } else if (element == ')') {
            direcao = 'esquerda'
            return true;
        } else {
            return false;
        }
    })
    if (direcao == 'direita') {
        const arrayCortado = arrayString.slice(indexParenteses + 1);
        let stringExpressao = arrayCortado.join('');
        const resultExpressaoInterna = resolveParenteses(stringExpressao);
        arrayString.splice(indexParenteses, arrayString.length, resultExpressaoInterna);
        stringExpressao = arrayString.join('');
        return stringExpressao;

    } else if (direcao == 'esquerda') {
        let arrayCortado = arrayString.slice(0, indexParenteses);
        let stringExpressao = arrayCortado.join('');
        const resultExpressaoInterna = calculaResultado(stringExpressao);
        arrayString.splice(0, (indexParenteses + 1), resultExpressaoInterna);
        stringExpressao = arrayString.join('');
        stringExpressao = resolveParenteses(stringExpressao);
        return stringExpressao;

    } else {
        let stringExpressao = arrayString.join('');
        stringExpressao = calculaResultado(stringExpressao);
        return stringExpressao;
    }
}
