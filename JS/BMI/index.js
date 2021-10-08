const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/bmicalculator", (req, res) => {
    const heigh = parseFloat(req.body.Height);
    const weigh = parseFloat(req.body.Weight);
    let bmi = weigh / (heigh * heigh);
    bmi = bmi.toFixed();

    if (bmi < 19) {
        res.send(
            `<h3>Your BMI is around: ${bmi}<centre><h1>You are Underweight!`
        );
    } else if (bmi >= 19 && bmi < 25) {
        res.send(
            `<h3>Your BMI is around: ${bmi}<centre><h1>You are Normalweight!`
        );
    } else if (bmi >= 25 && bmi < 30) {
        res.send(
            `<h3>Your BMI is around: ${bmi}<centre><h1>You are Overweight!`
        );
    } else {
        res.send(`<h3>Your BMI is around: ${bmi}<centre><h1>You are Obese!`);
    }
});

app.listen(7777, () => {
    // eslint-disable-next-line no-console
    console.log("port active at 7777");
});
