import {
  countInitiativesFromCoreUnit,
  getBudgetCapsFromCoreUnit,
  getCuMipStatusModifiedDate,
  getExpenditureValueFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLast3ExpenditureValuesFromCoreUnit,
  getLinksFromCoreUnit,
  getLatestMip39FromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip
} from '../core-units';
import { CuMipBuilder } from '../builders/cu-mip.builder';
import { CuStatusEnum } from '../../enums/cu-status.enum';
import { CoreUnitsBuilder } from '../builders/core-units.builder';
import { DateTime } from 'luxon';
import { BudgetStatementBuilder } from '../builders/budget-statement.builder';
import { BudgetStatementFteBuilder } from '../builders/budget-statement-fte.builder';
import { Mip40Builder } from '../builders/mip-40.builder';
import { BudgetStatementWalletBuilder } from '../builders/budget-statement-wallet.builder';
import {
  CURRENT_MONTH,
  CURRENT_MINUS_1_MONTH,
  CURRENT_MINUS_2_MONTH,
  CURRENT_MINUS_3_MONTH
} from '../../utils/test.utils';
import { RoadmapBuilder } from '../builders/roadmap.builder';
import { RoadmapStatusEnum } from '../../enums/roadmap-status.enum';
import { ContributorCommitmentDto } from '../../models/dto/core-unit.dto';
import { CuJobEnum } from '../../enums/cu-job.enum';

test('Get date for status on CuMip', () => {
  const mipDao = (new CuMipBuilder()).withStatus(CuStatusEnum.Withdrawn, CURRENT_MINUS_2_MONTH).build();
  expect(getCuMipStatusModifiedDate(mipDao, CuStatusEnum.Withdrawn)).toBe(CURRENT_MINUS_2_MONTH);

  expect(getCuMipStatusModifiedDate(mipDao, CuStatusEnum.Withdrawn)).not.toEqual(CURRENT_MINUS_1_MONTH);

  expect(getCuMipStatusModifiedDate(mipDao, CuStatusEnum.RFC)).toBe('');
});

test('Get latest Mip39 from Core Unit', () => {
  const mipDao = (new CuMipBuilder()).build();
  mipDao.mipCode = 'MIP39';
  const coreUnit = (new CoreUnitsBuilder()).addCuMip(mipDao).build();

  expect(getLatestMip39FromCoreUnit(coreUnit)).toBe(mipDao);
});

test('Get Date as Datetime from CuMip', () => {
  const date = CURRENT_MINUS_2_MONTH;
  const mipDao = (new CuMipBuilder()).withStatus(CuStatusEnum.Withdrawn, date).build();
  expect(getCuMipStatusModifiedDate(mipDao, CuStatusEnum.Withdrawn)).toBe(date);

  const expectedDate = DateTime.fromFormat(date, 'yyyy-MM-dd').toJSDate();
  expect(getSubmissionDateFromCuMip(mipDao)?.toDateString()).toBe(expectedDate.toDateString());
});

test('Get initiatives from Core Unit', () => {
  const coreUnit = (new CoreUnitsBuilder())
    .withId('1')
    .addRoadMap(
      (new RoadmapBuilder())
        .withOwnerCuId('1')
        .withRoadmapStatus(RoadmapStatusEnum.InProgress)
        .build()
    )
    .addRoadMap(
      (new RoadmapBuilder())
        .withOwnerCuId('1')
        .withRoadmapStatus(RoadmapStatusEnum.InProgress)
        .build()
    )
    .build();

  expect(countInitiativesFromCoreUnit(coreUnit)).toBe(2);
});

test('Get links from Core Unit', () => {
  const forumUrl = 'https://some-tag-url';
  const linkedInUrl = 'https://linkedin.com';
  const youtubeUrl = 'https://youtube.com';
  const twitterUrl = 'https://twitter.com';

  const coreUnit = (new CoreUnitsBuilder())
    .addSocialMediaChannel({
      forumTag: forumUrl,
      linkedIn: linkedInUrl,
      youtube: youtubeUrl,
      twitter: twitterUrl,
      discord: '',
      website: ''
    })
    .build();

  const result = getLinksFromCoreUnit(coreUnit);
  expect(result.length).toEqual(4);
  expect(result[0].href).toEqual(forumUrl);
  expect(result[1].href).toEqual(twitterUrl);
  expect(result[2].href).toEqual(youtubeUrl);
  expect(result[3].href).toEqual(linkedInUrl);
});

test('Get FTEs from Core Unit', () => {
  const coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .addBudgetStatementFTE(new BudgetStatementFteBuilder()
        .withFtes(4.5).build()
      ).build()
    ).build();

  expect(getFTEsFromCoreUnit(coreUnit)).toBe(4.5);
});

test('Get Facilitator from Core Unit', () => {
  const coreUnit = (new CoreUnitsBuilder())
    .addContributorCommitment({
      commitment: 'commitment',
      id: 'id',
      jobTitle: CuJobEnum.Facilitator,
      contributor: [{
        discordHandle: '',
        email: '',
        name: 'Facilitator',
        facilitatorImage: '',
        forumHandle: '',
        twitterHandle: '',
        id: '',
      }]
    } as ContributorCommitmentDto)
    .build();

  const result = getFacilitatorsFromCoreUnit(coreUnit);
  expect(result.length).toEqual(1);
  expect(result[0].contributor[0].name).toBe('Facilitator');
});

test('Get Budget Cap for Core Unit', () => {
  let coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_1_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([300, 300, 300], CURRENT_MINUS_1_MONTH)
        .build())
      .build())
    .addCuMip((new CuMipBuilder())
      .addMip40((new Mip40Builder())
        .addPeriodWithLineItems(CURRENT_MINUS_3_MONTH, CURRENT_MONTH, [500, 300, 100])
        .build())
      .build())
    .build();

  expect(getBudgetCapsFromCoreUnit(coreUnit)).toEqual([900, 900, 900]);

  coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_1_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([300, 300, 300], CURRENT_MINUS_1_MONTH)
        .build())
      .build())
    .addCuMip((new CuMipBuilder())
      .addMip40((new Mip40Builder())
        .addPeriodWithLineItems(CURRENT_MINUS_3_MONTH, CURRENT_MONTH, [100, 100, 100])
        .build())
      .build())
    .build();

  expect(getBudgetCapsFromCoreUnit(coreUnit)).toEqual([300, 300, 300]);

  coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_1_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([300, 300, 300], CURRENT_MINUS_1_MONTH)
        .build())
      .build())
    .addCuMip((new CuMipBuilder())
      .addMip40((new Mip40Builder())
        .addPeriodWithLineItems(CURRENT_MINUS_3_MONTH, CURRENT_MINUS_2_MONTH, [100, 200, 100])
        .build())
      .addMip40((new Mip40Builder())
        .addPeriodWithLineItems(CURRENT_MINUS_2_MONTH, CURRENT_MINUS_1_MONTH, [200])
        .build()
      )
      .addMip40((new Mip40Builder())
        .addPeriodWithLineItems(CURRENT_MINUS_1_MONTH, CURRENT_MONTH, [600])
        .build()
      )
      .build())
    .build();

  expect(getBudgetCapsFromCoreUnit(coreUnit)).toEqual([400, 200, 600]);
});

test('Get expenditure value from Core Unit', () => {
  let coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_1_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([500, 300, 100], CURRENT_MINUS_1_MONTH)
        .build())
      .build())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_2_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([100, 100, 100], CURRENT_MINUS_2_MONTH)
        .build())
      .build())
    .build();

  expect(getExpenditureValueFromCoreUnit(coreUnit)).toBe(1200);

  coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth('2022-01-01')
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([500, 300, 100], '2022-01-01')
        .build())
      .build())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth('2022-11-01')
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([100, 100, 100], '2022-11-01')
        .build())
      .build())
    .build();

  expect(getExpenditureValueFromCoreUnit(coreUnit)).toBe(300);
});

test('Get percent from Core Unit', () => {
  let coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_3_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([500, 300, 100], CURRENT_MINUS_3_MONTH)
        .build())
      .build())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_2_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([900], CURRENT_MINUS_2_MONTH)
        .build())
      .build())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_1_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([300, 600], CURRENT_MINUS_1_MONTH)
        .build())
      .build())
    .addCuMip((new CuMipBuilder())
      .addMip40((new Mip40Builder())
        .addPeriodWithLineItems(CURRENT_MINUS_3_MONTH, CURRENT_MONTH, [500, 300, 100])
        .build())
      .build())
    .build();

  expect(getPercentFromCoreUnit(coreUnit)).toBe(100);

  coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_3_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([300, 100, 50], CURRENT_MINUS_3_MONTH)
        .build())
      .build())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_2_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([450], CURRENT_MINUS_2_MONTH)
        .build())
      .build())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_1_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([300, 150], CURRENT_MINUS_1_MONTH)
        .build())
      .build())
    .addCuMip((new CuMipBuilder())
      .addMip40((new Mip40Builder())
        .addPeriodWithLineItems(CURRENT_MINUS_3_MONTH, CURRENT_MONTH, [500, 300, 100])
        .build())
      .build())
    .build();

  expect(getPercentFromCoreUnit(coreUnit)).toBe(50);
});

test('Get last 3 expenditure values from Core Unit', () => {
  let coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_3_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([500, 300, 100], CURRENT_MINUS_3_MONTH)
        .build())
      .build())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_2_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([800], CURRENT_MINUS_2_MONTH)
        .build())
      .build())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_1_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([100, 600], CURRENT_MINUS_1_MONTH)
        .build())
      .build())
    .build();

  let result = getLast3ExpenditureValuesFromCoreUnit(coreUnit);
  expect(result.length).toBe(3);
  expect(result[0].value).toBe(900);
  expect(result[1].value).toBe(800);
  expect(result[2].value).toBe(700);

  coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_3_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([500, 300, 100], CURRENT_MINUS_3_MONTH)
        .build())
      .build())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_1_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([100, 600], CURRENT_MINUS_1_MONTH)
        .build())
      .build())
    .build();

  result = getLast3ExpenditureValuesFromCoreUnit(coreUnit);
  expect(result.length).toBe(3);
  expect(result[0].value).toBe(900);
  expect(result[1].value).toBe(0);
  expect(result[2].value).toBe(700);

  coreUnit = (new CoreUnitsBuilder())
    .addBudgetStatement((new BudgetStatementBuilder())
      .withMonth(CURRENT_MINUS_3_MONTH)
      .addBudgetStatementWallet((new BudgetStatementWalletBuilder())
        .withLineItems([500], CURRENT_MINUS_3_MONTH)
        .build())
      .build())
    .build();

  result = getLast3ExpenditureValuesFromCoreUnit(coreUnit);
  expect(result.length).toBe(3);
  expect(result[0].value).toBe(0);
  expect(result[1].value).toBe(0);
  expect(result[2].value).toBe(500);
});
