import {
  BudgetStatementDto,
  BudgetStatementFteDto,
  BudgetStatementWalletDto,
  BudgetStatus,
} from '../../models/dto/core-unit.dto';

export class BudgetStatementBuilder {
  private readonly _budgetStatement: BudgetStatementDto;

  constructor() {
    this._budgetStatement = {
      month: '',
      budgetStatementFTEs: [] as BudgetStatementFteDto[],
      budgetStatementWallet: [] as BudgetStatementWalletDto[],
      status: BudgetStatus.Draft,
      publicationUrl: '',
    } as BudgetStatementDto;
  }

  withMonth(month: string): BudgetStatementBuilder {
    this._budgetStatement.month = month;
    return this;
  }

  withBudgetStatus(status: BudgetStatus): BudgetStatementBuilder {
    this._budgetStatement.status = status;
    return this;
  }

  addBudgetStatementFTE(budgetStatementFTE: BudgetStatementFteDto): BudgetStatementBuilder {
    this._budgetStatement.budgetStatementFTEs.push(budgetStatementFTE);
    return this;
  }

  addBudgetStatementWallet(budgetStatementWallet: BudgetStatementWalletDto): BudgetStatementBuilder {
    this._budgetStatement.budgetStatementWallet.push(budgetStatementWallet);
    return this;
  }

  build(): BudgetStatementDto {
    return this._budgetStatement;
  }
}
