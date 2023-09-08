const Product = require("../../models/product_model");

const filterStatusHelpers = require("../../helpers/filterStatus");

const searchHelpers = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) =>
{
    const filterStatus = filterStatusHelpers(req.query);
    const objectSearch = searchHelpers(req.query);

    let find = {
        deleted: false
    };
    if(req.query.status)
    {
        find.status = req.query.status;
    }
    
    if(objectSearch.regex)
    {
        find.title = objectSearch.regex;
    }
    const products = await Product.find(find);
    console.log(products);
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    });
}