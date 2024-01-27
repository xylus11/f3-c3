let container = document.getElementById("container");
run();

let sortMarketCap= document.getElementById("sortMarketCap");
sortMarketCap.addEventListener("click" , sortByMarketCap);

async function sortByMarketCap() {
    let data = await getData();
    data.sort((a, b) => {
        return a.market_cap - b.market_cap;
    });
    renderEle(data);
}


let sortPercentage = document.getElementById("sortPercentage");
sortPercentage.addEventListener("click" , sortByPercentage);

async function sortByPercentage() {
    
    let data = await getData();
    data.sort((a, b) => {
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
    });
    renderEle(data);
}

async function run() {
    let data = await getData();
    renderEle(data);
}

async function getData() {
    let res =  await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
    let data = await res.json();
    return data;
}

function renderEle(data){
    data.forEach(element => {
        let name = element.symbol;
        let imgSrc = element.image;
        let price  = element.current_price;
        let marketCap = element.market_cap;
        let prcntg = element.price_change_percentage_24h;
        let rank = element.market_cap_rank;

        let card = document.createElement("tr");
        card.className = "cards";
        card.innerHTML = `
        <td><img style="height:50px" src=${imgSrc} alt=""></td>
        <td><div>${name.toUpperCase()}</div></td>
        <td><div>${price}</div></td>
        <td><div>${prcntg.toFixed(2)}%</div></td>
        <td><div>${marketCap}</div></td>`;

        container.appendChild(card);
    });
}






