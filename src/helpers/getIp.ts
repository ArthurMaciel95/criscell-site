export async function getIp() {
  const apiKey = 'ed99821d1c35f56ee03574a283d817d22c63897068e63808527ebd1c'

  try {
    const response = await fetch(
      `https://api.ipdata.co?api-key=ed99821d1c35f56ee03574a283d817d22c63897068e63808527ebd1c`
    )

    const data = await response.json()

    return data
  } catch (error) {
    const data = {}
    console.log(error)
    return data
  }
}
