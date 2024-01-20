
import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { jwtDecode } from "jwt-decode";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";
import './adminUserPage.scss'

const AdminUserPage = () => {
    useVerifyIfUserIsLogged();

    const [users, setUsers] = useState(null);
    const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token);
  
    useEffect(() => {
      (async () => {
        const usersResponse = await fetch("http://localhost:3005/api/users");
        const usersResponseData = await usersResponse.json();
        setUsers(usersResponseData);
      })();
    }, []);
  
    const handleDeleteUser = async (event, UserId) => {
      await fetch("http://localhost:3005/api/users/" + UserId, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
  
      const usersResponse = await fetch("http://localhost:3005/api/users");
      const usersResponseData = await usersResponse.json();
      setUsers(usersResponseData);
    };
    return (
        <>
            <HeaderAdmin/>
            {users?(
            <main className="mainUser">
                <h2>Liste des utilisateurs</h2>
                {users.map((user) => {
                    return (
                        <article className="userBloc">
                                <h2 className="userName">{user.username}</h2>
                                {decodedToken.data.role !== 3 && (
                                <button className="deleteUserBtn1" onClick={(event) => handleDeleteUser(event, user.id)}>Supprimer</button>
                            )}
                        </article>
                    );
                }
                )}
            </main>
            ): (
                <p>En cours de chargement</p>
            )}
        </>
    ) 
}

export default AdminUserPage;