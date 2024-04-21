export default function generateItemPrice() {
  const min = 1;
  const max = 10;
  const decimal = 100;
  return Math.ceil((Math.random() * (max - min) + min) * decimal) / decimal;
}
