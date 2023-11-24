const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    codigo : {type : String, required : true },
    descricao : {type : String, required : true },
    fornecedor : {type : String, required : true },
    dataFab : {type : Date, required : true },
    estoque : {type : Number, required : true },
});

const User = mongoose.model('Product', ProductSchema);
module.exports = Product;