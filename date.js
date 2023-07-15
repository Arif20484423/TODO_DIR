function get_day(){  
    var today = new Date()

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString('en-US', options)
    return day
}
module.exports.get_day=get_day

function get_dayonly(){  
    var today = new Date()

    var options = {
        weekday: "long"
    }
    var day = today.toLocaleDateString('en-US', options)
    return day
}
module.exports.get_dayonly=get_dayonly