const Sales = require('../models/sales');
const moment = require('moment');

// Controller to handle filtered data
const FilteredSales = async (req, res) => {
    try {
        const { restaurantId, filteredDates, timeRange } = req.query;
    
        // Parse filteredDates from string to array
        const datesArray = JSON.parse(filteredDates);
    
        // Parse the start and end times from timeRange and remove "hrs"
        const [minTime, maxTime] = timeRange.replace('hrs', '').split('-').map(time => time.trim());
    
        // Convert the filtered dates into start and end times for each day
        const dateRanges = datesArray.map(date => ({
          start: moment(date).startOf('day').toISOString(),
          end: moment(date).endOf('day').toISOString(),
        }));
    
        // Build the query for matching any of the date ranges
        const dateQuery = {
          $or: dateRanges.map(range => ({
            createdAt: {
              $gte: new Date(range.start),
              $lte: new Date(range.end),
            }
          }))
        };
    
        // Fetch data from the database
        const filteredData = await Sales.find({
          restaurantId,
          ...dateQuery,
        });
    
        // Further filter based on time range (e.g., 07-09 hrs)
        const filteredByTime = filteredData.filter((item) => {
          const itemHour = moment(item.createdAt).format('HH');
          return itemHour >= minTime && itemHour <= maxTime;
        });
    
        // Check if no data is found
        if (filteredByTime.length === 0) {
          return res.status(404).json({ message: 'No match found' });
        }
    
        res.status(200).json(filteredByTime);
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
      }
};

module.exports = {FilteredSales};
