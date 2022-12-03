const axios = require('axios')

// Api URL provided by Güeno to consume data
const url = 'https://api-gueno.dev.gueno.com/api/client/clientConsumptions/tomas@gueno.com'

const filterByDate = async (req, res) => {
  try {
    // Gets start and end timestamps from params
    const { start, end } = req.params

    if (start && end) {
      // Converts incomings timestamps to YYYY-MM-DD format
      const startDate = new Date(start).toLocaleDateString('sv-SE')
      const endDate = new Date(end).toLocaleDateString('sv-SE')

      // Gets data from url
      const response = await axios.get(url)
      const status = response.status

      // If response status is OK continues to filter data
      if (status === 200 || status === 201) {
        const obj = response.data.data.json()

        // Filters data - Returns all items that have a date between the start and end date received from params
        const result = obj.filter((item) => {
          // Formats item's date to the same format of incomings dates to compare
          const itemDate = new Date(item.date).toLocaleDateString('sv-SE')

          return itemDate >= startDate && itemDate <= endDate
        })

        res.status(200).send({
          success: true,
          message: 'Data filtered by dates',
          data: result,
        })
      }
    } else {
      res.status(404).send({
        error: 'No Dates',
        message: 'No dates where provided in params',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: error.message,
    })
  }
}

module.exports = { filterByDate }
