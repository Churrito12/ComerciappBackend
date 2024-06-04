import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-7261017348869659-050818-cf9a4e855da8d02cfc11dbab6baf5d80-309670165",
});

export const pay = async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:5173/cart",
        failure: "http://localhost:5173/cart",
        pending: "http://localhost:5173/cart",
      },
      auto_return: "approved",
    };
    console.log(body, "body");
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error del servidor",
    });
  }
};

export default pay;
