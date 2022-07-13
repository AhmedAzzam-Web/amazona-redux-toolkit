export default {
  name: 'order',
  type: 'document',
  title: 'Order',
  fields: [
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        disableNew: true,
      }
    },
    {
      name: 'userName',
      title: 'User Name',
      type: "string",
    },
    {
      name: 'itemsPrice',
      title: 'Items Price',
      type: 'number',
    },
    {
      name: 'shippingPrice',
      title: 'Shipping Price',
      type: 'number',
    },
    {
      name: 'taxPrice',
      title: 'Tax Price',
      type: 'number',
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
    },
    {
      name: 'shippingData',
      title: 'Shipping Data',
      type: 'shippingData',
    },
    {
      title: 'Payment Result',
      name: 'paymentResult',
      type: 'paymentResult',
    },
    {
      title: 'Order Items',
      name: 'orderItems',
      type: 'array',
      of: [
        {
          title: 'Order Item',
          type: 'orderItem',
        },
      ],
    },
    {
      title: 'IsPaid',
      name: 'isPaid',
      type: 'boolean',
    },
    {
      title: 'Paid Date',
      name: 'paidAt',
      type: 'datetime',
    },
    {
      title: 'IsDelivered',
      name: 'isDelivered',
      type: 'boolean',
    },
    {
      title: 'DeliveredAt',
      name: 'deliveredAt',
      type: 'datetime',
    },
    {
      title: 'CreatedAt',
      name: 'createdAt',
      type: 'datetime',
    },
  ]
}