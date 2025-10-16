'use client'; // This is a client component
import Bar from './bar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'WanBridge Token Pair Manager',
  description: 'WanBridge Token Pair Manager',
}

import { WalletConnectOptions } from '@vechain/dapp-kit';
import dynamic from 'next/dynamic';

const DAppKitProvider = dynamic(
    async () => {
      const { DAppKitProvider} = await import('@vechain/dapp-kit-react');
      return DAppKitProvider;
    },
    {
      ssr: false,
    },
);

const walletConnectOptions = {
  projectId: 'a0b855ceaf109dbc8426479a4c3d38d8',
  metadata: {
    name: 'WanBridge Token Pair Manager',
    description: 'WanBridge Token Pair ManagerWanBridge Token Pair Manager',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    icons: [
      typeof window !== 'undefined'
          ? `${window.location.origin}/images/logo/my-dapp.png`
          : '',
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1>WanBridge Token Pair Manager</h1>
        <Bar />

        <DAppKitProvider
            logLevel="DEBUG"
            node="https://testnet.vechain.org/"
            usePersistence
            walletConnectOptions={walletConnectOptions}
        >
        {children}
        </DAppKitProvider>
      </body>
    </html>
  )
}
