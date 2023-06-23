import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Box from "../../components/Box";

interface Users {
  id: number;
  name: string;
}

export default function Home() {
  const [users, setUsers] = useState<Users[]>([]);
  const [username, setUsername] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const randomIndex = Math.floor(Math.random() * users.length);
  const usernames = users.map((user) => {
    return user.name;
  });
  const sortedName = usernames[randomIndex];

  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const doReload = () => {
    window.location.reload();
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .post("/users", {
        id: Math.random(),
        name: username,
      })
      .then(() => {
        doReload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateData = (user: Users) => {
    localStorage.setItem('id', String(user.id));
    localStorage.setItem('name', user.name);
  }

  const handleDeleteUser = async (user: Users) => {
    await api
      .delete(`/users/${user.id}/`)
      .then(() => {
        users.filter((u) => u.id !== user.id);
        setUsers([...users]);
        doReload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1 className="text-3xl font-bold">Sorteador de nomes</h1>
      <form className="mt-5" onSubmit={handleCreateUser}>
        <div className="flex justify-between my-5">
          <input
            className="bg-white w-1/2 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            type="text"
            value={username}
            placeholder="Inserir nome"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="rounded-full bg-blue-400 px-5 py-2 text-white disabled:opacity-75"
            disabled={!username.length}
          >
            Adicionar
          </button>
        </div>
        {users.length ? (
          <div>
            <table className="table-fixed border-spacing-10">
              <thead>
                <tr>
                  <th className="border border-slate-600 px-10">ID</th>
                  <th className="border border-slate-600 px-20">Nome</th>
                  <th className="border border-slate-600 px-20">Editar</th>
                  <th className="border border-slate-600 px-20">Deletar</th>
                </tr>
              </thead>
              {users.map((user) => {
                return (
                  <Box
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    handleDeleteUser={() => handleDeleteUser(user)}
                    handleUpdateData={() => handleUpdateData(user)}
                  />
                );
              })}
            </table>
            <button
              type="button"
              className="rounded-full bg-blue-400 px-5 py-2 text-white my-5"
              onClick={() => setIsSorted(!isSorted)}
            >
              Sortear
            </button>
            {isSorted ? (
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-center">
                  O ganhador é {sortedName}
                </h1>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <h1 className="text-3xl font-bold">Não existem usuários na lista</h1>
        )}
      </form>
    </div>
  );
}
