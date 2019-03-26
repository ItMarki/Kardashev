var gameState = {
  resources : {
    energy : 0,
	bits : 0,
	wood : 0,
  },
  units : {
	energy : "J",
	bits : "b",
	wood : "g"
  },
  resourcenames : {
	energy : "能量",
	bits : "資訊",
	wood : "木材"
  },
  allocated : {
	land : {
	  woodland : 0,
	  farmland : 0
	}
  },
  year : 1,
  activities : {
	hunt : {
	  energy : 1,
	},
	observe : {
	  bits: 1.0e4,
	},
	fish : {
	  energy : 20
	},
	farming : {
	  energy : 400
	},
	stargaze : {
	  bits: 1.0e7
	},
	gather : {
	  wood: 1e3
	}
  },
  research_tree : {
	tool : {
	  name : '工具',
	  desc : '+ 25 % 狩獵力量',
	  cost : {bits: 1e6 },
	  onResearch : function() {
		gameState.buildings['hunter'].genmod.energy *= 1.25;
		unlock_upgrade('tools');
	  },
	  prereq_of : ['fire', 'spear', 'herbs'],
	  prereq : 0,
	},
	herbs : {
	  name : '香草',
	  desc : '+ 50 % 巫師知識',
	  cost : {bits: 1e6 },
	  onResearch : function() {
		gameState.buildings['shaman'].genmod.bits*= 1.5;
	  },
	  prereq_of : ['pigments'],
	  prereq : 0
	},
	pigments : {
	  name : '顏料',
	  desc : '+ 50 % 巫師知識',
	  cost : {bits : 1.5e6 },
	  onResearch : function() {
		gameState.buildings['shaman'].genmod.bits*= 1.5;
	  },
	  prereq_of : ['petroglyphs'],
	  prereq : 0
	},
	petroglyphs : {
	  name : '岩刻',
	  desc : '+ 100 % 巫師知識',
	  cost : {bits : 2.5e6 },
	  onResearch : function() {
		gameState.buildings['shaman'].genmod.bits *= 2;
	  },
	  prereq_of : ['animalspirit'],
	  prereq : 0
	},
	animalspirit : {
	  name : '動物靈魂',
	  desc : '- 25 % 巫師能量消費',
	  cost : {bits : 5.0e6},
	  onResearch : function() {
		gameState.buildings['shaman'].genmod.energy *= .75;
	  },
	  prereq_of : ['rituals'],
	  prereq : 0
	},
	rituals : {
	  name : '儀式',
	  desc  : '+ 100 % 狩獵者知識',
	  cost : {bits : 1.0e7},
	  onResearch : function() {
		gameState.buildings['hunter'].genmod.bits *= 1.1;
	  },
	  prereq_of : ['religion'],
	  prereq : 0
	},
	fire : {
	  name : '火',
	  desc : '+ 25 % 狩獵力量',
	  cost : {bits: 1.5e7},
	  onResearch : function() {
		gameState.buildings['hunter'].genmod.energy *= 1.25;
	  },
	  prereq_of : ['farm', 'rituals'],
	  prereq : 0,
	},
	spear : {
	  name : '長槍',
	  desc : '+ 50 % 狩獵力量，解鎖投槍器',
	  cost : {bits: 2.0e7},
	  onResearch : function() {
		gameState.buildings['hunter'].genmod.energy *= 1.5;
		unlock_upgrade('atlatl');
	  },
	  prereq_of : ['bow', 'fishing'],
	  prereq : 0,
	},
	fishing : {
	  name : '釣魚',
	  desc : '解鎖漁民',
	  cost : {bits: 1.0e8},
	  onResearch : function () {
		unlock_activity('fish');
		unlock_building("fisher");
		unlock_upgrade('harpoons');
	  },
	  prereq_of : ['boat'],
	  prereq : 0,
	},
	boat : {
	  name : '船',
	  desc : '+ 50 % 釣魚力量',
	  cost : { bits: 1.2e8},
	  onResearch : function () {
		gameState.buildings['fisher'].genmod.energy *= 1.5;
	  },
	  prereq_of : [],
	  prereq : 0,
	},
	bow : {
	  name : '弓',
	  desc : '+ 100 % 狩獵力量',
	  cost : { bits: 1.0e8},
	  onResearch : function() {
		gameState.buildings['hunter'].genmod.energy *= 2.;
	  },
	  prereq_of : ['farm'],
	  prereq : 0,
	},
	farm : {
	  name : '種植',
	  desc : '解鎖農場',
	  cost : { bits: 5.0e8},
	  onResearch : function() {
		unlock_building("farm");
		unlock_activity('farming');
		unlock_upgrade('granary');
	  },
	  prereq_of : ['husbandry', 'plough', 'mills', 'astrology', 'writing'],
	  prereq : 0,
	},
	astrology : {
	  name : '占星術',
	  desc : '寫星相，解鎖觀星',
	  cost : { bits: 5.0e8},
	  onResearch : function() {
		unlock_activity('stargaze');
	  },
	  prereq_of : ['religion'],
	  prereq : 0,
	},
	religion : {
	  name : '宗教',
	  desc : '看看！神聖的文字！解鎖神殿',
	  cost : { bits : 6.0e8},
	  onResearch : function() {
		unlock_building("temple");
	  },
	  prereq_of : ['theology'],
	  prereq : 0
	},
	writing : {
	  name : '書寫',
	  desc : '+ 100 % 神殿知識， - 50 % 神殿能量消費，解鎖書本',
	  cost : { bits : 5e8 },
	  onResearch : function() {
		gameState.buildings['temple'].genmod.bits *= 2;
		gameState.buildings['temple'].genmod.energy *= .5;
		unlock_upgrade('books');
	  },
	  prereq_of : ['theology'],
	  prereq : 0,
	},
	theology : {
	  name : '神學',
	  desc : '解鎖僧院',
	  cost : { bits : 7.0e8},
	  onResearch : function() {
		unlock_building("monastery");
	  },
	  prereq_of : ['university', 'astronomy'],
	  prereq : 0
	},
	university : {
	  name : '大學',
	  desc : '解鎖大學',
	  cost : { bits : 2.0e9},
	  onResearch : function() {
		unlock_building("university");
	  },
	  prereq_of : ['scientificmethod'],
	  prereq : 0
	},
	scientificmethod : {
	  name : '科學方法',
	  desc : '大學知識 x10',
	  cost : {bits : 1e10},
	  onResearch : function() {
		gameState.buildings['university'].genmod.bits *= 10;
	  },
	  prereq_of : ['chemistry'],
	  prereq : 0
	},
	plough : {
	  name : '犁',
	  desc : '+ 50 % 種植力量',
	  cost : { energy: 0, bits: 5.5e8},
	  onResearch : function() {
		gameState.buildings['farm'].genmod.energy*= 1.5;
	  },
	  prereq : 0,
	  prereq_of : []
	},
	husbandry : {
	  name : '養殖',
	  desc : '+ 150 % 種植力量',
	  cost : { energy: 0, bits: 6.0e8},
	  onResearch : function() {
		gameState.buildings['farm'].genmod.energy*= 2.5;
	  },
	  prereq : 0,
	  prereq_of : ['yoke', 'horses', 'oxen']
	},
	yoke : {
	  name : '軛',
	  desc : '+ 50 % 種植力量',
	  cost : { energy: 0, bits : 6.5e8},
	  onResearch : function() {
		gameState.buildings['farm'].genmod.energy*= 1.5;
	  },
	  prereq : 0,
	  prereq_of : []
	},
	mills : {
	  name : '碾磨廠',
	  desc : '解鎖碾磨廠， + 100 % 種植力量',
	  cost : { energy: 0, bits : 7.0e8},
	  onResearch : function() {
		gameState.buildings['farm'].genmod.energy *= 2;
		unlock_building('mill');
	  },
	  prereq : 0,
	  prereq_of : ['metallurgy']
	},
	horses : {
	  name : '馬',
	  desc : '+ 50 % 碾磨廠力量',
	  cost : { energy: 0, bits : 7.5e8},
	  onResearch : function()  {
		gameState.buildings['mill'].genmod.energy *= 1.5;
	  },
	  prereq : 0,
	  prereq_of : []
	},
	oxen : {
	  name : '公牛',
	  desc : '+ 100 % 碾磨廠力量， + 500 % 種植力量',
	  cost : { energy: 0, bits : 8.0e8},
	  onResearch : function() {
		gameState.buildings['mill'].genmod.energy *= 2;
		gameState.buildings['farm'].genmod.energy *= 6;
	  },
	  prereq : 0,
	  prereq_of : []
	},
	astronomy : {
	  name : '天文學',
	  desc : '恆星與行星的動作的理解',
	  cost : {bits : 9e9},
	  onResearch : function() {
	  },
	  prereq : 0,
	  prereq_of : []
	},
	metallurgy : {
	  name : '治金學',
	  desc : '解鎖鐵匠',
	  cost : { energy: 0, bits : 8.5e9},
	  onResearch : function() {
		unlock_upgrade('smiths');
	  },
	  prereq : 0,
	  prereq_of : ['alchemy']
	},
	alchemy : {
	  name : '鍊金術',
	  desc : '嘗試將鉛變成金',
	  cost : {bits : 9e9},
	  onResearch : function() {
	  },
	  prereq : 0,
	  prereq_of : ['chemistry']
	},
	chemistry : {
	  name : '化學',
	  desc : '對於物質的更好知識',
	  cost : {bits : 1e10},
	  onResearch : function() {

	  },
	  prereq : 0,
	  prereq_of : ['steammachine']
	},
	steammachine : {
	  name : '蒸汽機',
	  desc : '解鎖蒸汽機',
	  cost : { energy: 0, bits: 5.0e10},
	  onResearch : function() {
		unlock_building('steam');
	  },
	  prereq : 0,
	  prereq_of : ['electricity', 'industry']
	},
	industry : {
	  name : '工業',
	  desc : '+ 200 % 整齊力量，解鎖工廠升級',
	  cost : { energy: 0, bits: 6.5e10},
	  onResearch : function() {
		unlock_upgrade('factory');
	  },
	  prereq : 0,
	  prereq_of : ['electricity', 'mining']
	},
	electricity : {
	  name : '電力',
	  desc : '+ 100 % 蒸汽力量',
	  cost : { energy: 0, bits: 9e10} ,
	  onResearch : function() {
		unlock_building('coal_plant');
	  },
	  prereq : 0,
	  prereq_of : []
	},
	mining : {
	  name : '採礦',
	  desc : '+ 100 % 煤炭發電廠力量，解鎖礦場升級',
	  cost : {energy: 0, bits: 7e10},
	  onResearch : function() {
		unlock_upgrade('mines');
	  },
	  prereq : 0,
	  prereq_of : []
	}
  },
  upgrades : {
	tools : {
	  name : '工具',
	  desc : '+ 10 % 手動狩獵力量',
	  cost : {energy: 500, bits: 0},
	  onUpgrade : function() {
		gameState.activities['hunt'].genmod.energy *= 1.1;
	  },
	  alpha : 1.2
	},
	atlatl : {
	  name : '投槍器',
	  desc : '+ 5 % 狩獵力量',
	  cost : { energy: 100, bits: 0},
	  onUpgrade : function () {
		gameState.buildings['hunter'].genmod.energy*= 1.05;
	  },
	  alpha : 1.5,
	},
	harpoons : {
	  name : '魚叉',
	  desc : '+ 15 % 手動狩獵力量',
	  cost : {energy: 6000, bits: 0},
	  onUpgrade : function() {
		gameState.activities['fish'].genmod.energy *= 1.15;
	  },
	  alpha : 1.5
	},
	granary : {
	  name : '穀倉',
	  desc : '+ 20 % 手動狩獵力量',
	  cost : {energy: 60000, bits: 0},
	  onUpgrade : function() {
		gameState.activities['farming'].genmod.energy *= 1.20;
	  },
	  alpha : 1.5
	},
	smiths : {
	  name : '鐵匠',
	  desc : '+ 5 % 碾粉機力量',
	  cost : {energy: 70000, bits: 0},
	  onUpgrade : function() {
		gameState.buildings['mill'].genmod.energy *= 1.05;
	  },
	  alpha : 1.15
	},
	books : {
	  name : '書本',
	  desc : '+ 5 % 僧院知識',
	  cost : {energy : 80000},
	  onUpgrade : function() {
		gameState.buildings['monastery'].genmod.bits *= 1.05;
	  },
	  alpha : 1.15
	},
	factory : {
	  name : '工廠',
	  desc : '+ 5 % 蒸汽力量',
	  cost : {energy: 10000000},
	  onUpgrade : function() {
		gameState.buildings['steam'].genmod.energy *= 1.05;
	  },
	  alpha : 1.15
	},
	mines : {
	  name : '礦場',
	  desc : '+ 5 % 煤炭發電廠力量',
	  cost : {energy: 10000000},
	  onUpgrade : function() {
		gameState.buildings['coal_plant'].genmod.energy *= 1.05;
	  },
	  alpha : 1.15
	}
  },
  buildings : {
	hunter : {
	  name : '狩獵者',
	  cost : {energy: 5},
	  alpha : 1.04,
	  gen : {
		energy : 1,
		bits : 1
	  },
	},
	shaman : {
	  name : '巫師',
	  cost : {energy : 100},
	  alpha : 1.05,
	  gen : {
		energy : -10,
		bits : 2e4
	  },
	},
	fisher : {
	  name : '漁民',
	  cost : {energy: 750},
	  alpha : 1.05,
	  gen : {
		energy: 5,
		bits : 5
	  }
	},
	farm : {
	  name : '農場',
	  cost : {energy: 15000},
	  alpha : 1.07,
	  gen : {
		energy : 1000
	  }
	},
	temple : {
	  name : '神殿',
	  cost : {energy: 1e5},
	  alpha : 1.06,
	  gen : {
		energy : -200,
		bits : 1e6
	  }
	},
	monastery : {
	  name : '僧院',
	  cost : {energy: 5e5},
	  alpha : 1.06,
	  gen : {
		energy : -1000,
		bits : 1e5
	  }
	},
	university : {
	  name : '大學',
	  cost : {energy: 1e6},
	  alpha : 1.1,
	  gen : {
		energy : -5000,
		bits : 100000
	  }
	},
	mill : {
	  name : '碾粉機',
	  cost : {energy: 50000},
	  alpha : 1.07,
	  gen : {
		energy : 5000
	  }
	},
	steam : {
	  name : '蒸汽機',
	  cost :  {energy: 1000000},
	  alpha : 1.05,
	  gen : {
		energy : 100000
	  }
	},
	coal_plant : {
	  name : '煤炭發電廠',
	  cost :  {energy: 1000000000},
	  alpha : 1.05,
	  gen : {
		energy : 10000000
	  }
	},
	fission_plant : {
	  name : '核裂變發電廠',
	  cost :  {energy: 5000000000},
	  alpha : 1.05,
	  gen : {
		energy : 50000000
	  }
	},
	fusion_plant : {
	  name : '核聚變發電廠',
	  cost :  {energy: 10000000000},
	  alpha : 1.05,
	  gen : {
		energy : 500000000
	  }
	}
  }
};


