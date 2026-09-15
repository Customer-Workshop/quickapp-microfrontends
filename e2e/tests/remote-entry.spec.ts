import { test, expect } from '@playwright/test';
import { REMOTES, remoteOrigin } from '../helpers/remotes';

for (const remote of REMOTES) {
  test(`${remote.name} remoteEntry.js is served`, async ({ request }) => {
    const response = await request.get(
      `${remoteOrigin(remote.port)}/remoteEntry.js`
    );
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('javascript');
  });
}
