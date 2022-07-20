import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import product from './product'
import user from './user'
import order from './order'
import orderItems from './orderItems'
import shippingData from './shippingData'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    product,
    user,
    order,
    orderItems,
    shippingData,
  ]),
})
