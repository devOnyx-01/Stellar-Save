import "./App.css";
import { useWallet } from "./hooks/useWallet";

function App() {
  const {
    wallets,
    selectedWalletId,
    status,
    activeAddress,
    network,
    connectedAccounts,
    error,
    refreshWallets,
    connect,
    disconnect,
    switchWallet,
    switchAccount,
  } = useWallet();

  const selectedWallet = wallets.find((wallet) => wallet.id === selectedWalletId);
  const isConnected = status === "connected";
  const canConnect = Boolean(selectedWallet?.installed) && status !== "connecting";

  return (
    <main className="wallet-page">
      <section className="wallet-card">
        <header className="wallet-header">
          <p className="wallet-label">Stellar Save</p>
          <h1>Wallet Integration</h1>
          <p className="wallet-subtitle">
            Freighter support is enabled. Additional Stellar wallets can be added
            through the adapter layer.
          </p>
        </header>

        <div className="wallet-section">
          <label htmlFor="wallet-select">Wallet</label>
          <select
            id="wallet-select"
            value={selectedWalletId}
            onChange={(event) => void switchWallet(event.target.value)}
          >
            {wallets.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name} {wallet.installed ? "(Installed)" : "(Not Installed)"}
              </option>
            ))}
          </select>
        </div>

        <div className="wallet-actions">
          <button type="button" onClick={() => void refreshWallets()}>
            Detect Wallets
          </button>
          <button type="button" onClick={() => void connect()} disabled={!canConnect}>
            {status === "connecting" ? "Connecting..." : "Connect Wallet"}
          </button>
          <button type="button" onClick={disconnect} disabled={!isConnected}>
            Disconnect
          </button>
        </div>

        <div className="wallet-section">
          <label htmlFor="account-select">Connected Accounts</label>
          <select
            id="account-select"
            value={activeAddress ?? ""}
            disabled={connectedAccounts.length === 0}
            onChange={(event) => switchAccount(event.target.value)}
          >
            {connectedAccounts.length === 0 ? (
              <option value="">No accounts connected</option>
            ) : (
              connectedAccounts.map((address) => (
                <option key={address} value={address}>
                  {address}
                </option>
              ))
            )}
          </select>
        </div>

        <dl className="wallet-meta">
          <div>
            <dt>Status</dt>
            <dd>{status}</dd>
          </div>
          <div>
            <dt>Network</dt>
            <dd>{network ?? "Not connected"}</dd>
          </div>
          <div>
            <dt>Active Address</dt>
            <dd className="address">{activeAddress ?? "Not connected"}</dd>
          </div>
        </dl>

        {error ? <p className="wallet-error">{error}</p> : null}
      </section>
    </main>
  );
}

export default App;
