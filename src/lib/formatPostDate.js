const postDateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  year: 'numeric',
})

export function formatPostDate(date) {
  return postDateFormatter.format(new Date(`${date}T00:00:00Z`))
}
