const BASE_URL = "https://fakestoreapi.com";


const [, , method, resource, ...args] = process.argv;


async function main() {
  try {
    if (!method || !resource) {
      console.log("Comando inválido");
      return;
    }


    const [entity, id] = resource.split("/");


    if (entity !== "products") {
      console.log("Solo se permite trabajar con products");
      return;
    }


    let url = `${BASE_URL}/${resource}`;
    let options = { method };


    if (method === "POST") {
      const [title, price, category] = args;


      const newProduct = {
        title,
        price,
        category,
      };


      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      };
    }


    if (method === "PUT") {
      const [title, price, category] = args;


      const updatedProduct = {
        title,
        price,
        category,
      };


      options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      };
    }


    if (method === "DELETE") {
      options = { method: "DELETE" };
    }


    const response = await fetch(url, options);
    const data = await response.json();


    console.log(data);
  } catch (error) {
    console.log("Error:", error.message);
  }
}


main();
