# Skill: Krypto Wallet (Non-Custodial Selbstverwaltung)

## Konzept
Non-custodial Wallet im Client Portal. User generiert/importiert eigene Keys.
Private Keys werden NUR client-side verschlüsselt — NIE an den Server gesendet.

## Sicherheitsarchitektur
```
User erstellt Wallet im Browser
→ Private Key wird mit User-Passwort verschlüsselt (AES-256-GCM)
→ Verschlüsselter Key wird in DB gespeichert
→ Zum Signieren: User gibt Passwort ein → Key wird client-side entschlüsselt
→ Transaktion wird client-side signiert → nur signierte TX an Server/Blockchain
```

**KRITISCH: Der Private Key verlässt NIE unverschlüsselt den Browser!**

## Unterstützte Chains (Phase 3)
| Chain | Library | Token-Standard |
|-------|---------|----------------|
| Ethereum | ethers.js v6 | ERC-20 |
| BSC | ethers.js v6 (BSC RPC) | BEP-20 |
| Polygon | ethers.js v6 (Polygon RPC) | ERC-20 |
| Bitcoin | bitcoinjs-lib | BTC native |

## Features nach Phase

### Phase 3 (Kern)
- Wallet erstellen (Mnemonic generieren, HD Wallet)
- Wallet importieren (Mnemonic oder Private Key)
- Multi-Chain Support (ETH, BSC, MATIC, BTC)
- Token-Übersicht mit Echtzeit-Preisen (CoinGecko API)
- Senden/Empfangen (Client-side Signierung)
- Transaktionshistorie mit Explorer-Links
- AES-256-GCM Verschlüsselung

### Phase 4 (Advanced)
- DEX-Swap via 1inch/0x API
- WalletConnect für Hardware-Wallets (Ledger, Trezor)
- Krypto-Payouts für Proptrading (USDC, USDT)
- QR-Code Scanner für Adressen
- Gas-Fee Estimator

## Datenbank
- Wallet (id, userId, chain, address, encryptedPrivateKey, label)
- CryptoTransaction (id, walletId, txHash, type, amount, token, toAddress, status)

## Libraries
```json
{
  "ethers": "^6.x",
  "bitcoinjs-lib": "^6.x",
  "bip39": "^3.x",
  "crypto-js": "^4.x"  // Oder Web Crypto API
}
```

## API-Endpunkte (tRPC)
- wallet.create → Wallet-Metadaten in DB speichern (NICHT den Key!)
- wallet.list → Alle Wallets des Users
- wallet.getBalance → RPC Call an Chain
- wallet.getTransactions → Aus DB + Blockchain
- wallet.delete → Wallet aus DB löschen

## Wichtige Regeln
1. Private Keys NIEMALS an API senden
2. Private Keys NIEMALS in Logs ausgeben
3. Verschlüsselung IMMER client-side (Web Crypto API oder crypto-js)
4. Server speichert NUR den verschlüsselten Blob
5. Backup-Warnung: User MUSS Mnemonic/Key sichern
6. Non-custodial = kein Verwahrgeschäft = weniger Regulierung

## Rechtlich
- Non-custodial minimiert regulatorische Pflichten
- Trotzdem juristische Prüfung vor Launch
- Disclaimer: "Sie sind allein verantwortlich für Ihre Private Keys"
- Kein Recovery möglich wenn User Key verliert → User darauf hinweisen
