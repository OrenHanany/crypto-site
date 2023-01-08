//on load functions
$ (()=>{
    myUrl=url;
    loadListData();
    getData();
    $("#pop").hide();
});

// search button.
$("#search").click(() => {
    //loder();
    loadListData ();
    getCoinData();
    searchData();
});

// home button.
$("#home").click(() =>{
    //loder();
    loadListData();
    getCoinData();
    home();
});

//live report button.
$("#live_report").click(() =>{
    //loder();
    liveReport();
});

// home page function.
const home = () => {
      divData=""
      divData+="<div id='mainBoxes' class='row row-cols-1'>"
      myData.map ((coin) => {
        buildCards(coin);
    })
    divData+="<div>"
    $("#mainPage").html(divData);
    myData.map((coin) =>{
        for (i=0;i<userList.length;i++){
            if(coin.symbol===userList[i]){
                $(`#${coin.symbol}`)[0].checked=true;
            }
        }
    })
}

//checking and saving the user list of coins up to 5 coins maximum.
const coinList = (name) => {
    if (userList.length<5){
        if (!userList.includes(name)){
        userList.push(name);
        $(`#${name}`)[0].checked=true;
        saveListData();
        }
        else {
            userList.splice(userList.indexOf(name),1)
            saveListData();
            $(`#${name}`)[0].checked=false;
        }
    }
    else{
        saveTUL();
        if (userList.includes(name)){
            userList.splice(userList.indexOf(name),1)
            $(`#${name}`)[0].checked=false;
            saveListData();
            }
        // modal for a 6 coin that choose by customer with an update list option.
        else {
            $(`#${name}`)[0].checked=false;
            let divData=`
        <div id='mainBoxes' class='row row-cols-1'> <div class='card _list' ><div>
        <span class="iconX" onclick="cancel()">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        </span><span>oops it's looks like you have 5 favorite coins alredy..</span></div>
        <hr/>would you like to remove one of the folowing coins? `;
            for (i=0;i<userList.length;i++){
                divData+=`
                            <div id ='insideBox' class ="cardbody">
                                <p>
                                    <span id= "toggle_" class="form-check form-switch" >
                                            <input class="form-check-input" type="checkbox" role="switch" id='${userList[i]}_' "flexSwitchCheckDefault" onclick="coinList('${userList[i]}')" style="float:right; top: 0em;"  >
                                            <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                            <span class="symbol">${userList[i]}<span/> <br/>
                                    </span>
                                </p>
                            </div>`;
            }
            divData+=`
                            <div id ='insideBox' class ="cardbody">
                                <p>
                                  <span id= "toggle_" class="form-check form-switch" >
                                    <input class="form-check-input" type="checkbox" role="switch" id='${name}' "flexSwitchCheckDefault" onclick="coinList('${name}')" style="float:right; top: 0em;"  >
                                    <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                    <span class="symbol">${name}<span/> <br/>
                                  </span>
                                </p>
                            </div>`;
            divData+=`<div><span><button class='btn btn-primary' id='home' onclick="pophide()" style='width:40%;'>save</button></span>`
            divData+=`<span><button class='btn btn-danger' id='cancel' onclick="cancel()";'>cancel</button></span></div>`
            $("#windowCard").html(divData);
            for (i=0;i<userList.length;i++){
                $(`#${userList[i]}_`)[0].checked=true;
            }
            $("#pop").show();
            $("#staticBackdrop").modal("show")
            $(`#${name}`)[0].checked=false;
        }
    }
}

//checkimg and saving more info data, if more than 2 minuets pass refreshing more info data.
const moreInfo = (coin) => {
    let time =new Date().getTime();
    if (!moreInfoList.includes(coin)){
        moreInfoList.push(coin);
        timeOnClick=new Date().getTime();
        saveTimeClick(coin);
        more=`${coin}`;
        myUrl=url + "/" + `${coin}`;
        getData();
    }
    else{
        getTimeClick(coin);
        if (time>timeOnClick+120000){
            timeOnClick=new Date().getTime();
            saveTimeClick(coin);
            let divData="";
                divData+=`<div class="spinner-border text-info" role="status">
                            <span class="sr-only"></span>
                          </div>`
            $(`#collapse_${coin}`).html(divData);
            console.log($(`#collapse_${coin}`))
            more=`${coin}`;
            myUrl=url + "/" + `${coin}`;
            getData();
        }   
    }
    if($(`#collapse_${coin}`)[0].draggable==false){
        $(`#collapse_${coin}`).show();
        $(`#collapse_${coin}`)[0].draggable=true;
        $(`#moreInfo_${coin}`).html("Less Info");
    }
    else{
        $(`#collapse_${coin}`)[0].draggable=false;
        $(`#collapse_${coin}`).hide();
        $(`#moreInfo_${coin}`).html("More Info");
    }
}

//building cards only for specific coins from search input.
const searchData = () => {
    let data=""
    divData=""
    divData+="<div id='mainBoxes' class='row row-cols-1'>";
    data=$(".form-control").val();
    myData.map((coin)=>{
        if (coin.id==data || coin.symbol==data || data==""){
            buildCards(coin);
        }
    });
    divData+="<div>"
    $("#mainPage").html(divData);
    myData.map((coin) =>{
        for (i=0;i<userList.length;i++){
            if(coin.symbol===userList[i] && coin.id.includes(data)) {
                $(`#${coin.symbol}`)[0].checked=true;
            }
        }
    })
    search=false;
}

//HTML bilding cards method.
const buildCards = (coin) => {
    $("#chartContainer").hide();
    divData +=  `<div id='${coin.symbol}_card' class="card">
                        <div id ='insideBox' class ="cardbody">
                            <p>
                                <span id= "toggle" class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id='${coin.symbol}' "flexSwitchCheckDefault" onclick="coinList('${coin.symbol}')" style="float:right; top: 0em;" >
                                    <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                    <span class="symbol">${coin.symbol}<span/> <br/>
                                    <span class="fullname">(${coin.id})<span/>
                                </span>
                            </p>
                        </div><br/>
                        <div class="collapse" id="collapse_${coin.id}">
                                    <img src="${coin.image.small}" id="symbol"> <br/>
                                    price in USD = <span id="price">${coin.market_data.current_price.usd} $ <br/></span>
                                    price in EUR = <span id="price">${coin.market_data.current_price.eur} € <br/></span>
                                    price in ILS = <span id="price">${coin.market_data.current_price.ils} ₪ <br/><br/></span>
                        </div>
                        <p>
                            <button id="moreInfo_${coin.id}" class= "btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${coin.id}" aria-expanded="true" aria-controls="collapse_${coin.id}" onclick="moreInfo('${coin.id}')">
                            More Info
                            </button>
                        </p>
                    </div>`;
}

//getting most update data and refreshinf data in a specific card.
const refreshInfo = () => {
    myData.map((coin) => {
        if (coin.id==more){
            coin.market_data.current_price.usd=refreshData.market_data.current_price.usd;
            coin.market_data.current_price.eur=refreshData.market_data.current_price.eur;
            coin.market_data.current_price.ils=refreshData.market_data.current_price.ils;
        }
    })
    saveCoinData();
        divData=`
                    <img src="${refreshData.image.small}" id="symbol"> <br/>
                    price in USD = <span id="price">${refreshData.market_data.current_price.usd} $ <br/></span>
                    price in EUR = <span id="price">${refreshData.market_data.current_price.eur} € <br/></span>
                    price in ILS = <span id="price">${refreshData.market_data.current_price.ils} ₪ <br/><br/></span> `;
        $(`#collapse_${refreshData.id}`).html(divData);
    more="";
}

//HTML loder.
const loder = () => {
    let divData="";
    divData+=`<div class="spinner-border text-info" role="status">
    <span class="sr-only"></span>
    </div>`
    $("#mainPage").html(divData);
}

//hiding modal function.
const pophide = () => {
    $('#pop').hide();
    $("#staticBackdrop").modal("hide")
    myData.map((coin)=>{
        if(!userList.includes(coin.symbol)){
            console.log($(`#${coin.symbol}`))
            $(`#${coin.symbol}`)[0].checked=false;
        }
    })
}

//in case that customer wants to cancel his changing in modal. bringing back original user list data.
const cancel = () => {
    $('#pop').hide();
    $("#staticBackdrop").modal("hide")
    loadTUL();
    myData.map((coin) =>{
        if(!userList.includes(coin.symbol)){
            $(`#${coin.symbol}`)[0].checked=false;
        }
        else{
            $(`#${coin.symbol}`)[0].checked=true;
        }
    })
    saveListData();
}