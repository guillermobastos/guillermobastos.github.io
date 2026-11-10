import type { APIRoute } from 'astro';
import { profile } from '../data/profile';
import { caseStudies } from '../data/caseStudies';

export const GET: APIRoute = () => {
  const urls = [profile.site + '/', ...caseStudies.map(study => `${profile.site}/proyectos/${study.slug}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${url}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
