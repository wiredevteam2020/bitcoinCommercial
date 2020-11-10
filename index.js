const express = require("express")

const app  = express();

const Port = process.env.PORT || 9009;


app.get("/", (req, res)=>{
    let form = "<form method='post'><input type='submit' value='Pay 100 USD' /></form>"
    res.send(form);
});

app.post("/", async(req, res) => {
    var coinbase = require('coinbase-commerce-node');
    coinbase.Client.init('ed08f0e3-31b1-448d-92c7-4bdd2d6b0f9c')
    var charge = coinbase.resources.Charge;

    var chargeData = {
        'name': 'SAmple name',
        'description': 'sample description',
        'local_price': {
            'amount': '10.00',
            'currency': 'ETH'
        },
        'pricing_type': 'fixed_price'
    }

    await charge.create(chargeData, (error, response) => {
        if(error) {
            console.log(error);
            res.send("an error occured");
        } else {
            // get the hostel url
            console.log(response);
            // save response.code
            // userId
            // amount
            // wallet type: BTC/ETH
            res.redirect(response.hosted_url);
        }
    });

})







app.listen(Port, ()=>{
    console.log(`listening to port ${Port}`);
});