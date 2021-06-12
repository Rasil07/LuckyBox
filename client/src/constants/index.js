module.exports = {
  APP_CONSTANTS: {
    VERSION: 1,
    PASSCODE_LENGTH: 6,
    SCAN_DELAY: 600,
    SCANNER_PREVIEW_STYLE: {
      height: 300,
      width: 400,
      display: 'flex',
      justifyContent: 'center',
    },
  },
  DB: {
    NAME: 'db_wallet',
    VERSION: 1,
    TABLES: {
      DATA: 'tbl_data',
      ASSETS: 'tbl_assets',
      DOCUMENTS: 'tbl_docs',
    },
  },
  ETH_TOKEN: {
    NAME: 'Ether',
    SYMBOL: 'ETH',
  },
  RBT_TOKEN: {
    NAME: 'Rasil Token',
    SYMBOL: 'RBT',
  },
};
