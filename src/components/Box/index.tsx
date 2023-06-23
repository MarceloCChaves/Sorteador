interface Users {
  id: number;
  name: string;
  handleDeleteUser: any;
}

export default function Box({ name, id, handleDeleteUser }: Users) {

  return (
    <tbody>
      <tr>
        <td className="border border-slate-600 p-10">{id}</td>
        <td className="border border-slate-600 p-10">{name}</td>
        <td className="border border-slate-600 p-10">
          <button type="button" className="rounded-full bg-green-400 px-5 py-2 text-white">
            Edit
          </button>
        </td>
        <td className="border border-slate-600 p-10">
          <button type="button" className="rounded-full bg-red-400 px-5 py-2 text-white" onClick={() => handleDeleteUser(id)}>
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  );
}
