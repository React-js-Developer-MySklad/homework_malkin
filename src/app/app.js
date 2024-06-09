import headerHtml from "./header/header.html"
import mainHtml from "./main/main.html"
import footerHtml from "./footer/footer.html"
import authModalHtml from "./header/authModal.html"
import './header/header.css'
import './main/main.css'
import './footer/footer.css'


const headerElement = document.getElementById("header")
headerElement.innerHTML = headerHtml;

const mainElement = document.getElementById("main");
mainElement.innerHTML = mainHtml;

const footerElement = document.getElementById("footer");
footerElement.innerHTML = footerHtml;

const authModal = document.getElementById("authModal");
authModal.innerHTML = authModalHtml;
