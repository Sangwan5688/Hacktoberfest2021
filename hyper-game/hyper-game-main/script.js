window.isDevVersion = window.location.href.indexOf('demonin.com') === -1

function toFixedFloor(num, decimalPlaces) {
	if (num.toFixed(decimalPlaces) == "10.00") return "9.99"
	return num.toFixed(decimalPlaces)
	//This is broken lmao
  //if (isNaN(num) || isNaN(decimalPlaces)) {
  //  return NaN;
  //}
  //const factor = Math.pow(10, decimalPlaces);
  //const roundedDown = Math.floor(num * factor) / factor;
  //return roundedDown.toFixed(decimalPlaces);
}

//Formatting code modified from RedShark77's version
function format(ex, acc = 0, max = 9) {
  function E(x) {
    return new Decimal(x)
  }
  ex = E(ex)
  neg = ex.lt(0) ? "-" : ""
  if (ex.mag == Infinity) return neg + 'Infinity'
  if (Number.isNaN(ex.mag)) return neg + 'NaN'
  if (ex.layer > 0 && (ex.mag % 1) > 0.9999) ex.mag = Math.ceil(ex.mag)
  if (ex.lt(0)) ex = ex.mul(-1)
  if (ex.eq(0)) return toFixedFloor(ex.toNumber(), acc)
  
  let e = ex.log10().floor()
  if (ex.log10().lt(Math.min(-acc, 0)) && acc > 1) {
    let e = ex.log10().ceil()
    let m = ex.div(e.eq(-1) ? E(0.1) : E(10).pow(e))
    let be = e.mul(-1).max(1).log10().gte(9)
    return neg + (be ? '' : toFixedFloor(m.toNumber(), 2)) + 'e' + format(e, 0, max)
  } else if (e.lt(max)) {
    let a = Math.max(Math.min(acc - e.toNumber(), acc), 0)
    return neg + (a > 0 ? toFixedFloor(ex.toNumber(), a) : toFixedFloor(ex.toNumber(), a).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  } else {
    if (ex.gte("eeee10")) {
      let slog = ex.slog()
      return (slog.gte(1e9) ? '' : toFixedFloor(E(10).pow(slog.sub(slog.floor())).toNumber(), 4)) + "F" + format(slog.floor(), 0)
    }
    let m = ex.div(E(10).pow(e))
    let be = e.gte(10000)
    return neg + (be ? '' : toFixedFloor(m.toNumber(), 2)) + 'e' + format(e, 0, max)
  }
}

function reset() {
	game = {
		timeOfLastUpdate: Date.now(),
		unlocks: 0,
		achievementsAttained: [],
		confirmations: [true, true, true, true, true, true, true],
		autobuyers: [true, true],
		
		number: new Decimal(0),
		currentBase: 10,
		baseShifts: 0,
		hyperpoints: new Decimal(0),
		hyperpointsToGet: new Decimal(0),
		autoclickers: new Decimal(0),
		autoclickerEffect: new Decimal(0),
		multipliers: new Decimal(0),
		multiplierCost: new Decimal(100),
		factors: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		factorsBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		factorCosts: [new Decimal(10), new Decimal(100), new Decimal(1000), new Decimal(10000), new Decimal(100000), new Decimal(1e6)],
		
		clusters: new Decimal(0),
		totalClusters: new Decimal(0),
		clustersToGet: new Decimal(0),
		clusterLevel: new Decimal(0),
		clusterLimit: new Decimal(31),
		clusterLimitEnabled: false,
		clusterUpgradesBought: [],
		
		currentChallenge: 0,
		currentChallengeGoal: new Decimal(0),
		challengesBeaten: [0, 0, 0, 0, 0, 0],
		
		vectors: new Decimal(0),
		vectorsPerSecond: new Decimal(0),
		vectorGainEnabled: false,
		vectorUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		vectorUpgradeCosts: [new Decimal(200), new Decimal(1000), new Decimal(1000), new Decimal(100000), new Decimal(1e12), new Decimal(1e15)],
		
		basePoints: new Decimal(0),
		totalBasePoints: new Decimal(0),
		inBasedverse: false,
		basedverseBase: new Decimal(20),
		upBase: new Decimal(0),
		downBase: new Decimal(0),
		
		timeThisCascade: 0,
		cascades: new Decimal(0),
		recentCascades: [],
		bestCascadesPerSecond: new Decimal(0),
		cascadePower: new Decimal(0),
		layers: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		layersBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		layerCosts: [new Decimal(1), new Decimal(1), new Decimal(2), new Decimal(4), new Decimal(8), new Decimal(16), new Decimal(32)],
		bestCascadeClusters: new Decimal(999),
		cascadeMilestonesAchieved: 0,
		
		postCascade: false,
		cascadesToGet: new Decimal(0),
		postCascadeUpgradesBought: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		postCascadeUpgrade1Cost: new Decimal(20),
		
		flavoursUnlocked: 0,
		flavours: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		flavourMultipliers: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
		highestFlavours: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		
		shadowPower: new Decimal(0),
		shadowPowerPerSecond: new Decimal(0),
		shadowCrystalPoint: new Decimal(1e6),
		shadowCrystals: new Decimal(0),
		previousCrystals: new Decimal(0),
		bestCrystals: new Decimal(0),
		shadowMilestonesAchieved: 0,
		shadowUpgradeCosts: [new Decimal(100000), new Decimal(5e6)],
		shadowUpgradesBought: [new Decimal(0), new Decimal(0)],
		
		bloodPower: new Decimal(0),
		bloodPowerPerSecond: new Decimal(0),
		bloodCrystalPoint: new Decimal(1e6),
		bloodCrystals: new Decimal(0),
		bloodUpgradeCosts: [new Decimal(100000), new Decimal(5e6)],
		bloodUpgradesBought: [new Decimal(0), new Decimal(0)],
		
		divinePower: new Decimal(0),
		divinePowerPerSecond: new Decimal(0),
		divineCrystalPoint: new Decimal(1e6),
		divineCrystals: new Decimal(0),
		divineUpgradeCosts: [new Decimal(100000), new Decimal(5e6)],
		divineUpgradesBought: [new Decimal(0), new Decimal(0)],
	}
	currentTab = 1
	hyperESubTab = 1
	cascadeSubTab = 1
}

//If the user confirms the hard reset, resets all variables, saves and refreshes the page
function hardReset() {
  if (confirm("Are you sure you want to reset? You will lose everything!")) {
    reset()
    save()
    location.reload()
  }
}

function save() {
  //console.log("saving")
  game.lastSave = Date.now();
  localStorage.setItem("hyperGameSave", JSON.stringify(game));
}

function setAutoSave() {
  if (!window.isDevVersion) setInterval(save, 5000);
  autosaveStarted = true;
}
//setInterval(save, 5000)

function exportGame() {
  save()
  navigator.clipboard.writeText(btoa(JSON.stringify(game))).then(function() {
    alert("Copied to clipboard!")
  }, function() {
    alert("Error copying to clipboard, try again...")
  });
}

function importGame() {
  loadgame = JSON.parse(atob(prompt("Input your save here:")))
  if (loadgame && loadgame != null && loadgame != "") {
    reset()
    loadGame(loadgame)
    save()
		location.reload()
  }
  else {
    alert("Invalid input.")
  }
}

function load() {
  reset()
  let loadgame = JSON.parse(localStorage.getItem("hyperGameSave"))
  if (loadgame != null) {
    loadGame(loadgame)
  }
  mainLoop = function() {
    updateVisuals();
    requestAnimationFrame(mainLoop);
  };
  requestAnimationFrame(mainLoop)
}

//load()

function loadGame(loadgame) {
  //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
  let loadKeys = Object.keys(loadgame); // Get the keys of the loadgame object
  for (let i = 0; i < loadKeys.length; i++) { // Iterate through each key in the loadgame object
    if (loadgame[loadKeys[i]] != "undefined") { // Only process keys with defined values
      let thisKey = loadKeys[i];
      if (typeof loadgame[thisKey] == "string" && !isNaN(parseFloat(loadgame[thisKey]))) { // If the value is a string that can be converted to a Decimal, do so
        game[thisKey] = new Decimal(loadgame[thisKey])
      }
      else if (Array.isArray(loadgame[thisKey]) && game[loadKeys[i]]) { // If the value is an array and the corresponding key exists in the game object
        for (let j = 0; j < loadgame[thisKey].length; j++) { // Iterate through the array elements
          if (typeof loadgame[thisKey][j] == "string" && !isNaN(parseFloat(loadgame[thisKey][j]))) { // If the array element is a string that can be converted to a Decimal, do so
            game[loadKeys[i]][j] = new Decimal(loadgame[thisKey][j])
          }
          else { // Otherwise, copy the value directly
            game[loadKeys[i]][j] = loadgame[thisKey][j]
          }
        }
      }
      //else {game[Object.keys(game)[i]] = loadgame[loadKeys[i]]}
      else {
        game[loadKeys[i]] = loadgame[loadKeys[i]]
      } // For other types of values, copy them directly
    }
  }

	//Sets stuff based on how much the player has unlocked
	if (game.unlocks >= 1) $(".hyperESubTabButton").eq(2).css("display", "inline-block")
	if (game.unlocks >= 2) {
		$(".hyperESubTabButton").eq(3).css("display", "inline-block")
		$(".confirmationButton").eq(2).css("display", "block")
		$(".confirmationButton").eq(3).css("display", "block")
	}
	if (game.unlocks >= 3) {
		$(".hyperESubTabButton").eq(4).css("display", "inline-block")
		$(".challengeButton").eq(4).css("display", "inline-block")
		$(".challengeButton").eq(5).css("display", "inline-block")
		if (typeof game.currentChallengeGoal == "number") game.currentChallengeGoal = new Decimal(0)
	}
	if (game.vectorGainEnabled) {$("#vectorGainButton").html("Disable vector gain")}
	else {$("#vectorGainButton").html("Enable vector gain")}
	if (game.unlocks >= 4) {
		if (game.vectorUpgradeCosts[4].eq(0)) game.vectorUpgradeCosts[4] = new Decimal(Infinity) //Vector upgrade 5 cost sets itself to 0 on load if it was Infinity
		$(".hyperESubTabButton").eq(5).css("display", "inline-block")
		$(".vectorUpgrade").eq(4).css("display", "inline-block")
		$(".vectorUpgrade").eq(5).css("display", "inline-block")
		$(".confirmationButton").eq(4).css("display", "block")
		$(".confirmationButton").eq(5).css("display", "block")
	}
	if (game.unlocks >= 5) {
		$(".tabButton").eq(1).css("display", "inline-block")
		$(".confirmationButton").eq(6).css("display", "block")
		$("#clusterLimiter").css("display", "block")
		document.getElementById("clusterLimiterCheckbox").checked = game.clusterLimitEnabled
		document.getElementById("clusterLimiterSlider").value = game.clusterLimit.toNumber()
		if (game.cascadeMilestonesAchieved >= 1) $("#factorAutobuyer").css("display", "block")
		
	}
	if (game.unlocks >= 6) {
		$(".cascadeSubTabButton").eq(3).css("display", "inline-block")
	}
	if (game.postCascade) {
		$("#surpassCascadeButton").html("You have surpassed cascade!")
		$("#surpassCascadeButton").css("color", "#e72")
		for (let i=1;i<postCascadeUpgradeCosts.length+1;i++) {
			if (game.postCascadeUpgradesBought[i].eq(1)) {
				$(".postCascadeUpgrade").eq(i).css("background-color", "#060")
				$(".postCascadeUpgrade").eq(i).css("color", "#0f0")
			}
		}
		if (game.postCascadeUpgradesBought[2].eq(1)) $("#autoBaseShift").css("display", "block")
		if (game.postCascadeUpgradesBought[7].eq(0)) {game.postCascadeUpgrade1Cost = new Decimal(5).pow(game.postCascadeUpgradesBought[0]).mul(20).round()} //Reverse post-cascade upgrade 8 effect because I fucked it up
	}
	if (game.postCascadeUpgradesBought[6].eq(1) && game.unlocks < 7) game.unlocks = 7
	if (game.unlocks >= 7) {
		$(".cascadeSubTabButton").eq(4).css("display", "inline-block")
		for (let i=0;i<5;i++) {
			if (game.flavoursUnlocked > i) {
				$(".flavourUnlockButton").eq(i).css("display", "none")
				$(".flavourButton").eq(i).css("display", "block")
				$(".flavourText").eq(i).css("display", "block")
			}
		}
	}
	if (game.unlocks >= 8) {
		$(".cascadeSubTabButton").eq(5).css("display", "inline-block")
		$("#shadowMilestoneDiv").css("display", "inline-block")
	}
	if (game.unlocks >= 9) {
		$("#bloodCrystalDiv").css("display", "inline-block")
		$(".shadowUnknown").eq(0).css("display", "none")
		$(".shadowUnknown").eq(1).css("display", "none")
		$(".shadowUpgrade").eq(2).css("display", "none")
		$(".bloodUpgrade").eq(0).css("display", "inline-block")
		$(".bloodUpgrade").eq(1).css("display", "inline-block")
		$(".bloodUpgrade").eq(2).css("display", "inline-block")
	}
	if (game.unlocks >= 10) {
		$("#divineCrystalDiv").css("display", "inline-block")
		$(".shadowUnknown").eq(2).css("display", "none")
		$(".shadowUnknown").eq(3).css("display", "none")
		$(".bloodUpgrade").eq(2).css("display", "none")
		$(".divineUpgrade").eq(0).css("display", "inline-block")
		$(".divineUpgrade").eq(1).css("display", "inline-block")
	}
	if (game.unlocks >= 11) {
		$(".tabButton").eq(2).css("display", "inline-block")
	}
	
	for (let i=0;i<game.autobuyers.length;i++) {
		if (game.autobuyers[i]) {
			$(".autobuyer").eq(i).html("On")
			$(".autobuyer").eq(i).css("color", "#0b0")
		}
		else {
			$(".autobuyer").eq(i).html("Off")
			$(".autobuyer").eq(i).css("color", "#b22")
		}
	}
}

function updateVisuals() {
	$("#number").html(toHyperNum(game.number,game.currentBase,true) + " <span style='color: #888'>(" + game.currentBase + ")</span>")
	if (currentTab==1) { //Number tab
		$("#hyperpoints").html(format(game.hyperpoints))
		$("#hyperpointsToGet").html(format(game.hyperpointsToGet) + " hyper-points")
		if (hyperESubTab==1) {
			//Multiplier button text
			if (keysPressed[16]) { //Player is holding shift
				if (game.clusterUpgradesBought[1]) {$("#multiplierButton").html("Current effect: x" + format(game.multipliers.add(1).pow(2)) + "<br>&nbsp;")}
				else {$("#multiplierButton").html("Current effect: x" + format(game.multipliers.add(1)) + "<br>&nbsp;")}
			}
			else { //Player is not holding shift
				$("#multiplierButton").html("Gain an autoclicker multiplier [" + format(game.multipliers) + "]<br>Costs " + format(game.multiplierCost) + " hyper-points")
			}
			//Determines whether multiplier button text is green (buyable) or not
			if (game.hyperpoints.gte(game.multiplierCost) && game.currentChallenge != 6) {$("#multiplierButton").css("color", "#0b0")}
			else {$("#multiplierButton").css("color", "#c94")}
			$("#autoclickers").html(format(game.autoclickers.floor()))
			$("#autoclickerEffect").html(format(game.autoclickerEffect))
		}
		else if (hyperESubTab==2) { //Factors tab
			for (let i=0;i<6;i++) {
				//Factor text
				if (keysPressed[16]) { //Player is holding shift
					if (game.baseShifts < i || (i>0 && game.currentChallenge == 1) || (i>3 && game.currentChallenge == 6)) {$(".factorButton").eq(i).html(factorNames[i] + " factor [" + format(game.factors[i]) + ", " + format(game.factorsBought[i]) + "]<br>Locked!")}
					else {$(".factorButton").eq(i).html(factorNames[i] + " factor [" + format(game.factors[i]) + ", " + format(game.factorsBought[i]) + "]<br>Costs " + format(game.factorCosts[i]) + " hyper-points")}
				}
				else { //Player is not holding shift
					if (game.baseShifts < i || (i>0 && game.currentChallenge == 1) || (i>3 && game.currentChallenge == 6)) {$(".factorButton").eq(i).html(factorNames[i] + " factor [" + format(game.factors[i]) + "]<br>Locked!")}
					else {$(".factorButton").eq(i).html(factorNames[i] + " factor [" + format(game.factors[i]) + "]<br>Costs " + format(game.factorCosts[i]) + " hyper-points")}
				}
				//Determines whether factor text is green (buyable) or not
				if (game.currentChallenge == 6) { //In challenge 6
					if (game.hyperpoints.gte(game.factorCosts[i]) && game.baseShifts >= i && i<4) {$(".factorButton").eq(i).css("color", "#0b0")}
					else {$(".factorButton").eq(i).css("color", "#c94")}
				}
				else if (game.currentChallenge == 1) { //In challenge 1
					if (game.hyperpoints.gte(game.factorCosts[i]) && i==0) {$(".factorButton").eq(i).css("color", "#0b0")}
					else {$(".factorButton").eq(i).css("color", "#c94")}
				}
				else { //Outside of challenge 1
					if (game.hyperpoints.gte(game.factorCosts[i]) && game.baseShifts >= i) {$(".factorButton").eq(i).css("color", "#0b0")}
					else {$(".factorButton").eq(i).css("color", "#c94")}
				}
			}
			if (game.autobuyers[0]) { //Factor autobuyer
				$(".autobuyer").eq(0).html("On")
				$(".autobuyer").eq(0).css("color", "#0b0")
			}
			else {
				$(".autobuyer").eq(0).html("Off")
				$(".autobuyer").eq(0).css("color", "#b22")
			}
			//Base shift requirement text
			if (game.currentChallenge == 3) {$("#baseShiftRequirement").html("Infinity")}
			else {$("#baseShiftRequirement").html(format(baseShiftCosts[game.baseShifts]))}
			//Determines whether base shift requirement text is green or not
			if (game.currentChallenge != 3 && game.hyperpoints.gte(baseShiftCosts[game.baseShifts])) {$("#baseShiftButton").css("color", "#2c2")}
			else {$("#baseShiftButton").css("color", "#888")}
			if (game.currentBase <= 5) {$("#clustersToGet").html(format(game.clustersToGet))}
			else {$("#clustersToGet").html(format(game.clusterLevel.add(1)))}
			//Determines requirements for next cluster(s)
			let clusterFirstRequirement = new Decimal(4).pow(new Decimal(8).mul(game.clusterLevel.add(1)).add(9)) //Requirement to get first available cluster
			let clusterLevelCanReach = game.number.add(1).div(4**9).log(4).div(8).floor() //Number of possible clusters
			let clusterLastRequirement = new Decimal(4).pow(new Decimal(8).mul(clusterLevelCanReach).add(9)) //Requirement to get last cluster
			let clusterNextRequirement = new Decimal(4).pow(new Decimal(8).mul(clusterLevelCanReach.add(1)).add(9)) //Requirement to get next cluster
			if (game.currentBase <= 5) {
				if (game.number.gte(clusterFirstRequirement)) {
					if (!game.postCascade && clusterNextRequirement.gt(new Decimal(4).pow(257))) {
						$("#clusterRequirement").html("Requires ∞ in base 5")
						$("#clusterProgressBarInner").css("width", "0")
					}
					else {
						$("#clusterRequirement").html("Next at " + toHyperNum(clusterNextRequirement.round().mul(1.01), 5, true))	//The .mul(1.01) is due to HyperNum rounding issues
						$("#clusterProgressBarInner").css("width", (game.number.add(1).div(clusterLastRequirement)).log10().div(clusterNextRequirement.div(clusterLastRequirement).log10()).mul(100).toNumber() + "%")
					}
					
				} 
				else {
					if (!game.postCascade && clusterFirstRequirement.gt(new Decimal(4).pow(257))) {
						$("#clusterRequirement").html("Requires ∞ in base 5")
						$("#clusterProgressBarInner").css("width", "0")
					}
					else {
						$("#clusterRequirement").html("Requires " + toHyperNum(clusterFirstRequirement.round().mul(1.1), 5, true) + " in base 5")
						$("#clusterProgressBarInner").css("width", game.number.add(1).log10().div(clusterFirstRequirement.log10()).mul(100).toNumber() + "%")
					}
				}
			}
			else {
				if (!game.postCascade && clusterFirstRequirement.gt(new Decimal(4).pow(257))) {$("#clusterRequirement").html("Requires ∞ in base 5")}
				else {$("#clusterRequirement").html("Requires " + toHyperNum(clusterFirstRequirement.round().mul(1.1), 5, true) + " in base 5")}
				$("#clusterProgressBarInner").css("width", "0")
			}
			if (game.currentBase <= 5 && game.number.gte(clusterFirstRequirement)) {$("#clusterButton").css("color", "#2c2")}
			else {$("#clusterButton").css("color", "#888")}

			
		}
		else if (hyperESubTab==3) { //Clusters tab
			$("#clusters").html(format(game.clusters))
			$("#totalClusters").html(format(game.totalClusters))
			//Cluster upgrade text
			if (keysPressed[16]) { //Player is holding shift
				for (let i=0;i<12;i++) $(".clusterUpgrade").eq(i).html(((i%3)+1) + "x" + (Math.floor(i/3)+1))
				$(".clusterUpgrade").eq(4).html("2x2<br>Current effect: x" + format(game.clusters.add(1), 1))
				$(".clusterUpgrade").eq(5).html("3x2<br>Current effect: x" + format(new Decimal(2.5).pow(game.baseShifts), 1))
				$(".clusterUpgrade").eq(9).html("1x4<br>Current effect: x" + format(game.vectors.add(1).log10().add(1), 2))
				$(".clusterUpgrade").eq(10).html("2x4<br>Current effect: x" + format(new Decimal(3).pow(game.totalBasePoints.pow(0.8)),2))
				$(".clusterUpgrade").eq(11).html("3x4<br>Current effect: x" + format(new Decimal(game.challengesBeaten[0]+1).mul(game.challengesBeaten[1]+1).mul(game.challengesBeaten[2]+1).mul(game.challengesBeaten[3]+1).mul(game.challengesBeaten[4]+1).mul(game.challengesBeaten[5]+1).mul(50).add(1)))
			}
			else { //Player is not holding shift
				for (let i=0;i<12;i++) $(".clusterUpgrade").eq(i).html(clusterUpgradeNames[i])
			}
		}
		else if (hyperESubTab==4) { //Challenges tab
			//Challenge info text
			if (keysPressed[16]) { //Player is holding shift
				for (let i=0;i<6;i++) {
					if (game.cascadeMilestonesAchieved >= 3) {$(".challengeInfo").eq(i).html("Current effect: x" + format(new Decimal(100).pow(game.challengesBeaten[i]).pow(1.5)))}
					else {$(".challengeInfo").eq(i).html("Current effect: x" + format(new Decimal(100).pow(game.challengesBeaten[i])))}
				}
			}
			else { //Player is not holding shift
				for (let i=0;i<6;i++) $(".challengeInfo").eq(i).html(challengeInfos[i] + "<br>Goal: " + challengeGoals[i][game.challengesBeaten[i]])
			}
			if (game.currentChallenge > 0) {$("#challengeProgressBarInner").css("width", Decimal.min(game.number.add(1).log10().div(game.currentChallengeGoal.log10()).mul(100), 100).toNumber() + "%")}
			else {$("#challengeProgressBarInner").css("width", "0")}
		}
		else if (hyperESubTab==5) { //Vectors tab
			$("#vectors").html(format(game.vectors))
			$("#vectorsPerSecond").html(format(game.vectorsPerSecond))
			if (game.cascadeMilestonesAchieved < 2 || game.currentChallenge == 5) {$("#vectorEffect").html(format(game.vectors.add(1)))}
			else {$("#vectorEffect").html("1")}
			//Vector upgrade text
			for (let i=0;i<6;i++) {
				$(".vectorUpgradeAmount").eq(i).html(format(game.vectorUpgradesBought[i]))
				$(".vectorUpgradeCost").eq(i).html(format(game.vectorUpgradeCosts[i]))
			}
			$(".vectorUpgradeEffect").eq(0).html(format(game.totalClusters.div(100).add(1).pow(game.vectorUpgradesBought[1].pow(0.8)),2))
			if (game.shadowMilestonesAchieved >= 5) {$(".vectorUpgradeEffect").eq(1).html(format(game.vectorUpgradesBought[2].pow(5).add(1), 2))}
			else if (game.shadowMilestonesAchieved >= 1) {$(".vectorUpgradeEffect").eq(1).html(format(game.vectorUpgradesBought[2].pow(3).add(1), 2))}
			else {$(".vectorUpgradeEffect").eq(1).html(format(game.vectorUpgradesBought[2].pow(1.5).add(1), 2))}
			$(".vectorUpgradeEffect").eq(2).html(format(Decimal.min(new Decimal(100).pow(game.vectorUpgradesBought[3].pow(0.8)), 1e15)))
			$(".vectorUpgradeEffect").eq(3).html(format(new Decimal(2).pow(game.vectorUpgradesBought[5].pow(0.8)), 2))
			if (game.currentChallenge == 5) {$("#vectorResetButton").html("You cannot reset vectors in challenge 5!")}
			else {$("#vectorResetButton").html("Reset vectors to 0")}
		}
		else if (hyperESubTab==6) { //Base points tab
			$("#basePoints").html(format(game.basePoints))
			$("#totalBasePoints").html(format(game.totalBasePoints))
			if (game.inBasedverse) {
				let effectiveBase = game.basedverseBase.sub(1)
				let basePointsCanGet = game.number.add(1).div(effectiveBase).log(effectiveBase).div(effectiveBase).floor()
				basePointsCanGet = Decimal.max(basePointsCanGet.sub(game.totalBasePoints), 0)
				let nextBasePoint = new Decimal(effectiveBase).pow(new Decimal(effectiveBase).mul(basePointsCanGet.add(game.totalBasePoints).add(1)).add(1))
				$("#basePointsText").html("You will gain " + format(basePointsCanGet) + " base points upon leaving now<br>Next at " + toHyperNum(nextBasePoint.mul(1.01), game.basedverseBase, true)) //The .mul(1.01) is due to HyperNum rounding issues
				$("#basedverseButtonText").html("Exit")
			}
			else {
				$("#basePointsText").html("")
				$("#basedverseButtonText").html("Enter")
			}
			$("#basedverseBase").html(format(game.basedverseBase))
			$("#upBase").html(format(game.upBase))
			$("#downBase").html(format(game.downBase))
			let upBaseEffect = new Decimal(2.5).pow(game.upBase.pow(0.8))
			upBaseEffect = upBaseEffect.mul(new Decimal(2).pow(game.vectorUpgradesBought[5].pow(0.8)))
			if (game.postCascadeUpgradesBought[1].eq(1)) upBaseEffect = upBaseEffect.mul(Decimal.min(new Decimal(game.timeThisCascade).pow(0.7).div(3).add(1), 300))
			$("#upBaseEffect").html(format(upBaseEffect,2))
			let downBaseEffect = new Decimal(2).pow(game.downBase.pow(0.8))
			downBaseEffect = downBaseEffect.mul(new Decimal(2).pow(game.vectorUpgradesBought[5].pow(0.8)))
			if (game.postCascadeUpgradesBought[1].eq(1)) downBaseEffect = downBaseEffect.mul(Decimal.min(new Decimal(game.timeThisCascade).pow(0.7).div(3).add(1), 300))
			$("#downBaseEffect").html(format(downBaseEffect,2))
		}
	}
	else if (currentTab==2) { //Cascade tab
		$("#cascades").html(format(game.cascades))
		let cBase = new Decimal(game.currentBase-1)
		if (game.number.gte(cBase.pow(cBase.pow(cBase).add(1)))) {
			if (game.postCascade) {$("#cascadeButton").html("Reset previous progress to gain " + format(game.cascadesToGet) + " cascades (C)")}
			else {$("#cascadeButton").html("Reset previous progress to gain a cascade (C)")}
			$("#cascadeButton").css("color", "#0d0")
		}
		else {
			$("#cascadeButton").html("Reach 1Ex#^#x to cascade")
			$("#cascadeButton").css("color", "#eb2")
		}
		if (cascadeSubTab==1) { //Cascade tab
			$("#cascadePower").html(format(game.cascadePower))
			if (game.cascadeMilestonesAchieved >= 6) {$("#cascadePowerEffect").html(format(game.cascadePower.pow(0.2).add(1), 2))}
			else {$("#cascadePowerEffect").html(format(game.cascadePower.pow(0.12).add(1), 2))}
			if (keysPressed[16]) { //Player is holding shift
				$(".layerButton").eq(0).html("Power producer [" + format(game.layers[0]) + ", " + format(game.layersBought[0]) + "]<br>Costs " + format(game.layerCosts[0]) + " cascades")
			}
			else { //Player is not holding shift
				$(".layerButton").eq(0).html("Power producer [" + format(game.layers[0]) + "]<br>Costs " + format(game.layerCosts[0]) + " cascades")
			}
			for (let i=1;i<7;i++) {
				if (keysPressed[16]) { //Player is holding shift
					if (game.cascadeMilestonesAchieved >= 3) {$(".layerButton").eq(i).html(factorNames[i-1] + " layer [" + format(game.layers[i]) + ", " + format(game.layersBought[i]) + "]<br>Costs " + format(game.layerCosts[i]) + " cascades")}
					else {$(".layerButton").eq(i).html(factorNames[i-1] + " layer [" + format(game.layers[i]) + ", " + format(game.layersBought[i]) + "]<br>Locked!")}
				}
				else { //Player is not holding shift
					if (game.cascadeMilestonesAchieved >= 3) {$(".layerButton").eq(i).html(factorNames[i-1] + " layer [" + format(game.layers[i]) + "]<br>Costs " + format(game.layerCosts[i]) + " cascades")}
					else {$(".layerButton").eq(i).html(factorNames[i-1] + " layer [" + format(game.layers[i]) + "]<br>Locked!")}
				}
			}
			for (let i=0;i<7;i++) {
				if (game.cascades.gte(game.layerCosts[i]) && (i==0 || game.cascadeMilestonesAchieved >= 3)) {$(".layerButton").eq(i).css("color", "#0d0")}
				else {$(".layerButton").eq(i).css("color", "#eb2")}
			}
		}
		else if (cascadeSubTab==3) { //Milestone tab
			if (game.unlocks >= 8) {
				$(".shadowMilestoneEffect").eq(0).html(format(game.flavours[0].add(1).log10().div(5).add(1), 2))
				$(".shadowMilestoneEffect").eq(1).html(format(Decimal.min(Decimal.max(game.bloodCrystals.pow(0.5), 1), 10000), 2))
				$(".shadowMilestoneEffect").eq(2).html(format(Decimal.max(game.shadowCrystals.pow(0.1), 1), 2))
			}
		}
		else if (cascadeSubTab==4) { //Post-cascade tab
			$("#bestCascadesPerSecond").html(format(game.bestCascadesPerSecond.div(10), 2))
			$(".postCascadeUpgradeBought").eq(0).html(format(game.postCascadeUpgradesBought[0]))
			$(".postCascadeUpgradeCost").eq(0).html(format(game.postCascadeUpgrade1Cost))
			let postCascade1UpgradeEffect = new Decimal(2).pow(game.postCascadeUpgradesBought[0]).round()
			if (postCascade1UpgradeEffect.gt(1e15)) {
				postCascade1UpgradeEffect = postCascade1UpgradeEffect.mul(1e15).pow(0.5)
				$("#postCascadeUpgrade1Softcap").html(" (softcapped)")
			}
			else {$("#postCascadeUpgrade1Softcap").html("")}
			$(".postCascadeUpgradeEffect").eq(0).html(format(postCascade1UpgradeEffect)) //Post-cascade upgrade 1 effect
			$(".postCascadeUpgradeEffect").eq(1).html(format(Decimal.min(new Decimal(game.timeThisCascade).pow(0.7).div(3).add(1), 300), 2)) //Post-cascade upgrade 2 effect, capped at x100
			$(".postCascadeUpgradeEffect").eq(2).html(format(game.clusters.pow(0.2).div(2).add(1), 2)) //Post-cascade upgrade 4 effect
		}
		else if (cascadeSubTab==5) { //Flavour tab
			for (let i=0;i<5;i++) $(".flavour").eq(i).html(format(game.flavours[i]))
			$(".flavourToGet").eq(0).html(format(game.cascades.div(1000).mul(game.flavourMultipliers[0]).floor()))
			//I need to condense these into for loops or a switch at some point
			$(".flavourEffect").eq(0).html(format(game.flavours[0].add(1).log10().div(10).add(1).pow(2), 2))
			if (game.shadowMilestonesAchieved >= 4) {$(".flavourEffect").eq(1).html(format(game.flavours[0].add(1).log10().div(5).add(1).pow(2.5), 2))}
			else {$(".flavourEffect").eq(1).html(format(game.flavours[0].add(1).log10().div(10).add(1).pow(2), 2))}
			$(".flavourEffect").eq(2).html(format(Decimal.min(game.flavours[1].pow(0.7).add(1), 50), 2))
			$(".flavourEffect").eq(3).html(format(game.flavours[1].add(1).log10().div(2).add(1), 2))
			$(".flavourEffect").eq(4).html(format(Decimal.min(game.flavours[2].pow(0.6).add(1), 50), 2))
			$(".flavourEffect").eq(5).html(format(game.flavours[2].add(1).log10().div(2).add(1), 2))
			$(".flavourEffect").eq(6).html(format(Decimal.min(game.flavours[3].pow(0.5).add(1), 50), 2))
			$(".flavourEffect").eq(7).html(format(game.flavours[3].add(1).log10().div(2).add(1), 2))
			$(".flavourEffect").eq(8).html(format(Decimal.min(game.flavours[4].pow(0.4).add(1), 50), 2))
			$(".flavourEffect").eq(9).html(format(game.flavours[4].add(1).log10().div(2).add(1), 2))
			for (let i=1;i<4;i++) {
				$(".flavourToGet").eq(i).html(format(game.flavours[i-1].div(1000).mul(game.flavourMultipliers[i]).floor()))
				$(".flavourCost").eq(i).html(format(new Decimal(1000).div(game.flavourMultipliers[i])))
			}
			$(".flavourCost").eq(0).html(format(new Decimal(1000).div(game.flavourMultipliers[0])))
			$(".flavourToGet").eq(4).html(format(game.flavours[3].div(1000).floor()))
		}
		else if (cascadeSubTab==6) {
			$("#shadowPower").html(format(game.shadowPower))
			$("#shadowCrystals").html(format(game.shadowCrystals))
			$("#shadowCrystalPoint").html(format(game.shadowCrystalPoint))
			$("#shadowCrystalEffect").html(format(Decimal.min(game.shadowCrystals.pow(0.5).mul(4).add(1), 1e6), 2))
			$("#shadowPowerPerSecond").html(format(game.shadowPowerPerSecond))
			if (game.shadowPowerPerSecond.gt(game.shadowCrystalPoint.mul(20))) {$("#shadowPowerBarInner").css("width", "100%")}
			else {$("#shadowPowerBarInner").css("width", (modulo(game.shadowPower,game.shadowCrystalPoint) / (game.shadowCrystalPoint.div(100))) + "%")}
			for (let i=0;i<2;i++) $(".shadowUpgradeCost").eq(i).html(format(game.shadowUpgradeCosts[i]))
			$(".shadowUpgradeEffect").eq(0).html(format(new Decimal(2).pow(game.shadowUpgradesBought[0]), 2))
			if (game.unlocks >= 9) {
				$("#bloodPower").html(format(game.bloodPower))
				$("#bloodCrystals").html(format(game.bloodCrystals))
				$("#bloodCrystalPoint").html(format(game.bloodCrystalPoint))
				$(".bloodCrystalEffect").eq(0).html(format(game.bloodCrystals.pow(0.4).add(1), 2))
				$(".bloodCrystalEffect").eq(1).html(format(Decimal.min(game.bloodCrystals.pow(0.5).mul(4).add(1), 1e6), 2))
				$("#bloodPowerPerSecond").html(format(game.bloodPowerPerSecond))
				if (game.bloodPowerPerSecond.gt(game.bloodCrystalPoint.mul(20))) {$("#bloodPowerBarInner").css("width", "100%")}
				else {$("#bloodPowerBarInner").css("width", (modulo(game.bloodPower,game.bloodCrystalPoint) / (game.bloodCrystalPoint.div(100))) + "%")}
				for (let i=0;i<2;i++) $(".bloodUpgradeCost").eq(i).html(format(game.bloodUpgradeCosts[i]))
				$(".bloodUpgradeEffect").eq(0).html(format(new Decimal(2).pow(game.bloodUpgradesBought[0]), 2))
			}
			if (game.unlocks >= 10) {
				$("#divinePower").html(format(game.divinePower))
				$("#divineCrystals").html(format(game.divineCrystals))
				$("#divineCrystalPoint").html(format(game.divineCrystalPoint))
				$(".divineCrystalEffect").eq(0).html(format(game.divineCrystals.pow(0.4).add(1), 2))
				$(".divineCrystalEffect").eq(1).html(format(Decimal.min(game.divineCrystals.pow(0.5).mul(4).add(1), 1e6), 2))
				$("#divinePowerPerSecond").html(format(game.divinePowerPerSecond))
				if (game.divinePowerPerSecond.gt(game.divineCrystalPoint.mul(20))) {$("#divinePowerBarInner").css("width", "100%")}
				else {$("#divinePowerBarInner").css("width", (modulo(game.divinePower,game.divineCrystalPoint) / (game.divineCrystalPoint.div(100))) + "%")}
				for (let i=0;i<2;i++) $(".divineUpgradeCost").eq(i).html(format(game.divineUpgradeCosts[i]))
				$(".divineUpgradeEffect").eq(0).html(format(new Decimal(2).pow(game.divineUpgradesBought[0]), 2))
			}
		}
	}
}

function update() {
	//Time multiplier to multiply resources based on time since last update
	let timeMultiplier = 0.001 * (Date.now() - game.timeOfLastUpdate)
	
	if (game.hyperpoints.lt(0)) game.hyperpoints = new Decimal(0)
	if (game.clusterUpgradesBought[8] || game.cascadeMilestonesAchieved >= 9) game.hyperpoints = game.hyperpoints.add(new Decimal(100).mul(timeMultiplier)) //Cluster upgrade 9 effect
	if (game.postCascadeUpgradesBought[5].eq(1)) game.hyperpoints = game.hyperpoints.add(game.hyperpointsToGet.mul(timeMultiplier))
	if (game.clusterUpgradesBought[2]) buyMaxMultipliers(1) //Cluster upgrade 3 effect (auto buy max multipliers)
	if (game.clusterUpgradesBought[1]) {game.autoclickerEffect = game.autoclickers.floor().mul(game.multipliers.add(1).pow(2))} //Cluster upgrade 2 effect
	else {game.autoclickerEffect = game.autoclickers.floor().mul(game.multipliers.add(1))}
	if (game.clusterUpgradesBought[11]) game.autoclickerEffect = game.autoclickerEffect.mul(new Decimal(game.challengesBeaten[0]+1).mul(game.challengesBeaten[1]+1).mul(game.challengesBeaten[2]+1).mul(game.challengesBeaten[3]+1).mul(game.challengesBeaten[4]+1).mul(game.challengesBeaten[5]+1).mul(50).add(1)) //Cluster upgrade 12 effect
	if (game.unlocks >= 3 && game.currentChallenge > 0) game.autoclickerEffect = game.autoclickerEffect.mul(Decimal.min(new Decimal(100).pow(game.vectorUpgradesBought[3].pow(0.8)), 1e15))
	if (game.currentChallenge == 4) {
		for (let i=0;i<12;i++) {if (game.clusterUpgradesBought[i]) game.autoclickerEffect = game.autoclickerEffect.div(10000)}
	}
	game.number = game.number.add(game.autoclickerEffect.mul(timeMultiplier))
	let cBase = new Decimal(game.currentBase-1)
	if (!game.postCascade && game.number.gt(cBase.pow(cBase.pow(cBase).add(1)))) game.number = cBase.pow(cBase.pow(cBase).add(1))
	//else if (game.number.gt(cBase.pow(cBase.pow(cBase.mul(2).add(1)).add(1)))) game.number = cBase.pow(cBase.pow(cBase.mul(2).add(1)).add(1))
	
	let factorMultipliers = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)]
	//Gotta replace most of these with a combined multiplier for all factors at some point
	for (let i=0;i<6;i++) {
		if (game.cascadeMilestonesAchieved >= 3) {factorMultipliers[i] = factorMultipliers[i].mul(new Decimal(100).pow(game.challengesBeaten[i]).pow(1.5))} //Challenge multipliers 
		else {factorMultipliers[i] = factorMultipliers[i].mul(new Decimal(100).pow(game.challengesBeaten[i]))}
		if (game.clusterUpgradesBought[0]) factorMultipliers[i] = factorMultipliers[i].mul(Decimal.max(game.factorsBought[i], 1)) //Cluster upgrade 1 effect
		if (game.clusterUpgradesBought[4]) factorMultipliers[i] = factorMultipliers[i].mul(game.clusters.add(1)) //Cluster upgrade 5 effect
		if (game.clusterUpgradesBought[5]) factorMultipliers[i] = factorMultipliers[i].mul(new Decimal(2.5).pow(game.baseShifts)) //Cluster upgrade 6 effect
		if (game.currentChallenge == 2) factorMultipliers[i] = factorMultipliers[i].div(new Decimal(10).pow(game.baseShifts)) 
		if (game.unlocks >= 3) {
			if (game.cascadeMilestonesAchieved < 2 || game.currentChallenge == 5) factorMultipliers[i] = factorMultipliers[i].div(Decimal.max(game.vectors.add(1), 1)) //Vector divider
			if (game.shadowMilestonesAchieved >= 5) {factorMultipliers[i] = factorMultipliers[i].mul(game.vectorUpgradesBought[2].pow(5).add(1))}
			else if (game.shadowMilestonesAchieved >= 1) {factorMultipliers[i] = factorMultipliers[i].mul(game.vectorUpgradesBought[2].pow(3).add(1))}
			else {factorMultipliers[i] = factorMultipliers[i].mul(game.vectorUpgradesBought[2].pow(1.5).add(1))}
		}
		if (game.unlocks >= 4) { //Up-base effect
			let upBaseEffect = new Decimal(2.5).pow(game.upBase.pow(0.8))
			upBaseEffect = upBaseEffect.mul(new Decimal(2).pow(game.vectorUpgradesBought[5].pow(0.8)))
			if (game.postCascadeUpgradesBought[1].eq(1)) upBaseEffect = upBaseEffect.mul(Decimal.min(new Decimal(game.timeThisCascade).pow(0.7).div(3).add(1), 300))
			factorMultipliers[i] = factorMultipliers[i].mul(upBaseEffect)
		}
		if (game.unlocks >= 5) { //Cascade power effect
			if (game.cascadeMilestonesAchieved >= 6) {factorMultipliers[i] = factorMultipliers[i].mul(game.cascadePower.pow(0.2).add(1))}
			else {factorMultipliers[i] = factorMultipliers[i].mul(game.cascadePower.pow(0.12).add(1))}
		}
		if (game.unlocks >= 7) factorMultipliers[i] = factorMultipliers[i].pow(game.flavours[0].add(1).log10().div(10).add(1).pow(2)) //Alpha-flavour effect
	}
	game.autoclickers = game.autoclickers.add(game.factors[0].mul(factorMultipliers[0]).mul(timeMultiplier))
	for (let i=0;i<5;i++) game.factors[i] = game.factors[i].add(game.factors[i+1].mul(factorMultipliers[i+1]).mul(timeMultiplier))
	if (game.cascadeMilestonesAchieved >= 1 && game.autobuyers[0]) buyMaxFactors(false)
	if (game.postCascadeUpgradesBought[2].eq(1) && game.autobuyers[1]) baseShift()
		
	game.hyperpointsToGet = game.number.floor()
	let clusterLevelCanReach = game.number.add(1).div(4**9).log(4).div(8).floor()
	let achievedClusters = game.clusterLevel.mul(game.clusterLevel.add(1)).div(2)
	game.clustersToGet = Decimal.max(clusterLevelCanReach.mul(clusterLevelCanReach.add(1)).div(2).sub(achievedClusters), game.clusterLevel.add(1))
	//Shadow milestone 3 effect
	if (game.shadowMilestonesAchieved >= 3 && game.clustersToGet.gt(0) && game.currentBase <= 5 && game.number.gte(new Decimal(4).pow(new Decimal(8).mul(game.clusterLevel.add(1)).add(9))) && !game.clusterLimitEnabled) {
		game.clusters = game.clusters.add(game.clustersToGet)
		game.totalClusters = game.totalClusters.add(game.clustersToGet)
		game.clusterLevel = game.clusterLevel.add(game.number.add(1).div(4**9).log(4).div(8).floor().sub(game.clusterLevel))
	}
	
	//Challenge stuff
	if (game.currentChallenge == 1) {
		//Setting the challenge 1 goal
		if (game.challengesBeaten[0] == 0) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).mul(2).add(1))}
		else if (game.challengesBeaten[0] == 1) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).mul(2).add(4))}
		else if (game.challengesBeaten[0] == 2) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(2).add(new Decimal(game.currentBase-1).mul(2)).add(1))}
		else if (game.challengesBeaten[0] == 3) {game.currentChallengeGoal = new Decimal(Infinity)}
	}
	else if (game.currentChallenge == 2) {
		//Setting the challenge 2 goal
		if (game.challengesBeaten[1] == 0) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).add(3))}
		else if (game.challengesBeaten[1] == 1) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(2).add(new Decimal(game.currentBase-1).mul(3)).add(1))}
		else if (game.challengesBeaten[1] == 2) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(2).mul(2).add(new Decimal(game.currentBase-1).mul(2)).add(1))}
		else if (game.challengesBeaten[1] == 3) {game.currentChallengeGoal = new Decimal(Infinity)}
	}
	else if (game.currentChallenge == 3) {
		//Setting the challenge 3 goal
		if (game.challengesBeaten[2] == 0) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).add(4))}
		else if (game.challengesBeaten[2] == 1) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).mul(5).add(1))}
		else if (game.challengesBeaten[2] == 2) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(2).add(new Decimal(game.currentBase-1)).add(1))}
		else if (game.challengesBeaten[2] == 3) {game.currentChallengeGoal = new Decimal(Infinity)}
	}
	else if (game.currentChallenge == 4) {
		//Setting the challenge 4 goal
		if (game.challengesBeaten[3] == 0) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(3).add(1))}
		else if (game.challengesBeaten[3] == 1) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(3).add(new Decimal(game.currentBase-1).pow(2)).add(game.currentBase-1).add(1))}
		else if (game.challengesBeaten[3] == 2) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(3).mul(2).add(1))}
		else if (game.challengesBeaten[3] == 3) {game.currentChallengeGoal = new Decimal(Infinity)}
	}
	else if (game.currentChallenge == 5) {
		//Setting the challenge 5 goal
		if (game.challengesBeaten[4] == 0) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(3).add(new Decimal(game.currentBase-1).pow(2)).add(1))}
		else if (game.challengesBeaten[4] == 1) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(3).add(new Decimal(game.currentBase-1).pow(2).mul(3)).add(1))}
		else if (game.challengesBeaten[4] == 2) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(3).mul(2).add(new Decimal(game.currentBase-1).mul(2)).add(1))}
		else if (game.challengesBeaten[4] == 3) {game.currentChallengeGoal = new Decimal(Infinity)}
	}
	else if (game.currentChallenge == 6) {
		//Setting the challenge 6 goal
		if (game.challengesBeaten[5] == 0) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(3).add(1))}
		else if (game.challengesBeaten[5] == 1) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(3).add(new Decimal(game.currentBase-1).pow(2)).add(game.currentBase-1).add(1))}
		else if (game.challengesBeaten[5] == 2) {game.currentChallengeGoal = new Decimal(game.currentBase-1).pow(new Decimal(game.currentBase-1).pow(3).add(new Decimal(game.currentBase-1).pow(2).mul(2)).add(1))}
		else if (game.challengesBeaten[5] == 3) {game.currentChallengeGoal = new Decimal(Infinity)}
	}
	if (game.currentChallenge > 0 && game.number.gte(game.currentChallengeGoal)) {$(".challengeButton").eq(game.currentChallenge-1).css("color", "#0f0")}
	else {$(".challengeButton").eq(game.currentChallenge-1).css("color", "#bbb")}
	
	//Vector stuff
	if (game.unlocks >= 3) {
		game.vectorsPerSecond = game.number.add(1).log10().pow(3).div(10000)
		game.vectorsPerSecond = game.vectorsPerSecond.mul(new Decimal(2).pow(game.vectorUpgradesBought[0])) //Vector upgrade 1 effect
		game.vectorsPerSecond = game.vectorsPerSecond.mul(game.totalClusters.div(100).add(1).pow(game.vectorUpgradesBought[1].pow(0.8))) //Vector upgrade 2 effect
		if (game.clusterUpgradesBought[9]) game.vectorsPerSecond = game.vectorsPerSecond.mul(game.vectors.add(1).log10().add(1))
		if (game.clusterUpgradesBought[10]) game.vectorsPerSecond = game.vectorsPerSecond.mul(new Decimal(3).pow(game.totalBasePoints.pow(0.8)))
		//Down-base effect
		let downBaseEffect = new Decimal(2).pow(game.downBase.pow(0.8))
		downBaseEffect = downBaseEffect.mul(new Decimal(2).pow(game.vectorUpgradesBought[5].pow(0.8)))
		if (game.postCascadeUpgradesBought[1].eq(1)) downBaseEffect = downBaseEffect.mul(Decimal.min(new Decimal(game.timeThisCascade).pow(0.7).div(3).add(1), 300))
		if (game.unlocks >= 4) game.vectorsPerSecond = game.vectorsPerSecond.mul(downBaseEffect) 
		game.vectorsPerSecond = game.vectorsPerSecond.floor()
		if (game.currentChallenge == 5 && game.vectorsPerSecond.gt(10000)) game.vectorsPerSecond = new Decimal(10000)
		if (game.vectorsPerSecond.gt(1e100)) {
			game.vectorsPerSecond = game.vectorsPerSecond.mul(1e25).pow(0.8)
			if (game.vectorsPerSecond.gt("1e400")) game.vectorsPerSecond = game.vectorsPerSecond.mul("1e400").pow(0.5)
			$("#vectorSoftcap").html("(softcapped) ")
		}
		else {
			$("#vectorSoftcap").html("")
		}
		if (game.vectorGainEnabled || game.currentChallenge == 5) game.vectors = game.vectors.add(game.vectorsPerSecond.mul(timeMultiplier))
	}

	//Cascade stuff
	game.timeThisCascade += timeMultiplier
	let layerMultipliers = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)]
	for (let i=0;i<7;i++) {
		if (game.postCascadeUpgradesBought[8].eq(1)) {layerMultipliers[i] = layerMultipliers[i].mul(Decimal.max(game.layersBought[i], 1).pow(3))} //Post-cascade upgrade 9 effect
		else if (game.cascadeMilestonesAchieved >= 5) {layerMultipliers[i] = layerMultipliers[i].mul(Decimal.max(game.layersBought[i], 1))} //Cluster upgrade 1 effect
	}
	game.cascadePower = game.cascadePower.add(game.layers[0].mul(layerMultipliers[0]).mul(timeMultiplier))
	for (let i=0;i<6;i++) game.layers[i] = game.layers[i].add(game.layers[i+1].mul(layerMultipliers[i+1]).mul(timeMultiplier))
		
	//Post-cascade stuff
	if (game.currentBase <= 5 && game.postCascade) {
		game.cascadesToGet = game.number.add(1).log(4).sub(193).div(64)
		let postCascade1UpgradeEffect = new Decimal(2).pow(game.postCascadeUpgradesBought[0]).round()
		if (postCascade1UpgradeEffect.gt(1e15)) postCascade1UpgradeEffect = postCascade1UpgradeEffect.mul(1e15).pow(0.5) //Post-cascade upgrade 1 effect
		game.cascadesToGet = game.cascadesToGet.mul(postCascade1UpgradeEffect)
		if (game.postCascadeUpgradesBought[3].eq(1)) game.cascadesToGet = game.cascadesToGet.mul(game.clusters.pow(0.2).div(2).add(1))
		if (game.unlocks >= 7) {
			if (game.shadowMilestonesAchieved >= 4) {game.cascadesToGet = game.cascadesToGet.mul(game.flavours[0].add(1).log10().div(5).add(1).pow(2.5))} //Alpha-flavour effect
			else {game.cascadesToGet = game.cascadesToGet.mul(game.flavours[0].add(1).log10().div(10).add(1).pow(2))}
			for (let i=1;i<5;i++) game.cascadesToGet = game.cascadesToGet.mul(game.flavours[i].add(1).log10().div(2).add(1)) //Beta-epsilon flavour effects
		}
		if (game.unlocks >= 8) game.cascadesToGet = game.cascadesToGet.mul(Decimal.min(game.shadowCrystals.pow(0.5).mul(4).add(1), 1e6))
		if (game.unlocks >= 9) game.cascadesToGet = game.cascadesToGet.mul(Decimal.min(game.bloodCrystals.pow(0.5).mul(4).add(1), 1e6))
		if (game.unlocks >= 10) game.cascadesToGet = game.cascadesToGet.mul(Decimal.min(game.divineCrystals.pow(0.5).mul(4).add(1), 1e6))
		game.cascadesToGet = game.cascadesToGet.floor()
		if (game.shadowMilestonesAchieved >= 8 && game.cascades.gte(game.postCascadeUpgrade1Cost)) {
			game.postCascadeUpgradesBought[0] = game.postCascadeUpgradesBought[0].add(1)
			if (game.postCascadeUpgradesBought[7].eq(1)) {game.postCascadeUpgrade1Cost = new Decimal(5).pow(game.postCascadeUpgradesBought[0]).mul(3).round()} //Post-cascade upgrade 8 effect
			else {game.postCascadeUpgrade1Cost = new Decimal(5).pow(game.postCascadeUpgradesBought[0]).mul(20).round()}
		}
	}
	if (game.postCascade && game.postCascadeUpgradesBought[6].eq(1)) game.cascades = game.cascades.add(game.bestCascadesPerSecond.div(10).mul(timeMultiplier))
	if (game.shadowMilestonesAchieved >= 9) game.cascades = game.cascades.add(game.cascadesToGet.mul(timeMultiplier))
		
	//Flavour multipliers
	game.flavourMultipliers[0] = Decimal.min(game.flavours[1].pow(0.7).add(1), 50)
	game.flavourMultipliers[1] = Decimal.min(game.flavours[2].pow(0.6).add(1), 50)
	game.flavourMultipliers[2] = Decimal.min(game.flavours[3].pow(0.5).add(1), 50)
	game.flavourMultipliers[3] = Decimal.min(game.flavours[4].pow(0.4).add(1), 50)
	
	//Shadow crystal stuff
	if (game.unlocks >= 8) {
		game.shadowPowerPerSecond = game.hyperpoints.add(1).log10().div(10).mul(new Decimal(2).pow(game.shadowUpgradesBought[0]))
		if (game.shadowMilestonesAchieved >= 2) game.shadowPowerPerSecond = game.shadowPowerPerSecond.mul(game.flavours[0].add(1).log10().div(5).add(1))
		if (game.unlocks >= 9) game.shadowPowerPerSecond = game.shadowPowerPerSecond.mul(game.bloodCrystals.pow(0.4).add(1))
		if (game.shadowMilestonesAchieved >= 6) game.shadowPowerPerSecond = game.shadowPowerPerSecond.mul(Decimal.min(Decimal.max(game.bloodCrystals.pow(0.5), 1), 10000))
		game.shadowPower = game.shadowPower.add(game.shadowPowerPerSecond.mul(timeMultiplier))
		game.shadowCrystals = game.shadowPower.div(game.shadowCrystalPoint).floor()
		if (!game.shadowCrystals.eq(game.previousCrystals)) {
			crystalCheck()
			game.previousCrystals = game.shadowCrystals
		}
	}
	
	//Blood crystal stuff
	if (game.unlocks >= 9) {
		game.bloodPowerPerSecond = game.shadowPower.pow(0.5).div(10).mul(new Decimal(2).pow(game.bloodUpgradesBought[0]))
		if (game.unlocks >= 10) game.bloodPowerPerSecond = game.bloodPowerPerSecond.mul(game.divineCrystals.pow(0.4).add(1))
		game.bloodPower = game.bloodPower.add(game.bloodPowerPerSecond.mul(timeMultiplier))
		game.bloodCrystals = game.bloodPower.div(game.bloodCrystalPoint).floor()
	}
	
	//Divine crystal stuff
	if (game.unlocks >= 10) {
		game.divinePowerPerSecond = game.bloodPower.pow(0.5).div(10).mul(new Decimal(2).pow(game.divineUpgradesBought[0]))
		if (game.shadowMilestonesAchieved >= 7) game.divinePowerPerSecond = game.divinePowerPerSecond.mul(Decimal.max(game.shadowCrystals.pow(0.1), 1))
		game.divinePower = game.divinePower.add(game.divinePowerPerSecond.mul(timeMultiplier))
		game.divineCrystals = game.divinePower.div(game.divineCrystalPoint).floor()
		if (game.shadowMilestonesAchieved >= 10 && game.unlocks < 11) {
			game.unlocks = 11
			$(".tabButton").eq(2).css("display", "inline-block")
		}
	}
		
	game.timeOfLastUpdate = Date.now()
}
setInterval(update, 16)

function switchTab(x) {
	currentTab = x
	for (let i=0;i<5;i++) $(".tab").eq(i).css("display", "none")
	$(".tab").eq(x-1).css("display", "block")
	if (x==1) {switchHyperESubTab(hyperESubTab)}
	else if (x==2) {switchCascadeSubTab(cascadeSubTab)}
	else if (x==3) { //Achievements tab
		checkAchievements()
		for (let i=0;i<30;i++) {
			//Only make the achievement text appear if the player is at the right unlock level, otherwise make it say "???"
			if (game.unlocks >= achievementRowUnlockLevels[Math.floor(i/6)]) {$(".achievement").eq(i).html(achievementNames[i])}
			else {$(".achievement").eq(i).html("???")}
			if (game.achievementsAttained[i]) {
				$(".achievement").eq(i).css("background-color", "#060")
				$(".achievement").eq(i).css("color", "#0f0")
			}
			else {
				$(".achievement").eq(i).css("background-color", "#201810")
				$(".achievement").eq(i).css("color", "#ca8")
			}
		}
	}
	else if (x==4) { //Settings tab
		for (let i=0;i<7;i++) {
			if (game.confirmations[i]) {
				$(".confirmation").eq(i).html("On")
				$(".confirmation").eq(i).css("color", "#0b0")
			}
			else {
				$(".confirmation").eq(i).html("Off")
				$(".confirmation").eq(i).css("color", "#b22")
			}
		}
	}
}

function changeConfirmation(x) {
	game.confirmations[x-1] = !game.confirmations[x-1]
	if (game.confirmations[x-1]) {
		$(".confirmation").eq(x-1).html("On")
		$(".confirmation").eq(x-1).css("color", "#0b0")
	}
	else {
		$(".confirmation").eq(x-1).html("Off")
		$(".confirmation").eq(x-1).css("color", "#b22")
	}
}

function changeAutobuyer(x) {
	game.autobuyers[x-1] = !game.autobuyers[x-1]
	if (game.autobuyers[x-1]) {
		$(".autobuyer").eq(x-1).html("On")
		$(".autobuyer").eq(x-1).css("color", "#0b0")
	}
	else {
		$(".autobuyer").eq(x-1).html("Off")
		$(".autobuyer").eq(x-1).css("color", "#b22")
	}
}

function switchHyperESubTab(x) {
	hyperESubTab = x
	for (let i=0;i<6;i++) $(".hyperESubTab").eq(i).css("display", "none")
	$(".hyperESubTab").eq(x-1).css("display", "block")
	if (x==3) { //Clusters tab
		for (let i=0;i<12;i++) {
			if (game.clusterUpgradesBought[i]) {$(".clusterUpgrade").eq(i).css("background-color", "#410")}
			else {$(".clusterUpgrade").eq(i).css("background-color", "#180600")}
		}
		for (let i=0;i<4;i++) {
			if (game.totalClusters.gte(clusterUnlockRequirements[i]) || game.unlocks >= 5) {$(".clusterUnlock").eq(i).css("background-color", "#410")}
			else {$(".clusterUnlock").eq(i).css("background-color", "#180600")}
		}
		if (game.unlocks >= 5) $("#clusterLimit").html(format(game.clusterLimit.mul(game.clusterLimit.add(1)).div(2)))
	}
	else if (x==4) { //Challenges tab
		for (let i=0;i<6;i++) {
			$(".challengeButton").eq(i).css("border", "2px solid #bbb")
			$(".challengesBeaten").eq(i).html(game.challengesBeaten[i])
			if (game.challengesBeaten[i] == 3) {$(".challengeButton").eq(i).css("background-color", "#080")}
			else {$(".challengeButton").eq(i).css("background-color", "")}
		}
		if (game.currentChallenge > 0) $(".challengeButton").eq(game.currentChallenge-1).css("border", "2px solid #0bb")
	}
}

function switchCascadeSubTab(x) {
	cascadeSubTab = x
	for (let i=0;i<6;i++) $(".cascadeSubTab").eq(i).css("display", "none")
	$(".cascadeSubTab").eq(x-1).css("display", "block")
	if (x==2) { //Recent cascades
		let recentCascadesString = ""
		for (let i=0;i<game.recentCascades.length;i++) recentCascadesString = recentCascadesString + numberToTime(game.recentCascades[i][1]) + ", " + format(game.recentCascades[i][0]) + " cascades (" + format(new Decimal(game.recentCascades[i][0]).div(game.recentCascades[i][1]),2) + "/s)<br>"
		$("#recentCascades").html(recentCascadesString)
	}
	else if (x==3) { //Milestones tab
		for (let i=0;i<cascadeMilestoneRequirements.length;i++) {
			if (game.cascadeMilestonesAchieved > i) {
				$(".cascadeMilestone").eq(i).css("background-color", "#060")
				$(".cascadeMilestone").eq(i).css("color", "#0f0")
			}
			else {
				$(".cascadeMilestone").eq(i).css("background-color", "#320")
				$(".cascadeMilestone").eq(i).css("color", "#eb2")
			}
		}
		for (let i=0;i<shadowMilestoneRequirements.length;i++) {
			if (game.shadowMilestonesAchieved > i) {
				$(".shadowMilestone").eq(i).css("background-color", "#030")
				$(".shadowMilestone").eq(i).css("color", "#0b0")
			}
			else {
				$(".shadowMilestone").eq(i).css("background-color", "#111")
				$(".shadowMilestone").eq(i).css("color", "#444")
			}
		}
	}
}

function increaseNumber() {
	if (game.clusterUpgradesBought[3]) {game.number = game.number.add(10)}
	else {game.number = game.number.add(1)}
}

function gainHyperpoints() {
	if (game.hyperpointsToGet.gt(0)) {
		game.hyperpoints = game.hyperpoints.add(game.hyperpointsToGet)
		game.number = new Decimal(0)
		game.hyperpointsToGet = new Decimal(0)
	}
}

function buyMultiplier() {
	if (game.hyperpoints.gte(game.multiplierCost) && game.currentChallenge != 6) {
		game.hyperpoints = game.hyperpoints.sub(game.multiplierCost)
		game.multipliers = game.multipliers.add(1)
		game.multiplierCost = new Decimal(5).pow(game.multipliers).mul(100)
	}
}

function buyMaxMultipliers(x=0) {
	if (game.currentChallenge != 6) {
		let multiplierAmountCanBuy = Decimal.affordGeometricSeries(game.hyperpoints, 100, 5, game.multipliers)
		let multiplierCost = Decimal.sumGeometricSeries(multiplierAmountCanBuy, 100, 5, game.multipliers)
		if (x!==1) game.hyperpoints = game.hyperpoints.sub(multiplierCost)
		game.multipliers = game.multipliers.add(multiplierAmountCanBuy)
		game.multiplierCost = new Decimal(5).pow(game.multipliers).mul(100)
	}
}

function buyFactor(x) {
	if (game.baseShifts >= (x-1) && game.hyperpoints.gte(game.factorCosts[x-1]) && ((game.currentChallenge != 1 && game.currentChallenge != 6) || (x==1 && game.currentChallenge == 1) || (x<5 && game.currentChallenge == 6))) {
		game.hyperpoints = game.hyperpoints.sub(game.factorCosts[x-1])
		game.factors[x-1] = game.factors[x-1].add(1)
		game.factorsBought[x-1] = game.factorsBought[x-1].add(1)
		game.factorCosts[x-1] = new Decimal(10**x).pow(game.factorsBought[x-1]).mul(10**x)
	}
}

function buyMaxFactors(spendHyperpoints = true) {
	let factorAmountCanBuy
	let factorCost
	for (let i=Math.min(game.baseShifts+1,6);i>0;i--) {
		if ((game.currentChallenge != 1 && game.currentChallenge != 6) || (i==1 && game.currentChallenge == 1) || (i<5 && game.currentChallenge == 6)) {
			factorAmountCanBuy = Decimal.affordGeometricSeries(game.hyperpoints, 10**i, 10**i, game.factorsBought[i-1])
			factorCost = Decimal.sumGeometricSeries(factorAmountCanBuy, 10**i, 10**i, game.factorsBought[i-1])
			if (spendHyperpoints) game.hyperpoints = game.hyperpoints.sub(factorCost)
			game.factors[i-1] = game.factors[i-1].add(factorAmountCanBuy)
			game.factorsBought[i-1] = game.factorsBought[i-1].add(factorAmountCanBuy)
			game.factorCosts[i-1] = new Decimal(10**i).pow(game.factorsBought[i-1]).mul(10**i)
		}
	}
}

function baseShift() {
	if (game.currentChallenge != 3 && game.currentBase > 5 && game.hyperpoints.gte(baseShiftCosts[game.baseShifts])) {
		game.factors = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
		if (game.clusterUpgradesBought[6]) game.factors[2] = new Decimal(1)
		game.factorsBought = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
		game.factorCosts = [new Decimal(10), new Decimal(100), new Decimal(1000), new Decimal(10000), new Decimal(100000), new Decimal(1e6)]
		game.autoclickers = new Decimal(0)
		game.multipliers = new Decimal(0)
		game.multiplierCost = new Decimal(100)
		game.hyperpoints = new Decimal(0)
		game.number = new Decimal(0)
		if (game.inBasedverse) {game.currentBase = game.basedverseBase}
		else if (game.currentChallenge > 0 && game.clusterUpgradesBought[7]) {game.currentBase = 8}
		else {game.currentBase--}
		game.baseShifts++
		if (game.currentChallenge == 5) game.vectors = new Decimal(0)
	}
}

function gainClusters() {
	if (game.currentBase <= 5 && game.number.gte(new Decimal(4).pow(new Decimal(8).mul(game.clusterLevel.add(1)).add(9)))) {
		if (!game.confirmations[0] || confirm("Are you sure you want to reset for clusters?")) {
			let enactClusterLimit = true
			if (game.clusterLevel.gt(game.clusterLimit)) enactClusterLimit = false
			game.clusters = game.clusters.add(game.clustersToGet)
			game.totalClusters = game.totalClusters.add(game.clustersToGet)
			game.clusterLevel = game.clusterLevel.add(game.number.add(1).div(4**9).log(4).div(8).floor().sub(game.clusterLevel))
			if (enactClusterLimit && game.clusterLimitEnabled && game.clusterLevel.gt(game.clusterLimit)) {
				game.clusterLevel = game.clusterLimit
				let previousTotalClusters = game.totalClusters
				game.totalClusters = game.clusterLevel.mul(game.clusterLevel.add(1)).div(2)
				game.clusters = game.clusters.sub(previousTotalClusters.sub(game.totalClusters)) //Subtracts the difference in total clusters from your current cluster count
			}
			clusterReset()
			if (game.unlocks < 1) {
				game.unlocks = 1
				$(".hyperESubTabButton").eq(2).css("display", "inline-block")
			}
			if (game.totalClusters.gte(clusterUnlockRequirements[0]) && game.unlocks < 2) {
				game.unlocks = 2
				$(".hyperESubTabButton").eq(3).css("display", "inline-block")
				$(".confirmationButton").eq(2).css("display", "block")
				$(".confirmationButton").eq(3).css("display", "block")
			}
			if (game.totalClusters.gte(clusterUnlockRequirements[1]) && game.unlocks < 3) {
				game.unlocks = 3
				$(".hyperESubTabButton").eq(4).css("display", "inline-block")
				$(".challengeButton").eq(4).css("display", "inline-block")
				$(".challengeButton").eq(5).css("display", "inline-block")
			}
			if (game.totalClusters.gte(clusterUnlockRequirements[2]) && game.unlocks < 4) {
				game.unlocks = 4
				$(".hyperESubTabButton").eq(5).css("display", "inline-block")
				$(".vectorUpgrade").eq(4).css("display", "inline-block")
				$(".vectorUpgrade").eq(5).css("display", "inline-block")
				$(".confirmationButton").eq(4).css("display", "block")
				$(".confirmationButton").eq(5).css("display", "block")
			}
			if (game.totalClusters.gte(clusterUnlockRequirements[3]) && game.unlocks < 5) {
				game.unlocks = 5
				$(".tabButton").eq(1).css("display", "inline-block")
				$(".confirmationButton").eq(6).css("display", "block")
				$("#clusterLimiter").css("display", "block")
			}
		}
	}
}

function clusterReset() {
	game.factors = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
	if (game.clusterUpgradesBought[6]) game.factors[2] = new Decimal(1)
	game.factorsBought = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
	game.factorCosts = [new Decimal(10), new Decimal(100), new Decimal(1000), new Decimal(10000), new Decimal(100000), new Decimal(1e6)]
	game.autoclickers = new Decimal(0)
	game.multipliers = new Decimal(0)
	game.multiplierCost = new Decimal(100)
	game.hyperpoints = new Decimal(0)
	game.number = new Decimal(0)
	if (game.inBasedverse) {game.currentBase = game.basedverseBase}
	else if (game.currentChallenge > 0 && game.clusterUpgradesBought[7]) {game.currentBase = 8}
	else if (game.currentChallenge == 3) {game.currentBase = 20}
	else {game.currentBase = 10}
	game.baseShifts = 0
	game.vectors = new Decimal(0)
	game.vectorGainEnabled = false
	$("#vectorGainButton").html("Enable vector gain")
}

function buyClusterUpgrade(x) {
	if (game.clusters.gte(clusterUpgradeCosts[x-1]) && (x<=3 || game.clusterUpgradesBought[x-4]) && !game.clusterUpgradesBought[x-1] && game.currentChallenge != 6) {
		game.clusters = game.clusters.sub(clusterUpgradeCosts[x-1])
		game.clusterUpgradesBought[x-1] = true
		$(".clusterUpgrade").eq(x-1).css("background-color", "#410")
		if (x==8 && game.currentChallenge == 3 && game.currentBase == 20) game.currentBase = 8 //Sets the base to 8 if in challenge 3
	}
}

function respecClusters() {
	if (!game.confirmations[1] || confirm("Are you sure you want to respec? It will perform a cluster reset!")) {
		if (game.currentChallenge > 0) game.currentChallenge = 0
		clusterReset()
		game.clusters = game.totalClusters
		if (game.postCascadeUpgradesBought[4].eq(1)) {
			for (let i=0;i<12;i++) {
				game.clusterUpgradesBought[i] = true
				$(".clusterUpgrade").eq(i).css("background-color", "#410")
			}
		}
		else {
			for (let i=0;i<12;i++) {
				game.clusterUpgradesBought[i] = false
				$(".clusterUpgrade").eq(i).css("background-color", "#180600")
			}
		}
	}
}

function enterChallenge(x) {
	if (game.currentChallenge == x) {
		exitChallenge()
	}
	else if (!game.confirmations[2] || confirm("Are you sure you want to enter challenge " + x + "? It will perform a cluster reset!")) {
		game.currentChallenge = x
		//Respec clusters if in challenge 6
		if (game.currentChallenge == 6) {
			game.clusters = game.totalClusters
			for (let i=0;i<12;i++) {
				game.clusterUpgradesBought[i] = false
				$(".clusterUpgrade").eq(i).css("background-color", "#180600")
			}
		}
		clusterReset()
		for (let i=0; i<6; i++) $(".challengeButton").eq(i).css("border", "2px solid #bbb")
		$(".challengeButton").eq(x-1).css("border", "2px solid #0bb")
	}
}

function exitChallenge() {
	if (game.currentChallenge == 0) {alert("You aren't in a challenge!")}
	else if (game.number.gte(game.currentChallengeGoal)) {
		game.challengesBeaten[game.currentChallenge-1]++
		if (game.challengesBeaten[game.currentChallenge-1] == 3) $(".challengeButton").eq(game.currentChallenge-1).css("background-color", "#080")
		game.currentChallenge = 0
		clusterReset()
		for (let i=0; i<6; i++) {
			$(".challengeButton").eq(i).css("border", "2px solid #bbb")
			$(".challengeButton").eq(i).css("color", "#bbb")
			$(".challengesBeaten").eq(i).html(game.challengesBeaten[i])
		}
	}
	else if (!game.confirmations[3] || confirm("Are you sure you want to exit your current challenge?")) {
		game.currentChallenge = 0
		clusterReset()
		for (let i=0; i<6; i++) $(".challengeButton").eq(i).css("border", "2px solid #bbb")
	}
}

function enableDisableVectorGain() {
	game.vectorGainEnabled = !game.vectorGainEnabled
	if (game.vectorGainEnabled) {$("#vectorGainButton").html("Disable vector gain")}
	else {$("#vectorGainButton").html("Enable vector gain")}
}

function resetVectors() {
	if (game.currentChallenge != 5) game.vectors = new Decimal(0)
}

function buyVectorUpgrade(x) {
	if (game.vectors.gte(game.vectorUpgradeCosts[x-1]) && (x!=5 || game.vectorUpgradesBought[4].lt(5))) {
		game.vectors = game.vectors.sub(game.vectorUpgradeCosts[x-1])
		game.vectorUpgradesBought[x-1] = game.vectorUpgradesBought[x-1].add(1)
		if (x==5) game.basedverseBase = new Decimal(20).sub(game.vectorUpgradesBought[4])
		if (x==5 && game.vectorUpgradesBought[4].gte(5)) {game.vectorUpgradeCosts[4] = new Decimal(Infinity)}
		else {game.vectorUpgradeCosts[x-1] = new Decimal(vectorUpgradeExponents[x-1]).pow(game.vectorUpgradesBought[x-1]).mul(vectorUpgradeBases[x-1]).round()}
	}
}

function maxVectorUpgrades() {
	for (let i=0;i<4;i++) {
		vectorUpgradeAmountCanBuy = Decimal.affordGeometricSeries(game.vectors, vectorUpgradeBases[i], vectorUpgradeExponents[i], game.vectorUpgradesBought[i])
		vectorUpgradeCost = Decimal.sumGeometricSeries(vectorUpgradeAmountCanBuy, vectorUpgradeBases[i], vectorUpgradeExponents[i], game.vectorUpgradesBought[i])
		game.vectors = game.vectors.sub(vectorUpgradeCost)
		game.vectorUpgradesBought[i] = game.vectorUpgradesBought[i].add(vectorUpgradeAmountCanBuy)
		game.vectorUpgradeCosts[i] = new Decimal(vectorUpgradeExponents[i]).pow(game.vectorUpgradesBought[i]).mul(vectorUpgradeBases[i]).round()
	}
	if (game.unlocks >= 4) {
		vectorUpgradeAmountCanBuy = Decimal.affordGeometricSeries(game.vectors, vectorUpgradeBases[5], vectorUpgradeExponents[5], game.vectorUpgradesBought[5])
		vectorUpgradeCost = Decimal.sumGeometricSeries(vectorUpgradeAmountCanBuy, vectorUpgradeBases[5], vectorUpgradeExponents[5], game.vectorUpgradesBought[5])
		game.vectors = game.vectors.sub(vectorUpgradeCost)
		game.vectorUpgradesBought[5] = game.vectorUpgradesBought[5].add(vectorUpgradeAmountCanBuy)
		game.vectorUpgradeCosts[5] = new Decimal(vectorUpgradeExponents[5]).pow(game.vectorUpgradesBought[5]).mul(vectorUpgradeBases[5]).round()
	}
}

function enterExitBasedverse() {
	if (!game.inBasedverse && (!game.confirmations[4] || confirm("Are you sure you want to enter the basedverse? It will perform a cluster reset!"))) {
		game.inBasedverse = true
		clusterReset()
	}
	else if (game.inBasedverse && (!game.confirmations[4] || confirm("Are you sure you want to exit the basedverse?"))) {
		game.inBasedverse = false
		let effectiveBase = game.basedverseBase.sub(1)
		let basePointsCanGet = game.number.add(1).div(effectiveBase).log(effectiveBase).div(effectiveBase).floor()
		basePointsCanGet = Decimal.max(basePointsCanGet.sub(game.totalBasePoints), 0)
		game.basePoints = game.basePoints.add(basePointsCanGet)
		game.totalBasePoints = game.totalBasePoints.add(basePointsCanGet)
		clusterReset()
	}
}

function spendBasePoints(x) {
	if (x==1 && game.basePoints.gte(1)) {
		game.upBase = game.upBase.add(1)
		game.basePoints = game.basePoints.sub(1)
	}
	else if (x==2) {
		game.upBase = game.upBase.add(game.basePoints)
		game.basePoints = new Decimal(0)
	}
	else if (x==3 && game.basePoints.gte(1)) {
		game.downBase = game.downBase.add(1)
		game.basePoints = game.basePoints.sub(1)
	}
	else if (x==4) {
		game.downBase = game.downBase.add(game.basePoints)
		game.basePoints = new Decimal(0)
	}
	else if (x==5) { //Split points, unused
		game.upBase = game.upBase.add(game.basePoints.div(2).ceil())
		game.basePoints = game.basePoints.sub(game.basePoints.div(2).ceil())
		game.downBase = game.downBase.add(game.basePoints)
		game.basePoints = new Decimal(0)
	}
}

function respecBasePoints() {
	if (!game.confirmations[5] || confirm("Are you sure you want to respec your base points? It will perform a cluster reset!")) {
		game.upBase = new Decimal(0)
		game.downBase = new Decimal(0)
		game.basePoints = game.totalBasePoints
		clusterReset()
	}
}

function cascade() {
	let cBase = new Decimal(game.currentBase-1)
	if (game.number.gte(cBase.pow(cBase.pow(cBase).add(1))) && (!game.confirmations[6] || confirm("Are you sure you want to reset for a cascade?"))) {
		cascadeReset()
		if (game.postCascade) {
			game.cascades = game.cascades.add(game.cascadesToGet)
			game.recentCascades.unshift([game.cascadesToGet, game.timeThisCascade])
			if (game.cascadesToGet.div(game.timeThisCascade).gt(game.bestCascadesPerSecond)) game.bestCascadesPerSecond = game.cascadesToGet.div(game.timeThisCascade)
		}
		else {
			game.cascades = game.cascades.add(1)
			game.recentCascades.unshift([1, game.timeThisCascade])
		}
		if (game.recentCascades.length > 10) game.recentCascades.pop()
		game.timeThisCascade = 0
		if (cascadeSubTab == 2) {
			let recentCascadesString = ""
			for (let i=0;i<game.recentCascades.length;i++) recentCascadesString = recentCascadesString + numberToTime(game.recentCascades[i][1]) + ", " + format(game.recentCascades[i][0]) + " cascades (" + format(new Decimal(game.recentCascades[i][0]).div(game.recentCascades[i][1]),2) + "/s)<br>"
			$("#recentCascades").html(recentCascadesString)
		}
		for (let i=0;i<cascadeMilestoneRequirements.length;i++) {
			if (game.cascadeMilestonesAchieved > i) {
				$(".cascadeMilestone").eq(i).css("background-color", "#060")
				$(".cascadeMilestone").eq(i).css("color", "#0f0")
			}
			else {
				$(".cascadeMilestone").eq(i).css("background-color", "#320")
				$(".cascadeMilestone").eq(i).css("color", "#eb2")
			}
		}
		if (game.cascadeMilestonesAchieved >= 10 && game.unlocks < 6) {
			game.unlocks = 6
			$(".cascadeSubTabButton").eq(3).css("display", "inline-block")
		}
	}
}

function cascadeReset() {
	if (game.bestCascadeClusters.gt(game.clusterLevel)) game.bestCascadeClusters = game.clusterLevel
	for (let i=game.cascadeMilestonesAchieved;i<cascadeMilestoneRequirements.length;i++) {if (game.bestCascadeClusters.lte(cascadeMilestoneRequirements[i])) game.cascadeMilestonesAchieved++}
	if (game.cascadeMilestonesAchieved >= 1) $("#factorAutobuyer").css("display", "block")
	game.clusters = new Decimal(0)
	game.totalClusters = new Decimal(0)
	game.clusterLevel = new Decimal(0)
	if (game.postCascadeUpgradesBought[4].eq(1)) {
		for (let i=0;i<12;i++) {
			game.clusterUpgradesBought[i] = true
			$(".clusterUpgrade").eq(i).css("background-color", "#410")
		}
	}
	else {
		for (let i=0;i<12;i++) {
			game.clusterUpgradesBought[i] = false
			$(".clusterUpgrade").eq(i).css("background-color", "#180600")
		}
	}
	game.currentChallenge = 0
	if (game.cascadeMilestonesAchieved < 7) game.challengesBeaten = [0, 0, 0, 0, 0, 0]
	game.vectors = new Decimal(0)
	game.vectorGainEnabled = false
	$("#vectorGainButton").html("Enable vector gain")
	if (game.cascadeMilestonesAchieved < 8) {
		game.vectorUpgradesBought = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
		game.vectorUpgradeCosts = [new Decimal(200), new Decimal(1000), new Decimal(1000), new Decimal(100000), new Decimal(1e12), new Decimal(1e15)]
		game.basedverseBase = new Decimal(20)
	}
	game.inBasedverse = false
	if (game.cascadeMilestonesAchieved < 4) {
		game.basePoints = new Decimal(0)
		game.totalBasePoints = new Decimal(0)
		game.upBase = new Decimal(0)
		game.downBase = new Decimal(0)
	}
	clusterReset()
}

function numberToTime(x) {
  xCeil = Math.ceil(x)
  result = ""
	if (x<60) return x.toFixed(1) + "s"
  if (xCeil>=3600) result += Math.floor(xCeil/3600) + "h "
  if (Math.floor(xCeil/60)%60 != 0) result += (Math.floor(xCeil/60)%60) + "m "
  if (xCeil%60 != 0) result += Math.floor(xCeil%60) + "s "
  return result
}

function buyLayer(x) {
	if (game.cascades.gte(game.layerCosts[x]) && (x==0 || game.cascadeMilestonesAchieved >= 3)) {
		game.cascades = game.cascades.sub(game.layerCosts[x])
		game.layers[x] = game.layers[x].add(1)
		game.layersBought[x] = game.layersBought[x].add(1)
		if (x==0 || x==1) {game.layerCosts[x] = new Decimal(2).pow(game.layersBought[x]).round()}
		else {game.layerCosts[x] = new Decimal(2**(x-1)).pow(game.layersBought[x]).mul(2**(x-1)).round()}
	}
}

function buyMaxLayers() {
	let layerAmountCanBuy
	let layerCost
	//Layers 2-6
	for (let i=7;i>2;i--) {
		layerAmountCanBuy = Decimal.affordGeometricSeries(game.cascades, 2**(i-2), 2**(i-2), game.layersBought[i-1])
		layerCost = Decimal.sumGeometricSeries(layerAmountCanBuy, 2**(i-2), 2**(i-2), game.layersBought[i-1])
		game.cascades = game.cascades.sub(layerCost)
		game.layers[i-1] = game.layers[i-1].add(layerAmountCanBuy)
		game.layersBought[i-1] = game.layersBought[i-1].add(layerAmountCanBuy)
		game.layerCosts[i-1] = new Decimal(2**(i-2)).pow(game.layersBought[i-1]).mul(2**(i-2)).round()
	}
	//1st layers
	layerAmountCanBuy = Decimal.affordGeometricSeries(game.cascades, 2, 2, game.layersBought[1])
	layerCost = Decimal.sumGeometricSeries(layerAmountCanBuy, 2, 2, game.layersBought[1])
	game.cascades = game.cascades.sub(layerCost)
	game.layers[1] = game.layers[1].add(layerAmountCanBuy)
	game.layersBought[1] = game.layersBought[1].add(layerAmountCanBuy)
	game.layerCosts[1] = new Decimal(2).pow(game.layersBought[1]).round()
	//Power producers
	layerAmountCanBuy = Decimal.affordGeometricSeries(game.cascades, 1, 2, game.layersBought[0])
	layerCost = Decimal.sumGeometricSeries(layerAmountCanBuy, 1, 2, game.layersBought[0])
	game.cascades = game.cascades.sub(layerCost)
	game.layers[0] = game.layers[0].add(layerAmountCanBuy)
	game.layersBought[0] = game.layersBought[0].add(layerAmountCanBuy)
	game.layerCosts[0] = new Decimal(2).pow(game.layersBought[0]).round()
}

function enableDisableClusterLimit() {
	game.clusterLimitEnabled = document.getElementById("clusterLimiterCheckbox").checked
}

function changeClusterLimit() {
	game.clusterLimit = new Decimal(document.getElementById("clusterLimiterSlider").value)
	$("#clusterLimit").html(format(game.clusterLimit.mul(game.clusterLimit.add(1)).div(2)))
}

function surpassCascade() {
	if (!game.postCascade) {
		game.postCascade = true
		$("#surpassCascadeButton").html("You have surpassed cascade!")
		$("#surpassCascadeButton").css("color", "#e72")
	}
}

function buyPostCascadeUpgrade(x) {
	if (x==1 && game.cascades.gte(game.postCascadeUpgrade1Cost)) {
		game.cascades = game.cascades.sub(game.postCascadeUpgrade1Cost)
		game.postCascadeUpgradesBought[0] = game.postCascadeUpgradesBought[0].add(1)
		if (game.postCascadeUpgradesBought[7].eq(1)) {game.postCascadeUpgrade1Cost = new Decimal(5).pow(game.postCascadeUpgradesBought[0]).mul(3).round()} //Post-cascade upgrade 8 effect
		else {game.postCascadeUpgrade1Cost = new Decimal(5).pow(game.postCascadeUpgradesBought[0]).mul(20).round()}
	}
	else if (game.cascades.gte(postCascadeUpgradeCosts[x-2]) && game.postCascadeUpgradesBought[x-1].eq(0)) {
		game.cascades = game.cascades.sub(postCascadeUpgradeCosts[x-2])
		game.postCascadeUpgradesBought[x-1] = new Decimal(1)
		$(".postCascadeUpgrade").eq(x-1).css("background-color", "#060")
		$(".postCascadeUpgrade").eq(x-1).css("color", "#0f0")
		if (x==3) $("#autoBaseShift").css("display", "block")
		else if (x==5) {
			for (let i=0;i<12;i++) {
				game.clusterUpgradesBought[i] = true
				$(".clusterUpgrade").eq(i).css("background-color", "#410")
			}
		}
		else if (x==7 && game.unlocks < 7) {
			game.unlocks = 7
			$(".cascadeSubTabButton").eq(4).css("display", "inline-block")
		}
		else if (x==8) {
			game.postCascadeUpgrade1Cost = new Decimal(5).pow(game.postCascadeUpgradesBought[0]).mul(3).round()
		}
		else if (x==10 && game.unlocks < 8) {
			game.unlocks = 8
			$(".cascadeSubTabButton").eq(5).css("display", "inline-block")
			$("#shadowMilestoneDiv").css("display", "inline-block")
		}
	}
}

function unlockFlavour(x) {
	if (game.flavoursUnlocked == x-1 && game.cascades.gte(flavourUnlockCosts[x-1])) {
		game.cascades = game.cascades.sub(flavourUnlockCosts[x-1])
		game.flavoursUnlocked = x
		$(".flavourUnlockButton").eq(x-1).css("display", "none")
		$(".flavourButton").eq(x-1).css("display", "block")
		$(".flavourText").eq(x-1).css("display", "block")
	}
}

function convertFlavour(x) {
	if (x==1 && game.cascades.mul(game.flavourMultipliers[0]).gte(1000)) {
		game.flavours[0] = game.flavours[0].add(game.cascades.div(1000).mul(game.flavourMultipliers[0]).floor())
		if (game.flavours[0].gt(game.highestFlavours[0])) game.highestFlavours[0] = game.flavours[0]
		game.cascades = new Decimal(0)
	}
	else if (game.flavours[x-2].mul(game.flavourMultipliers[x-1]).gte(1000)) {
		game.flavours[x-1] = game.flavours[x-1].add(game.flavours[x-2].div(1000).mul(game.flavourMultipliers[x-1]).floor())
		if (game.flavours[x-1].gt(game.highestFlavours[x-1])) game.highestFlavours[x-1] = game.flavours[x-1]
		game.flavours[x-2] = new Decimal(0)
	}
}

function buyShadowUpgrade(x) {
	if (game.shadowPower.gte(game.shadowUpgradeCosts[x-1])) {
		game.shadowPower = game.shadowPower.sub(game.shadowUpgradeCosts[x-1])
		game.shadowUpgradesBought[x-1] = game.shadowUpgradesBought[x-1].add(1)
		game.shadowUpgradeCosts[x-1] = new Decimal(shadowUpgradeExponents[x-1]).pow(game.shadowUpgradesBought[x-1]).mul(shadowUpgradeBases[x-1]).round()
		if (x==2) game.shadowCrystalPoint = new Decimal(1e6).mul(new Decimal(0.8).pow(game.shadowUpgradesBought[1].pow(0.8))).ceil()
	}
}

function crystalCheck() {
	if (game.shadowCrystals.gt(game.bestCrystals)) game.bestCrystals = game.shadowCrystals
	for (let i=game.shadowMilestonesAchieved;i<shadowMilestoneRequirements.length;i++) {if (game.bestCrystals.gte(shadowMilestoneRequirements[i])) game.shadowMilestonesAchieved++}
	for (let i=0;i<shadowMilestoneRequirements.length;i++) {
		if (game.shadowMilestonesAchieved > i) {
			$(".shadowMilestone").eq(i).css("background-color", "#030")
			$(".shadowMilestone").eq(i).css("color", "#0b0")
		}
		else {
			$(".shadowMilestone").eq(i).css("background-color", "#111")
			$(".shadowMilestone").eq(i).css("color", "#444")
		}
	}
}

setInterval(crystalCheck, 1000)

function debugSetCrystals(x) {
	game.shadowPower = x.mul(game.shadowCrystalPoint)
	game.shadowCrystals = x
	game.previousCrystals = x
	game.bestCrystals = x
	game.shadowMilestonesAchieved = 0
	crystalCheck()
}

function unlockBloodCrystals() {
	if (game.shadowPower.gte(2.5e7) && game.unlocks < 9) {
		game.shadowPower = game.shadowPower.sub(2.5e7)
		game.unlocks = 9
		$("#bloodCrystalDiv").css("display", "inline-block")
		$(".shadowUnknown").eq(0).css("display", "none")
		$(".shadowUnknown").eq(1).css("display", "none")
		$(".shadowUpgrade").eq(2).css("display", "none")
		$(".bloodUpgrade").eq(0).css("display", "inline-block")
		$(".bloodUpgrade").eq(1).css("display", "inline-block")
		$(".bloodUpgrade").eq(2).css("display", "inline-block")
	}
}

function buyBloodUpgrade(x) {
	if (game.bloodPower.gte(game.bloodUpgradeCosts[x-1])) {
		game.bloodPower = game.bloodPower.sub(game.bloodUpgradeCosts[x-1])
		game.bloodUpgradesBought[x-1] = game.bloodUpgradesBought[x-1].add(1)
		game.bloodUpgradeCosts[x-1] = new Decimal(bloodUpgradeExponents[x-1]).pow(game.bloodUpgradesBought[x-1]).mul(bloodUpgradeBases[x-1]).round()
		if (x==2) game.bloodCrystalPoint = new Decimal(1e6).mul(new Decimal(0.8).pow(game.bloodUpgradesBought[1].pow(0.8))).ceil()
	}
}

function unlockDivineCrystals() {
	if (game.bloodPower.gte(2.5e7) && game.unlocks < 10) {
		game.bloodPower = game.bloodPower.sub(2.5e7)
		game.unlocks = 10
		$("#divineCrystalDiv").css("display", "inline-block")
		$(".shadowUnknown").eq(2).css("display", "none")
		$(".shadowUnknown").eq(3).css("display", "none")
		$(".bloodUpgrade").eq(2).css("display", "none")
		$(".divineUpgrade").eq(0).css("display", "inline-block")
		$(".divineUpgrade").eq(1).css("display", "inline-block")
	}
}

function buyDivineUpgrade(x) {
	if (game.divinePower.gte(game.divineUpgradeCosts[x-1])) {
		game.divinePower = game.divinePower.sub(game.divineUpgradeCosts[x-1])
		game.divineUpgradesBought[x-1] = game.divineUpgradesBought[x-1].add(1)
		game.divineUpgradeCosts[x-1] = new Decimal(divineUpgradeExponents[x-1]).pow(game.divineUpgradesBought[x-1]).mul(divineUpgradeBases[x-1]).round()
		if (x==2) game.divineCrystalPoint = new Decimal(1e6).mul(new Decimal(0.8).pow(game.divineUpgradesBought[1].pow(0.8))).ceil()
	}
}






//Checking achievements
function checkAchievements() {
	let cBase = new Decimal(game.currentBase-1)
	if (game.number.gte(cBase.pow(cBase.add(1)))) game.achievementsAttained[0] = true
	if (game.number.gte(cBase.pow(cBase.pow(2).add(1)))) game.achievementsAttained[1] = true
	if (game.number.gte(cBase.pow(cBase.pow(2).mul(2).add(1)))) game.achievementsAttained[2] = true
	if (game.number.gte(cBase.pow(cBase.pow(3).add(1)))) game.achievementsAttained[3] = true
	if (game.number.gte(cBase.pow(cBase.pow(3).mul(2).add(1)))) game.achievementsAttained[4] = true
	if (game.number.gte(cBase.pow(cBase.pow(cBase).add(1)))) game.achievementsAttained[5] = true
	for (let i=0;i<6;i++) {
		if (game.challengesBeaten[i] > 0) game.achievementsAttained[i+6] = true
		if (game.challengesBeaten[i] == 3) game.achievementsAttained[i+12] = true
		if (game.cascadeMilestonesAchieved >= cascadeMilestoneAchievements[i]) game.achievementsAttained[i+18] = true
		if (i<5 && game.highestFlavours[i].gte(1)) game.achievementsAttained[i+24] = true
	}
	if (game.highestFlavours[4].gte(1000)) game.achievementsAttained[29] = true
}

setInterval(checkAchievements, 1000)

keysPressed = []
window.addEventListener("keydown", (event) => {
  keysPressed[event.keyCode] = true
  keysPressed[event.keyCode] = true
});
window.addEventListener("keyup", (event) => {
  keysPressed[event.keyCode] = false
  keysPressed[event.keyCode] = false
});

function checkHotkeys() {
	if (keysPressed[73]) increaseNumber()
}
setInterval(checkHotkeys, 50)
setInterval(checkHotkeys, 50)

Mousetrap.bind('r', gainHyperpoints);
Mousetrap.bind('m', buyMaxMultipliers, 0);
Mousetrap.bind('f', buyMaxFactors);
Mousetrap.bind('s', baseShift);
Mousetrap.bind('u', gainClusters);
Mousetrap.bind('v', maxVectorUpgrades);
Mousetrap.bind('c', cascade);
Mousetrap.bind('l', buyMaxLayers);