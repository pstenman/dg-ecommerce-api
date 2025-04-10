import { Request, Response } from "express";
import { db } from "../config/db";
import { STRIPE_SECRET_KEY } from "../constants/env";
const stripe = require('stripe')(STRIPE_SECRET_KEY);

export const checkoutSessionHosted = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
    
        const { orderId, lineItems } = req.body;
        const stripeLineItems = lineItems.map((item: { product_name: any; product_image_url: any; unit_price: number; quantity: any; }) => ({
          price_data: {
            currency: 'sek',
            product_data: {
              name: item.product_name,
              images: [item.product_image_url]
            },
            unit_amount: Math.round(item.unit_price * 100),
          },
          quantity: item.quantity,
        }));
    
        const session = await stripe.checkout.sessions.create({
          line_items: stripeLineItems,
          mode: 'payment',
          success_url: 'https://dg-ecommerce-client.vercel.app/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
          cancel_url: 'https://dg-ecommerce-client.vercel.app/checkout',
          client_reference_id: orderId
        });

        console.log("✅ Stripe Session created with ID:", session.id)
    
        res.json({ id: session.id });
      } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
      }
};

export const checkoutSessionEmbedded = async (req: Request, res: Response) => {
};

export const webhook = async (req: Request, res: Response) => {
};
