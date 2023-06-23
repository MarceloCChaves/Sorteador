import { useState } from 'react'
import { api } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const handleUpdateData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(params.id){
      api.put(`/users/${params.id}`, {
        name: username,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
}

  return (
    <form onSubmit={handleUpdateData}>
      <div className="flex items-center flex-col my-5">
        <input
          className="bg-white border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          type="text"
          value={username}
          placeholder="Atualizar nome"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type='submit'
          className="rounded-full bg-blue-400 px-5 py-2 mt-2 text-white disabled:opacity-75"
          disabled={!username.length}
        >
          Atualizar
        </button>
      </div>
    </form>
  )
}
