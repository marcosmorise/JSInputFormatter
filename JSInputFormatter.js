/**
 * inputFormatter
 * @param {Event} event
 * @param {String} mask # - Number * - Letter. Ex: (##)*####-####
 * @returns {void}
 */
var inputFormatter = (event, mask) => {
    let element = event.target;
    //corta valor do elemento maior que a mascara
    if (element.value.length > mask.length) {
        element.value = element.value.substring(0, mask.length);
    }

    //Altera a posição do caractere digitado conforme a máscara
    if (element.value.length > 1) {
        let value = element.value;
        //Obtem o ultimo caractere do elemento
        let lastchar = value[value.length - 1];
        //Obtem o indice do ultimo caractere
        let i = value.length - 1;
        //Remove o ultimo caractere do elemento
        value = value.substring(0, value.length - 1);
        //insere ultimos carateres não digitáveis da mascara
        while (mask[i] !== "#" && mask[i] !== "*" && i < mask.length) {
            value += mask[i];
            i++;
        }
        value += lastchar;
        element.value = value;
    }

    //Separa somente caracteres digitados
    value = "";
    for (let i = 0; i < element.value.length; i++) {
        let elementChar = element.value[i];
        let maskChar = mask[i];
        if ((maskChar === "#" && elementChar.match(/[0-9]/)) || (maskChar !== "#" && maskChar !== "*" && maskChar !== elementChar)){
            value += elementChar;
        } else if (maskChar === "*") {
            value += elementChar;
        }
    }
    element.value = value;

    //Acrescenta os caracteres da não digitáveis da máscara
    value = "";
    let j = 0;
    for (let i = 0; i < mask.length; i++) {
        let maskChar = mask[i];
        if (maskChar !== "#" && maskChar !== "*") {
            value += maskChar;
        } else {
            if (j < element.value.length) {
                value += element.value[j];
            } else {
                i = mask.length;
            }
            j++;
        }
    }
    element.value = value;

    value = element.value;
    //Remove ultimos caracteres não digitáveis
    if (value.length < mask.length && value.length > 0) {
        while (value.length > 1 && mask[value.length - 1] !== "#" && mask[value.length - 1] !== "*") {
            value = value.substring(0, value.length - 1);
        }
    } 
    element.value = value;

    //Move o cursor para antes dos caracteres últimos não digitáveis, se houver
    if(value.length === mask.length){ 
        let cursorPos = value.length;
        while(mask[cursorPos]!=="#" && mask[cursorPos]!=="*" && cursorPos > 0) {
            cursorPos--;
        }
        element.setSelectionRange(cursorPos+1, cursorPos+1);
    }
};

/**
 * inputDecimalFormatter
 * @param {Event} event
 * @param {integer} decimal Decimal number
 * @returns {void}
 */
var inputDecimalFormatter = (event, decimal) => {
    let element = event.target;
    inputDecimalPreventDefault(element);
    element.style.textAlign = "right";
    var value = "";
    //Separa somente os números
    for (let i = 0; i < element.value.length; i++) {
        let elementChar = element.value[i];
        if (elementChar.match(/[0-9]/)) {
            value += elementChar;
        }
    }
    //Remove zeros a esquerda
    if (value.length > 0) {
        value = parseInt(value) + "";
    }
    //Adiciona zeros a esquerda se necessário
    while (value.length < decimal + 1) {
        value = "0" + value;
    }
    //Insere o separador decimal
    value = value.substring(0, value.length - decimal) + "." + value.substring(value.length - decimal, value.length);
    element.value = value;
};

/**
 * inputDecimalPreventDefault - Disable input number UI
 * @param {element} element
 * @returns {void}
 */
var inputDecimalPreventDefault = (element) => {
    //Se o elemento for tipo number
    if (element.type === "number") {
        //Desabilita a roda do mouse no elemento input number
        element.onmousewheel = (event) => {
            event.preventDefault();
        };
        //Desabilita setas para cima e para baixo
        element.onkeydown = (event) => {
            if (event.keyCode === 38 || event.keyCode === 40) {
                event.preventDefault();
            }
        };
    }
};
