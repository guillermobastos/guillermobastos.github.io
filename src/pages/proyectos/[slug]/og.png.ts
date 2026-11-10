import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { caseStudies, type CaseStudy } from '../../../data/caseStudies';
import { profile, projects } from '../../../data/profile';

export const getStaticPaths = (() => caseStudies.map(study => ({ params: { slug: study.slug }, props: { study } }))) satisfies GetStaticPaths;
const escape = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);

export const GET: APIRoute = async ({ props }) => {
  const study = props.study as CaseStudy;
  const project = projects.find(project => project.id === study.slug)!;
  const lines = study.headline.split('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#faf6ee"/>
    <g transform="translate(1010 205)" stroke="${study.accent}" stroke-width="1.5">${[0, 1, 2, 3].map(i => `<path d="M0 ${i * 24}l110 60-110 60-110-60z" fill="${study.accent}" fill-opacity=".05"/>`).join('')}</g>
    <path d="M65 65h40" stroke="${study.accent}" stroke-width="4"/>
    <text x="65" y="130" fill="${study.accent}" font-family="sans-serif" font-size="26">${escape(project.title)}</text>
    ${lines.map((line, i) => `<text x="60" y="${240 + i * 76}" fill="${i ? study.accent : '#30271f'}" font-family="sans-serif" font-size="57" font-weight="600" letter-spacing="-2">${escape(line)}</text>`).join('')}
    <path d="M65 375h1070" stroke="#cfb38e"/>
    ${study.metrics.slice(0, 3).map((metric, i) => `<text x="${65 + i * 365}" y="450" fill="${study.accent}" font-family="sans-serif" font-size="42">${escape(metric.value)}</text><text x="${65 + i * 365}" y="485" fill="#6c5138" font-family="sans-serif" font-size="18">${escape(metric.label)}</text>`).join('')}
    <text x="65" y="579" fill="#826247" font-family="sans-serif" font-size="20">${escape(profile.shortName)} / Casos de estudio</text>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png).buffer, { headers: { 'Content-Type': 'image/png' } });
};
