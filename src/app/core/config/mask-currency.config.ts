import { CurrencyMaskInputMode } from 'ngx-currency';

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: 0,
    max: 99999999,
    inputMode: CurrencyMaskInputMode.FINANCIAL
};