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
    // 1+0*1+1+0*1]
    arrayOr = expressao.split('+');
    arrayOr = arrayOr.map((element) => {
        if (Number(element)) {
            return element;
        } else {
            let arrayAnd = element.split('*');
            arrayAnd = arrayAnd.map((element) => {
                if (Number(element)) {
                    return element;
                } else {
                    let arrayXOR = element.split('⊕');
                    arrayXOR = arrayXOR.map((element) => {
                        if (Number(element)) {
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
    });
    let arrayResultadoOr = somarElementos(arrayOr);
    if (Number(arrayResultadoOr) === NaN) {
        console.log("ERROR")
    }
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
    if (arrayXOR.length > 1) {


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
    } else {
        return Number(arrayXOR)
    }
}
function resolveXNOR(arrayXNOR) {
    if (arrayXNOR.length > 1) {
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
    } else {
        return Number(arrayXNOR)
    }
}


function resolveParenteses(expressao) {
    expressao = expressao + ")";
    expressao = expressao.replace(/''/g, "");
    expressao = expressao.replace(/0'/g, 1);
    expressao = expressao.replace(/1'/g, 0);

    while (expressao.includes(")")) {
        expressao = procuraParenteses(expressao)
        if (typeof expressao === "object") {
            expressao = expressao.join("")
        }
        expressao = expressao.replace(/''/g, "");
        expressao = expressao.replace(/0'/g, 1);
        expressao = expressao.replace(/1'/g, 0);
    }
    expressao = calculaResultado(expressao)
    return expressao;
}

function procuraParenteses(expressao) {
    let arrayString = expressao.split('');
    for (index = 0; index < arrayString.length; index++) {
        const element = arrayString[index];
        if (element == '(') {
            const arrayInterno = arrayString.slice(index + 1, arrayString.length);
            const stringInterna = arrayInterno.join("");
            let resultInterno = procuraParenteses(stringInterna);
            const indiceAbreParenteses = arrayString.findIndex((element) => element == '(')

            if (!isNaN(Number(resultInterno)) || resultInterno.length == 2 && resultInterno[1] == "'") {
                return String(resultInterno)
            }

            if(typeof resultInterno === 'string' || resultInterno instanceof String){
                let arrayMath = resultInterno.split('');
                const indiceFechaParenteses = arrayMath.findIndex((element) => element == ')')
                let stringMath = (arrayMath.slice(0, indiceFechaParenteses)).join("");
                let segundaParte = (arrayMath.slice(indiceFechaParenteses+1)).join("");
                let result = calculaResultado(stringMath)
                resultInterno = result+segundaParte;
            }

            arrayString.splice((indiceAbreParenteses), arrayString.length, ...resultInterno);
            resultInterno = arrayString.join("");
            return resultInterno
        }
        if (element == ')') {
            const arrayInterno = arrayString.slice(0, index);
            const stringInterna = arrayInterno.join("");
            let resultInterno = calculaResultado(stringInterna)
            arrayString.splice(0, (index + 1), resultInterno);
            return arrayString;
        }
    }
}
