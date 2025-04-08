import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import type { CreateOrderActions, CreateOrderData } from "@paypal/paypal-js";

interface PurchaseUnit {
  amount: {
    currency_code: string;
    value: string;
  };
  custom_id?: string;
}

export const PaymentPayPal = ({ orderId, amount }: { orderId: string; amount: number }) => {
    const createOrder = async (
        data: CreateOrderData,
        actions: CreateOrderActions
    ): Promise<string> => {
        return actions.order.create({
            intent: "CAPTURE", // Обязательное поле
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: amount.toFixed(2),
                },
                custom_id: orderId,
            }],

        });
    };

    return (
        <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons createOrder={createOrder} />
        </PayPalScriptProvider>
    );
};