import { products } from "./productdata";

function productsearch(searchquery) {
  let searchresultProduct = [];

  products.forEach((p) => {
    let word = p.title.toLowerCase().split(" ");
    for (let w of word) {
      if (
        w.includes(searchquery.toLowerCase()) ||
        searchquery.toLowerCase().includes(w)
      ) {
        searchresultProduct.push(p);
        break;
      }
    }
  });

  return searchresultProduct; // Return the search results array
}

export { productsearch };
