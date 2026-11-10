import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { profile } from '../data/profile';

export const prerender = true;
const escape = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);

export const GET: APIRoute = async () => {
  const [firstName, ...surnames] = profile.name.split(' ');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#faf6ee"/>
    <circle cx="1000" cy="280" r="240" fill="#efdfc4"/>
    <g transform="translate(880 170)"><path d="M45 110h150v140H45z" fill="#d4a14f" stroke="#a77535" stroke-width="3"/><path d="M105 110V72h28v38" fill="#949d85"/><path d="M0 20 65 0l55 35L175 0l65 20v62l-53 17-67-28-66 28L0 82Z" fill="#aab09a" stroke="#697b6c" stroke-width="3"/><ellipse cx="57" cy="47" rx="35" ry="29" fill="#365453"/><ellipse cx="184" cy="47" rx="35" ry="29" fill="#365453"/><circle cx="48" cy="38" r="9" fill="#f7f9e9"/><circle cx="175" cy="38" r="9" fill="#f7f9e9"/><text x="79" y="194" fill="#513b23" font-family="monospace" font-size="31">GB</text></g>
    <path d="M70 78h42" stroke="#a74b24" stroke-width="4"/>
    <text x="70" y="135" fill="#805b39" font-family="monospace" font-size="20">DATOS / SOFTWARE / MUNDO REAL</text>
    <g font-family="sans-serif" font-weight="600" font-size="78" letter-spacing="-3"><text x="65" y="270" fill="#30271f">${escape(firstName)}</text><text x="65" y="365" fill="#a74b24">${escape(surnames.join(' '))}.</text></g>
    <text x="70" y="427" fill="#77583b" font-family="sans-serif" font-size="22">Modelos rigurosos. Software que conecta.</text>
    <path d="M70 496h1060" stroke="#cfb38e"/>
    <text x="70" y="546" fill="#62452d" font-family="sans-serif" font-size="23">${escape(profile.role)}</text>
    <text x="70" y="585" fill="#826247" font-family="monospace" font-size="16">guillermobastos.github.io</text>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png).buffer, { headers: { 'Content-Type': 'image/png' } });
};
