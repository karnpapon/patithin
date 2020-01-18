export function getLevel(count: number) {
  if (count === 0) return ''
  if (count >= 1 && count < 5) return 'rarely'
  if (count >= 5 && count < 10) return 'normal'
  if (count >= 10 && count < 20) return 'often'
  if (count >= 20 && count < 30) return 'every'
  if (count >= 30 && count < 40) return 'nerd'
  if (count >= 40) return 'commits-by-cat'
}