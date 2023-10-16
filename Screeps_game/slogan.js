const content = {
    politics: ["sameer","sahil","soham","sohail"],
    mood: ["good","Very Good","Ok","Bad","Very Bad"]
}

var slogan = function (type, probability) {
    if (Math.random() > probability) return ""
    switch (type) {
        case "POLITICS": return content.politics[Math.floor(Math.random() * (content.politics.length))]
        case "MOOD": return content.mood[Math.floor(Math.random() * (content.mood.length))]
        default: return ""
    }
}

module.exports = slogan