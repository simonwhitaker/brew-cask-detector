import caskSlim from "./cask-slim.json";
var urlsToCasks: { [key: string]: string[] } = {};
caskSlim.forEach(({ token, homepage }, idx) => {
  if (!urlsToCasks[homepage]) {
    urlsToCasks[homepage] = [];
  }
  urlsToCasks[homepage].push(token);

  if (urlsToCasks[homepage].length > 1) {
    console.info(`${homepage} -> [${urlsToCasks[homepage]}]`);
  }
});

function casksForURL(url: Location): string[] {
  // Get a list of casks for the given URL. For now, just index directly into
  // `urlsToCasks`.
  return urlsToCasks[url.href] ?? urlsToCasks[url.origin] ?? [];
}

const url = document.location;
const casks = casksForURL(url);
if (casks.length > 0) {
  const wrapper = document.createElement("div");
  wrapper.attachShadow({ mode: "open" });
  if (wrapper.shadowRoot) {
    wrapper.shadowRoot.innerHTML = "<style>:host {all: initial;}</style>";
  }
  casks.forEach((cask) => {
    const installParagraph = document.createElement("div");
    const brewCommand = `brew install --cask ${cask}`;
    installParagraph.innerHTML = `<code>${brewCommand}</code>`;
    installParagraph.style.backgroundColor = "red";
    installParagraph.style.padding = "2px 10px";

    const copyButton: HTMLButtonElement = document.createElement("button");
    copyButton.style.margin = "0 10px";
    copyButton.style.border = "0";
    copyButton.textContent = "Copy";
    copyButton.onclick = async () => {
      try {
        await navigator.clipboard.writeText(brewCommand);
        copyButton.textContent = "Copied!";
        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };

    installParagraph.appendChild(copyButton);
    wrapper.shadowRoot?.appendChild(installParagraph);
  });

  document.body.insertBefore(wrapper, document.body.firstChild);
} else {
  console.log(`No cask found for ${url}`);
}
