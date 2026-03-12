import { execSync } from 'child_process'
import { writeFileSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const REPO_ID = 'R_kgDORdTXTA'
const CATEGORY_ID = 'DIC_kwDORdTXTM4C3nFV' // General

const packages = [
  { slug: 'first-conversation', name: 'First Conversation', desc: 'Your very first AI agent conversation — set up right from day one.' },
  { slug: 'finance-analyst', name: 'Finance Analyst', desc: 'A financial research and analysis agent for investors and professionals.' },
  { slug: 'content-creator', name: 'Content Creator', desc: 'An AI writing and content strategy partner.' },
  { slug: 'dev-productivity', name: 'Dev Productivity', desc: 'A developer productivity agent for coding, debugging, and shipping faster.' },
  { slug: 'ecommerce-ops', name: 'Ecommerce Ops', desc: 'An ecommerce operations agent for store management and growth.' },
]

const results = {}

for (const pkg of packages) {
  const title = `[${pkg.name}] Community Discussion`
  const body = `## ${pkg.name}\n\n${pkg.desc}\n\nUse this thread to:\n- Share how you're using this package\n- Ask questions and get help\n- Suggest improvements\n- Report issues\n\n**Install:** \`clawhub install ${pkg.slug}\`\n\n---\n*This discussion is part of the [AgentStandard](https://agentstandard.ai) package registry.*`

  const mutation = {
    query: `mutation CreateDiscussion($repoId: ID!, $catId: ID!, $title: String!, $body: String!) {
      createDiscussion(input: { repositoryId: $repoId, categoryId: $catId, title: $title, body: $body }) {
        discussion { id url number }
      }
    }`,
    variables: {
      repoId: REPO_ID,
      catId: CATEGORY_ID,
      title,
      body
    }
  }

  const queryFile = join(__dirname, 'tmp-mutation.json')
  writeFileSync(queryFile, JSON.stringify(mutation))

  try {
    const result = execSync(`gh api graphql --input ${queryFile}`, { encoding: 'utf8' })
    const data = JSON.parse(result)
    const url = data.data?.createDiscussion?.discussion?.url
    const number = data.data?.createDiscussion?.discussion?.number
    results[pkg.slug] = { url, number }
    console.log(`✓ ${pkg.slug}: ${url}`)
  } catch (err) {
    console.error(`✗ ${pkg.slug}: ${err.message}`)
    results[pkg.slug] = { error: err.message }
  }

  // Small delay to avoid rate limits
  await new Promise(r => setTimeout(r, 500))
}

// Save results
const outFile = join(__dirname, 'discussion-urls.json')
writeFileSync(outFile, JSON.stringify(results, null, 2))
console.log('\nResults saved to scripts/discussion-urls.json')
console.log(JSON.stringify(results, null, 2))
