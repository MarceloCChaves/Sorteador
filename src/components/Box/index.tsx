import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from 'react-icons/fa';
interface Users {
  id: number;
  name: string;
  handleDeleteUser: any;
  handleUpdateData: any;
}

export default function Box({
  name,
  id,
  handleDeleteUser,
  handleUpdateData,
}: Users) {
  return (
    <tbody>
      <tr>
        <td className="border border-slate-600 p-10">{id}</td>
        <td className="border border-slate-600 p-10">{name}</td>
        <td className="border border-slate-600 p-10 text-center">
          <Link
            to={`update/${id}`}
            className="rounded-full bg-green-400 px-5 py-2 text-white"
          >
            <button type="button" onClick={() => handleUpdateData(id)}>
              <FaEdit/>
            </button>
          </Link>
        </td>
        <td className="border border-slate-600 p-10 text-center">
          <button
            type="button"
            className="rounded-full bg-red-400 px-5 py-2 text-white"
            onClick={() => handleDeleteUser(id)}
          >
            <FaTrash/>
          </button>
        </td>
      </tr>
    </tbody>
  );
}
