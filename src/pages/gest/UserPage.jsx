
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";
import Footer from '../../component/gest/Footer'
import Header from '../../component/gest/Header'
import './userPage.scss'

const UserPage = () => {

        useVerifyIfUserIsLogged();
    
        const [user, setUser] = useState(null);
        const token = localStorage.getItem("jwt");
        const decodedToken = jwtDecode(token);
      
        useEffect(() => {
          (async () => {
            const userResponse = await fetch("http://localhost:3005/api/users");
            const userResponseData = await userResponse.json();
            setUser(userResponseData);
          })();
        }, []);
      
        const handleDeleteUser = async (event, UserId) => {
          await fetch("http://localhost:3005/api/users/" + UserId, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
          });
      
          const userResponse = await fetch("http://localhost:3005/api/users");
          const userResponseData = await userResponse.json();
          setUser(userResponseData);
        };
    
    return (
        <>
            <Header/>
            <main>
            <h2>Votre espace personnel</h2>
            {user ? (
                    <article>
                        <h2 className="user">{user.username}</h2>
                        {console.log(user)}
                        {decodedToken.data.role !== 3 && (
                            <button onClick={handleDeleteUser}>Supprimer</button>
                        )}
                    </article>
                ) : (
                    <p>En cours de chargement</p>
                )}
                
            </main>
            <Footer/>
        </>
    )
}

export default UserPage