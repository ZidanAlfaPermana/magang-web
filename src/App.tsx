function App() {
  const nama = "Zidan";
  const tahun = new Date().getFullYear();

  return (
      <section className="salam">
          <h1>Halo, nama saya {nama}!</h1>
          <p>Year: {tahun}</p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
          <p style={{ color: "yellowgreen" }}>Yellow Green</p>
      </section>
  );
}

export default App
