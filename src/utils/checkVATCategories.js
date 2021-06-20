export const checkVATCategories = (cart) => {
  // I create an empty array in which I will push objects of the following format: {VAT: 10, amount: 0} that represent each VAT category with an associated amount
  let VATCategories = [];

  // I map the content of my cart to check the VAT category and amount for each article in the cart
  cart?.map((element) => {
    const newCategory = {};

    // In all cases we check that vat_category isn't equal to 0
    if (
      element.vat_category > 0 &&
      // if the vat-category of the element doesn't already exist in VATCategories array
      VATCategories.find(
        (VATCategory) => VATCategory.VAT === element.vat_category
      ) === undefined
    ) {
      // we add the values for the keys VAT and amount in a new object
      newCategory.VAT = element.vat_category;
      newCategory.amount = parseFloat(
        (
          (element.unit_price_incl_vat - element.unit_price_excl_vat) *
          element.quantity
        ).toFixed(2)
      );
      // We push the new object in the VATCategories array
      VATCategories.push(newCategory);

      // if the vat-category of the element already exists in VATCategories array
    } else if (element.vat_category > 0) {
      // we store the corresponding object in a categoryToModify variable
      let categoryToModify = VATCategories.find(
        (VATCategory) => VATCategory.VAT === element.vat_category
      );
      // we remove the object from the array
      VATCategories.splice(categoryToModify);
      // we modify the stored object by adding the element's VAT amount
      categoryToModify.amount += parseFloat(
        (
          (element.unit_price_incl_vat - element.unit_price_excl_vat) *
          element.quantity
        ).toFixed(2)
      );
      // We push the modified object in the VATCategories array
      VATCategories.push(categoryToModify);
    }
    // We sort so that in the display the lowest VAT category appears first
    VATCategories.sort((a, b) => {
      if (a.VAT < b.VAT) {
        return -1;
      }
      if (a.VAT > b.VAT) {
        return 1;
      }

      return 0;
    });

    return console.log("");
  });

  // Finally, I return the JSX
  return (
    <>
      {/* I map on my VATCategories array to display each category and the associated amount */}
      {VATCategories.map((VATCategory) => {
        return (
          <tr>
            <td
              colSpan="4"
              className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right"
            >
              VAT {VATCategory.VAT}%
            </td>
            <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900 text-right">
              {VATCategory.amount} €
            </td>
          </tr>
        );
      })}
    </>
  );
};
