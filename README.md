# 🎚️ Snippet Mix Plugin

Das **Snippet Mix Plugin** ist ein Plugin für das **Elgato Stream Deck**, das in Kombination mit der Webanwendung **Snippet Mix** verwendet wird. Es ermöglicht die Fernsteuerung eines **Soundcraft Si Impression**-Mischpults direkt vom Stream Deck aus. Darüber hinaus können Zustände des Mischpults gespeichert und geladen werden – ideal für Livestreaming, Theater, Veranstaltungen und mehr.

---

## 🔗 Komponenten

- **Snippet Mix Plugin**  
  Ein benutzerdefiniertes Stream Deck Plugin zur Steuerung des Mischpults und zur Kommunikation mit der Webanwendung.

- **Snippet Mix (Website)**  
  Eine begleitende Webanwendung zur Verwaltung und Visualisierung gespeicherter Mischpult-Zustände ("Snippets").

---

## 🛠️ Funktionen

- 🎛️ **Soundcraft Si Impression steuern**  
  Kanäle, Fader, Mute-Zustände und mehr vom Stream Deck aus bedienen.

- 💾 **Snippets speichern & laden**  
  Speichere aktuelle Mischpult-Zustände als Snippets und lade sie bei Bedarf wieder.

- 🌐 **Integration mit der Snippet Mix Webanwendung**  
  Aktionen auf dem Stream Deck können über die Website verfolgt, verwaltet und angepasst werden.

- ⚡ **Schneller Zugriff auf Funktionen**  
  Jeder Button auf dem Stream Deck kann individuell belegt werden (z. B. „Szene A laden“, „Mikrofon muten“ usw.).

---

## 🔧 Voraussetzungen

- Elgato Stream Deck mit installierter Stream Deck Software
- Soundcraft Si Impression (mit Netzwerkverbindung)
- Snippet Mix Webanwendung (separat gestartet oder gehostet)
- Optional: Node.js zur lokalen Entwicklung

---

## 🚀 Installation

1. **Plugin installieren**  
   Lade die `.streamDeckPlugin`-Datei aus dem [Releases](#) Bereich dieses Repositories herunter und öffne sie mit der Stream Deck Software.

2. **Snippet Mix Website starten**  
   Stelle sicher, dass die Webanwendung läuft (lokal oder auf einem Server).

3. **Plugin konfigurieren**  
   - IP-Adresse des Mischpults und der Webanwendung eintragen  
   - Aktionen und Snippets einzelnen Stream Deck Buttons zuweisen

---

## 📁 Projektstruktur

```plaintext
├── 📂 net.phimai.snippet-mix-plugin.sdPlugin/
│   ├── bin/              # compiled output files from your ./src directory
│   ├── imgs/             # supporting images distributed with your plugin
│   ├── logs/             # logs generated with a logger
│   ├── ui/               # property inspectors, allowing users to configure actions in Stream Deck
│   └── manifest.json     # defines the metadata of your plugin, learn more about the manifest
├── 📂 src/
│   ├── actions/          # all the different actions
│   └── plugin.ts         # the entry point of your plugin
├── package.json
├── rollup.config.mjs
├── tsconfig.json
├── README.md
└── LICENSE
