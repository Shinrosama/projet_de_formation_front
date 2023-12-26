import Footer from "../../component/gest/Footer";
import Header from "../../component/gest/Header";
import './contactsPage.scss'


const ContactsPage = () => {
    return (
        <>
            <Header/>
            <main className="mainContacts">
                <div className="contactTitle">
                    <h2>Mangas/Notes</h2>
                    <h2>Contacts</h2>
                </div>
                <div className="contactBloc">
                    <div className="contactMail">
                        <p>Mail:</p>
                        <p>mangas.notes@boitemail.com</p>
                    </div>
                    <div className="contactAdress">
                        <p>Adresse :</p>
                        <p>9 Rue de Grand Line</p>
                        <p>Res Kame House </p>
                        <p>99 999 Terre 2</p>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default ContactsPage;