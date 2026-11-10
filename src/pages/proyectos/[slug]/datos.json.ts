import type { APIRoute, GetStaticPaths } from 'astro';
import { caseStudies, hidroValidation, sourceUrl, type CaseStudy } from '../../../data/caseStudies';

export const getStaticPaths = (() => caseStudies.map(study => ({ params: { slug: study.slug }, props: { study } }))) satisfies GetStaticPaths;
export const GET: APIRoute = ({ props }) => {
  const study = props.study as CaseStudy;
  return new Response(JSON.stringify({
    project: study.slug,
    repository: `https://github.com/guillermobastos/${study.slug}`,
    revision: study.revision,
    reviewedAt: study.reviewedAt,
    kind: 'Static evidence snapshot; not live telemetry',
    metrics: study.metrics,
    chart: study.chart,
    table: study.table,
    observations: study.slug === 'hidropronos' ? hidroValidation : study.chart.rows,
    sources: study.sources.map(source => ({ ...source, url: sourceUrl(study, source.id) })),
  }, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
