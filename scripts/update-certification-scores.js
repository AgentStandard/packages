#!/usr/bin/env node
/**
 * Updates certification scores in all agentstandard.json manifests
 * based on final Forge full-test results
 */

const fs = require('fs');
const path = require('path');
const PACKAGES_DIR = path.join(__dirname, '..', 'packages');

const scores = {
  'agent-transparency':  { status: 'certified',    score: 75 },
  'bid-auditor':         { status: 'certified',    score: 81 },
  'book-brain':          { status: 'certified',    score: 79 },
  'career-pivot':        { status: 'certified',    score: 85 },
  'content-creator':     { status: 'conditional',  score: 62 }, // new system_prompt written — re-certify
  'content-studio':      { status: 'certified',    score: 80 },
  'daily-journal':       { status: 'conditional',  score: 63 }, // crisis protocol added — re-certify
  'data-analyst':        { status: 'certified',    score: 83 },
  'deep-researcher':     { status: 'certified',    score: 84 },
  'dev-productivity':    { status: 'conditional',  score: 62 }, // new system_prompt written
  'dream-audit':         { status: 'featured',     score: 91 },
  'dream-decoder':       { status: 'certified',    score: 83 },
  'ecommerce-ops':       { status: 'conditional',  score: 62 }, // new system_prompt written
  'ecommerce-pro':       { status: 'certified',    score: 81 },
  'finance-analyst':     { status: 'conditional',  score: 65 }, // new system_prompt written
  'first-conversation':  { status: 'conditional',  score: 60 }, // full rebuild done
  'fitness-log':         { status: 'certified',    score: 76 },
  'freelancer-guard':    { status: 'certified',    score: 79 },
  'gift-curator':        { status: 'certified',    score: 78 },
  'gp-prep':             { status: 'conditional',  score: 72 }, // fixes applied
  'habit-builder':       { status: 'certified',    score: 80 },
  'home-stack':          { status: 'certified',    score: 75 },
  'idea-validator':      { status: 'certified',    score: 85 },
  'interview-coach':     { status: 'certified',    score: 87 },
  'job-hunt-agent':      { status: 'certified',    score: 78 },
  'launch-stack':        { status: 'certified',    score: 83 },
  'manager-coach':       { status: 'certified',    score: 86 },
  'memory-architect':    { status: 'certified',    score: 76 },
  'negotiation-coach':   { status: 'certified',    score: 88 },
  'network-pulse':       { status: 'certified',    score: 78 },
  'nexus':               { status: 'certified',    score: 83 },
  'ops-chief':           { status: 'certified',    score: 83 },
  'package-finder':      { status: 'conditional',  score: 67 }, // stale data fixed
  'pantry-chef':         { status: 'conditional',  score: 67 }, // safety fixes applied
  'read-it-later':       { status: 'certified',    score: 74 },
  'relationship-coach':  { status: 'certified',    score: 87 },
  'relationship-graph':  { status: 'certified',    score: 75 },
  'retiree-navigator':   { status: 'certified',    score: 85 },
  'salary-scout':        { status: 'conditional',  score: 72 }, // platform caveat added
  'skill-tracker':       { status: 'certified',    score: 74 },
  'sleep-coach':         { status: 'conditional',  score: 66 }, // clinical fixes applied
  'supplement-stack':    { status: 'conditional',  score: 68 }, // full rewrite — was rejected, now conditional
  'taste-map':           { status: 'certified',    score: 79 },
  'travel-planner':      { status: 'certified',    score: 78 },
  'vibe-coder':          { status: 'certified',    score: 80 },
  'week-in-review':      { status: 'certified',    score: 79 },
  'wine-log':            { status: 'featured',     score: 89 },
};

let updated = 0;

Object.entries(scores).forEach(([slug, cert]) => {
  const pkgPath = path.join(PACKAGES_DIR, slug, 'agentstandard.json');
  if (!fs.existsSync(pkgPath)) { console.log(`SKIP: ${slug}`); return; }
  
  const data = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  data.certification = {
    status: cert.status,
    score: cert.score,
    forge_date: '2026-03-12',
    forge_model: 'claude-sonnet-4-6',
    arbiter_status: 'pending',
    report: `certification/reports/${slug}-forge-FULL-2026-03-12.md`
  };
  
  fs.writeFileSync(pkgPath, JSON.stringify(data, null, 2));
  updated++;
});

// Summary
const certified = Object.values(scores).filter(s => s.status === 'certified').length;
const featured = Object.values(scores).filter(s => s.status === 'featured').length;
const conditional = Object.values(scores).filter(s => s.status === 'conditional').length;

console.log(`Updated ${updated} manifests`);
console.log(`Featured: ${featured} | Certified: ${certified} | Conditional: ${conditional}`);
