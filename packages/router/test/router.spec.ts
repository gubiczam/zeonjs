import { describe, it, expect } from 'vitest';
import { Router } from '../src/router';

describe('params + 404', () => {
  const r = new Router(
    [
      { path: '/', component: 'Home' },
      { path: '/users/[id]', component: 'User', loader: ({ params }) => ({ id: params.id }) },
      { path: '/files/[...rest]', component: 'Files' }
    ],
    { path: '/404', component: 'NotFound' }
  );

  it('matches dynamic param', async () => {
const res = await r.resolve('http://x/users/42');
const data = res.data as { id: string }; 
expect(data.id).toBe('42');

  });

  it('matches catchall', async () => {
    const res = await r.resolve('http://x/files/a/b/c');
    expect(res.status).toBe(200);
    expect(res.params.rest).toBe('a/b/c');
  });

  it('404 fallback', async () => {
    const res = await r.resolve('http://x/unknown');
    expect(res.status).toBe(404);
  });
});
