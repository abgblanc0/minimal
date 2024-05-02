import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  // Aquí puedes agregar más propiedades si es necesario
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/users')
      .then(response => response.json())
      .then((data: User[]) => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="m-10">
      <h1>Usuarios:</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
