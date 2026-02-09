class UsersService {
  constructor() {
    this.users = [];
  }

  async init() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      this.users = await res.json();
    } catch (error) {
      print('Error al cargar usuarios');
    }
  }

  listarNombres() {
    print(this.users.map(u => u.name));
  }

  mostrarInfoBasicaPorNombre() {
    const nombre = prompt('Ingresa nombre exacto');
    const user = this.users.find(u => u.name === nombre);

    if (!user) {
      print('Usuario no encontrado');
      return;
    }

    print({
      username: user.username,
      email: user.email
    });
  }

  mostrarDireccionPorNombre() {
    const nombre = prompt('Ingresa nombre exacto');
    const user = this.users.find(u => u.name === nombre);

    if (!user) {
      print('Usuario no encontrado');
      return;
    }

    print(user.address);
  }

  mostrarInfoAvanzadaPorNombre() {
    const nombre = prompt('Ingresa nombre exacto');
    const user = this.users.find(u => u.name === nombre);

    if (!user) {
      print('Usuario no encontrado');
      return;
    }

    print({
      telefono: user.phone,
      sitioWeb: user.website,
      compania: user.company
    });
  }

  listarCompaniasYCatchphrase() {
    print(
      this.users.map(u => ({
        company: u.company.name,
        catchPhrase: u.company.catchPhrase
      }))
    );
  }

  listarNombresOrdenados() {
    const ordenados = this.users
      .map(u => u.name)
      .sort();

    print(ordenados);
  }
}

const out = document.getElementById('output');

const print = (data) => {
  out.textContent =
    typeof data === 'string'
      ? data
      : JSON.stringify(data, null, 2);
};

const svc = new UsersService();

svc.init().then(() => {
  document.getElementById('btnNombres').onclick = () => svc.listarNombres();
  document.getElementById('btnInfo').onclick = () => svc.mostrarInfoBasicaPorNombre();
  document.getElementById('btnDireccion').onclick = () => svc.mostrarDireccionPorNombre();
  document.getElementById('btnAvanzado').onclick = () => svc.mostrarInfoAvanzadaPorNombre();
  document.getElementById('btnEmpresas').onclick = () => svc.listarCompaniasYCatchphrase();
  document.getElementById('btnOrdenados').onclick = () => svc.listarNombresOrdenados();
});