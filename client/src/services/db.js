import Dexie from 'dexie';
import { DB } from '../constants';
import { getDefaultNetwork } from '../constants/network';

const db = new Dexie(DB.NAME);

db.version(DB.VERSION).stores({
  data: 'name,data',
  assets: 'address,type,name,symbol,decimal,balance,network',
});

export const DataService = {
  save(name, data) {
    return db.data.put({ name, data });
  },

  async get(name) {
    let obj = await db.data.get(name);
    if (!obj) return null;
    return obj.data;
  },

  remove(name) {
    return db.data.delete(name);
  },

  list() {
    return db.data.toArray();
  },
  async clearAll() {
    await db.data.clear();
    await db.assets.clear();
    await db.documents.clear();
  },
  async initAppData() {
    let network = await this.getNetwork();
    let address = await this.getAddress();
    let wallet = await this.getWallet();
    return { network, address, wallet };
  },
  saveNetwork(network) {
    return this.save('network', network);
  },
  async getNetwork() {
    let network = await this.get('network');
    if (!network) return getDefaultNetwork();
    return network;
  },
  saveAddress(address) {
    localStorage.setItem('address', address);
    return this.save('address', address);
  },

  getAddress() {
    return this.get('address');
  },

  getAddressFromLocal() {
    return localStorage.getItem('address');
  },
  async saveWallet(wallet) {
    return this.save('wallet', wallet);
  },

  getWallet() {
    return this.get('wallet');
  },
  getAsset(address) {
    return db.assets.get(address);
  },

  async getAssetBySymbol(symbol, network) {
    if (!network) return db.assets.get({ symbol });
    if (symbol.toUpperCase() === 'ETH') return db.assets.get({ symbol });
    return db.assets
      .filter((a) => a.symbol === symbol && a.network && a.network.name === network)
      .first();
  },

  async addDefaultAsset(symbol, name) {
    let asset = await this.getAsset('default');
    if (!asset) return db.assets.add({ address: 'default', symbol, name, decimal: 18, balance: 0 });
  },
  async addAsset(symbol, name) {
    let asset = await this.getAsset('default');
    if (!asset) return db.assets.add({ address: 'default', symbol, name, decimal: 18, balance: 0 });
  },

  async addMultiAssets(assets) {
    if (!Array.isArray(assets)) assets = [assets];
    return db.assets.bulkAdd(assets);
  },

  saveAsset(asset) {
    return db.assets.put(asset);
  },

  async updateAsset(key, asset) {
    return db.assets.update(key, asset);
  },

  listAssets(network) {
    if (!network) return db.assets.toArray();
    return db.assets.filter((a) => a.network === undefined || a.network.name === network).toArray();
  },
};
