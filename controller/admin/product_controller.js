const Product = require("../../models/product_model");

const filterStatusHelpers = require("../../helpers/filterStatus");

const searchHelpers = require("../../helpers/search");

const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelpers(req.query);

  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelpers(req.query);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // Pagination
  const countProducts = await Product.count(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );
  // End Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
