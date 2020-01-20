exports.formatDates = list => {
    if (!list.length) {
        return [];
    }
    
    const formattedObj = list.map(element => {
        let formattedDate = new Date(element.created_at);
        // const result = unformattedDate.getDate() + '/' + (unformattedDate.getMonth()) + '/' + unformattedDate.getFullYear() + " " + unformattedDate.getHours() + ':' + unformattedDate.getMinutes();
        
        delete element.created_at;
        const newObj = {...element, created_at :formattedDate}

        return newObj;
        
    }); 
    return formattedObj;
};

exports.makeRefObj = (list, keyToReplace, keyToInsert) => {
    const refObj = {};
    list.forEach(element => {
        refObj[element[keyToReplace]] = element[keyToInsert]
    })
    return refObj;
};

exports.formatComments = (comments, articleRef) => {
    
};

