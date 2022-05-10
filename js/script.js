let massiveControl = [
//     {
//     place: "italy",
//     header: "The Grand Canal in Venice",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
//     img: "img/bg-1.jpg",
// },{
//     place: "ireland",
//     header: "Massive mountain in Ireland",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
//     img: "img/bg-2.jpg",
// },{
//     place: "new york",
//     header: "Busy street in New York",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
//     img: "img/bg-3.jpg",
// },{
//     place: "forest",
//     header: "Beautiful Forest",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure",
//     img: "img/bg-4.jpg",
// },
{
    place: "",
    header: "",
    text: "",
    img: "img/bg-5-min.png",
},{
    place: "",
    header: "",
    text: "",
    img: "img/bg-8-min.png",}
,{
    place: "",
    header: "",
    text: "",
    img: "img/bg-6.png",
}
,{
    place: "",
    header: "",
    text: "",
    img: "img/bg-7.png",
}
,{
    place: "",
    header: "",
    text: "",
   img: "img/bg-9.png",
}]


const HAMBURGER_MENU_ICON = document.querySelector('.menu__button');

HAMBURGER_MENU_ICON.addEventListener("click", () => {
    HAMBURGER_MENU_ICON.parentElement.classList.toggle('menu--active');
})

