import type { FeatureFlagsInterface } from './feature-flags.interface';

export const flagsProduction: FeatureFlagsInterface = {
  FEATURE_SITEMAP: true,
  FEATURE_AUDIT_REPORTS: false,
  FEATURE_TEMPORARY_ACCOUNTS_SNAPSHOT_PAGE: false,
  FEATURE_ACCOUNT_SNAPSHOT_CURRENCY_PICKER: false,
  FEATURE_TEAM_PROJECTS: false,
  FEATURE_ECOSYSTEM_FINANCES_DASHBOARD_PAGE: false,
  FEATURE_ROADMAP_MILESTONES: false,
};
