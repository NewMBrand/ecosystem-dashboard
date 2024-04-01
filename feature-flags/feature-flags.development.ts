import type { FeatureFlagsInterface } from './feature-flags.interface';

export const flagsDevelopment: FeatureFlagsInterface = {
  FEATURE_SITEMAP: process.env.ENABLE_SITEMAP === 'true',
  FEATURE_AUDIT_REPORTS: false,
  FEATURE_TEMPORARY_ACCOUNTS_SNAPSHOT_PAGE: true,
  FEATURE_ACCOUNT_SNAPSHOT_CURRENCY_PICKER: false,
  FEATURE_TEAM_PROJECTS: true,
  FEATURE_ECOSYSTEM_FINANCES_DASHBOARD_PAGE: true,
  FEATURE_ROADMAP_MILESTONES: true,
};
