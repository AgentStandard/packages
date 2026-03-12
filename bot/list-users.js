const u = require('/root/bot/data/users.json');
Object.entries(u).forEach(([id, v]) => {
  console.log(id, v.profile && v.profile.name, v.profile && v.profile.agentName, 'step:', v.setupStep, 'complete:', v.setupComplete);
});
