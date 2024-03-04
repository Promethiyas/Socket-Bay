import { fakerFR as Faker } from '@faker-js/faker'
import { randomInt } from 'crypto'
import Fs from 'node:fs/promises'

const MAX_COUNT = 200
const products = []

for (let i = 0; i < MAX_COUNT; i++) {
  products.push({
    brand: Faker.company.name(),
    description: Faker.lorem.sentences({ min: 2, max: 3 }),
    id: i,
    color: Faker.color.rgb(),
    isEcoProduct: (i % 2) == 1,
    images: images(6),
    price: Faker.number.float({ min: 10, max: 1200, fractionDigits: 2 }),
    size: randomSize()
  })
}

await Fs.writeFile(
  './mockup.json',
  JSON.stringify({
    products
  }, undefined, 2)
)

/**
 * 
 * @param {number} maxCount
 * @return {string[]}
 */
function images(maxCount) {
  const urls = []
  const max = randomInt(maxCount - 1) + 1

  for (let i = 0; i < max; i++) {
    urls.push(Faker.image.url({ height: 512, width: 512 }))
  }

  return urls
}

function randomSize() {
  const units = ['x-small', 'small', 'medium', 'large', 'x-large']
  return units[randomInt(units.length)]
}