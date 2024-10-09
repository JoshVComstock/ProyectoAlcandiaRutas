type Route = {
  id: number;
  start: [number, number]; // Debe ser un tuple de dos números
  middle: [number, number]; // Debe ser un tuple de dos números
  end: [number, number]; // Debe ser un tuple de dos números
};

type User = {
  nombre: string;
  usuario: string;
  contrasena: string;
  rutas: Route[]; // Un array de rutas
};

export const data: User[] = [
  {
    nombre: "Juan Pérez",
    usuario: "juanperez",
    contrasena: "pass1234",
    rutas: [
      {
        id: 1,
        start: [-17.3751, -66.15868],
        middle: [-17.3776, -66.16234],
        end: [-17.3801, -66.165],
      },
      {
        id: 2,
        start: [-17.3801, -66.165],
        middle: [-17.383, -66.17],
        end: [-17.385, -66.175],
      },
    ],
  },
  {
    nombre: "María García",
    usuario: "mariagarcia",
    contrasena: "password5678",
    rutas: [
      {
        id: 3,
        start: [-17.385, -66.175],
        middle: [-17.387, -66.18],
        end: [-17.389, -66.185],
      },
    ],
  },
  {
    nombre: "Carlos López",
    usuario: "carloslopez",
    contrasena: "abcde12345",
    rutas: [],
  },
  {
    nombre: "Ana Martínez",
    usuario: "anamartinez",
    contrasena: "mypassword6789",
    rutas: [
      {
        id: 4,
        start: [-17.39, -66.19],
        middle: [-17.392, -66.195],
        end: [-17.395, -66.2],
      },
      {
        id: 5,
        start: [-17.396, -66.205],
        middle: [-17.398, -66.21],
        end: [-17.4, -66.215],
      },
    ],
  },
  {
    nombre: "Luis Ramírez",
    usuario: "luisramirez",
    contrasena: "securepass999",
    rutas: [
      {
        id: 6,
        start: [-17.401, -66.22],
        middle: [-17.403, -66.225],
        end: [-17.405, -66.23],
      },
    ],
  },
  {
    nombre: "Jose Daniel Veizaga",
    usuario: "admin",
    contrasena: "123456",
    rutas: [
      {
        id: 7,
        start: [-17.402, -66.221],
        middle: [-17.404, -66.226],
        end: [-17.406, -66.231],
      },
      {
        id: 8,
        start: [-17.4, -66.219],
        middle: [-17.402, -66.224],
        end: [-17.404, -66.229],
      },
    ],
  },
];
