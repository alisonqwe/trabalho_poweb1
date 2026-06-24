// cookies.js

export function salvarCookie(nome, valor, dias) {
    let data = new Date();

    data.setTime(
        data.getTime() + (dias * 24 * 60 * 60 * 1000)
    );

    document.cookie =
        `${nome}=${valor};expires=${data.toUTCString()};path=/`;
}

export function lerCookie(nome) {
    let nomeCookie = nome + "=";

    let cookies = document.cookie.split(";");

    for (let cookie of cookies) {

        cookie = cookie.trim();

        if (cookie.indexOf(nomeCookie) === 0) {
            return cookie.substring(nomeCookie.length);
        }
    }

    return "";
}