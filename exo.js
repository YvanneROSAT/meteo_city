const data = require("./data.json");

data.items.map((item) => {
    console.log(item.name, item.price.amount);
});
