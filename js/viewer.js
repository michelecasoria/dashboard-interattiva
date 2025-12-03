const viewer = new Molstar.Viewer("viewer", {
  layoutIsExpanded: true,
  layoutShowSequence: true
});

// Funzione per caricare un PDB
function loadPDB(pdbPath) {
  viewer.clear(); // pulisce prima di caricare
  viewer.loadStructureFromUrl(
    pdbPath,
    "pdb",
    { representationParams: { theme: { customColor: "#ff9999" } } }
  ).then(() => {
    viewer.setRepresentation("cartoon");
  });
}

// Carica la lista dei PDB dal JSON e popola il dropdown
fetch('pdbs/list.json')
  .then(response => response.json())
  .then(pdbList => {
    const select = document.getElementById("pdb-select");

    // Popola dropdown
    pdbList.forEach(pdb => {
      const option = document.createElement('option');
      option.value = "pdbs/" + pdb;  // percorso corretto
      option.text = pdb;
      select.appendChild(option);
    });

    // Evento cambio selezione
    select.addEventListener("change", () => {
      loadPDB(select.value);
    });

    // Carica il primo PDB di default
    if (pdbList.length > 0) {
      select.value = "pdbs/" + pdbList[0];
      loadPDB(select.value);
    }
  });
