
export function idAleatorio(){
    // Conjuntos 
    const abecedario = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
        "u", "v", "w", "x", "y", "z"
    ];
    const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Numeros aleatorios
    const numeroAleatorioUno = numeros[Math.floor(Math.random() * numeros.length)]
    const numeroAleatorioDos = numeros[Math.floor(Math.random() * numeros.length)]
    const numeroAleatorioTres = numeros[Math.floor(Math.random() * numeros.length)]
    const letraAleatoriaUno = abecedario[Math.floor(Math.random() * abecedario.length)]
    const letraAleatoriaDos = abecedario[Math.floor(Math.random() * abecedario.length)]
    const letraAleatoriaTres = abecedario[Math.floor(Math.random() * abecedario.length)]

    
    // id creada
    let id = `${letraAleatoriaUno}${letraAleatoriaDos}${letraAleatoriaTres}-${numeroAleatorioUno}${numeroAleatorioDos}${numeroAleatorioTres}`
    return id

}

export function idAleatorioCheckbox(){
    // Conjuntos 
    const abecedario = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", 
        "u", "v", "w", "x", "y", "z"
    ];
    const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Numeros aleatorios
    const numeroAleatorioUno = numeros[Math.floor(Math.random() * numeros.length)]
    const numeroAleatorioDos = numeros[Math.floor(Math.random() * numeros.length)]
    const numeroAleatorioTres = numeros[Math.floor(Math.random() * numeros.length)]
    const letraAleatoriaUno = abecedario[Math.floor(Math.random() * abecedario.length )]
    const letraAleatoriaDos = abecedario[Math.floor(Math.random() * abecedario.length )]
    const letraAleatoriaTres = abecedario[Math.floor(Math.random() * abecedario.length )]
    
    // id creada
    let id = `${letraAleatoriaUno}${numeroAleatorioUno}${letraAleatoriaDos}${numeroAleatorioDos}${letraAleatoriaTres}${numeroAleatorioTres}`
    return id

}