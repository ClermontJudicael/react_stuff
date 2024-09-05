export default generateDateRange = (startDate, endDate, intervalMonths) => {
  const dates = [];
  const currentDate = new Date(startDate);
  const interval =
      intervalMonths * 30;  // Approximate number of days in a month

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + interval);
  }

  return dates;
};
