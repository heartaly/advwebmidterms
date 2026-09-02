import './App.css'

function App() {

  return (
    <div className="App">
      <h1>Guitar Store</h1>

      <GuitarForm onAddGuitar={handleAddGuitar} />

      <GuitarInventory
        guitars={guitars}
        onDeleteGuitar={handleDeleteGuitar} />

        <GuitarDetails guitar={selectedGuitar} />
    </div>

  );
}

export default App
