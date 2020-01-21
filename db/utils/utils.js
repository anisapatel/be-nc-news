exports.formatDates = list => {
    if (!list.length) {
        return [];
    }
    
    const formattedObj = list.map(element => {
        let formattedDate = new Date(element.created_at);
        // const result = unformattedDate.getDate() + '/' + (unformattedDate.getMonth()) + '/' + unformattedDate.getFullYear() + " " + unformattedDate.getHours() + ':' + unformattedDate.getMinutes();
        
        // delete element.created_at;
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

exports.formatComments = (comments, keyToRename, keyToInsert, lookupObj) => {
    return comments.map(element => {
        const newObj = {...element};
        newObj[ keyToInsert[0] ] = newObj[ keyToRename[0] ];
        delete newObj[ keyToRename[0] ];
        newObj[ keyToInsert[1] ] = lookupObj[newObj[keyToRename[1]]]
        delete newObj[ keyToRename[1] ];
        let formattedDate = new Date(newObj.created_at);
        const improvedObj = {...newObj, created_at: formattedDate}
        return improvedObj;
    })
};

