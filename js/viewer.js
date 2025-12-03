const viewer = new Molstar.Viewer("viewer", {
  layoutIsExpanded: true,
  layoutShowSequence: true
});

// Funzione per caricare un PDB
function loadPDB(pdbPath) {
  viewer.loadStructureFromUrl(
    pdbPath,
    "pdb",
    { representationParams: { theme: { customColor: "#ff9999" } } }
  ).then(() => {
    viewer.clear();
    viewer.setRepresentation("cartoon");
  });
}

// Dropdown
const select = document.getElementById("pdb-select");
select.addEventListener("change", () => {
  loadPDB(select.value);
});

// Carica il primo PDB di default
loadPDB(select.value);
