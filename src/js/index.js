const inputElement = document.querySelector(".new-order-input");
const getOrderButton = document.querySelector(".orders-button");
const ordersContainer = document.querySelector(".orders-container");

async function listOrders() {
  const response = await fetch("./src/dados.json");
  const jsonData = await response.json();
  const encomendas = jsonData.encomendas;

  const inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  function filterOrder(value) {
    if (value.numero == inputElement.value.toUpperCase()) {
      return value;
    }
  }

  function errorMessage() {
    ordersContainer.innerText = "";
    const divError = document.createElement("div");
    divError.classList.add("not-found");
    errorPhrase1 = document.createElement("p");
    errorPhrase2 = document.createElement("p");
    errorPhrase1.innerText = "Encomenda não encontrada!";
    errorPhrase2.innerText = "Procure Novamente";
    divError.appendChild(errorPhrase1);
    divError.appendChild(errorPhrase2);
    ordersContainer.appendChild(divError);
  }

  function deliverSituation(value) {
    return value.entregue ? `Entregue` : `Entregar`;
  }

  let encomendaSelecionada = encomendas.filter(filterOrder);

  if (!encomendaSelecionada.length) {
    return errorMessage();
  }

  let data = new Date(Date.parse(encomendaSelecionada[0].data));

  ordersContainer.innerText = "";

  const orderContentName = document.createElement("span");
  const clientName = document.createElement("p");
  const descriptionName = document.createElement("p");
  clientName.innerText = `${encomendaSelecionada[0].cliente.id} - ${encomendaSelecionada[0].cliente.nome}`;
  descriptionName.innerText = "Numero de ordem e nome do cliente";
  orderContentName.appendChild(clientName);
  orderContentName.appendChild(descriptionName);

  const orderContentPrice = document.createElement("span");
  orderContentPrice.classList.add("hide-value-mobile");
  const orderPrice = document.createElement("p");
  const descriptionPrice = document.createElement("p");
  orderPrice.innerText = `R$ ${encomendaSelecionada[0].valor}`;
  descriptionPrice.innerText = "Valor do pedido";
  orderContentPrice.appendChild(orderPrice);
  orderContentPrice.appendChild(descriptionPrice);

  const orderContentDate = document.createElement("span");
  const date = document.createElement("p");
  const descriptionDate = document.createElement("p");
  date.innerText = data.toLocaleDateString();
  descriptionDate.innerText = "Data do pedido";
  orderContentDate.appendChild(date);
  orderContentDate.appendChild(descriptionDate);

  const orderContentDelivered = document.createElement("span");
  const orderSituation = document.createElement("p");
  const descriptionSituation = document.createElement("p");
  orderSituation.innerText = deliverSituation(encomendaSelecionada[0]);
  descriptionSituation.innerText = "Situação da encomenda";
  orderContentDelivered.appendChild(orderSituation);
  orderContentDelivered.appendChild(descriptionSituation);

  ordersContainer.appendChild(orderContentName);
  ordersContainer.appendChild(orderContentPrice);
  ordersContainer.appendChild(orderContentDate);
  ordersContainer.appendChild(orderContentDelivered);

  inputElement.value = "";
}

const validateInput = () => {
  return inputElement.value.trim().length > 0;
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

getOrderButton.addEventListener("click", () => listOrders());
inputElement.addEventListener("change", () => handleInputChange());
