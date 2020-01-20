exports.formatDates = list => {
    if (!list.length) {
        return [];
    }
    return list.map(element => {
        let unformattedDate = new Date(element.created_at);
        let newDate = unformattedDate.getDate() + '/' + (unformattedDate.getMonth()) + '/' + unformattedDate.getFullYear() + " " + unformattedDate.getHours() + ':' + unformattedDate.getMinutes();
        return newDate;
    }); 
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};

// const result = articleData.map(element => {
  //   // console.log(element.created_at)
  //   formatDates(element.created_at)
  // })
  // console.log(result)