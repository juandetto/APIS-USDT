// Variables for easy customization
const API_URL = "https://criptoya.com/api/usdc/ars/100";
const PREFERRED_EXCHANGE = "lemoncash";
// Cambiar arriba por tu exchange preferido (belo, ripio, lemoncash, buenbit, satoshitango, decrypto, letsbit, bybit)

// Fetch the exchange rate from the API
async function fetchExchangeRate() {
    let req = new Request(API_URL);
    let apiData = await req.loadJSON();
    return apiData[PREFERRED_EXCHANGE];
}

// Create the widget
async function createWidget(exchangeRate) {
    let widget = new ListWidget();
    widget.backgroundColor = new Color("#1E2328");
    
    let titleText = "USDC";
    let title = widget.addText(titleText);
    title.textColor = new Color("#2975CB");
    title.font = Font.boldSystemFont(20);
    
    let exchangeName = widget.addText(PREFERRED_EXCHANGE.charAt(0).toUpperCase() + PREFERRED_EXCHANGE.slice(1));  // Capitalize the exchange name
    exchangeName.textColor = Color.gray();
    exchangeName.font = Font.systemFont(14);
    
    widget.addSpacer();
    
    let askText = "$" + exchangeRate.ask.toLocaleString('en-US', {minimumFractionDigits: 2});
    let ask = widget.addText(askText);
    ask.textColor = Color.white();
    ask.font = Font.boldSystemFont(20);
    
    let totalAskText = "$" + exchangeRate.bid.toLocaleString('en-US', {minimumFractionDigits: 2});
    let totalAsk = widget.addText(totalAskText);
    totalAsk.textColor = Color.gray();
    totalAsk.font = Font.systemFont(14); // Making the font size similar to the exchange name
    
    return widget;
}

// Main
if (config.runsInWidget) {
    let exchangeRate = await fetchExchangeRate();
    let widget = await createWidget(exchangeRate);
    Script.setWidget(widget);
    Script.complete();
} else {
    // For testing purposes
    let exchangeRate = await fetchExchangeRate();
    let widget = await createWidget(exchangeRate);
    widget.presentSmall();
}