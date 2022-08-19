import { fetchCoreUnits } from '../../stories/containers/cu-table/cu-table.api';
import type { CoreUnitDto } from '../models/dto/core-unit.dto';
import { BASE_URL } from '../../config/routes';

const EXCLUDED_CU_CODES = ['EXA'];

export class SitemapBuilder {
  getXMLForRoute(url: string, lastMod?: string, changeFreq?: string): string {
    return `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastMod || new Date().toISOString()}</lastmod>
        <changefreq>${changeFreq || 'weekly'}</changefreq>
        <priority>1.0</priority>
      </url>
    `;
  }

  resolveHomePageRoute(): string {
    return this.getXMLForRoute(`${BASE_URL}`);
  }

  resolveSingleCURoutes(cu: CoreUnitDto): string[] {
    const cuRoutes: string[] = [];
    cuRoutes.push(this.getXMLForRoute(`${BASE_URL}/core-unit/${cu.shortCode}`));
    cuRoutes.push(this.getXMLForRoute(`${BASE_URL}/core-unit/${cu.shortCode}/finances/reports`));

    return cuRoutes;
  }

  async resolveCuRoutes(): Promise<string[]> {
    const cuRoutes: string[] = [];
    const coreUnits = (await fetchCoreUnits()) as CoreUnitDto[];
    for (const cu of coreUnits) {
      if (!EXCLUDED_CU_CODES.includes(cu.shortCode)) {
        cuRoutes.push(...this.resolveSingleCURoutes(cu));
      }
    }

    return cuRoutes;
  }

  async build(): Promise<string> {
    const cuRoutes = await this.resolveCuRoutes();

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${this.resolveHomePageRoute()}
      ${cuRoutes.join('')}
    </urlset>
    `;
  }
}
