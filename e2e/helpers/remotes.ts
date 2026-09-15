export interface RemoteDef {
  name: string;
  nav: string;
  path: string;
  port: number;
  listHeading: string;
  detailHeading: string;
  detailText: (id: string) => string;
}

export const REMOTES: RemoteDef[] = [
  {
    name: 'identity-mfe',
    nav: 'Identity',
    path: 'identity',
    port: 4201,
    listHeading: 'Identity List',
    detailHeading: 'Identity Detail',
    detailText: (id) => `Viewing identity ID: ${id}`,
  },
  {
    name: 'customer-mfe',
    nav: 'Customers',
    path: 'customers',
    port: 4202,
    listHeading: 'Customer List',
    detailHeading: 'Customer Detail',
    detailText: (id) => `Viewing customer ID: ${id}`,
  },
  {
    name: 'order-mfe',
    nav: 'Orders',
    path: 'orders',
    port: 4203,
    listHeading: 'Order List',
    detailHeading: 'Order Detail',
    detailText: (id) => `Viewing order ID: ${id}`,
  },
  {
    name: 'product-mfe',
    nav: 'Products',
    path: 'products',
    port: 4204,
    listHeading: 'Product List',
    detailHeading: 'Product Detail',
    detailText: (id) => `Viewing product ID: ${id}`,
  },
];

export const remoteOrigin = (port: number): string =>
  process.env[`REMOTE_BASE_URL_${port}`] ?? `http://localhost:${port}`;
