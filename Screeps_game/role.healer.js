var roleHealer = {

    /** @param {Creep} creep **/
    run: function(creep) {

		// 收集能量
	    if(creep.memory.healing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.healing = false;
            creep.say('🔄 harvest');
	    }
		// 使用能量治疗
	    if(!creep.memory.healing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.healing = true;
	        creep.say('🚧 repair');
	    }

		// 正在治疗：显示路径
	    if(creep.memory.healing) {

	        const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
				filter: function(object) {
					return object.hits < object.hitsMax;
				}
			});
			if(target) {
				
				if(creep.heal(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
	    }
		// 未在治疗：显示路径
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleHealer;