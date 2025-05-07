import { Request, Response } from "express";
import orderService from "../services/order.service";
import { matchedData } from "express-validator";

export const getOrders = async (req: Request, res: Response) => {
  const userId = req._id;
  try {
    const orders = await orderService.getOrders(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const getAllOrders = async (req: Request, res: Response) => {
  // const userId = req._id;
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const getOrder = async (req: Request, res: Response) => {
  const userId = req._id;
  const data = matchedData<{ orderId: string }>(req);
  const orderId = data.orderId;
  try {
    const order = await orderService.getOrder(orderId);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    if (order.userId !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const userId = req._id;
  const order = req.body;
  try {
    const result = await orderService.createOrder({ ...order, userId });
    res.status(201).json({ orderId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const cancelOrder = async (req: Request, res: Response) => {
  const userId = req._id;
  const data = matchedData<{ orderId: string; reason: string }>(req);
  const orderId = data.orderId;
  const reason = data.reason;
  try {
    const result = await orderService.cancelOrder(orderId, userId, reason);
    if (result.matchedCount === 0) {
      res.status(404).json({ error: "Order not found or already cancelled" });
      return;
    }

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
