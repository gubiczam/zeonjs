export type Segment =
  | { type: 'static'; value: string }
  | { type: 'param'; name: string }
  | { type: 'catchall'; name: string };

export function parsePath(p: string): Segment[] {
  return p.split('/').filter(Boolean).map(seg => {
    if (seg.startsWith('[...') && seg.endsWith(']')) return { type: 'catchall', name: seg.slice(4, -1) };
    if (seg.startsWith('[') && seg.endsWith(']')) return { type: 'param', name: seg.slice(1, -1) };
    return { type: 'static', value: seg };
  });
}

export function matchSegments(segments: Segment[], urlPath: string) {
  const parts = urlPath.split('/').filter(Boolean);
  const params: Record<string,string> = {};
  let i = 0, j = 0;
  while (i < segments.length && j < parts.length) {
    const s = segments[i], part = parts[j];
    if (s.type === 'static') { if (s.value !== part) return null; i++; j++; continue; }
    if (s.type === 'param')  { params[s.name] = decodeURIComponent(part); i++; j++; continue; }
    if (s.type === 'catchall') { params[s.name] = parts.slice(j).map(decodeURIComponent).join('/'); i++; j = parts.length; break; }
  }
  if (i !== segments.length || j !== parts.length) return null;
  return params;
}
