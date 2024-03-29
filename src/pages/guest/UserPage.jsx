
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useVerifyIfUserIsLogged } from "../../utils/security-utils";
import Footer from '../../component/guest/Footer'
import Header from '../../component/guest/Header'
import './userPage.scss'

const UserPage = () => {
        useVerifyIfUserIsLogged();
    
        const [user, setUser] = useState(null);
        const token = localStorage.getItem("jwt");
        const decodedToken = jwtDecode(token);
        
        useEffect(() => {
            (async () => {
              const userResponse = await fetch(`http://localhost:3005/api/users/${decodedToken.dataId}`);
              const userResponseData = await userResponse.json();
              setUser(userResponseData.data);
            })();
          }, [decodedToken.dataId]);
      
        const handleDeleteUser = async (event) => {
          await fetch(`http://localhost:3005/api/users/${decodedToken.dataId}`, {
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
            <main className="mainUser">
            <h2>Votre espace personnel</h2>
            {user ? (
                    <article className="userArticle">
                      <div className="UserDiv">
                        <h2 className="user">{user.username}</h2>
                        {decodedToken.data.role !== 3 && (
                            <button className="deleteUserBtn" onClick={handleDeleteUser}>Supprimer</button>
                        )}
                      </div>                        
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