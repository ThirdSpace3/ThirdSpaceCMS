import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';

// Use Alchemy for Devnet
const ALCHEMY_API_KEY = 'Ft-2Cy1lx36awBSOI_VexPLkfkZJB1YF';
const connection = new Connection(`https://solana-devnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`, 'confirmed');

// USDC Devnet Mint Address
const USDC_DEVNET_MINT_ADDRESS = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

async function createAndInitializeAssociatedTokenAccount(wallet, mint) {
  const associatedTokenAddress = await getAssociatedTokenAddress(
    mint,
    wallet.publicKey
  );

  try {
    await connection.getAccountInfo(associatedTokenAddress);
  } catch (error) {
    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        associatedTokenAddress,
        wallet.publicKey,
        mint
      )
    );
    await wallet.sendTransaction(transaction, connection);
  }

  return associatedTokenAddress;
}

async function sendUsdcTransaction(fromWallet, toPublicKey, amount) {
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, 
    fromWallet.publicKey, 
    USDC_DEVNET_MINT_ADDRESS, 
    fromWallet.publicKey
  );

  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, 
    fromWallet.publicKey, 
    USDC_DEVNET_MINT_ADDRESS, 
    toPublicKey
  );

  const transaction = new Transaction().add(
    createTransferCheckedInstruction(
      fromTokenAccount.address,
      USDC_DEVNET_MINT_ADDRESS,
      toTokenAccount.address,
      fromWallet.publicKey,
      amount * 10 ** 6, // USDC has 6 decimal places
      6
    )
  );

  try {
    const signature = await fromWallet.sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');
    return signature;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw new Error('Transaction failed. Please check your RPC provider access.');
  }
}

export { sendUsdcTransaction };
