export enum OrderStatuses {
  NEW = "new",
  DELIVERY = "delivery",
  ISSUED = "issued",
  RETURN = "return",
  ARCHIVED = "archived",
}

export enum DeliveryStatuses {
  NEW = "new",
  READY_TO_DELIVERY = "ready_to_delivery",
  DELIVERY_TO_POINT = "delivery_to_point",
  DELIVERED_TO_POINT = "delivered_to_point",
  DELIVERY_TO_SHOP = "delivery_to_shop",
  DELIVERED_TO_SHOP="delivered_to_shop"
}
