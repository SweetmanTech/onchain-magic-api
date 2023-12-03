import _ from "lodash"

const getPFPAttributes = (attributes) => {
  if (!attributes) return []

  const order = ["Environment", "Type", "Skin", "Face", "Cheeks", "Clothing", "Head"]
  const orderMap = {}
  _.each(order, (i) => {
    orderMap[i] = _.indexOf(order, i)
  })

  const sorted = _.sortBy(attributes, (obj) => orderMap[obj.trait_type])

  return _.map(sorted, (i) => i)
}

export default getPFPAttributes
