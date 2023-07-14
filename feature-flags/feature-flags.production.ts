import type { FeatureFlagsInterface } from './feature-flags.interface';

export const flagsProduction: FeatureFlagsInterface = {
  FEATURE_CARD_NAVIGATION: true,
  FEATURE_SITEMAP: true,
  FEATURE_GLOBAL_ACTIVITIES: true,
  FEATURE_AUTH: true,
  FEATURE_MKR_VESTING: true,
  FEATURE_AUDIT_REPORTS: false,
  FEATURE_FINANCES_OVERVIEW: true,
  FEATURE_RECOGNIZED_DELEGATES_REPORT: true,
  FEATURE_TRANSPARENCY_COMMENTS: true,
  FEATURE_RECOGNIZED_DELEGATES: true,
  FEATURE_ACCOUNTS_SNAPSHOT: false,
  FEATURE_TEMPORARY_ACCOUNTS_SNAPSHOT_PAGE: false,
  FEATURE_ACCOUNT_SNAPSHOT_CURRENCY_PICKER: false,
  FEATURE_ECOSYSTEM_ACTORS: true,
  FEATURE_ECOSYSTEM_ACTORS_ABOUT: false,
  FEATURE_CARD_NAVIGATION_ACTOR_ABOUT_PAGE: false,
  FEATURE_ECOSYSTEM_ACTORS_TRANSPARENCY_REPORTING: false,
};
