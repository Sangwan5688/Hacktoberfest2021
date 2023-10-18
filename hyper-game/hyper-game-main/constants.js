const factorNames = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"]
const baseShiftCosts = [50000, 500000, 2e7, 1e9, 5e10, Infinity]
const clusterUpgradeCosts = [1,1,2,4,3,12,40,24,15,50,175,25]
const clusterUnlockRequirements = [10,55,153,496]
const clusterUpgradeNames = [
"Bought factors multiply that factor's production<br>1 cluster",
"Multiplier effect is squared<br>1 cluster",
"Automatically buy multipliers at no cost<br>2 clusters",
"Multiply manual number incrementing by 10<br>4 clusters",
"Unspent clusters multiply factor production<br>3 clusters",
"Base shifts increase factor production<br>12 clusters",
"Start every base shift with 1 3rd factor<br>40 clusters",
"Base is always 8 in challenges<br>24 clusters",
"Gain 100 hyper-points per second<br>15 clusters",
"Vectors increase vector gain<br>50 clusters",
"Total base points increase vector gain<br>175 clusters",
"Total challenges completed boosts autoclicker speed<br>25 clusters"
]
const challengeInfos = [
"Factors beyond the 1st cannot be bought",
"Each base shift divides factor production by 10",
"Base is always 20 and you cannot base shift",
"Each bought cluster upgrade divides autoclicker speed by 10,000",
"Vector gain is always enabled (capped at 10k/s), but resets on base shifts",
"You cannot buy cluster upgrades, multipliers or 5th/6th factors"
]
const challengeGoals = [ //This is a mess
["1Ex<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>2", "1Ex<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>x<span style='color: #77d'>#</span>x<span style='color: #77d'>#</span>x<span style='color: #77d'>#</span>2", "1Ex<span style='color: #d7d'>###</span>x<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>2", Infinity],
["1Ex<span style='color: #a7d'>##</span>x<span style='color: #77d'>#</span>x<span style='color: #77d'>#</span>2", "1Ex<span style='color: #d7d'>###</span>x<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>2", "1Ex<span style='color: #d7d'>###</span>x<span style='color: #d7d'>###</span>x<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>2", Infinity],
["1Ex<span style='color: #a7d'>##</span>x<span style='color: #77d'>#</span>x<span style='color: #77d'>#</span>x<span style='color: #77d'>#</span>2", "1Ex<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>x", "1Ex<span style='color: #d7d'>###</span>x<span style='color: #a7d'>##</span>2", Infinity],
["1Ex<span style='color: #d77'>####</span>2", "1Ex<span style='color: #d77'>####</span>x<span style='color: #d7d'>###</span>x<span style='color: #a7d'>##</span>2", "1Ex<span style='color: #d77'>####</span>x<span style='color: #d77'>####</span>2", Infinity],
["1Ex<span style='color: #d77'>####</span>x<span style='color: #d7d'>###</span>2", "1Ex<span style='color: #d77'>####</span>x<span style='color: #d7d'>###</span>x<span style='color: #d7d'>###</span>x<span style='color: #d7d'>###</span>2", "1Ex<span style='color: #d77'>####</span>x<span style='color: #d77'>####</span>x<span style='color: #a7d'>##</span>x<span style='color: #a7d'>##</span>2", Infinity],
["1Ex<span style='color: #d77'>####</span>2", "1Ex<span style='color: #d77'>####</span>x<span style='color: #d7d'>###</span>x<span style='color: #a7d'>##</span>2", "1Ex<span style='color: #d77'>####</span>x<span style='color: #d7d'>###</span>x<span style='color: #d7d'>###</span>2", Infinity]
]
const challengeGoalsNoColour = [
["1Ex##x##2", "1Ex##x##x#x#x#2", "1Ex###x##x##2", Infinity],
["1Ex##x#x#2", "1Ex###x##x##x##2", "1Ex###x###x##x##2", Infinity],
["1Ex##x#x#x#2", "1Ex##x##x##x##x##x", "1Ex###x##2", Infinity],
["1Ex####2", "1Ex####x###x##2", "1Ex####x####2", Infinity],
["1Ex####x###2", "1Ex####x###x###x###2", "1Ex####x####x##x##2", Infinity],
["1Ex####2", "1Ex####x###x##2", "1Ex####x###x###2", Infinity]
]
const vectorUpgradeBases = [200, 1000, 1000, 100000, 1e12, 1e15]
const vectorUpgradeExponents = [10, 5, 4, 10, 100, 20]
const cascadeMilestoneRequirements = [31,29,27,25,23,21,18,15,6,0]
const cascadeMilestoneAchievements = [1,2,4,6,8,10]
const postCascadeUpgradeCosts = [30,50,120,300,750,1000, 5e6, 2.5e8, 1e12]
const flavourUnlockCosts = [500,100000,1e6,1e8,1e10]
const shadowUpgradeBases = [100000, 5e6]
const shadowUpgradeExponents = [10, 4]
const shadowMilestoneRequirements = [1,3,10,50,200,1500,15000,100000,1e7,1e15]
const bloodUpgradeBases = [100000, 5e6]
const bloodUpgradeExponents = [10, 4]
const divineUpgradeBases = [100000, 5e6]
const divineUpgradeExponents = [10, 4]

const achievementNames = [
"Achieve 1Ex##2",
"Achieve 1Ex###2",
"Achieve 1Ex###x###2",
"Achieve 1Ex####2",
"Achieve 1Ex####x####2",
"Achieve 1Ex#^#x",
"Beat challenge 1 once",
"Beat challenge 2 once",
"Beat challenge 3 once",
"Beat challenge 4 once",
"Beat challenge 5 once",
"Beat challenge 6 once",
"Beat challenge 1 3 times",
"Beat challenge 2 3 times",
"Beat challenge 3 3 times",
"Beat challenge 4 3 times",
"Beat challenge 5 3 times",
"Beat challenge 6 3 times",
"Achieve 1 cascade milestone",
"Achieve 2 cascade milestones",
"Achieve 4 cascade milestones",
"Achieve 6 cascade milestones",
"Achieve 8 cascade milestones",
"Achieve 10 cascade milestones",
"Have 1 alpha-flavour",
"Have 1 beta-flavour",
"Have 1 gamma-flavour",
"Have 1 delta-flavour",
"Have 1 epsilon-flavour",
"Have 1,000 epsilon-flavour"
]
const achievementRowUnlockLevels = [0,0,0,5,7]