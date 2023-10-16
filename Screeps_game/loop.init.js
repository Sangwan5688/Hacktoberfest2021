/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('loop.init');
 * mod.thing == 'a thing'; // true
 */

var loopInit = function () {

    console.log("========")
    console.log("* Clock: " + Date())
    console.log("* Tick: " + Game.time)
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    printResourceInfo()
    printStorageInfo()
    printRclInfo()
    printCreepsInfo()

    console.log("--------")
    console.log("Loop Starts")
}

module.exports = loopInit

var printCreepsInfo = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == "healer");

    const strArray = ["harvesters", "builders", "upgraders", "repairers", "healers"]
    const numArray = [harvesters.length, builders.length, upgraders.length, repairers.length, healers.length]
    const num = strArray.length

    var l1 = ""
    var l2 = ""

    for (var i = 0; i < num; i++) {
        l1 = l1 + " |" + strArray[i].padStart(12, " ")
        l2 = l2 + " |" + String(numArray[i]).padStart(12, " ")
    }

    l1 = (l1 + " |").substring(1)
    l2 = (l2 + " |").substring(1)

    console.log("* Creep Numbers: " + l1)
    console.log("                 " + l2)
}

var printResourceInfo = function () {
    var targets = Game.spawns["Spawn1"].room.find(FIND_SOURCES)
    var res = 0
    var all = 0
    for (let i = 0; i < targets.length; i++) {
        res += targets[i].energy
        all += targets[i].energyCapacity
    }
    console.log("* Resource: Energy: ", res + "/" + all)
}

var printStorageInfo = function () {
    console.log("* Storage: Energy: ", Game.spawns["Spawn1"].room.energyAvailable + "/" + Game.spawns["Spawn1"].room.energyCapacityAvailable)
}

var printRclInfo = function () {
    console.log("* RCL: Lv: " + Game.spawns["Spawn1"].room.controller.level + ", Progress: " + Game.spawns["Spawn1"].room.controller.progress + "/" + Game.spawns["Spawn1"].room.controller.progressTotal)
}