// Change Status

const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = statusCurrent == "active" ? "inactive" : "active";

      // console.log(statusCurrent);
      // console.log(id);
      // console.log(statusChange);

      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
// End Change Status
// Deleted Item
const buttonsDeleted = document.querySelectorAll("[button-deleted]");
if (buttonsDeleted.length > 0)
{
  const formDeletedItem = document.querySelector("#form-deleted-item");
  const path = formDeletedItem.getAttribute("data-path");
  buttonsDeleted.forEach(button =>{
    const isComfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if(isComfirm)
    {
      const id = button.getAttribute("id");
      const action = `${path}/${id}?method=DELETE`;
      formDeletedItem.action = action;
      formDeletedItem.submit();
    }
  })
}