export function addLocalImportMap(imports) {
  const scriptNodeId = "product-manage-script-importmap-id";
  let importMapEl = document.getElementById(scriptNodeId);
  const exists = !!importMapEl;
  let textContent = {};

  if (!importMapEl) {
    importMapEl = document.createElement("script");
    importMapEl.id = scriptNodeId;
    importMapEl.type = "importmap";
  } else {
    try {
      textContent = JSON.parse(importMapEl?.textContent);
    } catch (err) {
      console.log(
        `something went wrong during parse (${scriptNodeId}) script content`
      );
    }
  }

  importMapEl.textContent = JSON.stringify({
    ...textContent,
    imports: {
      ...textContent?.imports,
      ...imports,
    },
  });

  if (!exists) {
    document.head.appendChild(importMapEl);
  }
}
