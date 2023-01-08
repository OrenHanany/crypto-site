//my variables.
let url= "https://api.coingecko.com/api/v3/coins";
let myUrl= ""
let more="";
let divData=""
let search= false;
let myData= [];
let refreshData=[];
let userList= [];
let tempUserList = [];
let moreInfoList= [];
let timeOnClick= new Date();

//getting coins data for cards
const getData = () => {
$.ajax({
    url: myUrl,
    type: "GET",
    success: (Data) => {
      saveCoinData();
      if (more==""){
        myData = Data;
        saveCoinData();
        home();
      }
      else{
        refreshData=Data;
        refreshInfo(more);
      }
    },
    error: (error) => {
      console.log(error);
    },
});
}

//saving user list of coins
const saveListData = () => {
    localStorage.setItem("userList",JSON.stringify(userList));
}
//saving user list of coins
const loadListData = () => {
    if (JSON.parse(localStorage.getItem("userList"))!=null){
    userList = JSON.parse(localStorage.getItem("userList"));
    }
}

//saving temporary list in case that user wants to cancel his changings.
const saveTUL = () => {
    localStorage.setItem("tempList",JSON.stringify(userList));
}
//loading temporary list in case that user wants to cancel his changings.
const loadTUL = () => {
    if (JSON.parse(localStorage.getItem("tempList"))!=null){
        userList = JSON.parse(localStorage.getItem("tempList"));
        }
}

//save time for more info button press.
const saveTimeClick = (coin) => {
    sessionStorage.setItem(`${coin}`,JSON.stringify(timeOnClick));
}
//load time for more info button press.
const getTimeClick = (coin) => {
    timeOnClick= JSON.parse(sessionStorage.getItem(`${coin}`));
}

//saving coins data.
const saveCoinData = () => {
    localStorage.setItem("myData",JSON.stringify(myData));
}
//loading coins data.
const getCoinData = () => {
    myData=JSON.parse(localStorage.getItem("myData"));
}