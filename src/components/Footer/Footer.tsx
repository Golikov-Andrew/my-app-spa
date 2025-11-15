import Contacts from "./Contacts/Contacts";
import Rights from "./Rights/Rights";

function Footer() {
  return (
    <footer className="footer container-fluid fixed-bottom d-flex align-items-center justify-content-around p-4 bg-primary-subtle">
      <Rights />
      <Contacts />
    </footer>
  );
}

export default Footer;
