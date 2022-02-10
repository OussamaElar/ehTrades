//--------------------------
// Sample data (leave as-is)
//--------------------------
const data = [
    {
        "id": "3cc51cfd-6e3c-41eb-9604-362da3a6fb64",
        "symbol": "MSFT",
        "companyName": "Microsoft",
        "price": 310.98,
        "quantity": 2000,
        "currency": "USD"
    },
    {
        "id": "0572be22-d790-460e-bf03-8ee1b3b19dad",
        "symbol": "MSFT",
        "companyName": "Microsoft",
        "price": 310.9,
        "quantity": 1500,
        "currency": "USD"
    },
    {
        "id": "8f356500-de35-4378-b7a3-5c587da54cd5",
        "symbol": "AAPL",
        "companyName": "Apple",
        "price": 174.78,
        "quantity": 500,
        "currency": "USD"
    },
    {
        "id": "5f92c4c3-b6b9-4538-9e80-d587217e8410",
        "symbol": "VOD",
        "price": 130.02,
        "quantity": 3290,
        "currency": "GBP"
    },
    {
        "id": "00000000-0000-0000-0000-000000000000",
        "symbol": "XXX",
        "price": 99.99,
        "quantity": 100,
        "currency": "GBP"
    },
    {
        "id": "155ac33b-05c4-42f7-a446-0b7ffacf2504",
        "symbol": "VOD",
        "price": 128.91,
        "quantity": 8500,
        "currency": "GBP"
    }
];


//----------------------
// The method to improve.
// Submit a revised version of this function below, making any changes
// you believe improve the code while satisfying the requirements above.
//----------------------
function doProcesstrades(ddata) {
   // renaming variables for more clarity  
    var summary = {},
        tradeArray = [],
        // count revised 
        count = 0;
    for (let i = 0; i < ddata.length; i++) {
        var trade = ddata[i];
        count++

        // 1) add up prices
        if (!summary["total" + trade.currency]) {
            summary["total" + trade.currency] = trade.price * trade.quantity
        } else {
            summary["total" + trade.currency] = summary["total" + trade.currency] + trade.price * trade.quantity
        }
          
           

        // 2) collect unique symbols
        if (!summary.symbols) summary.symbols = [];
        if (summary.symbols.indexOf(trade.symbol) < 0) {
            summary.symbols = summary.symbols.concat([trade.symbol])
        }

        // 3) handle missing names
        // null check is sufficient 
        if (!trade.companyName) {
            trade.companyName = trade['symbol'] || '???????'
        }

        // 4) add trade to returned array
        tradeArray = tradeArray.concat(trade)
    }

    summary.tradeCount = count;
    summary.trades = tradeArray;

    // 5) remove bad trades - be sure to fix count if neeeded
    var removed = 0
    for (let i = 0; i < summary.trades.length; i++) {
        if (summary.trades[i].id == '00000000-0000-0000-0000-000000000000') {
            // adding symbol property to get meaningful error  
            console.error(`Bad trade removed: ${summary.trades[i].symbol}`)
            removed++;
            let badTradeSym = summary.trades[i].symbol
            summary.symbols.splice(summary.symbols.indexOf(badTradeSym), 1)
            summary.trades.splice(i, 1);
        }
        summary.tradeCount = summary.tradeCount - removed;
    }
    return summary;
}

console.log(doProcesstrades(data))
