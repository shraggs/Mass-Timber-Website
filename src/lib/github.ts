const REPO_OWNER = 'shraggs';
const REPO_NAME = 'Mass-Timber-Website';
const BRANCH = 'master';
const BASE_PATH = 'iw-mass-timber';

function getHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN not configured');
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
}

export async function readFile(filePath: string): Promise<{ content: string; sha: string }> {
  const fullPath = `${BASE_PATH}/${filePath}`;
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${fullPath}?ref=${BRANCH}`,
    { headers: getHeaders(), cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error(`Failed to read ${fullPath}: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

export async function writeFile(filePath: string, content: string, message: string): Promise<void> {
  const fullPath = `${BASE_PATH}/${filePath}`;

  // Get current file SHA (needed for updates)
  let sha: string | undefined;
  try {
    const current = await readFile(filePath);
    sha = current.sha;
  } catch {
    // File doesn't exist yet — that's fine for new files
  }

  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${fullPath}`,
    { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to write ${fullPath}: ${res.status} ${errorText}`);
  }
}

export async function uploadImage(filePath: string, base64Data: string, message: string): Promise<string> {
  const fullPath = `${BASE_PATH}/public/${filePath}`;

  // Check if file already exists
  let sha: string | undefined;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${fullPath}?ref=${BRANCH}`,
      { headers: getHeaders(), cache: 'no-store' }
    );
    if (res.ok) {
      const data = await res.json();
      sha = data.sha;
    }
  } catch {
    // File doesn't exist
  }

  const body: Record<string, unknown> = {
    message,
    content: base64Data, // Already base64 encoded from the client
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${fullPath}`,
    { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to upload image ${fullPath}: ${res.status} ${errorText}`);
  }

  return `/${filePath}`;
}
