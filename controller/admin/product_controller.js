const Product = require("../../models/product_model");

const filterStatusHelpers = require("../../helpers/filterStatus");

const searchHelpers = require("../../helpers/search");

const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

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
    .sort({ position: "desc"})
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

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async(req, res) => 
{
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne(
    {_id: id},
    { status: status} 
  );
  req.flash("success", "Cập nhật trạng thái thành công!");
  
  res.redirect("back");
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "delete-all":
      await Product.updateMany(
        {_id: { $in: ids}},
        {
          deleted: true,
          deleteAt: new Date(),
        }
      );
      req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm!`);
      break;
    case "change-position":
      for(const item of ids)
      {
        let [id, position] = item.split("-");
        position = parseInt(position);

        await Product.updateOne(
          {_id: id}, 
          {position: position}
        )
        await Product.updateOne(
          { _id: id },
          {
            position: position,
          }
        );
        req.flash("success", `Đã đổi vị trí thành công ${ids.length} sản phẩm!`);
      }
      break;
    default:
      break;
  }

  res.redirect("back");
};

//  [DELETE]  admin/products/delete/:id
module.exports.deleteItem = async(req, res) => {
  const id = req.params.id;
  await Product.updateOne({_id: id},{
    deleted: true,
    deleteAt: new Date()
  });
  req.flash("success", `Đã xóa thành công sản phẩm!`);
  res.redirect("back");
}

// [GET] /admin/product/create
module.exports.createPost = (req, res) => 
{
  res.render("admin/pages/products/create",
  {
    pageTitle: "Thêm mới sản phẩm",
  });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => 
{
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "")
  {
    const countProducts = await Product.count();
    req.body.position = countProducts + 1;
  }
  else 
  {
    req.body.position = parseInt(req.body.position);
  }

  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
}