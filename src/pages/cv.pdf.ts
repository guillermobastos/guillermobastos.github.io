import type { APIRoute } from 'astro';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { profile, projects } from '../data/profile';

export const prerender = true;

export const GET: APIRoute = async () => {
  const document = await PDFDocument.create();
  document.setTitle(`${profile.name} - CV`);
  document.setAuthor(profile.name);
  document.setSubject(profile.role);
  document.setLanguage('es-ES');
  const regular = await document.embedFont(StandardFonts.Helvetica);
  const bold = await document.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(.09, .13, .12);
  const muted = rgb(.28, .33, .31);
  const accent = rgb(.46, .23, .1);
  let page = document.addPage([595.28, 841.89]);
  let y = 793;
  const left = 45;
  const width = 505;
  const clean = (text: string) => text.replace(/→/g, '>').replace(/↗/g, '').replace(/—/g, '–');
  function newPage() {
    page = document.addPage([595.28, 841.89]);
    y = 790;
    page.drawText(profile.name, { x: left, y, font: bold, size: 9, color: accent });
    y -= 28;
  }
  function ensure(height: number) { if (y - height < 48) newPage(); }
  function paragraph(text: string, size = 9, weight = false, color = muted, gap = 5) {
    const font = weight ? bold : regular;
    const words = clean(text).split(/\s+/);
    const lines: string[] = [];
    let line = '';
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) > width && line) { lines.push(line); line = word; }
      else line = next;
    }
    if (line) lines.push(line);
    ensure(lines.length * (size * 1.45) + gap);
    for (const content of lines) {
      page.drawText(content, { x: left, y, size, font, color });
      y -= size * 1.45;
    }
    y -= gap;
  }
  function section(title: string) {
    ensure(70);
    y -= 11;
    page.drawLine({ start: { x: left, y: y + 5 }, end: { x: 550, y: y + 5 }, thickness: .6, color: rgb(.75, .82, .77) });
    y -= 14;
    paragraph(title.toUpperCase(), 10, true, accent, 7);
  }

  paragraph(profile.name, 24, true, ink, 3);
  paragraph(profile.role, 11, false, accent, 9);
  paragraph(profile.email, 9, false, ink, 1);
  paragraph(profile.site, 9, false, ink, 1);
  paragraph(profile.linkedin, 8, false, muted, 1);
  paragraph(profile.github, 8, false, muted, 10);
  paragraph(profile.summary, 10, false, ink);
  section('Experiencia');
  for (const job of profile.experience) {
    ensure(95);
    paragraph(job.role, 11, true, ink, 2);
    paragraph([job.company, job.project, job.period, job.contract].filter(Boolean).join(' · '), 8, false, accent, 6);
    paragraph(job.summary);
    for (const achievement of job.achievements) paragraph(`• ${achievement}`, 8.5, false, muted, 3);
    paragraph(`Stack: ${job.stack.join(', ')}`, 8, false, muted, 10);
  }
  section('Proyectos seleccionados');
  for (const project of projects.filter(item => item.cvFeatured)) {
    ensure(125);
    paragraph(project.title, 10, true, ink, 2);
    paragraph(`Enfoque: ${project.approach}`, 8.5, false, muted, 1);
    paragraph(`Resultado: ${project.result}`, 8.5, false, muted, 1);
    paragraph(project.stack.join(' · '), 8, false, accent, 4);
  }
  section('Habilidades');
  for (const group of profile.skills) paragraph(`${group.name}: ${group.items.join(', ')}`, 8.5, false, muted, 3);
  section('Educación');
  for (const item of profile.education) {
    paragraph(`${item.title} | ${item.institution} | ${item.period}`, 9, true, ink, 2);
    paragraph(item.detail, 8.5, false, muted, 4);
  }
  section('Certificaciones');
  for (const cert of profile.certifications) {
    paragraph(`${cert.title} | ${cert.institution} | ${cert.date}`, 9, true, ink, 2);
    if (cert.detail) paragraph(cert.detail, 8.5, false, muted, 6);
  }
  const pages = document.getPages();
  pages.forEach((item, index) => item.drawText(`${profile.shortName} · ${index + 1} / ${pages.length}`, { x: left, y: 27, size: 7, font: regular, color: muted }));
  const bytes = await document.save();
  return new Response(new Uint8Array(bytes).buffer, { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'inline; filename="Guillermo-Bastos-CV.pdf"' } });
};
